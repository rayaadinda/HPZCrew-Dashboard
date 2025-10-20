"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function HomePage() {
	const router = useRouter()
	const { user, loading } = useAuth()

	useEffect(() => {
		if (!loading) {
			if (user) {
				// User is authenticated, redirect to dashboard
				router.push("/dashboard")
			} else {
				// User is not authenticated, redirect to auth
				router.push("/auth")
			}
		}
	}, [user, loading, router])

	// Show loading state while checking authentication
	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<p className="text-muted-foreground">Redirecting...</p>
			</div>
		</div>
	)
}