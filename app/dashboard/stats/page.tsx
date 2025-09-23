"use client"

import { useAuth } from "../../../hooks/useAuth"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
	CardAction,
} from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import {
	IconTrendingUp,
	IconEye,
	IconHeart,
	IconShare,
	IconCalendar,
	IconTarget,
} from "@tabler/icons-react"

export default function StatsPage() {
	const { userProfile } = useAuth()

	const monthlyStats = [
		{ month: "Jan", content: 8, views: 12500, likes: 890, shares: 45 },
		{ month: "Feb", content: 12, views: 18200, likes: 1240, shares: 67 },
		{ month: "Mar", content: 15, views: 23400, likes: 1580, shares: 89 },
		{ month: "Apr", content: 10, views: 19800, likes: 1320, shares: 72 },
		{ month: "May", content: 14, views: 28600, likes: 1890, shares: 98 },
	]

	const contentTypes = [
		{ type: "Instagram Posts", count: 35, performance: "+15%" },
		{ type: "Instagram Stories", count: 48, performance: "+23%" },
		{ type: "TikTok Videos", count: 22, performance: "+8%" },
		{ type: "YouTube Shorts", count: 12, performance: "+34%" },
	]

	const topPerformers = [
		{
			title: "Summer Collection Launch",
			views: "15.2K",
			likes: "1.2K",
			date: "May 15",
		},
		{
			title: "Behind the Scenes",
			views: "12.8K",
			likes: "980",
			date: "May 10",
		},
		{
			title: "Product Review",
			views: "11.4K",
			likes: "845",
			date: "May 8",
		},
	]

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* Header */}
					<div className="px-4 lg:px-6">
						<h1 className="text-3xl font-bold text-foreground">Statistics</h1>
						<p className="text-muted-foreground mt-1">
							Detailed analytics and performance metrics
						</p>
					</div>

					{/* Overview Stats */}
					<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Total Views</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									102.5K
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconTrendingUp />
										+18%
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Trending up <IconTrendingUp className="size-4" />
								</div>
								<div className="text-muted-foreground">vs last month</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Total Likes</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									6.9K
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconTrendingUp />
										+25%
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Great engagement <IconHeart className="size-4" />
								</div>
								<div className="text-muted-foreground">vs last month</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Comments</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									1.2K
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconTrendingUp />
										+12%
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Active community <IconTrendingUp className="size-4" />
								</div>
								<div className="text-muted-foreground">vs last month</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Shares</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									371
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconTrendingUp />
										+31%
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Viral content <IconShare className="size-4" />
								</div>
								<div className="text-muted-foreground">vs last month</div>
							</CardFooter>
						</Card>
					</div>

					{/* Monthly Performance Chart */}
					<div className="px-4 lg:px-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<IconTarget className="h-5 w-5 mr-2" />
									Monthly Performance
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{monthlyStats.map((month) => (
										<div
											key={month.month}
											className="grid grid-cols-5 gap-4 py-3 border-b border-border"
										>
											<div className="font-medium">{month.month}</div>
											<div className="text-center">{month.content} posts</div>
											<div className="text-center">
												{month.views.toLocaleString()} views
											</div>
											<div className="text-center">
												{month.likes.toLocaleString()} likes
											</div>
											<div className="text-center">{month.shares} shares</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Content Types & Top Performers */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-6">
						{/* Content Types */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<IconTarget className="h-5 w-5 mr-2" />
									Content by Type
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{contentTypes.map((type) => (
									<div
										key={type.type}
										className="flex items-center justify-between p-3 bg-muted rounded-lg"
									>
										<div>
											<p className="font-medium text-foreground">{type.type}</p>
											<p className="text-sm text-muted-foreground">
												{type.count} pieces
											</p>
										</div>
										<Badge variant="secondary">{type.performance}</Badge>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Top Performers */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<IconCalendar className="h-5 w-5 mr-2" />
									Top Performing Content
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{topPerformers.map((content, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-3 bg-muted rounded-lg"
									>
										<div className="flex-1">
											<p className="font-medium text-foreground">
												{content.title}
											</p>
											<p className="text-sm text-muted-foreground">
												{content.date}
											</p>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">
												{content.views} views
											</p>
											<p className="text-xs text-muted-foreground">
												{content.likes} likes
											</p>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</div>

					{/* Performance Insights */}
					<div className="px-4 lg:px-6">
						<Card>
							<CardHeader>
								<CardTitle>Performance Insights</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="text-center p-4 bg-primary/10 rounded-lg">
										<div className="text-2xl font-bold text-primary">89%</div>
										<div className="text-sm text-muted-foreground">
											Content Approval Rate
										</div>
										<div className="text-xs text-primary mt-1">
											Above average
										</div>
									</div>
									<div className="text-center p-4 bg-chart-2/10 rounded-lg">
										<div className="text-2xl font-bold text-chart-2">4.8</div>
										<div className="text-sm text-muted-foreground">
											Avg. Quality Score
										</div>
										<div className="text-xs text-chart-2 mt-1">Excellent</div>
									</div>
									<div className="text-center p-4 bg-chart-3/10 rounded-lg">
										<div className="text-2xl font-bold text-chart-3">12.5%</div>
										<div className="text-sm text-muted-foreground">
											Engagement Rate
										</div>
										<div className="text-xs text-chart-3 mt-1">
											Industry leading
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
