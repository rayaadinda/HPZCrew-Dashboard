import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { discordId, discordUsername, discordDiscriminator, userEmail } = await request.json()

		if (!discordId || !discordUsername || !userEmail) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Find user account by email
		const { data: userAccount, error: userError } = await supabase
			.from('tdr_applications')
			.select('*')
			.eq('email', userEmail)
			.single()

		if (userError || !userAccount) {
			return NextResponse.json(
				{ error: 'User account not found' },
				{ status: 404 }
			)
		}

		// Update the user's profile with Discord information
		const { error: updateError } = await (supabase as any)
			.from('tdr_applications')
			.update({
				discord_id: discordId,
				discord_username: discordUsername,
				discord_discriminator: discordDiscriminator,
				updated_at: new Date().toISOString()
			})
			.eq('email', userEmail)

		if (updateError) {
			console.error('Database update error:', updateError)
			return NextResponse.json(
				{ error: 'Failed to link Discord account' },
				{ status: 500 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Discord account linked successfully!',
			user: {
				email: (userAccount as any).email,
				fullName: (userAccount as any).full_name,
				discordUsername: `${discordUsername}#${discordDiscriminator}`,
			}
		})

	} catch (error) {
		console.error('Discord linking error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}