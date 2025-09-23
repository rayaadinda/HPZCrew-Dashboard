"use client"

import * as React from "react"
import {
	IconAward,
	IconBook,
	IconDashboard,
	IconFolder,
	IconSettings,
	IconTrendingUp,
	IconTrophy,
	IconUser,
	IconUsers,
	IconBrandInstagram,
	IconList,
	IconChartLine,
} from "@tabler/icons-react"
import Link from "next/link"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
	user: {
		name: "HPZ Crew Member",
		email: "crew@hpz.com",
		avatar: "/avatars/crew.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: IconDashboard,
		},
		{
			title: "Statistics",
			url: "/dashboard/stats",
			icon: IconTrendingUp,
		},
		{
			title: "My Content",
			url: "/dashboard/content",
			icon: IconFolder,
		},
		{
			title: "Leaderboard",
			url: "/dashboard/leaderboard",
			icon: IconUsers,
		},
		{
			title: "Achievements",
			url: "/dashboard/achievements",
			icon: IconAward,
		},
	],
	navClouds: [
		{
			title: "Welcome Kit",
			icon: IconBook,
			isActive: false,
			url: "/dashboard/welcome-kit",
			items: [
				{
					title: "Brand Guidelines",
					url: "/dashboard/welcome-kit/guidelines",
				},
				{
					title: "Content Templates",
					url: "/dashboard/welcome-kit/templates",
				},
				{
					title: "Brand Assets",
					url: "/dashboard/welcome-kit/assets",
				},
			],
		},
		{
			title: "Analytics",
			icon: IconTrendingUp,
			url: "/dashboard/analytics",
			items: [
				{
					title: "Performance Metrics",
					url: "/dashboard/analytics/performance",
				},
				{
					title: "Engagement Trends",
					url: "/dashboard/analytics/engagement",
				},
				{
					title: "Content Insights",
					url: "/dashboard/analytics/insights",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Profile",
			url: "/dashboard/profile",
			icon: IconUser,
		},
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: IconSettings,
		},
	],
	documents: [
		{
			name: "Content Library",
			url: "/dashboard/content",
			icon: IconFolder,
		},
		{
			name: "Brand Assets",
			url: "/dashboard/welcome-kit/assets",
			icon: IconBrandInstagram,
		},
		{
			name: "Achievements",
			url: "/dashboard/achievements",
			icon: IconTrophy,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link href="/dashboard">
								<IconTrophy className="!size-5" />
								<span className="text-base font-semibold">HPZ Crew</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavDocuments items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
