import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"
import type { UgcContent } from "../types/database"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
	},
})

// Create user account for authenticated user
export const createUserAccount = async (authUserId: string, email: string) => {
	try {
		// First, get the approved TDR application
		const tdrApplication = await getUserProfile(email)
		if (!tdrApplication) {
			return {
				success: false,
				error: "No approved application found for this email",
			}
		}

		// Check if user account already exists
		const { data: existingAccount } = await supabase
			.from("user_accounts")
			.select("id")
			.eq("auth_user_id", authUserId)
			.single()

		if (existingAccount) {
			return { success: false, error: "User account already exists" }
		}

		// Create user account - cast to any to bypass TypeScript issues with new table
		const { data, error } = await (supabase as any)
			.from("user_accounts")
			.insert({
				auth_user_id: authUserId,
				tdr_application_id: tdrApplication.id,
				email: email,
				instagram_handle: tdrApplication.instagram_handle || null,
				full_name: tdrApplication.full_name || null,
			})
			.select()
			.single()

		if (error) {
			console.error("Error creating user account:", error)
			return { success: false, error: error.message }
		}

		return { success: true, user_account: data }
	} catch (error) {
		console.error("Unexpected error creating user account:", error)
		return { success: false, error: "Unexpected error occurred" }
	}
}

// Get site URL for auth redirects
export const getSiteUrl = () => siteUrl

// Get user account (combines auth user with TDR application data)
export const getUserAccount = async (authUserId: string) => {
	try {
		const { data, error } = await supabase
			.from("user_accounts")
			.select(
				`
				*,
				tdr_applications (*)
			`
			)
			.eq("auth_user_id", authUserId)
			.eq("is_active", true)
			.single()

		if (error) {
			// PGRST116 means no rows returned - this is normal, just no user account yet
			if (error.code === "PGRST116") {
				console.warn(
					"⚠️ No user_account record found for auth_user_id:",
					authUserId
				)
				console.info(
					"💡 FIX: Run the SQL in supabase/FIX_NOW.sql to create missing user_account records"
				)
				return null
			}

			// If table doesn't exist
			if (error.message.includes('relation "user_accounts" does not exist')) {
				console.error("❌ user_accounts table doesn't exist!")
				console.error(
					"💡 FIX: Run migrations in supabase/migrations/001_create_user_accounts.sql"
				)
				return null
			}

			// RLS policy errors
			if (
				error.code === "42501" ||
				error.message.includes("permission denied")
			) {
				console.error("❌ RLS policy blocking access:", {
					code: error.code,
					message: error.message,
				})

				return null
			}

			// Other errors
			console.error("❌ Unexpected error:", {
				code: error.code,
				message: error.message,
				details: error.details,
			})
			return null
		}

		return data
	} catch (error) {
		console.error("Unexpected error fetching user account:", error)
		return null
	}
}

export const getUserProfile = async (
	email: string
): Promise<Database["public"]["Tables"]["tdr_applications"]["Row"] | null> => {
	const { data, error } = await supabase
		.from("tdr_applications")
		.select("*")
		.eq("email", email)
		.eq("status", "approved")
		.single()

	if (error) {
		console.error("Error fetching user profile:", error)
		return null
	}

	return data
}

// Helper function to get user's UGC content
export const getUserContent = async (
	instagramHandle: string
): Promise<UgcContent[]> => {
	const { data, error } = await supabase
		.from("ugc_content")
		.select("*")
		.eq("author_username", instagramHandle)
		.order("created_at", { ascending: false })

	if (error) {
		console.error("Error fetching user content:", error)
		return []
	}

	return data as UgcContent[]
}

// Helper function to get user statistics
export const getUserStats = async (instagramHandle: string) => {
	const content = await getUserContent(instagramHandle)

	const totalSubmissions = content.length
	const approvedContent = content.filter(
		(c: UgcContent) => c.status === "approved_for_repost"
	).length
	const weeklyWins = content.filter(
		(c: UgcContent) => c.status === "weekly_winner"
	).length
	const totalLikes = content.reduce(
		(sum: number, c: UgcContent) => sum + (c.likes_count || 0),
		0
	)
	const totalComments = content.reduce(
		(sum: number, c: UgcContent) => sum + (c.comments_count || 0),
		0
	)
	const approvalRate =
		totalSubmissions > 0 ? (approvedContent / totalSubmissions) * 100 : 0

	return {
		totalSubmissions,
		approvedContent,
		weeklyWins,
		totalLikes,
		totalComments,
		approvalRate,
		engagementRate:
			totalSubmissions > 0
				? (totalLikes + totalComments) / totalSubmissions
				: 0,
	}
}

// Helper function to check submission rate limit
export const checkRateLimit = async (email: string) => {
	const { data, error } = await supabase
		.from("submission_rate_limit")
		.select("*")
		.eq("email", email)
		.single()

	if (error && error.code !== "PGRST116") {
		// PGRST116 = no rows returned
		console.error("Error checking rate limit:", error)
		return null
	}

	return data
}
