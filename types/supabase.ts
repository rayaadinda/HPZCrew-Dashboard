export type Database = {
	public: {
		Tables: {
			tdr_applications: {
				Row: {
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
				Insert: {
					id?: string
					created_at?: string
					full_name: string
					email: string
					phone?: string
					instagram_handle?: string
					tiktok_username?: string
					follower_count?: string
					content_focus?: string
					why_partner?: string
					owns_motorcycle?: string
					racing_experience?: string
					motorcycle_knowledge?: string
					portfolio_url?: string
					portfolio_filename?: string
					status?: "pending" | "approved" | "rejected"
					notes?: string
				}
				Update: {
					id?: string
					created_at?: string
					full_name?: string
					email?: string
					phone?: string
					instagram_handle?: string
					tiktok_username?: string
					follower_count?: string
					content_focus?: string
					why_partner?: string
					owns_motorcycle?: string
					racing_experience?: string
					motorcycle_knowledge?: string
					portfolio_url?: string
					portfolio_filename?: string
					status?: "pending" | "approved" | "rejected"
					notes?: string
				}
			}
			ugc_content: {
				Row: {
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
				Insert: {
					id?: string
					platform: "instagram" | "tiktok"
					author_username: string
					content_url: string
					media_type: "image" | "video"
					media_url: string
					thumbnail_url?: string
					caption?: string
					likes_count?: number
					comments_count?: number
					hashtags?: string
					status?: "new" | "approved_for_repost" | "weekly_winner" | "rejected"
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					platform?: "instagram" | "tiktok"
					author_username?: string
					content_url?: string
					media_type?: "image" | "video"
					media_url?: string
					thumbnail_url?: string
					caption?: string
					likes_count?: number
					comments_count?: number
					hashtags?: string
					status?: "new" | "approved_for_repost" | "weekly_winner" | "rejected"
					created_at?: string
					updated_at?: string
				}
			}
			collection_history: {
				Row: {
					id: string
					success: boolean
					posts_collected: number
					new_posts_added: number
					errors: string
					timestamp: string
					created_at: string
				}
				Insert: {
					id?: string
					success: boolean
					posts_collected?: number
					new_posts_added?: number
					errors?: string
					timestamp?: string
					created_at?: string
				}
				Update: {
					id?: string
					success?: boolean
					posts_collected?: number
					new_posts_added?: number
					errors?: string
					timestamp?: string
					created_at?: string
				}
			}
			submission_rate_limit: {
				Row: {
					id: number
					ip_address: string
					email: string
					submission_count: number
					first_submission: string
					last_submission: string
					is_blocked: boolean
					created_at: string
				}
				Insert: {
					id?: number
					ip_address: string
					email: string
					submission_count?: number
					first_submission?: string
					last_submission?: string
					is_blocked?: boolean
					created_at?: string
				}
				Update: {
					id?: number
					ip_address?: string
					email?: string
					submission_count?: number
					first_submission?: string
					last_submission?: string
					is_blocked?: boolean
					created_at?: string
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
