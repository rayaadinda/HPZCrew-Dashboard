"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DiscordLinkButton from "@/components/discord-link-button"
import {
	IconBell,
	IconShield,
	IconPalette,
	IconUser,
	IconMail,
	IconDeviceMobile,
	IconEye,
	IconLock,
	IconTrash,
	IconDownload,
	IconUpload,
	IconCheck,
	IconAlertTriangle,
	IconMoon,
	IconSun,
	IconDeviceDesktop,
	IconLanguage,
	IconClock,
	IconGlobe,
} from "@tabler/icons-react"

const settingsData = {
	account: {
		email: "alex.rivera@email.com",
		phone: "+1 (555) 123-4567",
		language: "en",
		timezone: "America/Los_Angeles",
		twoFactorEnabled: true,
	},
	notifications: {
		email: {
			contentApproved: true,
			contentRejected: true,
			newAchievements: true,
			leaderboardUpdates: false,
			weeklyDigest: true,
			marketingEmails: false,
		},
		push: {
			contentApproved: true,
			contentRejected: true,
			newAchievements: true,
			leaderboardUpdates: false,
			directMessages: true,
		},
		inApp: {
			all: true,
			sound: false,
			vibration: true,
		},
	},
	privacy: {
		profileVisibility: "public",
		showStats: true,
		showAchievements: true,
		showContent: true,
		allowDirectMessages: true,
		showOnlineStatus: false,
		dataProcessing: true,
		analytics: true,
	},
	appearance: {
		theme: "system",
		compactMode: false,
		animationsEnabled: true,
		highContrast: false,
	},
}

function getNotificationDescription(key: string): string {
	const descriptions: Record<string, string> = {
		contentApproved: "When your submitted content gets approved",
		contentRejected: "When your submitted content is rejected",
		newAchievements: "When you unlock new achievements",
		leaderboardUpdates: "Weekly leaderboard position updates",
		weeklyDigest: "Weekly summary of your activity",
		marketingEmails: "Product updates and promotional content",
		directMessages: "When someone sends you a direct message",
		all: "Enable all in-app notifications",
		sound: "Play notification sounds",
		vibration: "Vibrate on notifications (mobile)",
	}
	return descriptions[key] || ""
}

function getPrivacyDescription(key: string): string {
	const descriptions: Record<string, string> = {
		showStats: "Display your statistics on your profile",
		showAchievements: "Display your achievements on your profile",
		showContent: "Display your content portfolio on your profile",
		allowDirectMessages: "Allow other crew members to message you",
		showOnlineStatus: "Show when you're online",
		dataProcessing: "Allow processing of your data for platform improvements",
		analytics: "Include your data in platform analytics",
	}
	return descriptions[key] || ""
}

function getAppearanceDescription(key: string): string {
	const descriptions: Record<string, string> = {
		compactMode: "Use a more compact layout with smaller spacing",
		animationsEnabled: "Enable animations and transitions",
		highContrast: "Increase contrast for better visibility",
	}
	return descriptions[key] || ""
}

