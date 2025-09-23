import {
	IconTrendingDown,
	IconTrendingUp,
	IconAward,
	IconUsers,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Content</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						24
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
						Content growing this month <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Submissions for the last 30 days
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Approval Rate</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						89%
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Quality improving <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Content approval trending up
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Views</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						45.2K
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconTrendingUp />
							+23%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Strong engagement <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Views exceed targets</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>HPZ Points</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						1,247
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<IconAward />
							+89
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Rewards earned <IconAward className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Points from recent activity
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
