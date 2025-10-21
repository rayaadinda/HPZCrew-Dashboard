"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
	Loader2,
	Link,
	Unlink,
	CheckCircle,
	AlertCircle,
	AlertTriangle,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

interface DiscordLinkButtonProps {
	className?: string
}

export default function DiscordLinkButton({
	className,
}: DiscordLinkButtonProps) {
	const { userProfile } = useAuth()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Add debug logging
	useEffect(() => {
		console.log("DiscordLinkButton Debug - User Profile:", userProfile)
		console.log("DiscordLinkButton Debug - Environment:", {
			clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
			siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
		})
	}, [userProfile])

	const isDiscordLinked = !!userProfile?.discord_id
	const discordDisplayName = userProfile?.discord_username
		? `${userProfile.discord_username}${
				userProfile.discord_discriminator
					? "#" + userProfile.discord_discriminator
					: ""
		  }`
		: null

	const handleLinkDiscord = async () => {
		setLoading(true)
		setError(null)

		try {
			// Generate Discord OAuth URL with enhanced permissions for bot features
			const siteUrl =
				process.env.NEXT_PUBLIC_SITE_URL ||
				"https://hpz-crew-dashboard.vercel.app/"
			const discordAuthUrl = new URL("https://discord.com/oauth2/authorize")
			discordAuthUrl.searchParams.set(
				"client_id",
				process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!
			)
			discordAuthUrl.searchParams.set(
				"redirect_uri",
				`${siteUrl}/api/discord/callback`
			)
			discordAuthUrl.searchParams.set("response_type", "code")
			discordAuthUrl.searchParams.set("scope", "identify email guilds.join")
			discordAuthUrl.searchParams.set(
				"state",
				encodeURIComponent(userProfile?.email || "")
			)

			// Debug: Log the generated URL
			console.log("Discord OAuth URL:", discordAuthUrl.toString())

			// Store user email in sessionStorage for the callback
			if (userProfile?.email) {
				sessionStorage.setItem("discord_link_user_email", userProfile.email)
				sessionStorage.setItem("discord_link_timestamp", Date.now().toString())
			}

			// Show loading message
			toast.loading("Connecting to Discord...", { id: "discord-link" })

			// Redirect to Discord OAuth
			window.location.href = discordAuthUrl.toString()
		} catch (error) {
			console.error("Discord linking error:", error)
			setError("Failed to initiate Discord linking")
			toast.error("Failed to start Discord linking process")
			setLoading(false)
		}
	}

	const handleUnlinkDiscord = async () => {
		if (!userProfile?.email) {
			toast.error("User email not found")
			return
		}

		setLoading(true)
		setError(null)

		try {
			const response = await fetch("/api/discord/unlink", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userEmail: userProfile.email,
				}),
			})

			const data = await response.json()

			if (response.ok) {
				toast.success("Discord account unlinked successfully!")
				// Reload the page to update the user profile
				window.location.reload()
			} else {
				throw new Error(data.error || "Failed to unlink Discord account")
			}
		} catch (error) {
			console.error("Unlink error:", error)
			const errorMessage =
				error instanceof Error ? error.message : "An error occurred"
			setError(errorMessage)
			toast.error(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	// Handle Discord server invite - Enhanced to check for invite from linking process
	const handleJoinDiscordServer = async () => {
		try {
			// Check if we have a pending invite from the linking process
			const pendingInvite = sessionStorage.getItem("discord_pending_invite")
			if (pendingInvite) {
				sessionStorage.removeItem("discord_pending_invite")
				window.open(pendingInvite, "_blank")
				toast.success("Welcome! Opening your HPZ Discord server invite...")
				return
			}

			// Generate fresh invite if no pending one
			const response = await fetch("/api/discord/generate-invite", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: userProfile?.id || userProfile?.email,
					discordUsername: userProfile?.discord_username,
				}),
			})

			const data = await response.json()

			if (data.success && data.inviteUrl) {
				// Open Discord invite in new tab
				window.open(data.inviteUrl, "_blank")
				toast.success("Opening HPZ Discord server invite...")
			} else {
				throw new Error(data.error || "Failed to generate Discord invite")
			}
		} catch (error) {
			console.error("Discord invite error:", error)
			const errorMessage =
				error instanceof Error ? error.message : "Failed to join Discord server"
			setError(errorMessage)
			toast.error(errorMessage)
		}
	}

	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="h-6 w-6 bg-[#5865F2] rounded-full flex items-center justify-center">
						<span className="text-white font-bold text-sm">D</span>
					</div>
					<CardTitle>Discord Integration</CardTitle>
				</div>
				<CardDescription>
					{isDiscordLinked
						? "Your Discord account is linked and ready for HPZ bot features!"
						: "Link your Discord account to unlock bot features and participate in crew activities."}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{isDiscordLinked ? (
						<div className="flex flex-col space-y-3">
							<div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
								<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
								<div className="flex-1">
									<p className="font-medium text-green-800 dark:text-green-200">
										Connected as {discordDisplayName}
									</p>
									<p className="text-sm text-green-600 dark:text-green-400">
										Full access to HPZ Discord bot features
									</p>
								</div>
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
								>
									Linked
								</Badge>
							</div>

							<Button
								onClick={handleUnlinkDiscord}
								disabled={loading}
								variant="outline"
								className="w-full justify-start gap-2"
							>
								{loading ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Unlink className="h-4 w-4" />
								)}
								{loading ? "Unlinking..." : "Unlink Discord Account"}
							</Button>
						</div>
					) : (
						<div className="flex flex-col space-y-3">
							<div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
								<AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
								<div className="flex-1">
									<p className="font-medium text-blue-800 dark:text-blue-200">
										Connect your Discord account
									</p>
									<p className="text-sm text-blue-600 dark:text-blue-400">
										Access exclusive bot commands and crew features
									</p>
								</div>
							</div>

							<Button
								onClick={handleLinkDiscord}
								disabled={loading}
								className="w-full justify-start gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white"
							>
								{loading ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Link className="h-4 w-4" />
								)}
								{loading ? "Connecting..." : "Connect Discord Account"}
							</Button>
						</div>
					)}

					{error && (
						<div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
							<AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
							<p className="text-sm text-red-800 dark:text-red-200">{error}</p>
						</div>
					)}

					{/* Discord Server Invite Button - Only show when Discord is linked */}
					{isDiscordLinked && (
						<div className="mt-4">
							<Button
								onClick={handleJoinDiscordServer}
								variant="outline"
								className="w-full justify-start gap-2"
							>
								Join HPZ Discord Server
							</Button>
						</div>
					)}

					<div className="text-xs text-muted-foreground space-y-1">
						<p>• Linking your account enables HPZ bot commands</p>
						<p>• Join the Discord server to access bot features</p>
						<p>• You can unlink your account at any time</p>
						<p>• We only access your basic Discord profile information</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
