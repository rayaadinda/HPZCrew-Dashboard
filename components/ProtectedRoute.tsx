"use client"

import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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
			<div className="min-h-screen flex items-center justify-center p-4 bg-background">
				<div className="w-full max-w-5xl space-y-6">
					{/* Header skeleton */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Skeleton className="h-10 w-10 rounded-lg" />
							<Skeleton className="h-6 w-32" />
						</div>
						<div className="flex items-center gap-3">
							<Skeleton className="h-8 w-8 rounded-full" />
							<Skeleton className="h-8 w-24" />
						</div>
					</div>

					{/* Main content skeleton */}
					<div className="grid gap-6 md:grid-cols-3">
						<Skeleton className="h-32 rounded-lg" />
						<Skeleton className="h-32 rounded-lg" />
						<Skeleton className="h-32 rounded-lg" />
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<Skeleton className="h-64 rounded-lg" />
						<Skeleton className="h-64 rounded-lg" />
					</div>

					<Skeleton className="h-96 rounded-lg" />
				</div>
			</div>
		)
	}

	if (!user || !userProfile) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4 bg-background">
				<div className="w-full max-w-5xl space-y-6">
					{/* Header skeleton */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Skeleton className="h-10 w-10 rounded-lg" />
							<Skeleton className="h-6 w-32" />
						</div>
						<div className="flex items-center gap-3">
							<Skeleton className="h-8 w-8 rounded-full" />
							<Skeleton className="h-8 w-24" />
						</div>
					</div>

					{/* Main content skeleton */}
					<div className="grid gap-6 md:grid-cols-3">
						<Skeleton className="h-32 rounded-lg" />
						<Skeleton className="h-32 rounded-lg" />
						<Skeleton className="h-32 rounded-lg" />
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<Skeleton className="h-64 rounded-lg" />
						<Skeleton className="h-64 rounded-lg" />
					</div>

					<Skeleton className="h-96 rounded-lg" />
				</div>
			</div>
		)
	}

	return <>{children}</>
}
