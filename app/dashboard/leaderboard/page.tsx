"use client"

import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../components/ui/avatar"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../components/ui/tabs"
import {
	IconTrophy,
	IconMedal,
	IconCrown,
	IconTrendingUp,
	IconTrendingDown,
	IconUsers,
	IconCalendar,
	IconStar,
	IconThumbUp,
	IconEye,
	IconFlame,
	IconAward,
	IconChevronUp,
	IconChevronDown,
} from "@tabler/icons-react"

const leaderboardData = {
	allTime: [
		{
			id: 1,
			rank: 1,
			name: "Sarah Chen",
			handle: "@sarahc_style",
			avatar: "/placeholder-avatar.jpg",
			points: 2450,
			totalContent: 45,
			approvalRate: 96,
			change: 0,
			isCurrentUser: false,
			badges: ["top-creator", "quality-expert"],
		},
		{
			id: 2,
			rank: 2,
			name: "Marcus Johnson",
			handle: "@marcusj_fits",
			avatar: "/placeholder-avatar.jpg",
			points: 2380,
			totalContent: 38,
			approvalRate: 94,
			change: 1,
			isCurrentUser: false,
			badges: ["engagement-master"],
		},
		{
			id: 3,
			rank: 3,
			name: "Elena Rodriguez",
			handle: "@elena_vibes",
			avatar: "/placeholder-avatar.jpg",
			points: 2210,
			totalContent: 41,
			approvalRate: 92,
			change: -1,
			isCurrentUser: false,
			badges: ["consistent-creator"],
		},
		{
			id: 4,
			rank: 4,
			name: "HPZ Crew Member",
			handle: "@crew_member",
			avatar: "/placeholder-avatar.jpg",
			points: 1890,
			totalContent: 24,
			approvalRate: 89,
			change: 2,
			isCurrentUser: true,
			badges: ["rising-star"],
		},
		{
			id: 5,
			rank: 5,
			name: "David Kim",
			handle: "@davidk_street",
			avatar: "/placeholder-avatar.jpg",
			points: 1750,
			totalContent: 31,
			approvalRate: 87,
			change: -1,
			isCurrentUser: false,
			badges: ["community-favorite"],
		},
		{
			id: 6,
			rank: 6,
			name: "Ashley Turner",
			handle: "@ash_aesthetic",
			avatar: "/placeholder-avatar.jpg",
			points: 1680,
			totalContent: 28,
			approvalRate: 91,
			change: 0,
			isCurrentUser: false,
			badges: [],
		},
		{
			id: 7,
			rank: 7,
			name: "Jordan Lee",
			handle: "@jordanl_fresh",
			avatar: "/placeholder-avatar.jpg",
			points: 1590,
			totalContent: 25,
			approvalRate: 88,
			change: 3,
			isCurrentUser: false,
			badges: ["newcomer"],
		},
		{
			id: 8,
			rank: 8,
			name: "Mia Foster",
			handle: "@mia_minimalist",
			avatar: "/placeholder-avatar.jpg",
			points: 1520,
			totalContent: 22,
			approvalRate: 95,
			change: -2,
			isCurrentUser: false,
			badges: ["quality-expert"],
		},
	],
	monthly: [
		{
			id: 1,
			rank: 1,
			name: "Jordan Lee",
			handle: "@jordanl_fresh",
			avatar: "/placeholder-avatar.jpg",
			points: 380,
			totalContent: 8,
			approvalRate: 100,
			change: 0,
			isCurrentUser: false,
			badges: ["monthly-leader"],
		},
		{
			id: 2,
			rank: 2,
			name: "HPZ Crew Member",
			handle: "@crew_member",
			avatar: "/placeholder-avatar.jpg",
			points: 340,
			totalContent: 6,
			approvalRate: 92,
			change: 0,
			isCurrentUser: true,
			badges: ["rising-star"],
		},
		{
			id: 3,
			rank: 3,
			name: "Mia Foster",
			handle: "@mia_minimalist",
			avatar: "/placeholder-avatar.jpg",
			points: 290,
			totalContent: 5,
			approvalRate: 100,
			change: 2,
			isCurrentUser: false,
			badges: ["quality-expert"],
		},
	],
	engagement: [
		{
			id: 1,
			rank: 1,
			name: "Sarah Chen",
			handle: "@sarahc_style",
			avatar: "/placeholder-avatar.jpg",
			points: 125000,
			totalContent: 45,
			approvalRate: 96,
			change: 0,
			isCurrentUser: false,
			badges: ["viral-creator"],
		},
		{
			id: 2,
			rank: 2,
			name: "Marcus Johnson",
			handle: "@marcusj_fits",
			avatar: "/placeholder-avatar.jpg",
			points: 98500,
			totalContent: 38,
			approvalRate: 94,
			change: 1,
			isCurrentUser: false,
			badges: ["engagement-master"],
		},
	],
}

