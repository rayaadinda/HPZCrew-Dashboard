"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "19rem",
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<SidebarInset>
				<SiteHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
