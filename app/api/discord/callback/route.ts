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
		return NextResponse.redirect(
			`${requestUrl.origin}/dashboard/settings?discord_error=${encodeURIComponent(error)}`
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

		// Method 2: Try to get from cookie/session if state fails
		if (!userEmail) {
			// This won't work in API route, but let's log it
			console.error('No user email found in state parameter')
		}

		// Method 3: Create a simple fallback mechanism
		if (!userEmail) {
			console.error('CRITICAL: No user email available for Discord linking')
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=no_user_email&reason=state_missing`
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
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_success=true`
			)
		} else {
			const linkError = await linkResponse.json()
			console.error('Failed to link Discord account:', linkError)
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=link_failed`
			)
		}

	} catch (error) {
		console.error('Discord callback error:', error)
		return NextResponse.redirect(
			`${requestUrl.origin}/dashboard/settings?discord_error=unexpected_error`
		)
	}
}