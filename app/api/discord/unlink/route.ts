import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { userEmail } = await request.json()

		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			)
		}

		// Remove Discord information from user's profile
		const { error: updateError } = await (supabase as any)
			.from('tdr_applications')
			.update({
				discord_id: null,
				discord_username: null,
				discord_discriminator: null,
				updated_at: new Date().toISOString()
			})
			.eq('email', userEmail)

		if (updateError) {
			console.error('Database update error:', updateError)
			return NextResponse.json(
				{ error: 'Failed to unlink Discord account' },
				{ status: 500 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Discord account unlinked successfully!'
		})

	} catch (error) {
		console.error('Discord unlinking error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}