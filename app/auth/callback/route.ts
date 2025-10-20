import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get("code")
	const next = requestUrl.searchParams.get("next") ?? "/dashboard"

	if (code) {
		const supabase = createClient(supabaseUrl, supabaseAnonKey)

		try {
			const { error } = await supabase.auth.exchangeCodeForSession(code)

			if (error) {
				console.error("Error exchanging code for session:", error)
				return NextResponse.redirect(
					`${
						requestUrl.origin
					}/auth?error=auth_callback_error&message=${encodeURIComponent(
						error.message
					)}`
				)
			}

			return NextResponse.redirect(`${requestUrl.origin}${next}`)
		} catch (error) {
			console.error("Unexpected error in auth callback:", error)
			return NextResponse.redirect(
				`${requestUrl.origin}/auth?error=unexpected_error`
			)
		}
	}

	return NextResponse.redirect(
		`${requestUrl.origin}/auth?error=no_code_provided`
	)
}