export default function SettingsPage() {
	const searchParams = useSearchParams()
	const [settings, setSettings] = useState(settingsData)
	const [hasChanges, setHasChanges] = useState(false)

	// Handle Discord OAuth callback
	useEffect(() => {
		const discordSuccess = searchParams.get('discord_success')
		const discordError = searchParams.get('discord_error')

		if (discordSuccess === 'true') {
			toast.success('Discord account linked successfully!')
			// Clean up URL
			window.history.replaceState({}, '', '/dashboard/settings')
		}

		if (discordError) {
			let errorMessage = 'Failed to link Discord account'

			switch (discordError) {
				case 'access_denied':
					errorMessage = 'You cancelled the Discord authorization'
					break
				case 'no_code':
					errorMessage = 'No authorization code received from Discord'
					break
				case 'token_exchange_failed':
					errorMessage = 'Failed to authenticate with Discord'
					break
				case 'user_info_failed':
					errorMessage = 'Failed to retrieve Discord user information'
					break
				case 'link_failed':
					errorMessage = 'Failed to link Discord account to your profile'
					break
				case 'no_user_email':
					errorMessage = 'User email not found for linking'
					break
				case 'unexpected_error':
					errorMessage = 'An unexpected error occurred'
					break
				default:
					errorMessage = `Discord linking error: ${discordError}`
			}

			toast.error(errorMessage)
			// Clean up URL
			window.history.replaceState({}, '', '/dashboard/settings')
		}
	}, [searchParams])

	const updateSetting = (category: string, key: string, value: any) => {
		setSettings((prev) => ({
			...prev,
			[category]: {
				...prev[category as keyof typeof prev],
				[key]: value,
			},
		}))
		setHasChanges(true)
	}

	const updateNestedSetting = (
		category: string,
		subCategory: string,
		key: string,
		value: any
	) => {
		setSettings((prev) => ({
			...prev,
			[category]: {
				...prev[category as keyof typeof prev],
				[subCategory]: {
					...(prev[category as keyof typeof prev] as any)[subCategory],
					[key]: value,
				},
			},
		}))
		setHasChanges(true)
	}

	const saveSettings = () => {
		console.log("Saving settings:", settings)
		setHasChanges(false)
	}

	const resetSettings = () => {
		setSettings(settingsData)
		setHasChanges(false)
	}

	const exportData = () => {
		console.log("Exporting user data...")
	}

	const deleteAccount = () => {
		console.log("Account deletion requested...")
	}

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* Page Header */}
					<div className="px-4 lg:px-6">
						<div className="flex flex-col gap-1">
							<h1 className="text-2xl font-semibold tracking-tight">
								Settings
							</h1>
							<p className="text-muted-foreground">
								Manage your account settings and preferences
							</p>
						</div>
					</div>

					{/* Save Changes Bar */}
					{hasChanges && (
						<div className="px-4 lg:px-6">
							<Card className="border-orange-200 bg-orange-50">
								<CardContent className="p-4">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
										<div className="flex items-center gap-2">
											<IconAlertTriangle className="h-4 w-4 text-orange-600" />
											<span className="text-sm font-medium text-orange-800">
												You have unsaved changes
											</span>
										</div>
										<div className="flex gap-2">
											<Button size="sm" onClick={saveSettings}>
												<IconCheck className="h-4 w-4 mr-2" />
												Save Changes
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={resetSettings}
											>
												Reset
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Settings Content */}
					<div className="px-4 lg:px-6">
						<Tabs defaultValue="account" className="space-y-4">
							<TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-1">
								<TabsTrigger value="account" className="text-xs sm:text-sm">
									<IconUser className="h-4 w-4 mr-1 sm:mr-2" />
									<span className="hidden sm:inline">Account</span>
									<span className="sm:hidden">Account</span>
								</TabsTrigger>
								<TabsTrigger
									value="notifications"
									className="text-xs sm:text-sm"
								>
									<IconBell className="h-4 w-4 mr-1 sm:mr-2" />
									<span className="hidden sm:inline">Notifications</span>
									<span className="sm:hidden">Notifs</span>
								</TabsTrigger>
								<TabsTrigger value="privacy" className="text-xs sm:text-sm">
									<IconShield className="h-4 w-4 mr-1 sm:mr-2" />
									<span className="hidden sm:inline">Privacy</span>
									<span className="sm:hidden">Privacy</span>
								</TabsTrigger>
								<TabsTrigger value="appearance" className="text-xs sm:text-sm">
									<IconPalette className="h-4 w-4 mr-1 sm:mr-2" />
									<span className="hidden sm:inline">Appearance</span>
									<span className="sm:hidden">Theme</span>
								</TabsTrigger>
							</TabsList>

							{/* Account Settings */}
							<TabsContent value="account" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconUser className="h-5 w-5" />
											Account Information
										</CardTitle>
										<CardDescription>
											Manage your basic account details
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="email">Email Address</Label>
												<Input
													id="email"
													type="email"
													value={settings.account.email}
													onChange={(e) =>
														updateSetting("account", "email", e.target.value)
													}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="phone">Phone Number</Label>
												<Input
													id="phone"
													type="tel"
													value={settings.account.phone}
													onChange={(e) =>
														updateSetting("account", "phone", e.target.value)
													}
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="language">Language</Label>
												<Select
													value={settings.account.language}
													onValueChange={(value) =>
														updateSetting("account", "language", value)
													}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="en">English</SelectItem>
														<SelectItem value="es">Español</SelectItem>
														<SelectItem value="fr">Français</SelectItem>
														<SelectItem value="de">Deutsch</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2">
												<Label htmlFor="timezone">Timezone</Label>
												<Select
													value={settings.account.timezone}
													onValueChange={(value) =>
														updateSetting("account", "timezone", value)
													}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="America/Los_Angeles">
															Pacific Time (PT)
														</SelectItem>
														<SelectItem value="America/Denver">
															Mountain Time (MT)
														</SelectItem>
														<SelectItem value="America/Chicago">
															Central Time (CT)
														</SelectItem>
														<SelectItem value="America/New_York">
															Eastern Time (ET)
														</SelectItem>
														<SelectItem value="Europe/London">
															Greenwich Mean Time (GMT)
														</SelectItem>
														<SelectItem value="Europe/Paris">
															Central European Time (CET)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Discord Integration */}
								<DiscordLinkButton />

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconLock className="h-5 w-5" />
											Security
										</CardTitle>
										<CardDescription>
											Manage your account security settings
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="space-y-0.5">
												<Label>Two-Factor Authentication</Label>
												<p className="text-sm text-muted-foreground">
													Add an extra layer of security to your account
												</p>
											</div>
											<div className="flex items-center gap-2">
												{settings.account.twoFactorEnabled && (
													<Badge
														variant="secondary"
														className="bg-green-100 text-green-800"
													>
														Enabled
													</Badge>
												)}
												<Switch
													checked={settings.account.twoFactorEnabled}
													onCheckedChange={(checked) =>
														updateSetting(
															"account",
															"twoFactorEnabled",
															checked
														)
													}
												/>
											</div>
										</div>

										<Separator />

										<div className="space-y-2">
											<Button variant="outline" className="w-full sm:w-auto">
												<IconLock className="h-4 w-4 mr-2" />
												Change Password
											</Button>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Notification Settings */}
							<TabsContent value="notifications" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconMail className="h-5 w-5" />
											Email Notifications
										</CardTitle>
										<CardDescription>
											Choose what email notifications you'd like to receive
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{Object.entries(settings.notifications.email).map(
											([key, value]) => (
												<div
													key={key}
													className="flex items-center justify-between"
												>
													<div className="space-y-0.5">
														<Label className="capitalize">
															{key
																.replace(/([A-Z])/g, " $1")
																.replace(/^./, (str) => str.toUpperCase())}
														</Label>
														<p className="text-sm text-muted-foreground">
															{getNotificationDescription(key)}
														</p>
													</div>
													<Switch
														checked={value as boolean}
														onCheckedChange={(checked) =>
															updateNestedSetting(
																"notifications",
																"email",
																key,
																checked
															)
														}
													/>
												</div>
											)
										)}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconDeviceMobile className="h-5 w-5" />
											Push Notifications
										</CardTitle>
										<CardDescription>
											Manage push notifications on your devices
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{Object.entries(settings.notifications.push).map(
											([key, value]) => (
												<div
													key={key}
													className="flex items-center justify-between"
												>
													<div className="space-y-0.5">
														<Label className="capitalize">
															{key
																.replace(/([A-Z])/g, " $1")
																.replace(/^./, (str) => str.toUpperCase())}
														</Label>
														<p className="text-sm text-muted-foreground">
															{getNotificationDescription(key)}
														</p>
													</div>
													<Switch
														checked={value as boolean}
														onCheckedChange={(checked) =>
															updateNestedSetting(
																"notifications",
																"push",
																key,
																checked
															)
														}
													/>
												</div>
											)
										)}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconBell className="h-5 w-5" />
											In-App Notifications
										</CardTitle>
										<CardDescription>
											Configure in-app notification behavior
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{Object.entries(settings.notifications.inApp).map(
											([key, value]) => (
												<div
													key={key}
													className="flex items-center justify-between"
												>
													<div className="space-y-0.5">
														<Label className="capitalize">
															{key
																.replace(/([A-Z])/g, " $1")
																.replace(/^./, (str) => str.toUpperCase())}
														</Label>
														<p className="text-sm text-muted-foreground">
															{getNotificationDescription(key)}
														</p>
													</div>
													<Switch
														checked={value as boolean}
														onCheckedChange={(checked) =>
															updateNestedSetting(
																"notifications",
																"inApp",
																key,
																checked
															)
														}
													/>
												</div>
											)
										)}
									</CardContent>
								</Card>
							</TabsContent>

							{/* Privacy Settings */}
							<TabsContent value="privacy" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconEye className="h-5 w-5" />
											Profile Privacy
										</CardTitle>
										<CardDescription>
											Control who can see your profile information
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label>Profile Visibility</Label>
											<Select
												value={settings.privacy.profileVisibility}
												onValueChange={(value) =>
													updateSetting("privacy", "profileVisibility", value)
												}
											>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="public">Public</SelectItem>
													<SelectItem value="crew-only">
														Crew Members Only
													</SelectItem>
													<SelectItem value="private">Private</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<Separator />

										{[
											"showStats",
											"showAchievements",
											"showContent",
											"allowDirectMessages",
											"showOnlineStatus",
										].map((key) => (
											<div
												key={key}
												className="flex items-center justify-between"
											>
												<div className="space-y-0.5">
													<Label className="capitalize">
														{key
															.replace(/([A-Z])/g, " $1")
															.replace(/^./, (str) => str.toUpperCase())}
													</Label>
													<p className="text-sm text-muted-foreground">
														{getPrivacyDescription(key)}
													</p>
												</div>
												<Switch
													checked={
														settings.privacy[
															key as keyof typeof settings.privacy
														] as boolean
													}
													onCheckedChange={(checked) =>
														updateSetting("privacy", key, checked)
													}
												/>
											</div>
										))}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconShield className="h-5 w-5" />
											Data & Analytics
										</CardTitle>
										<CardDescription>
											Control how your data is used
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{["dataProcessing", "analytics"].map((key) => (
											<div
												key={key}
												className="flex items-center justify-between"
											>
												<div className="space-y-0.5">
													<Label className="capitalize">
														{key
															.replace(/([A-Z])/g, " $1")
															.replace(/^./, (str) => str.toUpperCase())}
													</Label>
													<p className="text-sm text-muted-foreground">
														{getPrivacyDescription(key)}
													</p>
												</div>
												<Switch
													checked={
														settings.privacy[
															key as keyof typeof settings.privacy
														] as boolean
													}
													onCheckedChange={(checked) =>
														updateSetting("privacy", key, checked)
													}
												/>
											</div>
										))}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconTrash className="h-5 w-5" />
											Data Management
										</CardTitle>
										<CardDescription>
											Export or delete your data
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex flex-col sm:flex-row gap-2">
											<Button variant="outline" onClick={exportData}>
												<IconDownload className="h-4 w-4 mr-2" />
												Export My Data
											</Button>
											<Button variant="destructive" onClick={deleteAccount}>
												<IconTrash className="h-4 w-4 mr-2" />
												Delete Account
											</Button>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Appearance Settings */}
							<TabsContent value="appearance" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<IconPalette className="h-5 w-5" />
											Theme
										</CardTitle>
										<CardDescription>
											Customize the look and feel of your dashboard
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label>Color Theme</Label>
											<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
												{[
													{ value: "light", label: "Light", icon: IconSun },
													{ value: "dark", label: "Dark", icon: IconMoon },
													{
														value: "system",
														label: "System",
														icon: IconDeviceDesktop,
													},
												].map(({ value, label, icon: Icon }) => (
													<Button
														key={value}
														variant={
															settings.appearance.theme === value
																? "default"
																: "outline"
														}
														className="justify-start h-auto p-3"
														onClick={() =>
															updateSetting("appearance", "theme", value)
														}
													>
														<Icon className="h-4 w-4 mr-2" />
														{label}
													</Button>
												))}
											</div>
										</div>

										<Separator />

										{["compactMode", "animationsEnabled", "highContrast"].map(
											(key) => (
												<div
													key={key}
													className="flex items-center justify-between"
												>
													<div className="space-y-0.5">
														<Label className="capitalize">
															{key
																.replace(/([A-Z])/g, " $1")
																.replace(/^./, (str) => str.toUpperCase())}
														</Label>
														<p className="text-sm text-muted-foreground">
															{getAppearanceDescription(key)}
														</p>
													</div>
													<Switch
														checked={
															settings.appearance[
																key as keyof typeof settings.appearance
															] as boolean
														}
														onCheckedChange={(checked) =>
															updateSetting("appearance", key, checked)
														}
													/>
												</div>
											)
										)}
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
