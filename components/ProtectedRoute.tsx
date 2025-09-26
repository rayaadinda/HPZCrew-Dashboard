"use client"

import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
	children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user, userProfile, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && (!user || !userProfile)) {
			router.push("/auth")
		}
	}, [user, userProfile, loading, router])

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		)
	}

	if (!user || !userProfile) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
					<p className="text-gray-600">Redirecting...</p>
				</div>
			</div>
		)
	}

	return <>{children}</>
}
