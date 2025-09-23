"use client"

import { useAuth } from "../hooks/useAuth"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
	User,
	Mail,
	Phone,
	Instagram,
	Calendar,
	Bike,
	Trophy,
	ExternalLink,
	LogOut,
} from "lucide-react"

export function UserProfile() {
	const { userProfile, signOut } = useAuth()

	if (!userProfile) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center py-8">
					<p className="text-gray-500">Loading profile...</p>
				</CardContent>
			</Card>
		)
	}

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2)
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	return (
		<div className="space-y-6">
			{/* Profile Header */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Avatar className="h-16 w-16">
								<AvatarImage
									src="/placeholder-avatar.jpg"
									alt={userProfile.full_name}
								/>
								<AvatarFallback className="text-lg font-semibold">
									{getInitials(userProfile.full_name)}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-2xl">
									{userProfile.full_name}
								</CardTitle>
								<CardDescription className="flex items-center gap-2 mt-1">
									<Mail className="h-4 w-4" />
									{userProfile.email}
								</CardDescription>
								<div className="flex items-center gap-2 mt-2">
									<Badge
										variant="secondary"
										className="bg-green-100 text-green-800"
									>
										<Trophy className="h-3 w-3 mr-1" />
										Approved Member
									</Badge>
								</div>
							</div>
						</div>
						<Button variant="outline" onClick={signOut}>
							<LogOut className="h-4 w-4 mr-2" />
							Sign Out
						</Button>
					</div>
				</CardHeader>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Contact Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Contact Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-gray-500" />
								<span className="text-sm text-gray-600">Email</span>
							</div>
							<span className="font-medium">{userProfile.email}</span>
						</div>

						{userProfile.phone && (
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-gray-500" />
									<span className="text-sm text-gray-600">Phone</span>
								</div>
								<span className="font-medium">{userProfile.phone}</span>
							</div>
						)}

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-gray-500" />
								<span className="text-sm text-gray-600">Member Since</span>
							</div>
							<span className="font-medium">
								{formatDate(userProfile.created_at)}
							</span>
						</div>
					</CardContent>
				</Card>

				{/* Social Media */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Instagram className="h-5 w-5" />
							Social Media
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{userProfile.instagram_handle && (
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Instagram className="h-4 w-4 text-gray-500" />
									<span className="text-sm text-gray-600">Instagram</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-medium">
										@{userProfile.instagram_handle}
									</span>
									<Button
										variant="ghost"
										size="sm"
										className="p-1 h-auto"
										onClick={() =>
											window.open(
												`https://instagram.com/${userProfile.instagram_handle}`,
												"_blank"
											)
										}
									>
										<ExternalLink className="h-3 w-3" />
									</Button>
								</div>
							</div>
						)}

						{userProfile.tiktok_username && (
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-600">TikTok</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-medium">
										@{userProfile.tiktok_username}
									</span>
									<Button
										variant="ghost"
										size="sm"
										className="p-1 h-auto"
										onClick={() =>
											window.open(
												`https://tiktok.com/@${userProfile.tiktok_username}`,
												"_blank"
											)
										}
									>
										<ExternalLink className="h-3 w-3" />
									</Button>
								</div>
							</div>
						)}

						{userProfile.follower_count && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Follower Count</span>
								<span className="font-medium">
									{userProfile.follower_count}
								</span>
							</div>
						)}
					</CardContent>
				</Card>

				{/* HPZ Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Bike className="h-5 w-5" />
							HPZ Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{userProfile.owns_motorcycle && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Owns Motorcycle</span>
								<Badge
									variant={
										userProfile.owns_motorcycle === "yes"
											? "default"
											: "secondary"
									}
								>
									{userProfile.owns_motorcycle}
								</Badge>
							</div>
						)}

						{userProfile.racing_experience && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Racing Experience</span>
								<span className="font-medium text-right max-w-[200px] truncate">
									{userProfile.racing_experience}
								</span>
							</div>
						)}

						{userProfile.motorcycle_knowledge && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">
									Motorcycle Knowledge
								</span>
								<span className="font-medium text-right max-w-[200px] truncate">
									{userProfile.motorcycle_knowledge}
								</span>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Content Focus */}
				<Card>
					<CardHeader>
						<CardTitle>Content Focus & Goals</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{userProfile.content_focus && (
							<div>
								<span className="text-sm text-gray-600 block mb-2">
									Content Focus
								</span>
								<p className="text-sm">{userProfile.content_focus}</p>
							</div>
						)}

						{userProfile.why_partner && (
							<div>
								<Separator className="my-4" />
								<span className="text-sm text-gray-600 block mb-2">
									Why Partner with HPZ
								</span>
								<p className="text-sm">{userProfile.why_partner}</p>
							</div>
						)}

						{userProfile.portfolio_url && (
							<div>
								<Separator className="my-4" />
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">Portfolio</span>
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											window.open(userProfile.portfolio_url, "_blank")
										}
									>
										<ExternalLink className="h-4 w-4 mr-2" />
										View Portfolio
									</Button>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
