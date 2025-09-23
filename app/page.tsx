"use client"

import { ProtectedRoute } from "../components/ProtectedRoute"
import { UserProfile } from "../components/UserProfile"

export default function Home() {
	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Welcome to HPZ Crew Dashboard
						</h1>
						<p className="text-gray-600">
							Your personalized dashboard for tracking performance,
							achievements, and crew activities.
						</p>
					</div>

					<UserProfile />
				</div>
			</div>
		</ProtectedRoute>
	)
}
