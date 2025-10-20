"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

interface PointActivity {
	id: string
	type: string
	description: string
	points: number
	date: string
}

export function TieringSystem() {
	const [userPoints, setUserPoints] = useState(1247)
	const [currentTier, setCurrentTier] = useState("pro-racer")
	const [nextTierPoints, setNextTierPoints] = useState(1500)
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
			requirements: [
				"Complete registration",
				"Submit first content",
			],
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

	const rewards = [
		{ points: 500, reward: "HPZ Merchandise Pack", icon: <IconGift className="size-4" /> },
		{ points: 1000, reward: "HPZ Product Bundle", icon: <IconAward className="size-4" /> },
		{ points: 1500, reward: "National Event Ticket", icon: <IconTrophy className="size-4" /> },
		{ points: 2000, reward: "Exclusive Legend Kit", icon: <IconCrown className="size-4" /> },
	]

	const waysToEarn = [
		{ action: "Upload content with #RideWithPride", points: 50, icon: <IconBulb className="size-4" /> },
		{ action: "Refer friend via affiliate link", points: 100, icon: <IconUsers className="size-4" /> },
		{ action: "Complete weekly challenge", points: 30, icon: <IconChartLine className="size-4" /> },
		{ action: "Attend local event", points: 40, icon: <IconUsers className="size-4" /> },
		{ action: "Generate affiliate sale", points: 150, icon: <IconAward className="size-4" /> },
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

	const currentTierData = tiers.find(tier => tier.id === currentTier)
	const nextTierData = tiers.find(tier => tier.id !== currentTier && tier.minPoints > userPoints)
	const progressToNext = nextTierData ?
		((userPoints - currentTierData!.minPoints) / (nextTierData.minPoints - currentTierData!.minPoints)) * 100 : 100

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">Ambassador Tiering System</h2>
					<p className="text-muted-foreground">
						Track your progress and unlock exclusive rewards as you climb the ranks
					</p>
				</div>
				<Badge variant="outline" className="text-lg px-3 py-1">
					<IconAward className="size-4 mr-1" />
					{userPoints.toLocaleString()} Points
				</Badge>
			</div>

			{/* Current Status Card */}
			<Card className="border-l-4 border-l-blue-500">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								{currentTierData?.icon}
								{currentTierData?.name}
							</CardTitle>
							<CardDescription>
								{userPoints.toLocaleString()} points earned
							</CardDescription>
						</div>
						<div className="text-right">
							<div className="text-2xl font-bold">{userPoints.toLocaleString()}</div>
							<div className="text-sm text-muted-foreground">Total Points</div>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{nextTierData && (
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Progress to {nextTierData.name}</span>
								<span>
									{nextTierData.minPoints - userPoints} points to go
								</span>
							</div>
							<Progress value={progressToNext} className="h-2" />
						</div>
					)}
				</CardContent>
			</Card>

			<Tabs defaultValue="tiers" className="space-y-4">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="tiers">Tiers</TabsTrigger>
					<TabsTrigger value="rewards">Rewards</TabsTrigger>
					<TabsTrigger value="earn">Earn Points</TabsTrigger>
					<TabsTrigger value="activity">Activity</TabsTrigger>
				</TabsList>

				<TabsContent value="tiers" className="space-y-4">
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
										<div className={`mx-auto rounded-full p-3 ${isUnlocked ? tier.color : "bg-gray-500"}`}>
											{tier.icon}
										</div>
										<CardTitle className="flex items-center justify-center gap-2">
											{tier.name}
											{!isUnlocked && <IconLock className="size-4" />}
										</CardTitle>
										<CardDescription>
											{tier.minPoints.toLocaleString()} -{" "}
											{tier.maxPoints ? tier.maxPoints.toLocaleString() : "∞"} points
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<h4 className="font-medium mb-2">Benefits:</h4>
											<ul className="space-y-1 text-sm text-muted-foreground">
												{tier.benefits.map((benefit, index) => (
													<li key={index} className="flex items-start gap-2">
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
										<div>
											<h4 className="font-medium mb-2">Requirements:</h4>
											<ul className="space-y-1 text-sm text-muted-foreground">
												{tier.requirements.map((req, index) => (
													<li key={index} className="flex items-start gap-2">
														{isUnlocked ? (
															<IconCheck className="size-3 mt-0.5 text-green-500" />
														) : (
															<IconLock className="size-3 mt-0.5" />
														)}
														{req}
													</li>
												))}
											</ul>
										</div>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</TabsContent>

				<TabsContent value="rewards" className="space-y-4">
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
										<CardTitle className="text-lg">{reward.reward}</CardTitle>
										<CardDescription>
											{reward.points.toLocaleString()} points
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Button
											disabled={!canRedeem}
											className="w-full"
											variant={canRedeem ? "default" : "secondary"}
										>
											{canRedeem ? "Redeem" : "Locked"}
										</Button>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</TabsContent>

				<TabsContent value="earn" className="space-y-4">
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
												<div className="font-medium">{activity.action}</div>
											</div>
										</div>
										<Badge variant="secondary">+{activity.points}</Badge>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="activity" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>Your latest point-earning activities</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{activities.map((activity) => (
									<div
										key={activity.id}
										className="flex items-center justify-between p-4 border rounded-lg"
									>
										<div>
											<div className="font-medium">{activity.description}</div>
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
				</TabsContent>
			</Tabs>
		</div>
	)
}