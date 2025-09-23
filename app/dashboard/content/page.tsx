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
import { Input } from "../../../components/ui/input"
import {
	IconFolderOpen,
	IconPlus,
	IconEye,
	IconEdit,
	IconCalendar,
	IconCircleCheck,
	IconClock,
	IconX,
	IconFilter,
	IconSearch,
	IconTrendingUp,
	IconTrendingDown,
} from "@tabler/icons-react"

const contentItems = [
	{
		id: 1,
		title: "Summer Collection Showcase",
		type: "Instagram Post",
		status: "approved",
		date: "2024-05-15",
		views: "15.2K",
		likes: "1.2K",
		thumbnail: "/placeholder-thumb.jpg",
	},
	{
		id: 2,
		title: "Behind the Scenes Video",
		type: "TikTok Video",
		status: "pending",
		date: "2024-05-14",
		views: "8.5K",
		likes: "650",
		thumbnail: "/placeholder-thumb.jpg",
	},
	{
		id: 3,
		title: "Product Review: New Sneakers",
		type: "YouTube Short",
		status: "approved",
		date: "2024-05-12",
		views: "11.4K",
		likes: "845",
		thumbnail: "/placeholder-thumb.jpg",
	},
	{
		id: 4,
		title: "Style Tips for Summer",
		type: "Instagram Story",
		status: "rejected",
		date: "2024-05-10",
		views: "3.2K",
		likes: "120",
		thumbnail: "/placeholder-thumb.jpg",
	},
	{
		id: 5,
		title: "Unboxing Experience",
		type: "Instagram Post",
		status: "approved",
		date: "2024-05-08",
		views: "9.8K",
		likes: "730",
		thumbnail: "/placeholder-thumb.jpg",
	},
]

export default function ContentPage() {
	const { userProfile } = useAuth()
	const [filter, setFilter] = useState("all")
	const [searchTerm, setSearchTerm] = useState("")

	const getStatusColor = (status: string) => {
		switch (status) {
			case "approved":
				return "bg-chart-2/10 text-chart-2"
			case "pending":
				return "bg-chart-4/10 text-chart-4"
			case "rejected":
				return "bg-destructive/10 text-destructive"
			default:
				return "bg-muted text-muted-foreground"
		}
	}

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "approved":
				return <IconCircleCheck className="h-4 w-4" />
			case "pending":
				return <IconClock className="h-4 w-4" />
			case "rejected":
				return <IconX className="h-4 w-4" />
			default:
				return <IconClock className="h-4 w-4" />
		}
	}

	const filteredContent = contentItems.filter((item) => {
		const matchesFilter = filter === "all" || item.status === filter
		const matchesSearch =
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.type.toLowerCase().includes(searchTerm.toLowerCase())
		return matchesFilter && matchesSearch
	})

	const stats = {
		total: contentItems.length,
		approved: contentItems.filter((item) => item.status === "approved").length,
		pending: contentItems.filter((item) => item.status === "pending").length,
		rejected: contentItems.filter((item) => item.status === "rejected").length,
	}

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* Stats Overview */}
					<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Total Content</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									{stats.total}
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
									Content growing this month{" "}
									<IconTrendingUp className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Submissions for the last 30 days
								</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Approved</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-chart-2">
									{stats.approved}
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconCircleCheck />
										89%
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium text-chart-2">
									High approval rate <IconCircleCheck className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Quality content performance
								</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Pending</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-chart-4">
									{stats.pending}
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconClock />
										Review
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium text-chart-4">
									Under review <IconClock className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Awaiting approval decision
								</div>
							</CardFooter>
						</Card>

						<Card className="@container/card">
							<CardHeader>
								<CardDescription>Rejected</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-destructive">
									{stats.rejected}
								</CardTitle>
								<CardAction>
									<Badge variant="outline">
										<IconTrendingDown />
										Low
									</Badge>
								</CardAction>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1.5 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium text-destructive">
									Needs improvement <IconX className="size-4" />
								</div>
								<div className="text-muted-foreground">
									Content quality feedback
								</div>
							</CardFooter>
						</Card>
					</div>

					{/* Filters and Search */}
					<div className="px-4 lg:px-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
									<div className="flex items-center space-x-2">
										<IconFilter className="h-4 w-4 text-muted-foreground" />
										<div className="flex space-x-2">
											{["all", "approved", "pending", "rejected"].map(
												(status) => (
													<Button
														key={status}
														variant={filter === status ? "default" : "outline"}
														size="sm"
														onClick={() => setFilter(status)}
														className="capitalize"
													>
														{status}
													</Button>
												)
											)}
										</div>
									</div>
									<div className="relative">
										<IconSearch className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
										<Input
											type="text"
											placeholder="Search content..."
											className="pl-10"
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Content Grid */}
					<div className="px-4 lg:px-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredContent.map((content) => (
								<Card key={content.id} className="overflow-hidden">
									<div className="aspect-video bg-muted flex items-center justify-center">
										<IconFolderOpen className="h-12 w-12 text-muted-foreground" />
									</div>
									<CardContent className="p-4">
										<div className="flex items-start justify-between mb-2">
											<h3 className="font-semibold text-foreground truncate">
												{content.title}
											</h3>
											<Badge
												className={`${getStatusColor(
													content.status
												)} flex items-center`}
											>
												{getStatusIcon(content.status)}
												<span className="ml-1 capitalize">
													{content.status}
												</span>
											</Badge>
										</div>
										<p className="text-sm text-muted-foreground mb-2">
											{content.type}
										</p>
										<div className="flex items-center text-xs text-muted-foreground mb-3">
											<IconCalendar className="h-3 w-3 mr-1" />
											{new Date(content.date).toLocaleDateString()}
										</div>
										<div className="flex items-center justify-between text-sm">
											<div className="flex space-x-4">
												<span className="flex items-center text-muted-foreground">
													<IconEye className="h-3 w-3 mr-1" />
													{content.views}
												</span>
												<span className="flex items-center text-muted-foreground">
													<IconCircleCheck className="h-3 w-3 mr-1" />
													{content.likes}
												</span>
											</div>
											<Button variant="ghost" size="sm">
												<IconEdit className="h-3 w-3 mr-1" />
												View
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>

					{filteredContent.length === 0 && (
						<div className="px-4 lg:px-6">
							<Card>
								<CardContent className="p-12 text-center">
									<IconFolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
									<h3 className="text-lg font-medium text-foreground mb-2">
										No content found
									</h3>
									<p className="text-muted-foreground mb-4">
										{searchTerm || filter !== "all"
											? "Try adjusting your search or filter criteria"
											: "Start by submitting your first piece of content"}
									</p>
									<Button>
										<IconPlus className="h-4 w-4 mr-2" />
										Submit Content
									</Button>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
