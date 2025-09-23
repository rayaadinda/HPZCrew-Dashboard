'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { supabase, getUserProfile } from "../lib/supabase"
import type { User } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"

type TdrApplication = Database["public"]["Tables"]["tdr_applications"]["Row"]

interface AuthContextType {
	user: User | null
	userProfile: TdrApplication | null
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
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Get initial session
		const getInitialSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setUser(session?.user ?? null)

			if (session?.user?.email) {
				const profile = await getUserProfile(session.user.email)
				setUserProfile(profile)
			}

			setLoading(false)
		}

		getInitialSession()

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			setUser(session?.user ?? null)

			if (session?.user?.email) {
				const profile = await getUserProfile(session.user.email)
				setUserProfile(profile)
			} else {
				setUserProfile(null)
			}

			setLoading(false)
		})

		return () => subscription.unsubscribe()
	}, [])

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

			// Check if user is approved before allowing signup
			const profile = await getUserProfile(email)
			if (!profile) {
				return {
					error:
						"Your application must be approved before you can create an account. Please contact admin.",
				}
			}

			const { error } = await supabase.auth.signUp({
				email,
				password,
			})

			if (error) {
				return { error: error.message }
			}

			return {}
		} catch (error) {
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
		loading,
		signIn,
		signOut,
		signUp,
		resetPassword,
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