const categoryStats = {
	allTime: {
		title: "All-Time Leaders",
		description: "Top performers since joining HPZ",
		metric: "Total Points",
		icon: IconTrophy,
	},
	monthly: {
		title: "This Month",
		description: "September 2025 performance",
		metric: "Monthly Points",
		icon: IconCalendar,
	},
	engagement: {
		title: "Engagement Kings",
		description: "Highest social engagement",
		metric: "Total Engagement",
		icon: IconThumbUp,
	},
}

export default function LeaderboardPage() {
	const { userProfile } = useAuth()
	const [activeTab, setActiveTab] = useState("allTime")

	const getBadgeColor = (badge: string) => {
		switch (badge) {
			case "top-creator":
				return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
			case "quality-expert":
				return "bg-gradient-to-r from-green-400 to-green-600 text-white"
			case "engagement-master":
				return "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
			case "rising-star":
				return "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
			case "monthly-leader":
				return "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
			case "viral-creator":
				return "bg-gradient-to-r from-pink-400 to-pink-600 text-white"
			case "consistent-creator":
				return "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white"
			case "community-favorite":
				return "bg-gradient-to-r from-red-400 to-red-600 text-white"
			case "newcomer":
				return "bg-gradient-to-r from-teal-400 to-teal-600 text-white"
			default:
				return "bg-muted text-muted-foreground"
		}
	}

	const getBadgeLabel = (badge: string) => {
		switch (badge) {
			case "top-creator":
				return "Top Creator"
			case "quality-expert":
				return "Quality Expert"
			case "engagement-master":
				return "Engagement Master"
			case "rising-star":
				return "Rising Star"
			case "monthly-leader":
				return "Monthly Leader"
			case "viral-creator":
				return "Viral Creator"
			case "consistent-creator":
				return "Consistent Creator"
			case "community-favorite":
				return "Community Favorite"
			case "newcomer":
				return "Newcomer"
			default:
				return badge
		}
	}

	const getRankIcon = (rank: number) => {
		switch (rank) {
			case 1:
				return <IconCrown className="h-5 w-5 text-yellow-500" />
			case 2:
				return <IconMedal className="h-5 w-5 text-gray-400" />
			case 3:
				return <IconMedal className="h-5 w-5 text-amber-600" />
			default:
				return (
					<span className="text-lg font-bold text-muted-foreground">
						#{rank}
					</span>
				)
		}
	}

	const getChangeIndicator = (change: number) => {
		if (change > 0) {
			return (
				<div className="flex items-center text-green-600">
					<IconChevronUp className="h-3 w-3" />
					<span className="text-xs">+{change}</span>
				</div>
			)
		} else if (change < 0) {
			return (
				<div className="flex items-center text-red-600">
					<IconChevronDown className="h-3 w-3" />
					<span className="text-xs">{change}</span>
				</div>
			)
		}
		return (
			<div className="flex items-center text-muted-foreground">
				<span className="text-xs">-</span>
			</div>
		)
	}

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + "M"
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + "K"
		}
		return num.toString()
	}

	const currentData =
		leaderboardData[activeTab as keyof typeof leaderboardData] ||
		leaderboardData.allTime
	const currentStats = categoryStats[activeTab as keyof typeof categoryStats]

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* Header Stats */}
					<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 sm:grid-cols-2 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Your Rank</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									#4
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconChevronUp />
										+2
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Climbing the ranks <IconTrendingUp className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Up 2 positions this week
								</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Total Competitors</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									247
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconUsers />
										Active
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Growing community <IconUsers className="size-4" />
								</div>
								<div className="text-muted-foreground">
									+12 new members this month
								</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Points to Next Rank</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-chart-4">
									320
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconFlame />
										Goal
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium text-chart-4">
									Almost there! <IconFlame className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Need 320 more points for #3
								</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Achievement Badges</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-chart-2">
									3
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconAward />
										Earned
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium text-chart-2">
									Rising Star status <IconStar className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Latest: Rising Star badge
								</div>
							</CardFooter>
						</Card>
					</div>

					{/* Leaderboard Tabs */}
					<div className="px-4 lg:px-6">
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="w-full"
						>
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="allTime" className="text-xs sm:text-sm">
									<span className="hidden sm:inline">All-Time</span>
									<span className="sm:hidden">All</span>
								</TabsTrigger>
								<TabsTrigger value="monthly" className="text-xs sm:text-sm">
									<span className="hidden sm:inline">This Month</span>
									<span className="sm:hidden">Month</span>
								</TabsTrigger>
								<TabsTrigger value="engagement" className="text-xs sm:text-sm">
									<span className="hidden sm:inline">Engagement</span>
									<span className="sm:hidden">Engage</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value={activeTab} className="mt-6">
								<Card>
									<CardHeader>
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
											<div>
												<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
													<currentStats.icon className="h-5 w-5" />
													{currentStats.title}
												</CardTitle>
												<CardDescription className="text-sm">
													{currentStats.description}
												</CardDescription>
											</div>
											<Badge
												variant="outline"
												className="self-start sm:self-auto"
											>
												{currentData.length} Active
											</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{currentData.map((user, index) => (
												<div
													key={user.id}
													className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-lg border transition-colors ${
														user.isCurrentUser
															? "bg-primary/5 border-primary/20 ring-1 ring-primary/20"
															: "bg-card hover:bg-muted/50"
													}`}
												>
													{/* Mobile: Top row with rank, avatar, and basic info */}
													<div className="flex items-center gap-3 flex-1">
														{/* Rank */}
														<div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
															{getRankIcon(user.rank)}
														</div>

														{/* Avatar and Info */}
														<div className="flex items-center gap-3 flex-1">
															<Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
																<AvatarImage
																	src={user.avatar}
																	alt={user.name}
																/>
																<AvatarFallback className="text-xs sm:text-sm">
																	{user.name
																		.split(" ")
																		.map((n) => n[0])
																		.join("")}
																</AvatarFallback>
															</Avatar>
															<div className="flex-1 min-w-0">
																<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
																	<p className="font-medium text-sm sm:text-base truncate">
																		{user.name}
																		{user.isCurrentUser && (
																			<span className="text-primary text-xs sm:text-sm font-normal">
																				{" "}
																				(You)
																			</span>
																		)}
																	</p>
																	{user.badges.length > 0 && (
																		<Badge
																			className={`text-xs self-start sm:self-auto ${getBadgeColor(
																				user.badges[0]
																			)}`}
																		>
																			<span className="hidden sm:inline">
																				{getBadgeLabel(user.badges[0])}
																			</span>
																			<span className="sm:hidden">
																				{
																					getBadgeLabel(user.badges[0]).split(
																						" "
																					)[0]
																				}
																			</span>
																		</Badge>
																	)}
																</div>
																<p className="text-xs sm:text-sm text-muted-foreground truncate">
																	{user.handle}
																</p>
															</div>
														</div>

														{/* Mobile: Change indicator (top-right) */}
														<div className="flex sm:hidden flex-col items-center">
															{getChangeIndicator(user.change)}
														</div>
													</div>

													{/* Stats - mobile: bottom row, desktop: right side */}
													<div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 text-sm border-t sm:border-t-0 pt-3 sm:pt-0">
														<div className="text-center">
															<p className="font-semibold text-sm sm:text-lg">
																{formatNumber(user.points)}
															</p>
															<p className="text-muted-foreground text-xs">
																<span className="hidden sm:inline">
																	{currentStats.metric}
																</span>
																<span className="sm:hidden">Points</span>
															</p>
														</div>
														<div className="text-center">
															<p className="font-medium text-sm sm:text-base">
																{user.totalContent}
															</p>
															<p className="text-muted-foreground text-xs">
																Content
															</p>
														</div>
														<div className="text-center">
															<p className="font-medium text-chart-2 text-sm sm:text-base">
																{user.approvalRate}%
															</p>
															<p className="text-muted-foreground text-xs">
																<span className="hidden sm:inline">
																	Approved
																</span>
																<span className="sm:hidden">App.</span>
															</p>
														</div>
														{/* Desktop: Change indicator (right side) */}
														<div className="hidden sm:flex flex-col items-center">
															{getChangeIndicator(user.change)}
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
									<CardFooter>
										<Button variant="outline" className="w-full">
											<IconEye className="h-4 w-4 mr-2" />
											View Full Leaderboard
										</Button>
									</CardFooter>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	)
}
