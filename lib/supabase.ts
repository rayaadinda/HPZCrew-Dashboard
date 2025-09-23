import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"
import type { UgcContent } from "../types/database"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
	},
})

export const getUserProfile = async (email: string) => {
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
