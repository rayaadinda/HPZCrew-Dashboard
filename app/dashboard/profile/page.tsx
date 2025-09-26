"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import { getUserContent, getUserStats } from "@/lib/supabase"
import type { UgcContent } from "@/types/database"
import {
	IconEdit,
	IconTrophy,
	IconPhoto,
	IconVideo,
	IconHeart,
	IconMessageCircle,
	IconCalendar,
	IconMail,
	IconPhone,
	IconBrandInstagram,
	IconBrandTiktok,
	IconCheck,
	IconX,
	IconTrendingUp,
	IconEye,
	IconLoader,
} from "@tabler/icons-react"

interface UserStats {
	totalSubmissions: number
	approvedContent: number
	weeklyWins: number
	totalLikes: number
	totalComments: number
	approvalRate: number
	engagementRate: number
}

const getBadgeColor = (badge: string) => {
	switch (badge) {
		case "top-performer":
			return "bg-yellow-100 text-yellow-800 border-yellow-200"
		case "consistent-creator":
			return "bg-blue-100 text-blue-800 border-blue-200"
		case "trending-master":
			return "bg-purple-100 text-purple-800 border-purple-200"
		default:
			return "bg-gray-100 text-gray-800 border-gray-200"
	}
}

const getBadgeLabel = (badge: string) => {
	switch (badge) {
		case "top-performer":
			return "Top Performer"
		case "consistent-creator":
			return "Consistent Creator"
		case "trending-master":
			return "Trending Master"
		default:
			return badge
	}
}

const getContentIcon = (type: string) => {
	switch (type) {
		case "photo":
		case "image":
			return <IconPhoto className="h-4 w-4" />
		case "video":
			return <IconVideo className="h-4 w-4" />
		default:
			return <IconPhoto className="h-4 w-4" />
	}
}

const getStatusColor = (status: string) => {
	switch (status) {
		case "approved_for_repost":
			return "bg-green-100 text-green-800"
		case "weekly_winner":
			return "bg-purple-100 text-purple-800"
		case "pending":
			return "bg-yellow-100 text-yellow-800"
		case "rejected":
			return "bg-red-100 text-red-800"
		default:
			return "bg-gray-100 text-gray-800"
	}
}

const getStatusLabel = (status: string) => {
	switch (status) {
		case "approved_for_repost":
			return "Approved"
		case "weekly_winner":
			return "Weekly Winner"
		case "pending":
			return "Pending"
		case "rejected":
			return "Rejected"
		default:
			return status
	}
}

const formatNumber = (num: number) => {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + "M"
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + "K"
	}
	return num.toString()
}

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

