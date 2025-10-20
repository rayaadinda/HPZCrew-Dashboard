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
	const backendUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
	const messagesEndRef = useRef<HTMLDivElement>(null)

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

	const fetchCommands = async () => {
		try {
			const token = (await supabase.auth.getSession())?.data.session
				?.access_token
			if (!token) return

			const response = await fetch(`${backendUrl}/api/chat/commands`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				const data = await response.json()
				setAvailableCommands(data.commands || [])
			}
		} catch (error) {
			console.error("Failed to fetch commands:", error)
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
		if (e.key === "Enter" && !e.shiftKey) {
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
					<div className="px-4 lg:px-6 flex-1">
						<Card className="h-[calc(100vh-280px)] flex flex-col">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg flex items-center gap-2">
									<IconMessageCircle className="size-5" />
									Chat Assistant
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-1 flex flex-col p-0">
								<ScrollArea className="flex-1 p-4">
									<div className="space-y-4">
										{messages.map((message) => (
											<div
												key={message.id}
												className={`flex gap-3 ${
													message.type === "user"
														? "justify-end"
														: "justify-start"
												}`}
											>
												{message.type !== "user" && (
													<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
														{message.type === "command" ? (
															<IconCommand className="size-4 text-primary-foreground" />
														) : (
															<IconBolt className="size-4 text-primary-foreground" />
														)}
													</div>
												)}

												<div
													className={`max-w-[75%] rounded-lg p-4 ${
														message.type === "user"
															? "bg-primary text-primary-foreground"
															: message.type === "command"
															? "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
															: "bg-muted"
													}`}
												>
													{message.type === "user" ? (
														<p className="text-sm whitespace-pre-wrap">
															{message.content}
														</p>
													) : (
														<div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-headings:my-2">
															<ReactMarkdown remarkPlugins={[remarkGfm]}>
																{message.content}
															</ReactMarkdown>
														</div>
													)}
													<p className="text-xs opacity-70 mt-2 pt-2 border-t border-current/10">
														{formatTimestamp(message.timestamp)}
													</p>
												</div>

												{message.type === "user" && (
													<div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
														<IconUser className="size-4 text-secondary-foreground" />
													</div>
												)}
											</div>
										))}

										{isLoading && (
											<div className="flex gap-3 justify-start">
												<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
													<IconBolt className="size-4 text-primary-foreground" />
												</div>
												<div className="bg-muted rounded-lg p-3">
													<div className="flex items-center gap-2">
														<IconLoader2 className="size-4 animate-spin" />
														<span className="text-sm">Mengetik...</span>
													</div>
												</div>
											</div>
										)}

										<div ref={messagesEndRef} />
									</div>
								</ScrollArea>

								{/* Input Area */}
								<div className="border-t p-4">
									<div className="flex gap-2">
										<Input
											value={inputValue}
											onChange={(e) => setInputValue(e.target.value)}
											onKeyPress={handleKeyPress}
											placeholder="Ketik pesan atau perintah (misal: /misi)..."
											disabled={isLoading}
											className="flex-1"
										/>
										<Button
											onClick={sendMessage}
											disabled={!inputValue.trim() || isLoading}
											size="icon"
										>
											{isLoading ? (
												<IconLoader2 className="size-4 animate-spin" />
											) : (
												<IconSend className="size-4" />
											)}
										</Button>
									</div>
									<div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
										<IconBulb className="size-3" />
										<span>Gunakan / untuk melihat perintah yang tersedia</span>
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
