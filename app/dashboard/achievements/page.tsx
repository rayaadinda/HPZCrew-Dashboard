"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	IconAward,
	IconCrown,
	IconStar,
	IconTrophy,
	IconGift,
	IconBulb,
	IconCheck,
	IconLock,
	IconChartLine,
	IconUsers,
	IconTarget,
	IconFlag,
	IconMedal,
} from "@tabler/icons-react"

interface Tier {
	id: string
	name: string
	icon: React.ReactNode
	color: string
	minPoints: number
	maxPoints?: number
	benefits: string[]
	requirements: string[]
	current?: boolean
	progress?: number
}

interface Achievement {
	id: string
	title: string
	description: string
	points: number
	icon: React.ReactNode
	unlocked: boolean
	progress?: number
	maxProgress?: number
	category: string
}

interface PointActivity {
	id: string
	type: string
	description: string
	points: number
	date: string
}

export default function AchievementsPage() {
	const [userPoints, setUserPoints] = useState(1247)
	const [currentTier, setCurrentTier] = useState("pro-racer")
	const [activities, setActivities] = useState<PointActivity[]>([])

	const tiers: Tier[] = [
		{
			id: "rookie-rider",
			name: "Rookie Rider",
			icon: <IconStar className="size-5" />,
			color: "bg-green-500",
			minPoints: 0,
			maxPoints: 499,
			benefits: [
				"Starter Kit Digital",
				"Access to basic challenges",
				"Community Discord access",
				"Monthly newsletter",
			],
			requirements: ["Complete registration", "Submit first content"],
		},
		{
			id: "pro-racer",
			name: "Pro Racer",
			icon: <IconTrophy className="size-5" />,
			color: "bg-blue-500",
			minPoints: 500,
			maxPoints: 1499,
			benefits: [
				"Bonus points multiplier (1.2x)",
				"Feature on HPZ social media",
				"Exclusive merchandise access",
				"Advanced challenge participation",
				"Monthly community calls",
			],
			requirements: [
				"3 approved contents",
				"Engagement rate >3%",
				"30 days active membership",
			],
			current: true,
		},
		{
			id: "hpz-legend",
			name: "HPZ Legend",
			icon: <IconCrown className="size-5" />,
			color: "bg-purple-500",
			minPoints: 1500,
			benefits: [
				"Free HPZ products monthly",
				"Exclusive event invitations",
				"Priority support",
				"Affiliate commission boost (1.5x)",
				"Personal brand feature",
				"Legend exclusive merchandise",
				"Direct line to HPZ team",
			],
			requirements: [
				"10 approved contents",
				"3 successful affiliate sales",
				"90 days active membership",
				"Mentor new members",
			],
		},
	]

	const achievements: Achievement[] = [
		{
			id: "first-content",
			title: "First Steps",
			description: "Submit your first piece of content",
			points: 50,
			icon: <IconFlag className="size-5" />,
			unlocked: true,
			category: "content",
		},
		{
			id: "content-streak",
			title: "Content Creator",
			description: "Submit 5 approved contents",
			points: 150,
			icon: <IconStar className="size-5" />,
			unlocked: true,
			progress: 24,
			maxProgress: 5,
			category: "content",
		},
		{
			id: "quality-expert",
			title: "Quality Expert",
			description: "Maintain 90% approval rate for 10 contents",
			points: 200,
			icon: <IconAward className="size-5" />,
			unlocked: true,
			progress: 89,
			maxProgress: 90,
			category: "quality",
		},
		{
			id: "engagement-master",
			title: "Engagement Master",
			description: "Achieve 5% engagement rate",
			points: 250,
			icon: <IconChartLine className="size-5" />,
			unlocked: false,
			progress: 3.2,
			maxProgress: 5,
			category: "engagement",
		},
		{
			id: "social-butterfly",
			title: "Social Butterfly",
			description: "Get featured on HPZ social media 3 times",
			points: 300,
			icon: <IconUsers className="size-5" />,
			unlocked: false,
			progress: 1,
			maxProgress: 3,
			category: "social",
		},
		{
			id: "affiliate-champion",
			title: "Affiliate Champion",
			description: "Generate 5 successful affiliate sales",
			points: 500,
			icon: <IconMedal className="size-5" />,
			unlocked: false,
			progress: 1,
			maxProgress: 5,
			category: "affiliate",
		},
	]

	const rewards = [
		{
			points: 500,
			reward: "HPZ Merchandise Pack",
			icon: <IconGift className="size-4" />,
			available: true,
		},
		{
			points: 1000,
			reward: "HPZ Product Bundle",
			icon: <IconAward className="size-4" />,
			available: true,
		},
		{
			points: 1500,
			reward: "National Event Ticket",
			icon: <IconTrophy className="size-4" />,
			available: false,
		},
		{
			points: 2000,
			reward: "Exclusive Legend Kit",
			icon: <IconCrown className="size-4" />,
			available: false,
		},
	]

	const waysToEarn = [
		{
			action: "Upload content with #RideWithPride",
			points: 50,
			icon: <IconBulb className="size-4" />,
		},
		{
			action: "Refer friend via affiliate link",
			points: 100,
			icon: <IconUsers className="size-4" />,
		},
		{
			action: "Complete weekly challenge",
			points: 30,
			icon: <IconTarget className="size-4" />,
		},
		{
			action: "Attend local event",
			points: 40,
			icon: <IconUsers className="size-4" />,
		},
		{
			action: "Generate affiliate sale",
			points: 150,
			icon: <IconAward className="size-4" />,
		},
	]

	useEffect(() => {
		const mockActivities: PointActivity[] = [
			{
				id: "1",
				type: "content",
				description: "Instagram post with #RideWithPride",
				points: 50,
				date: "2024-10-19",
			},
			{
				id: "2",
				type: "referral",
				description: "Friend joined via your link",
				points: 100,
				date: "2024-10-18",
			},
			{
				id: "3",
				type: "challenge",
				description: "Weekly challenge completion",
				points: 30,
				date: "2024-10-17",
			},
			{
				id: "4",
				type: "sale",
				description: "Affiliate sale commission",
				points: 150,
				date: "2024-10-16",
			},
		]
		setActivities(mockActivities)
	}, [])

	const currentTierData = tiers.find((tier) => tier.id === currentTier)
	const nextTierData = tiers.find(
		(tier) => tier.id !== currentTier && tier.minPoints > userPoints
	)
	const progressToNext = nextTierData
		? ((userPoints - currentTierData!.minPoints) /
				(nextTierData.minPoints - currentTierData!.minPoints)) *
		  100
		: 100

	const unlockedAchievements = achievements.filter((a) => a.unlocked).length
	const totalAchievementPoints = achievements
		.filter((a) => a.unlocked)
		.reduce((sum, a) => sum + a.points, 0)

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<div className="px-4 lg:px-6">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-2xl font-bold">Achievements & Tiers</h1>
								<p className="text-muted-foreground">
									Track your progress and unlock exclusive rewards
								</p>
							</div>
							<Badge variant="outline" className="text-lg px-3 py-1">
								<IconAward className="size-4 mr-1" />
								{userPoints.toLocaleString()} Points
							</Badge>
						</div>
					</div>

					<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3">
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Current Tier</CardDescription>
								<CardTitle className="flex items-center gap-2 text-lg">
									{currentTierData?.icon}
									{currentTierData?.name}
								</CardTitle>
							</CardHeader>
							<CardFooter>
								<div className="text-sm text-muted-foreground">
									{userPoints.toLocaleString()} points earned
								</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Achievements Unlocked</CardDescription>
								<CardTitle className="text-2xl font-semibold">
									{unlockedAchievements}/{achievements.length}
								</CardTitle>
							</CardHeader>
							<CardFooter>
								<Progress
									value={(unlockedAchievements / achievements.length) * 100}
									className="h-2"
								/>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Achievement Points</CardDescription>
								<CardTitle className="text-2xl font-semibold">
									{totalAchievementPoints}
								</CardTitle>
							</CardHeader>
							<CardFooter>
								<div className="text-sm text-muted-foreground">
									From completed achievements
								</div>
							</CardFooter>
						</Card>
					</div>

					<div className="px-4 lg:px-6">
						<Tabs defaultValue="tiers" className="space-y-4">
							<TabsList className="grid w-full grid-cols-4">
								<TabsTrigger value="tiers">Tiers</TabsTrigger>
								<TabsTrigger value="achievements">Achievements</TabsTrigger>
								<TabsTrigger value="rewards">Rewards</TabsTrigger>
								<TabsTrigger value="activity">Activity</TabsTrigger>
							</TabsList>

							<TabsContent value="tiers" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Ambassador Tiers</CardTitle>
										<CardDescription>
											Climb the ranks to unlock exclusive benefits
										</CardDescription>
									</CardHeader>
									<CardContent>
										{nextTierData && (
											<div className="mb-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
												<div className="flex justify-between items-center mb-2">
													<span className="font-medium">
														Progress to {nextTierData.name}
													</span>
													<span className="text-sm text-muted-foreground">
														{nextTierData.minPoints - userPoints} points to go
													</span>
												</div>
												<Progress value={progressToNext} className="h-3" />
											</div>
										)}
										<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
											{tiers.map((tier) => {
												const isUnlocked = userPoints >= tier.minPoints
												const isCurrent = tier.id === currentTier

												return (
													<Card
														key={tier.id}
														className={`relative ${
															isCurrent ? "ring-2 ring-blue-500" : ""
														} ${!isUnlocked ? "opacity-60" : ""}`}
													>
														{isCurrent && (
															<Badge className="absolute -top-2 right-4 bg-blue-500">
																Current
															</Badge>
														)}
														<CardHeader className="text-center">
															<div
																className={`mx-auto rounded-full p-3 ${
																	isUnlocked ? tier.color : "bg-gray-500"
																}`}
															>
																{tier.icon}
															</div>
															<CardTitle className="flex items-center justify-center gap-2">
																{tier.name}
																{!isUnlocked && <IconLock className="size-4" />}
															</CardTitle>
															<CardDescription>
																{tier.minPoints.toLocaleString()} -{" "}
																{tier.maxPoints
																	? tier.maxPoints.toLocaleString()
																	: "∞"}{" "}
																points
															</CardDescription>
														</CardHeader>
														<CardContent className="space-y-4">
															<div>
																<h4 className="font-medium mb-2">Benefits:</h4>
																<ul className="space-y-1 text-sm text-muted-foreground">
																	{tier.benefits.map((benefit, index) => (
																		<li
																			key={index}
																			className="flex items-start gap-2"
																		>
																			{isUnlocked ? (
																				<IconCheck className="size-3 mt-0.5 text-green-500" />
																			) : (
																				<IconLock className="size-3 mt-0.5" />
																			)}
																			{benefit}
																		</li>
																	))}
																</ul>
															</div>
														</CardContent>
													</Card>
												)
											})}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="achievements" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Achievement Badges</CardTitle>
										<CardDescription>
											Complete challenges to earn points and unlock rewards
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
											{achievements.map((achievement) => (
												<Card
													key={achievement.id}
													className={`${
														achievement.unlocked
															? "border-green-500"
															: "opacity-60"
													}`}
												>
													<CardHeader>
														<div className="flex items-center gap-3">
															<div
																className={`rounded-full p-2 ${
																	achievement.unlocked
																		? "bg-green-500"
																		: "bg-gray-500"
																}`}
															>
																{achievement.icon}
															</div>
															<div className="flex-1">
																<CardTitle className="text-lg">
																	{achievement.title}
																</CardTitle>
																<CardDescription>
																	{achievement.description}
																</CardDescription>
															</div>
															<Badge variant="secondary">
																+{achievement.points}
															</Badge>
														</div>
													</CardHeader>
													{achievement.maxProgress &&
														achievement.progress !== undefined && (
															<CardContent>
																<div className="space-y-2">
																	<div className="flex justify-between text-sm">
																		<span>Progress</span>
																		<span>
																			{achievement.progress}/
																			{achievement.maxProgress}
																		</span>
																	</div>
																	<Progress
																		value={
																			(achievement.progress /
																				achievement.maxProgress) *
																			100
																		}
																		className="h-2"
																	/>
																</div>
															</CardContent>
														)}
												</Card>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="rewards" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Rewards Store</CardTitle>
										<CardDescription>
											Redeem your points for exclusive HPZ rewards
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
											{rewards.map((reward, index) => {
												const canRedeem = userPoints >= reward.points
												return (
													<Card
														key={index}
														className={`text-center ${
															canRedeem ? "border-green-500" : "opacity-60"
														}`}
													>
														<CardHeader>
															<div className="mx-auto rounded-full p-3 bg-orange-500">
																{reward.icon}
															</div>
															<CardTitle className="text-lg">
																{reward.reward}
															</CardTitle>
															<CardDescription>
																{reward.points.toLocaleString()} points
															</CardDescription>
														</CardHeader>
														<CardContent>
															<Button
																disabled={!canRedeem || !reward.available}
																className="w-full"
																variant={
																	canRedeem && reward.available
																		? "default"
																		: "secondary"
																}
															>
																{!reward.available
																	? "Coming Soon"
																	: canRedeem
																	? "Redeem"
																	: "Locked"}
															</Button>
														</CardContent>
													</Card>
												)
											})}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="activity" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Recent Activity</CardTitle>
										<CardDescription>
											Your latest point-earning activities
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{activities.map((activity) => (
												<div
													key={activity.id}
													className="flex items-center justify-between p-4 border rounded-lg"
												>
													<div>
														<div className="font-medium">
															{activity.description}
														</div>
														<div className="text-sm text-muted-foreground">
															{activity.date}
														</div>
													</div>
													<Badge variant="secondary">+{activity.points}</Badge>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Ways to Earn Points</CardTitle>
										<CardDescription>
											Complete these activities to climb the tiers faster
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
											{waysToEarn.map((activity, index) => (
												<div
													key={index}
													className="flex items-center justify-between p-4 border rounded-lg"
												>
													<div className="flex items-center gap-3">
														<div className="rounded-full p-2 bg-blue-500">
															{activity.icon}
														</div>
														<div>
															<div className="font-medium">
																{activity.action}
															</div>
														</div>
													</div>
													<Badge variant="secondary">+{activity.points}</Badge>
												</div>
											))}
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
