import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')
	const error = requestUrl.searchParams.get('error')
	const state = requestUrl.searchParams.get('state')

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

		// Get user email from state (stored during OAuth initiation)
		const userEmail = state ? decodeURIComponent(state) : null
		if (!userEmail) {
			console.error('No user email found in state')
			return NextResponse.redirect(
				`${requestUrl.origin}/dashboard/settings?discord_error=no_user_email`
			)
		}

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