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
	IconMessageChatbot,
} from "@tabler/icons-react"
import Link from "next/link"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { useAuth } from "@/hooks/useAuth"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"

// Static navigation data
const navData = {
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
		{
			title: "Chatbot",
			url: "/dashboard/chatbot",
			icon: IconMessageChatbot,
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
	const { userProfile, user } = useAuth()

	// Format user data for display
	const formatUserData = () => {
		if (!user || !userProfile) {
			return {
				name: "HPZ Crew Member",
				email: "crew@hpz.com",
				avatar: "/avatars/crew.jpg",
			}
		}

		// Get user's initials for avatar fallback
		const initials = userProfile.first_name && userProfile.last_name
			? `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase()
			: userProfile.email?.substring(0, 2).toUpperCase() || "CN"

		return {
			name: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || userProfile.email || "Crew Member",
			email: userProfile.email || user.email || "crew@hpz.com",
			avatar: userProfile.avatar_url || "/avatars/crew.jpg",
			initials,
		}
	}

	const userData = formatUserData()

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
				<NavMain items={navData.navMain} />
				<NavDocuments items={navData.documents} />
				<NavSecondary items={navData.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userData} />
			</SidebarFooter>
		</Sidebar>
	)
}