"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { supabase } from "@/lib/supabase"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	IconSend,
	IconBolt,
	IconUser,
	IconCommand,
	IconBulb,
	IconMessageCircle,
	IconLoader2,
} from "@tabler/icons-react"

interface Message {
	id: string
	type: "user" | "ai" | "command"
	content: string
	timestamp: string
	data?: any
}

interface Command {
	command: string
	description: string
}

export default function ChatbotPage() {
	const { user } = useAuth()
	const [messages, setMessages] = useState<Message[]>([])
	const [inputValue, setInputValue] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [availableCommands, setAvailableCommands] = useState<Command[]>([])
	const [showCommandHelp, setShowCommandHelp] = useState(false)
	const [showCommandSuggestions, setShowCommandSuggestions] = useState(false)
	const [filteredCommands, setFilteredCommands] = useState<Command[]>([])
	const backendUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		fetchCommands()
		setMessages([
			{
				id: "welcome",
				type: "ai",
				content:
					"Hai! 👋 Aku adalah asisten HPZ Crew yang siap membantu kamu! \n\nKetik pesan apa saja atau gunakan perintah:\n• /misi - Lihat misi aktif\n• /poinku - Cek poin kamu\n• /tierku - Info tier kamu\n• /faq - Pertanyaan umum\n• /upgrade - Cara naik tier\n• /hubungiadmin - Kontak admin\n\nAda yang bisa aku bantu?",
				timestamp: new Date().toISOString(),
			},
		])
	}, [])

	// Handle input change and command suggestions
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)

		// Show command suggestions when "/" is typed
		if (value.startsWith("/")) {
			const searchTerm = value.slice(1).toLowerCase()
			const filtered = availableCommands.filter((cmd) =>
				cmd.command.toLowerCase().includes(searchTerm)
			)
			setFilteredCommands(filtered)
			setShowCommandSuggestions(true)
		} else {
			setShowCommandSuggestions(false)
		}
	}

	// Select a command from suggestions
	const selectCommand = (command: string) => {
		setInputValue(command)
		setShowCommandSuggestions(false)
		inputRef.current?.focus()
	}

	const fetchCommands = async () => {
		// Default commands
		const defaultCommands: Command[] = [
			{ command: "/misi", description: "Lihat misi aktif" },
			{ command: "/poinku", description: "Cek poin kamu" },
			{ command: "/tierku", description: "Info tier kamu" },
			{ command: "/faq", description: "Pertanyaan umum" },
			{ command: "/upgrade", description: "Cara naik tier" },
			{ command: "/hubungiadmin", description: "Kontak admin" },
		]

		try {
			const token = (await supabase.auth.getSession())?.data.session
				?.access_token
			if (!token) {
				setAvailableCommands(defaultCommands)
				return
			}

			const response = await fetch(`${backendUrl}/api/chat/commands`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				const data = await response.json()
				setAvailableCommands(data.commands || defaultCommands)
			} else {
				setAvailableCommands(defaultCommands)
			}
		} catch (error) {
			console.error("Failed to fetch commands:", error)
			setAvailableCommands(defaultCommands)
		}
	}

	const getAuthToken = async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession()
		return session?.access_token
	}

	const sendMessage = async () => {
		if (!inputValue.trim() || isLoading) return

		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: inputValue.trim(),
			timestamp: new Date().toISOString(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInputValue("")
		setShowCommandSuggestions(false)
		setIsLoading(true)

		try {
			const token = await getAuthToken()
			if (!token) {
				throw new Error("Not authenticated")
			}

			const response = await fetch(`${backendUrl}/api/chat/message`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					message: inputValue.trim(),
					context: {
						userTier: "Pro Racer",
						userPoints: 1247,
					},
				}),
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()

			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				type: data.type === "command" ? "command" : "ai",
				content: String(data.response.content || ""),
				timestamp: data.timestamp,
				data: data.response,
			}

			setMessages((prev) => [...prev, aiMessage])
		} catch (error) {
			console.error("Failed to send message:", error)

			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				type: "ai",
				content:
					"Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi ya! =O",
				timestamp: new Date().toISOString(),
			}

			setMessages((prev) => [...prev, errorMessage])
		} finally {
			setIsLoading(false)
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			setShowCommandSuggestions(false)
		} else if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			sendMessage()
		}
	}

	const insertCommand = (command: string) => {
		setInputValue(command)
		setShowCommandHelp(false)
	}

	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* Header */}
					<div className="px-4 lg:px-6">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-2xl font-bold flex items-center gap-2">
									<IconBolt className="size-6" />
									HPZ Crew Assistant
								</h1>
								<p className="text-muted-foreground">
									Asisten AI untuk membantu perjalanan kamu di HPZ Crew
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Badge variant="outline" className="text-green-600">
									<div className="size-2 bg-green-500 rounded-full mr-1" />
									Online
								</Badge>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setShowCommandHelp(!showCommandHelp)}
								>
									<IconCommand className="size-4 mr-1" />
									Commands
								</Button>
							</div>
						</div>
					</div>

					{/* Command Help */}
					{showCommandHelp && (
						<div className="px-4 lg:px-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-lg flex items-center gap-2">
										<IconCommand className="size-5" />
										Available Commands
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-2 md:grid-cols-2">
										{availableCommands.map((cmd, index) => (
											<Button
												key={index}
												variant="outline"
												className="justify-start h-auto p-3"
												onClick={() => insertCommand(cmd.command)}
											>
												<div className="text-left">
													<div className="font-mono text-sm">{cmd.command}</div>
													<div className="text-xs text-muted-foreground">
														{cmd.description}
													</div>
												</div>
											</Button>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Chat Messages */}
					<div className="flex-1 overflow-hidden bg-white dark:bg-neutral-900">
						<ScrollArea className="h-[calc(100vh-320px)] px-4 lg:px-6 py-6">
							<div className="space-y-6 max-w-4xl mx-auto pb-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex gap-3 items-end ${
											message.type === "user" ? "justify-end" : "justify-start"
										}`}
									>
										{message.type !== "user" && (
											<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
												{message.type === "command" ? (
													<IconBolt className="size-5 text-primary-foreground" />
												) : (
													<IconBolt className="size-5 text-primary-foreground" />
												)}
											</div>
										)}

										<div className="flex flex-col gap-1 max-w-[75%]">
											<div
												className={`px-4 py-3 ${
													message.type === "user"
														? "bg-neutral-700 dark:bg-neutral-700 text-white rounded-3xl"
														: message.type === "command"
														? "bg-orange-50 dark:bg-orange-900/30 text-foreground rounded-3xl"
														: "bg-neutral-100 dark:bg-neutral-800 text-foreground rounded-3xl"
												}`}
											>
												{message.type === "user" ? (
													<p className="text-sm whitespace-pre-wrap leading-relaxed">
														{message.content}
													</p>
												) : (
													<div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-headings:my-2 prose-strong:font-semibold">
														<ReactMarkdown remarkPlugins={[remarkGfm]}>
															{message.content}
														</ReactMarkdown>
													</div>
												)}
											</div>
											<p
												className={`text-xs text-muted-foreground px-2 ${
													message.type === "user" ? "text-right" : "text-left"
												}`}
											>
												{formatTimestamp(message.timestamp)}
											</p>
										</div>

										{message.type === "user" && (
											<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-neutral-500 to-neutral-600 flex items-center justify-center shadow-md">
												<IconUser className="size-5 text-white" />
											</div>
										)}
									</div>
								))}

								{isLoading && (
									<div className="flex gap-3 items-end justify-start">
										<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
											<IconBolt className="size-5 text-primary-foreground" />
										</div>
										<div className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl px-4 py-3">
											<div className="flex items-center gap-2">
												<IconLoader2 className="size-4 animate-spin text-primary" />
												<span className="text-sm">Mengetik...</span>
											</div>
										</div>
									</div>
								)}

								<div ref={messagesEndRef} />
							</div>
						</ScrollArea>
					</div>

					<div className="px-4 lg:px-6 py-4 bg-white dark:bg-neutral-900 relative">
						<div className="max-w-4xl mx-auto">
							{/* Command Suggestions Dropdown */}
							{showCommandSuggestions && filteredCommands.length > 0 && (
								<div className="absolute bottom-full left-4 right-4 mb-2 max-w-4xl mx-auto bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg overflow-hidden z-50">
									<div className="max-h-64 overflow-y-auto">
										{filteredCommands.map((cmd, index) => (
											<button
												key={index}
												onClick={() => selectCommand(cmd.command)}
												className="w-full px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors border-b border-neutral-100 dark:border-neutral-700 last:border-0"
											>
												<div className="flex items-center gap-3">
													<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
														<IconCommand className="size-4 text-primary" />
													</div>
													<div className="flex-1 min-w-0">
														<div className="font-mono text-sm font-medium text-foreground">
															{cmd.command}
														</div>
														<div className="text-xs text-muted-foreground truncate">
															{cmd.description}
														</div>
													</div>
												</div>
											</button>
										))}
									</div>
								</div>
							)}

							<div className="flex gap-3 relative">
								<Input
									ref={inputRef}
									value={inputValue}
									onChange={handleInputChange}
									onKeyPress={handleKeyPress}
									placeholder="Ketik pesan atau perintah (misal: /misi)..."
									disabled={isLoading}
									className="flex-1 h-11 bg-neutral-100 dark:bg-neutral-800 border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-full"
								/>
								<Button
									onClick={sendMessage}
									disabled={!inputValue.trim() || isLoading}
									size="icon"
									className="h-11 w-11 rounded-full"
								>
									{isLoading ? (
										<IconLoader2 className="size-5 animate-spin" />
									) : (
										<IconSend className="size-5" />
									)}
								</Button>
							</div>
							<div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
								<IconBulb className="size-4 text-primary" />
								<span>Gunakan / untuk melihat perintah yang tersedia</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
