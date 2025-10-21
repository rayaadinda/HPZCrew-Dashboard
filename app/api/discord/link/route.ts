import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		console.log('=== Discord Link API Called ===')

		const { discordId, discordUsername, discordDiscriminator, userEmail } = await request.json()

		console.log('Received data:', { discordId, discordUsername, discordDiscriminator, userEmail })

		if (!discordId || !discordUsername || !userEmail) {
			console.error('Missing required fields:', { discordId: !!discordId, discordUsername: !!discordUsername, userEmail: !!userEmail })
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Find user account by email
		console.log('Looking for user with email:', userEmail)
		const { data: userAccount, error: userError } = await supabase
			.from('tdr_applications')
			.select('*')
			.eq('email', userEmail)
			.single()

		console.log('User lookup result:', { userAccount: !!userAccount, userError })

		if (userError || !userAccount) {
			console.error('User not found:', userError)
			return NextResponse.json(
				{ error: `User account not found: ${userError?.message || 'Unknown error'}` },
				{ status: 404 }
			)
		}

		console.log('Found user account, updating with Discord info...')

		// Update the user's profile with Discord information
		const { error: updateError, data: updateResult } = await (supabase as any)
			.from('tdr_applications')
			.update({
				discord_id: discordId,
				discord_username: discordUsername,
				discord_discriminator: discordDiscriminator,
				updated_at: new Date().toISOString()
			})
			.eq('email', userEmail)
			.select()

		console.log('Update result:', { updateError, updateResult })

		if (updateError) {
			console.error('Database update error details:', {
				error: updateError,
				details: updateError?.details,
				hint: updateError?.hint,
				code: updateError?.code
			})
			return NextResponse.json(
				{ error: `Database update failed: ${updateError?.message || 'Unknown database error'}` },
				{ status: 500 }
			)
		}

		console.log('Discord account linked successfully!')

		// Generate Discord server invite
		const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || process.env.DISCORD_CLIENT_ID
		const guildId = process.env.DISCORD_GUILD_ID

		if (clientId && guildId) {
			try {
				// Generate a one-click server invite URL
				// This uses Discord's instant invite system
				const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&guild_id=${guildId}&response_type=code&redirect_uri=${encodeURIComponent(`${requestUrl.origin}/api/discord/callback`)}&scope=bot%20applications.commands&integration_type=0&permissions=8`

				console.log('Generated Discord server invite for user:', {
					email: (userAccount as any).email,
					discordUser: `${discordUsername}#${discordDiscriminator}`,
					inviteUrl
				})

				return NextResponse.json({
					success: true,
					message: 'Discord account linked successfully!',
					user: {
						email: (userAccount as any).email,
						fullName: (userAccount as any).full_name,
						discordUsername: `${discordUsername}#${discordDiscriminator}`,
					},
					inviteUrl,
					inviteMessage: '🎉 Welcome! Click here to join the HPZ Discord server and access bot features!'
				})
			} catch (error) {
				console.error('Failed to generate Discord invite:', error)
				return NextResponse.json({
					success: true,
					message: 'Discord account linked successfully!',
					user: {
						email: (userAccount as any).email,
						fullName: (userAccount as any).full_name,
						discordUsername: `${discordUsername}#${discordDiscriminator}`,
					},
					error: 'Failed to generate server invite URL'
				})
			}
		}

		console.log('Discord account linked successfully!')

		return NextResponse.json({
			success: true,
			message: 'Discord account linked successfully!',
			user: {
				email: (userAccount as any).email,
				fullName: (userAccount as any).full_name,
				discordUsername: `${discordUsername}#${discordDiscriminator}`,
			},
			inviteUrl: null,
			inviteMessage: 'Discord bot configuration missing. Please contact admin.'
		})

	} catch (error) {
		console.error('Discord linking unexpected error:', error)
		return NextResponse.json(
			{ error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` },
			{ status: 500 }
		)
	}
}