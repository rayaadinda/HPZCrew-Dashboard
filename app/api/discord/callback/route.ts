import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')
	const error = requestUrl.searchParams.get('error')
	const state = requestUrl.searchParams.get('state')

	// For debugging
	console.log('Discord callback received:', { code: !!code, error, state })

// Handle OAuth errors
	if (error) {
		console.error('Discord OAuth error:', error)

		let errorDetails = ''
		switch (error) {
			case 'access_denied':
				errorDetails = 'You cancelled the Discord authorization'
				break
			case 'invalid_client':
				errorDetails = 'Discord application client ID is invalid or application not found'
				break
			case 'invalid_scope':
				errorDetails = 'Requested Discord permissions are invalid'
				break
			case 'invalid_request':
				errorDetails = 'Discord authorization request was malformed'
				break
			case 'unauthorized':
				errorDetails = 'Discord application is not authorized'
				break
			case 'server_error':
				errorDetails = 'Discord server error occurred'
				break
			case 'temporarily_unavailable':
				errorDetails = 'Discord services are temporarily unavailable'
				break
			default:
				errorDetails = `Discord OAuth error: ${error}`
		}

		return NextResponse.redirect(
			`${requestUrl.origin}/dashboard/settings?discord_error=${encodeURIComponent(error)}&details=${encodeURIComponent(errorDetails)}`
		)
	}

	if (!code) {
		console.error('No authorization code received from Discord')
		return NextResponse.redirect(
			`${requestUrl.origin}/dashboard/settings?discord_error=no_code`
		)
	}

	try {
		// Exchange authorization code for access token
		const tokenResponse = await fetch(`${requestUrl.origin}/api/discord/oauth`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code }),
		})

		if (!tokenResponse.ok) {
			const tokenError = await tokenResponse.text()
			console.error('Discord token exchange failed:', tokenError)
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=token_exchange_failed`
			)
		}

		const { access_token } = await tokenResponse.json()

		if (!access_token) {
			console.error('No access token received from Discord')
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=no_access_token`
			)
		}

		// Get Discord user information
		const userResponse = await fetch('https://discord.com/api/users/@me', {
			headers: { Authorization: `Bearer ${access_token}` },
		})

		if (!userResponse.ok) {
			const userError = await userResponse.text()
			console.error('Failed to fetch Discord user info:', userError)
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=user_info_failed`
			)
		}

		const discordUser = await userResponse.json()

		// Get user email from multiple sources
		let userEmail: string | null = null

		// Method 1: Try state parameter first
		if (state) {
			try {
				userEmail = decodeURIComponent(state)
				console.log('Got email from state parameter:', userEmail)
			} catch (e) {
				console.error('Failed to decode state parameter:', e)
			}
		}

		// Method 2: Check if Discord user has verified email we can use
		if (!userEmail && discordUser.email && discordUser.verified) {
			// We need to find if this Discord email matches any user in our system
			console.log('Trying to match Discord email:', discordUser.email)
			try {
				const matchResponse = await fetch(`${requestUrl.origin}/api/discord/find-user-by-email`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: discordUser.email,
						discordId: discordUser.id
					}),
				})

				if (matchResponse.ok) {
					const matchData = await matchResponse.json()
					if (matchData.success && matchData.userEmail) {
						userEmail = matchData.userEmail
						console.log('Found matching user via Discord email:', userEmail)
					}
				}
			} catch (e) {
				console.error('Error matching Discord email:', e)
			}
		}

		// Method 3: Final fallback
		if (!userEmail) {
			console.error('CRITICAL: No user email available for Discord linking')
			console.error('Available Discord user data:', {
				id: discordUser.id,
				username: discordUser.username,
				email: discordUser.email,
				verified: discordUser.verified
			})
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=no_user_email&reason=cannot_identify_user&discord_email=${encodeURIComponent(discordUser.email || 'none')}`
			)
		}

		console.log('Retrieved user email for Discord linking:', userEmail)

		// Link Discord account in database
		const linkResponse = await fetch(`${requestUrl.origin}/api/discord/link`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				discordId: discordUser.id,
				discordUsername: discordUser.username,
				discordDiscriminator: discordUser.discriminator,
				userEmail: userEmail,
			}),
		})

		if (linkResponse.ok) {
			const linkData = await linkResponse.json()

			// Build redirect URL with success and potentially invite URL
			let redirectUrl = `${requestUrl.origin}/dashboard/settings?discord_success=true`

			// If we have an invite URL, pass it along
			if (linkData.inviteUrl) {
				redirectUrl += `&invite_url=${encodeURIComponent(linkData.inviteUrl)}`
			}

			return NextResponse.redirect(redirectUrl)
		} else {
			const linkError = await linkResponse.json()
			console.error('Failed to link Discord account:', linkError)

			// Pass the actual error message to the settings page
			const errorMessage = linkError?.error || linkError?.message || 'Unknown linking error'
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=link_failed&details=${encodeURIComponent(errorMessage)}`
			)
		}

	} catch (error) {
		console.error('Discord callback error:', error)
		return NextResponse.redirect(
			`${requestUrl.origin}/dashboard/settings?discord_error=unexpected_error`
		)
	}
}