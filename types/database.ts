// Database Types based on Supabase schema
export interface TdrApplication {
	id: string
	created_at: string
	full_name: string
	email: string
	phone: string
	instagram_handle: string
	tiktok_username: string
	follower_count: string
	content_focus: string
	why_partner: string
	owns_motorcycle: string
	racing_experience: string
	motorcycle_knowledge: string
	portfolio_url: string
	portfolio_filename: string
	status: "pending" | "approved" | "rejected"
	notes: string
}

export interface UgcContent {
	id: string
	platform: "instagram" | "tiktok"
	author_username: string
	content_url: string
	media_type: "image" | "video"
	media_url: string
	thumbnail_url: string
	caption: string
	likes_count: number
	comments_count: number
	hashtags: string
	status: "new" | "approved_for_repost" | "weekly_winner" | "rejected"
	created_at: string
	updated_at: string
}

export interface CollectionHistory {
	id: string
	success: boolean
	posts_collected: number
	new_posts_added: number
	errors: string
	timestamp: string
	created_at: string
}

export interface SubmissionRateLimit {
	id: number
	ip_address: string
	email: string
	submission_count: number
	first_submission: string
	last_submission: string
	is_blocked: boolean
	created_at: string
}

// User Dashboard specific types
export interface UserStats {
	totalSubmissions: number
	approvedContent: number
	totalLikes: number
	totalComments: number
	weeklyWins: number
	approvalRate: number
	engagementRate: number
	points: number
	rank: number
}

export interface UserPoints {
	submission: number
	approval: number
	engagement: number
	weeklyWin: number
	total: number
}

export interface Achievement {
	id: string
	name: string
	description: string
	icon: string
	category: "content" | "engagement" | "consistency" | "milestone"
	requirement: number
	points: number
	unlocked: boolean
	unlockedAt?: string
}

export interface LeaderboardEntry {
	userId: string
	username: string
	instagramHandle: string
	points: number
	rank: number
	totalSubmissions: number
	approvalRate: number
	avatar?: string
}
