import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { code } = await request.json()

		if (!code) {
			return NextResponse.json(
				{ error: 'Authorization code is required' },
				{ status: 400 }
			)
		}

		// Exchange authorization code for access token
		const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: process.env.DISCORD_CLIENT_ID!,
				client_secret: process.env.DISCORD_CLIENT_SECRET!,
				grant_type: 'authorization_code',
				code,
				redirect_uri: process.env.DISCORD_REDIRECT_URI!,
			}),
		})

		if (!tokenResponse.ok) {
			const errorData = await tokenResponse.text()
			console.error('Discord token exchange error:', errorData)
			return NextResponse.json(
				{ error: 'Failed to exchange authorization code' },
				{ status: 400 }
			)
		}

		const tokenData = await tokenResponse.json()
		return NextResponse.json(tokenData)

	} catch (error) {
		console.error('Discord OAuth error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}