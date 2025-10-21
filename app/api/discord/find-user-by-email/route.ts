import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Define the user account type with Discord fields
interface UserAccountWithDiscord {
	id: string;
	email: string;
	full_name?: string;
	discord_id?: string;
	discord_username?: string;
	discord_discriminator?: string;
	discord_linked_at?: string;
	// Add other fields as needed
}

export async function POST(request: NextRequest) {
	try {
		console.log('=== Find User By Email API Called ===')

		const { email, discordId } = await request.json()

		console.log('Received data:', { email, discordId })

		if (!email) {
			console.error('Email is required')
			return NextResponse.json(
				{ error: 'Email is required' },
				{ status: 400 }
			)
		}

		// Find user account by email
		console.log('Looking for user with email:', email)
		const { data: userAccount, error: userError } = await supabase
			.from('tdr_applications')
			.select('*')
			.eq('email', email)
			.single()

		console.log('User lookup result:', { userAccount: !!userAccount, userError })

		if (userError || !userAccount) {
			console.error('User not found:', userError)
			return NextResponse.json(
				{
					success: false,
					error: `User account not found: ${userError?.message || 'Unknown error'}`
				},
				{ status: 404 }
			)
		}

		// Type assertion to fix TypeScript error
		const userAccountTyped = userAccount as UserAccountWithDiscord

		// Check if user is already linked to Discord
		if (userAccountTyped.discord_id) {
			console.log('User already has Discord linked:', {
				existingDiscordId: userAccountTyped.discord_id,
				newDiscordId: discordId
			})

			if (userAccountTyped.discord_id !== discordId) {
				return NextResponse.json(
					{
						success: false,
						error: 'This email is already linked to a different Discord account',
						existingDiscordUsername: userAccountTyped.discord_username
					},
					{ status: 409 }
				)
			} else {
				return NextResponse.json(
					{
						success: true,
						message: 'Discord account already linked',
						userEmail: userAccountTyped.email,
						discordUsername: userAccountTyped.discord_username,
						alreadyLinked: true
					}
				)
			}
		}

		console.log('Found eligible user for Discord linking')

		return NextResponse.json({
			success: true,
			message: 'User found and eligible for Discord linking',
			userEmail: userAccountTyped.email,
			fullName: userAccountTyped.full_name,
			alreadyLinked: false
		})

	} catch (error) {
		console.error('Find user by email unexpected error:', error)
		return NextResponse.json(
			{
				success: false,
				error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
			},
			{ status: 500 }
		)
	}
}