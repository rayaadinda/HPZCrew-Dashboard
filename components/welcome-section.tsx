"use client"

import { useAuth } from "@/hooks/useAuth"

export function WelcomeSection() {
	const { userProfile, loading } = useAuth()

	if (loading) {
		return (
			<div className="px-4 lg:px-6">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-48"></div>
				</div>
			</div>
		)
	}

	const firstName =
		userProfile?.full_name?.split(" ")[0] ||
		userProfile?.instagram_handle ||
		"Crew Member"
	const currentTime = new Date().getHours()
	let greeting = "Good evening"

	if (currentTime < 12) {
		greeting = "Good morning"
	} else if (currentTime < 17) {
		greeting = "Good afternoon"
	}

	return (
		<div className="px-4 lg:px-6">
			<div className="bg-white p-6 text-black">
				<h1 className="text-3xl font-bold mb-2">
					{greeting}, {firstName}! 👋
				</h1>
				<p className="text-black text-lg">
					Welcome back to your HPZ Crew Dashboard
				</p>
			</div>
		</div>
	)
}