export default function ProfilePage() {
	const { userProfile, loading: authLoading } = useAuth()
	const [userContent, setUserContent] = useState<UgcContent[]>([])
	const [userStats, setUserStats] = useState<UserStats | null>(null)
	const [loading, setLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [editData, setEditData] = useState({
		full_name: "",
		instagram_handle: "",
		tiktok_username: "",
		phone: "",
	})

	useEffect(() => {
		const loadUserData = async () => {
			if (!userProfile?.instagram_handle) return

			setLoading(true)
			try {
				const [content, stats] = await Promise.all([
					getUserContent(userProfile.instagram_handle),
					getUserStats(userProfile.instagram_handle),
				])

				setUserContent(content)
				setUserStats(stats)
				setEditData({
					full_name: userProfile.full_name || "",
					instagram_handle: userProfile.instagram_handle || "",
					tiktok_username: userProfile.tiktok_username || "",
					phone: userProfile.phone || "",
				})
			} catch (error) {
				console.error("Error loading user data:", error)
			} finally {
				setLoading(false)
			}
		}

		loadUserData()
	}, [userProfile])

	const handleSave = () => {
		// Here you would save the data to your backend
		console.log("Saving profile data:", editData)
		setIsEditing(false)
	}

	const handleCancel = () => {
		setEditData({
			full_name: userProfile?.full_name || "",
			instagram_handle: userProfile?.instagram_handle || "",
			tiktok_username: userProfile?.tiktok_username || "",
			phone: userProfile?.phone || "",
		})
		setIsEditing(false)
	}

	if (authLoading || !userProfile) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<IconLoader className="h-8 w-8 animate-spin" />
			</div>
		)
	}

	// Generate user badges based on stats
	const userBadges = []
	if (userStats) {
		if (userStats.approvalRate >= 80) userBadges.push("top-performer")
		if (userStats.totalSubmissions >= 10) userBadges.push("consistent-creator")
		if (userStats.weeklyWins > 0) userBadges.push("trending-master")
	}

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* Profile Header */}
					<div className="px-4 lg:px-6">
						<div className="relative">
							{/* Banner */}
							<div className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />

							{/* Profile Info */}
							<div className="relative px-4 sm:px-6">
								<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 sm:-mt-20">
									<div className="flex flex-col sm:flex-row sm:items-end gap-4">
										<Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
											<AvatarImage src="" alt={userProfile.full_name} />
											<AvatarFallback className="text-lg sm:text-2xl font-bold">
												{userProfile.full_name
													?.split(" ")
													.map((n) => n[0])
													.join("") || "U"}
											</AvatarFallback>
										</Avatar>

										<div className="flex-1 space-y-2">
											<div>
												<h1 className="text-2xl sm:text-3xl font-bold">
													{userProfile.full_name}
												</h1>
												<p className="text-muted-foreground">
													@{userProfile.instagram_handle}
												</p>
											</div>
											<div className="flex flex-wrap gap-2">
												{userBadges.map((badge) => (
													<Badge key={badge} className={getBadgeColor(badge)}>
														{getBadgeLabel(badge)}
													</Badge>
												))}
											</div>
										</div>
									</div>

									<Button
										onClick={() => setIsEditing(!isEditing)}
										variant={isEditing ? "secondary" : "default"}
										className="self-start sm:self-auto"
									>
										<IconEdit className="h-4 w-4 mr-2" />
										{isEditing ? "Cancel Edit" : "Edit Profile"}
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Stats Overview */}
					{userStats && (
						<div className="px-4 lg:px-6">
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
								<Card>
									<CardContent className="p-4">
										<div className="text-center">
											<p className="text-2xl sm:text-3xl font-bold text-primary">
												{userStats.totalSubmissions}
											</p>
											<p className="text-sm text-muted-foreground">
												Total Content
											</p>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-4">
										<div className="text-center">
											<p className="text-2xl sm:text-3xl font-bold text-chart-1">
												{formatNumber(userStats.totalLikes)}
											</p>
											<p className="text-sm text-muted-foreground">
												Total Likes
											</p>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-4">
										<div className="text-center">
											<p className="text-2xl sm:text-3xl font-bold text-chart-2">
												{Math.round(userStats.approvalRate)}%
											</p>
											<p className="text-sm text-muted-foreground">
												Approval Rate
											</p>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-4">
										<div className="text-center">
											<p className="text-2xl sm:text-3xl font-bold text-chart-3">
												{userStats.weeklyWins}
											</p>
											<p className="text-sm text-muted-foreground">
												Weekly Wins
											</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					)}

					{/* Main Content Tabs */}
					<div className="px-4 lg:px-6">
						<Tabs defaultValue="overview" className="space-y-4">
							<TabsList className="grid w-full grid-cols-3 gap-1">
								<TabsTrigger value="overview" className="text-xs sm:text-sm">
									Overview
								</TabsTrigger>
								<TabsTrigger value="content" className="text-xs sm:text-sm">
									Content
								</TabsTrigger>
								<TabsTrigger value="edit" className="text-xs sm:text-sm">
									Edit
								</TabsTrigger>
							</TabsList>

							{/* Overview Tab */}
							<TabsContent value="overview" className="space-y-4">
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
									{/* About */}
									<Card className="lg:col-span-2">
										<CardHeader>
											<CardTitle>About</CardTitle>
										</CardHeader>
										<CardContent className="space-y-4">
											<p className="text-muted-foreground">
												{userProfile.why_partner ||
													"HPZ crew member passionate about creating amazing content."}
											</p>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
												<div className="flex items-center gap-2">
													<IconCalendar className="h-4 w-4 text-muted-foreground" />
													<span>
														Joined {formatDate(userProfile.created_at)}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<IconMail className="h-4 w-4 text-muted-foreground" />
													<span>{userProfile.email}</span>
												</div>
												{userProfile.phone && (
													<div className="flex items-center gap-2">
														<IconPhone className="h-4 w-4 text-muted-foreground" />
														<span>{userProfile.phone}</span>
													</div>
												)}
												{userProfile.content_focus && (
													<div className="flex items-center gap-2">
														<IconTrendingUp className="h-4 w-4 text-muted-foreground" />
														<span>{userProfile.content_focus}</span>
													</div>
												)}
											</div>
										</CardContent>
									</Card>

									{/* Social Media & Engagement */}
									<div className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Social Media</CardTitle>
											</CardHeader>
											<CardContent className="space-y-3">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<IconBrandInstagram className="h-4 w-4 text-pink-500" />
														<span className="text-sm">Instagram</span>
													</div>
													<span className="text-sm font-medium">
														@{userProfile.instagram_handle}
													</span>
												</div>
												{userProfile.tiktok_username && (
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<IconBrandTiktok className="h-4 w-4 text-black" />
															<span className="text-sm">TikTok</span>
														</div>
														<span className="text-sm font-medium">
															@{userProfile.tiktok_username}
														</span>
													</div>
												)}
												{userProfile.follower_count && (
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<IconEye className="h-4 w-4 text-blue-500" />
															<span className="text-sm">Followers</span>
														</div>
														<span className="text-sm font-medium">
															{userProfile.follower_count}
														</span>
													</div>
												)}
											</CardContent>
										</Card>

										{userStats && (
											<Card>
												<CardHeader>
													<CardTitle>Engagement Stats</CardTitle>
												</CardHeader>
												<CardContent className="space-y-3">
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<IconHeart className="h-4 w-4 text-red-500" />
															<span className="text-sm">Total Likes</span>
														</div>
														<span className="text-sm font-medium">
															{formatNumber(userStats.totalLikes)}
														</span>
													</div>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<IconMessageCircle className="h-4 w-4 text-blue-500" />
															<span className="text-sm">Total Comments</span>
														</div>
														<span className="text-sm font-medium">
															{formatNumber(userStats.totalComments)}
														</span>
													</div>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<IconTrophy className="h-4 w-4 text-yellow-500" />
															<span className="text-sm">Approved Content</span>
														</div>
														<span className="text-sm font-medium">
															{userStats.approvedContent}
														</span>
													</div>
												</CardContent>
											</Card>
										)}
									</div>
								</div>
							</TabsContent>

							{/* Content Tab */}
							<TabsContent value="content" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Your Content</CardTitle>
										<CardDescription>
											Your submitted content and performance
										</CardDescription>
									</CardHeader>
									<CardContent>
										{loading ? (
											<div className="flex items-center justify-center py-8">
												<IconLoader className="h-6 w-6 animate-spin" />
											</div>
										) : userContent.length > 0 ? (
											<div className="space-y-4">
												{userContent.slice(0, 10).map((content) => (
													<div
														key={content.id}
														className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border"
													>
														<div className="flex items-center gap-3 flex-1">
															<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
																{getContentIcon(content.media_type)}
															</div>
															<div className="flex-1 min-w-0">
																<h4 className="font-medium truncate">
																	{content.caption?.slice(0, 50) || "Untitled"}
																</h4>
																<p className="text-sm text-muted-foreground">
																	{formatDate(content.created_at)}
																</p>
															</div>
														</div>

														<div className="flex items-center gap-4 text-sm">
															<div className="text-center">
																<p className="font-medium">
																	{formatNumber(content.likes_count || 0)}
																</p>
																<p className="text-muted-foreground text-xs">
																	Likes
																</p>
															</div>
															<div className="text-center">
																<p className="font-medium">
																	{formatNumber(content.comments_count || 0)}
																</p>
																<p className="text-muted-foreground text-xs">
																	Comments
																</p>
															</div>
															<Badge className={getStatusColor(content.status)}>
																{getStatusLabel(content.status)}
															</Badge>
														</div>
													</div>
												))}
											</div>
										) : (
											<div className="text-center py-8">
												<IconPhoto className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
												<p className="text-muted-foreground">
													No content submitted yet
												</p>
											</div>
										)}
									</CardContent>
								</Card>
							</TabsContent>

							{/* Edit Tab */}
							<TabsContent value="edit" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Edit Profile</CardTitle>
										<CardDescription>
											Update your profile information
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="name">Full Name</Label>
												<Input
													id="name"
													value={editData.full_name}
													onChange={(e) =>
														setEditData({
															...editData,
															full_name: e.target.value,
														})
													}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="phone">Phone Number</Label>
												<Input
													id="phone"
													value={editData.phone}
													onChange={(e) =>
														setEditData({ ...editData, phone: e.target.value })
													}
												/>
											</div>
										</div>

										<Separator />

										<div className="space-y-4">
											<h4 className="font-medium">Social Media Accounts</h4>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="instagram">Instagram Handle</Label>
													<Input
														id="instagram"
														value={editData.instagram_handle}
														onChange={(e) =>
															setEditData({
																...editData,
																instagram_handle: e.target.value,
															})
														}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="tiktok">TikTok Username</Label>
													<Input
														id="tiktok"
														value={editData.tiktok_username}
														onChange={(e) =>
															setEditData({
																...editData,
																tiktok_username: e.target.value,
															})
														}
													/>
												</div>
											</div>
										</div>

										<div className="flex gap-2 pt-4">
											<Button onClick={handleSave}>
												<IconCheck className="h-4 w-4 mr-2" />
												Save Changes
											</Button>
											<Button variant="outline" onClick={handleCancel}>
												<IconX className="h-4 w-4 mr-2" />
												Cancel
											</Button>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	)
}
