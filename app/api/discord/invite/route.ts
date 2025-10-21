import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { userId, discordUsername } = await request.json()

		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required for Discord invite' },
				{ status: 400 }
			)
		}

		// Get Discord configuration
		const botToken = process.env.DISCORD_BOT_TOKEN
		const serverId = process.env.DISCORD_SERVER_ID

		if (!botToken || !serverId) {
			console.error('Discord bot configuration missing')
			return NextResponse.json(
				{ error: 'Discord bot is not configured properly' },
				{ status: 500 }
			)
		}

		// Use configured permissions or default to Administrator
		const permissions = process.env.DISCORD_BOT_PERMISSIONS || '8'

		// Generate Discord server invite URL
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${serverId}&permissions=${permissions}&scope=bot&response_type=code`

		console.log('Generated Discord invite URL for user:', { userId, discordUsername, permissions, inviteUrl })

		return NextResponse.json({
			success: true,
			inviteUrl,
			message: 'Click here to join the HPZ Discord server!'
		})

	} catch (error) {
		console.error('Discord invite error:', error)
		return NextResponse.json(
			{ error: 'Failed to generate Discord invite' },
			{ status: 500 }
		)
	}
}