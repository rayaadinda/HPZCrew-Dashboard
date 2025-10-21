import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		console.log('=== Generate Discord Invite API Called ===')

		const { userId, discordUsername } = await request.json()

		console.log('Received data:', { userId, discordUsername })

		// Get Discord configuration
		const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || process.env.DISCORD_CLIENT_ID
		const guildId = process.env.DISCORD_GUILD_ID

		if (!clientId || !guildId) {
			console.error('Missing Discord configuration:', { clientId: !!clientId, guildId: !!guildId })
			return NextResponse.json(
				{ error: 'Discord configuration missing' },
				{ status: 500 }
			)
		}

		// Generate a Discord server invite URL
		// Using OAuth2 flow with guild join permission
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hpz-crew-dashboard.vercel.app'
		const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&guild_id=${guildId}&response_type=code&redirect_uri=${encodeURIComponent(`${baseUrl}/api/discord/callback`)}&scope=bot%20applications.commands%20guilds.join&integration_type=0&permissions=8`

		console.log('Generated Discord invite:', { inviteUrl, userId, discordUsername })

		return NextResponse.json({
			success: true,
			inviteUrl,
			message: 'Discord server invite generated successfully',
			details: {
				userId,
				discordUsername,
				guildId,
				clientId
			}
		})

	} catch (error) {
		console.error('Generate Discord invite unexpected error:', error)
		return NextResponse.json(
			{
				success: false,
				error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
			},
			{ status: 500 }
		)
	}
}