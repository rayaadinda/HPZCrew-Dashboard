"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import {
	supabase,
	getUserProfile,
	getUserAccount,
	getSiteUrl,
} from "../lib/supabase"
import type { User } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"

type TdrApplication = Database["public"]["Tables"]["tdr_applications"]["Row"]
type UserAccount = Database["public"]["Tables"]["user_accounts"]["Row"]

interface AuthContextType {
	user: User | null
	userProfile: TdrApplication | null
	userAccount: UserAccount | null
	loading: boolean
	signIn: (email: string, password: string) => Promise<{ error?: string }>
	signOut: () => Promise<void>
	signUp: (email: string, password: string) => Promise<{ error?: string }>
	resetPassword: (email: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [userProfile, setUserProfile] = useState<TdrApplication | null>(null)
	const [userAccount, setUserAccount] = useState<UserAccount | null>(null)
	const [loading, setLoading] = useState(true)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		// Only run auth logic after component is mounted
		if (!mounted) return

		// Get initial session
		const getInitialSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setUser(session?.user ?? null)

			if (session?.user) {
				// Get TDR profile for now (user_accounts table may not exist yet)
				if (session.user.email) {
					const profile = await getUserProfile(session.user.email)
					setUserProfile(profile)
				}

				// Try to get user account, but don't fail if table doesn't exist
				try {
					const account = await getUserAccount(session.user.id)
					setUserAccount(account)
				} catch (error) {
					console.log("User accounts table not ready yet:", error)
					setUserAccount(null)
				}
			}
			setLoading(false)
		}

		getInitialSession()

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			setUser(session?.user ?? null)

			if (session?.user) {
				// Get TDR profile
				if (session.user.email) {
					const profile = await getUserProfile(session.user.email)
					setUserProfile(profile)
				}

				// Try to get user account, but don't fail if table doesn't exist
				try {
					const account = await getUserAccount(session.user.id)
					setUserAccount(account)
				} catch (error) {
					// Silently fail - using tdr_applications as fallback
					setUserAccount(null)
				}
			} else {
				setUserProfile(null)
				setUserAccount(null)
			}

			setLoading(false)
		})

		return () => subscription.unsubscribe()
	}, [mounted])

	const signIn = async (email: string, password: string) => {
		try {
			setLoading(true)

			// First check if user is approved
			const profile = await getUserProfile(email)
			if (!profile) {
				return {
					error:
						"Your application is not approved yet or email not found. Please contact admin.",
				}
			}

			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error) {
				// If user doesn't exist in auth but is approved, suggest sign up
				if (error.message.includes("Invalid login credentials")) {
					return {
						error:
							"Account not found. If you're approved, please create your account first by clicking 'Create account' below.",
					}
				}
				return { error: error.message }
			}

			return {}
		} catch (error) {
			return { error: "An unexpected error occurred" }
		} finally {
			setLoading(false)
		}
	}

	const signUp = async (email: string, password: string) => {
		try {
			setLoading(true)
			console.log("Starting signup for:", email)

			// Check if user is approved before allowing signup
			const profile = await getUserProfile(email)
			console.log("User profile found:", profile)

			if (!profile) {
				console.log("No approved profile found for:", email)
				return {
					error:
						"Your application must be approved before you can create an account. Please contact admin.",
				}
			}

			console.log("Attempting Supabase signup...")
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
				},
			})

			console.log("Supabase signup response:", { data, error })

			if (error) {
				console.error("Signup error:", error)
				return { error: error.message }
			}

			// If user was created successfully but needs email confirmation
			if (data.user && !data.session) {
				console.log("User created, email confirmation required")
				return {
					error:
						"Please check your email and click the confirmation link to complete your account setup.",
				}
			}

			// If user was created and session exists (email confirmation disabled)
			if (data.user && data.session) {
				console.log("User created with immediate session")
				return {}
			}

			return {}
		} catch (error) {
			console.error("Unexpected signup error:", error)
			return { error: "An unexpected error occurred" }
		} finally {
			setLoading(false)
		}
	}

	const signOut = async () => {
		setLoading(true)
		await supabase.auth.signOut()
		setUserProfile(null)
		setLoading(false)
	}

	const resetPassword = async (email: string) => {
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			})

			if (error) {
				return { error: error.message }
			}

			return {}
		} catch (error) {
			return { error: "An unexpected error occurred" }
		}
	}

	const value = {
		user,
		userProfile,
		userAccount,
		loading: loading || !mounted,
		signIn,
		signOut,
		signUp,
		resetPassword,
	}

	// Show loading state until component is mounted to prevent hydration mismatch
	if (!mounted) {
		return (
			<AuthContext.Provider value={value}>
				<div className="flex items-center justify-center min-h-screen">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
				</div>
			</AuthContext.Provider>
		)
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
