"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
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
import {
	IconUser,
	IconEdit,
	IconTrophy,
	IconStar,
	IconPhoto,
	IconVideo,
	IconHeart,
	IconMessageCircle,
	IconShare,
	IconCalendar,
	IconMapPin,
	IconMail,
	IconPhone,
	IconWorld,
	IconBrandInstagram,
	IconBrandTiktok,
	IconBrandYoutube,
	IconCheck,
	IconX,
	IconTrendingUp,
	IconEye,
} from "@tabler/icons-react"

// Mock user data
const userData = {
	id: "1",
	name: "Alex Rivera",
	handle: "@alexcreates",
	email: "alex.rivera@email.com",
	phone: "+1 (555) 123-4567",
	location: "Los Angeles, CA",
	website: "alexcreates.com",
	bio: "Content creator passionate about lifestyle, travel, and authentic storytelling. HPZ crew member since 2024.",
	joinDate: "March 2024",
	avatar: "",
	banner: "",
	stats: {
		totalContent: 127,
		totalViews: "2.4M",
		totalLikes: "156K",
		totalComments: "12.3K",
		totalShares: "8.9K",
		approvalRate: 94,
		points: 8420,
		rank: 3,
	},
	badges: ["top-performer", "consistent-creator", "trending-master"],
	socialAccounts: {
		instagram: "@alexcreates",
		tiktok: "@alexcreates",
		youtube: "AlexCreates",
	},
	recentContent: [
		{
			id: "1",
			type: "photo",
			title: "Summer Collection Showcase",
			date: "2 days ago",
			views: "45.2K",
			likes: "3.8K",
			comments: "234",
			status: "approved",
		},
		{
			id: "2",
			type: "video",
			title: "Behind the Scenes: Photoshoot",
			date: "5 days ago",
			views: "78.1K",
			likes: "6.2K",
			comments: "445",
			status: "approved",
		},
		{
			id: "3",
			type: "photo",
			title: "Product Review: New Arrivals",
			date: "1 week ago",
			views: "32.7K",
			likes: "2.9K",
			comments: "167",
			status: "pending",
		},
	],
	achievements: [
		{
			id: "1",
			name: "Top Performer",
			description: "Reached top 5 in monthly leaderboard",
			icon: "trophy",
			date: "September 2024",
			rarity: "gold",
		},
		{
			id: "2",
			name: "Consistent Creator",
			description: "Posted content for 30 consecutive days",
			icon: "star",
			date: "August 2024",
			rarity: "silver",
		},
		{
			id: "3",
			name: "Viral Master",
			description: "Content reached 100K+ views",
			icon: "trending",
			date: "July 2024",
			rarity: "gold",
		},
	],
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

const getRarityColor = (rarity: string) => {
	switch (rarity) {
		case "gold":
			return "text-yellow-600"
		case "silver":
			return "text-gray-600"
		case "bronze":
			return "text-orange-600"
		default:
			return "text-gray-600"
	}
}

const getContentIcon = (type: string) => {
	switch (type) {
		case "photo":
			return <IconPhoto className="h-4 w-4" />
		case "video":
			return <IconVideo className="h-4 w-4" />
		default:
			return <IconPhoto className="h-4 w-4" />
	}
}

const getStatusColor = (status: string) => {
	switch (status) {
		case "approved":
			return "bg-green-100 text-green-800"
		case "pending":
			return "bg-yellow-100 text-yellow-800"
		case "rejected":
			return "bg-red-100 text-red-800"
		default:
			return "bg-gray-100 text-gray-800"
	}
}

const formatNumber = (num: number | string) => {
	if (typeof num === "string") return num
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + "M"
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + "K"
	}
	return num.toString()
}

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false)
	const [editData, setEditData] = useState({
		name: userData.name,
		bio: userData.bio,
		location: userData.location,
		website: userData.website,
		instagram: userData.socialAccounts.instagram,
		tiktok: userData.socialAccounts.tiktok,
		youtube: userData.socialAccounts.youtube,
	})

	const handleSave = () => {
		// Here you would save the data to your backend
		console.log("Saving profile data:", editData)
		setIsEditing(false)
	}

	const handleCancel = () => {
		setEditData({
			name: userData.name,
			bio: userData.bio,
			location: userData.location,
			website: userData.website,
			instagram: userData.socialAccounts.instagram,
			tiktok: userData.socialAccounts.tiktok,
			youtube: userData.socialAccounts.youtube,
		})
		setIsEditing(false)
	}

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* Profile Header */}
					<div className="px-4 lg:px-6">
						<div className="relative">
							{/* Banner */}
							<div className="h-32 sm:h-48 bg-gradient-to-r from-primary to-chart-1 rounded-lg" />

							{/* Profile Info */}
							<div className="relative px-4 sm:px-6">
								<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 sm:-mt-20">
									<div className="flex flex-col sm:flex-row sm:items-end gap-4">
										<Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
											<AvatarImage src={userData.avatar} alt={userData.name} />
											<AvatarFallback className="text-lg sm:text-2xl font-bold">
												{userData.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>

										<div className="flex-1 space-y-2">
											<div>
												<h1 className="text-2xl sm:text-3xl font-bold">
													{userData.name}
												</h1>
												<p className="text-muted-foreground">
													{userData.handle}
												</p>
											</div>
											<div className="flex flex-wrap gap-2">
												{userData.badges.map((badge) => (
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
					<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 sm:grid-cols-4">
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Total Content</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-primary">
									{userData.stats.totalContent}
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconPhoto />
										Posts
									</Badge>
								</CardAction>
							</CardHeader>
						</Card>
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Total Views</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-chart-1">
									{userData.stats.totalViews}
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconEye />
										Views
									</Badge>
								</CardAction>
							</CardHeader>
						</Card>
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Approval Rate</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-chart-2">
									{userData.stats.approvalRate}%
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconCheck />
										Quality
									</Badge>
								</CardAction>
							</CardHeader>
						</Card>
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Current Rank</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-chart-3">
									#{userData.stats.rank}
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconTrophy />
										Rank
									</Badge>
								</CardAction>
							</CardHeader>
						</Card>
					</div>

					{/* Main Content Tabs */}
					<div className="px-4 lg:px-6">
						<Tabs defaultValue="overview" className="w-full">
							<TabsList className="grid w-full grid-cols-4">
								<TabsTrigger value="overview" className="text-xs sm:text-sm">
									Overview
								</TabsTrigger>
								<TabsTrigger value="content" className="text-xs sm:text-sm">
									Content
								</TabsTrigger>
								<TabsTrigger
									value="achievements"
									className="text-xs sm:text-sm"
								>
									Achievements
								</TabsTrigger>
								<TabsTrigger value="edit" className="text-xs sm:text-sm">
									Edit
								</TabsTrigger>
							</TabsList>

							{/* Overview Tab */}
							<TabsContent value="overview" className="mt-6 space-y-4">
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
									{/* About */}
									<Card className="lg:col-span-2">
										<CardHeader>
											<CardTitle>About</CardTitle>
										</CardHeader>
										<CardContent className="space-y-4">
											<p className="text-muted-foreground">{userData.bio}</p>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
												<div className="flex items-center gap-2">
													<IconMapPin className="h-4 w-4 text-muted-foreground" />
													<span>{userData.location}</span>
												</div>
												<div className="flex items-center gap-2">
													<IconCalendar className="h-4 w-4 text-muted-foreground" />
													<span>Joined {userData.joinDate}</span>
												</div>
												<div className="flex items-center gap-2">
													<IconMail className="h-4 w-4 text-muted-foreground" />
													<span>{userData.email}</span>
												</div>
												<div className="flex items-center gap-2">
													<IconWorld className="h-4 w-4 text-muted-foreground" />
													<span>{userData.website}</span>
												</div>
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
														{userData.socialAccounts.instagram}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<IconBrandTiktok className="h-4 w-4 text-black" />
														<span className="text-sm">TikTok</span>
													</div>
													<span className="text-sm font-medium">
														{userData.socialAccounts.tiktok}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<IconBrandYoutube className="h-4 w-4 text-red-500" />
														<span className="text-sm">YouTube</span>
													</div>
													<span className="text-sm font-medium">
														{userData.socialAccounts.youtube}
													</span>
												</div>
											</CardContent>
										</Card>

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
														{userData.stats.totalLikes}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<IconMessageCircle className="h-4 w-4 text-blue-500" />
														<span className="text-sm">Total Comments</span>
													</div>
													<span className="text-sm font-medium">
														{userData.stats.totalComments}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<IconShare className="h-4 w-4 text-green-500" />
														<span className="text-sm">Total Shares</span>
													</div>
													<span className="text-sm font-medium">
														{userData.stats.totalShares}
													</span>
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
							</TabsContent>

							{/* Content Tab */}
							<TabsContent value="content" className="mt-6 space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Recent Content</CardTitle>
										<CardDescription>
											Your latest submitted content
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{userData.recentContent.map((content) => (
												<div
													key={content.id}
													className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border transition-colors hover:bg-muted/50"
												>
													<div className="flex items-center gap-3 flex-1">
														<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
															{getContentIcon(content.type)}
														</div>
														<div className="flex-1 min-w-0">
															<h4 className="font-medium truncate">
																{content.title}
															</h4>
															<p className="text-sm text-muted-foreground">
																{content.date}
															</p>
														</div>
													</div>

													<div className="flex items-center gap-4 text-sm border-t sm:border-t-0 pt-3 sm:pt-0">
														<div className="text-center">
															<p className="font-medium">{content.views}</p>
															<p className="text-muted-foreground text-xs">
																Views
															</p>
														</div>
														<div className="text-center">
															<p className="font-medium">{content.likes}</p>
															<p className="text-muted-foreground text-xs">
																Likes
															</p>
														</div>
														<div className="text-center">
															<p className="font-medium">{content.comments}</p>
															<p className="text-muted-foreground text-xs">
																Comments
															</p>
														</div>
														<Badge className={getStatusColor(content.status)}>
															{content.status}
														</Badge>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Achievements Tab */}
							<TabsContent value="achievements" className="mt-6 space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{userData.achievements.map((achievement) => (
										<Card key={achievement.id}>
											<CardContent className="p-6">
												<div className="flex items-start gap-4">
													<div
														className={`p-3 rounded-lg bg-muted ${getRarityColor(
															achievement.rarity
														)}`}
													>
														<IconTrophy className="h-6 w-6" />
													</div>
													<div className="flex-1">
														<h4 className="font-semibold">
															{achievement.name}
														</h4>
														<p className="text-sm text-muted-foreground mt-1">
															{achievement.description}
														</p>
														<p className="text-xs text-muted-foreground mt-2">
															{achievement.date}
														</p>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>

							{/* Edit Tab */}
							<TabsContent value="edit" className="mt-6 space-y-4">
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
													value={editData.name}
													onChange={(e) =>
														setEditData({ ...editData, name: e.target.value })
													}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="location">Location</Label>
												<Input
													id="location"
													value={editData.location}
													onChange={(e) =>
														setEditData({
															...editData,
															location: e.target.value,
														})
													}
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="bio">Bio</Label>
											<Input
												id="bio"
												value={editData.bio}
												onChange={(e) =>
													setEditData({ ...editData, bio: e.target.value })
												}
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="website">Website</Label>
											<Input
												id="website"
												value={editData.website}
												onChange={(e) =>
													setEditData({ ...editData, website: e.target.value })
												}
											/>
										</div>

										<Separator />

										<div className="space-y-4">
											<h4 className="font-medium">Social Media Accounts</h4>
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<div className="space-y-2">
													<Label htmlFor="instagram">Instagram</Label>
													<Input
														id="instagram"
														value={editData.instagram}
														onChange={(e) =>
															setEditData({
																...editData,
																instagram: e.target.value,
															})
														}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="tiktok">TikTok</Label>
													<Input
														id="tiktok"
														value={editData.tiktok}
														onChange={(e) =>
															setEditData({
																...editData,
																tiktok: e.target.value,
															})
														}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="youtube">YouTube</Label>
													<Input
														id="youtube"
														value={editData.youtube}
														onChange={(e) =>
															setEditData({
																...editData,
																youtube: e.target.value,
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
