"use client"

import { useAuth } from "../hooks/useAuth"
import { LoginForm } from "./LoginForm"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
	children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user, userProfile, loading } = useAuth()

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
		return <LoginForm />
	}

	return <>{children}</>
}
