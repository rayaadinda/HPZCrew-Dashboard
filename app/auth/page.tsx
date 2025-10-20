"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
	IconEye,
	IconEyeOff,
	IconLoader,
	IconBrandGoogle,
	IconBrandGithub,
} from "@tabler/icons-react"

export default function AuthPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { signIn, signUp, loading } = useAuth()
	const [isSignUp, setIsSignUp] = useState(true)
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	})
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const callbackError = searchParams.get("error")
		const callbackMessage = searchParams.get("message")

		if (callbackError) {
			switch (callbackError) {
				case "auth_callback_error":
					setError(
						callbackMessage
							? decodeURIComponent(callbackMessage)
							: "Authentication failed"
					)
					break
				case "unexpected_error":
					setError("An unexpected error occurred during authentication")
					break
				case "no_code_provided":
					setError("Invalid confirmation link")
					break
				default:
					setError("Authentication error occurred")
			}
		}
	}, [searchParams])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setIsSubmitting(true)

		try {
			const result = isSignUp
				? await signUp(formData.email, formData.password)
				: await signIn(formData.email, formData.password)

			if (result.error) {
				setError(result.error)
			} else {
				router.push("/dashboard")
			}
		} catch (err) {
			setError("An unexpected error occurred")
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	if (loading) {
		return (
			<div className="min-h-screen flex p-4 bg-black">
				<div className="hidden lg:flex lg:w-1/2 relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
					<div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
						<Skeleton className="w-32 h-32 rounded-full mb-8 bg-gray-700" />
						<Skeleton className="h-8 w-3/4 mb-4 bg-gray-700" />
						<Skeleton className="h-4 w-full mb-2 bg-gray-700" />
						<Skeleton className="h-4 w-5/6 mb-12 bg-gray-700" />

						<div className="space-y-4 w-full max-w-md">
							<Skeleton className="h-16 w-full rounded-2xl bg-gray-700" />
							<Skeleton className="h-16 w-full rounded-2xl bg-gray-700" />
							<Skeleton className="h-16 w-full rounded-2xl bg-gray-700" />
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/2 flex items-center justify-center bg-black p-8">
					<div className="w-full max-w-md space-y-6">
						<div className="space-y-2">
							<Skeleton className="h-8 w-48 bg-gray-800" />
							<Skeleton className="h-4 w-64 bg-gray-800" />
						</div>

						<div className="flex gap-4">
							<Skeleton className="h-10 flex-1 bg-gray-800" />
						</div>

						<Skeleton className="h-px w-full bg-gray-800" />

						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<Skeleton className="h-20 bg-gray-800" />
								<Skeleton className="h-20 bg-gray-800" />
							</div>
							<Skeleton className="h-20 bg-gray-800" />
							<Skeleton className="h-20 bg-gray-800" />
							<Skeleton className="h-10 w-full bg-gray-800" />
						</div>

						<Skeleton className="h-4 w-56 mx-auto bg-gray-800" />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen flex p-4 bg-black">
			<div className="hidden lg:flex lg:w-1/2 relative rounded-2xl overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: "url(/bg-gradient.jpg)" }}
				></div>
				<div className="absolute inset-0 bg-black/20"></div>

				<div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
					<div className="flex items-center gap-2 mb-8">
						<div className="">
							<Image
								src="/hpz-logo-white.png"
								alt="HPZ Crew"
								width={128}
								height={128}
							/>
						</div>
					</div>

					<div className="max-w-md w-full">
						<h1 className="text-3xl text-center font-bold mb-4">
							Bergabung dengan HPZ Crew
						</h1>
						<p className="text-center text-white/90 mb-12">
							Dashboard eksklusif untuk crew HPZ yang telah disetujui. Kelola
							konten, pantau performa, dan raih pencapaian bersama komunitas
							motor terbaik.
						</p>

						<div className="space-y-4">
							<div className="flex items-center gap-4 p-4 rounded-2xl bg-white text-black">
								<div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-semibold">
									1
								</div>
								<span className="font-medium">Daftar akun crew Anda</span>
							</div>

							<div className="flex items-center gap-4 p-4 rounded-2xl bg-red-600/30 text-white backdrop-blur-sm">
								<div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white text-sm font-semibold">
									2
								</div>
								<span className="font-medium">Akses dashboard & statistik</span>
							</div>

							<div className="flex items-center gap-4 p-4 rounded-2xl bg-red-600/30 text-white backdrop-blur-sm">
								<div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white text-sm font-semibold">
									3
								</div>
								<span className="font-medium">Mulai kontribusi konten</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full lg:w-1/2 flex items-center justify-center bg-black p-8">
				<div className="w-full max-w-md">
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-white mb-2">
							{isSignUp ? "Sign Up Account" : "Log In"}
						</h2>
						<p className="text-gray-400">
							{isSignUp
								? "Enter your personal data to create your account."
								: "Enter your credentials to access your account."}
						</p>
					</div>

					<div className="flex gap-4 mb-6">
						<Button
							type="button"
							variant="outline"
							className="flex-1 bg-transparent border-gray-700 text-white hover:bg-gray-900"
						>
							<IconBrandGoogle className="w-5 h-5 mr-2" />
							Google
						</Button>
					</div>

					<div className="relative mb-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-700"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-black text-gray-400">Or</span>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						{isSignUp && (
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="firstName" className="text-white">
										First Name
									</Label>
									<Input
										id="firstName"
										name="firstName"
										type="text"
										placeholder="eg. John"
										value={formData.firstName}
										onChange={handleInputChange}
										className="bg-transparent border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName" className="text-white">
										Last Name
									</Label>
									<Input
										id="lastName"
										name="lastName"
										type="text"
										placeholder="eg. Francisco"
										value={formData.lastName}
										onChange={handleInputChange}
										className="bg-transparent border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500"
									/>
								</div>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="email" className="text-white">
								Email
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="eg. johnfrancis@gmail.com"
								value={formData.email}
								onChange={handleInputChange}
								className="bg-transparent border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password" className="text-white">
								Password
							</Label>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									value={formData.password}
									onChange={handleInputChange}
									className="bg-transparent border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500 pr-10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
								>
									{showPassword ? (
										<IconEyeOff className="h-4 w-4" />
									) : (
										<IconEye className="h-4 w-4" />
									)}
								</button>
							</div>
							{isSignUp && (
								<p className="text-xs text-gray-500">
									Must be at least 8 characters.
								</p>
							)}
						</div>

						{error && (
							<div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50">
								<p className="text-sm text-red-400">{error}</p>
							</div>
						)}

						<Button
							type="submit"
							className="w-full bg-white text-black hover:bg-gray-200"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<IconLoader className="h-4 w-4 mr-2 animate-spin" />
									{isSignUp ? "Creating..." : "Signing In..."}
								</>
							) : isSignUp ? (
								"Sign Up"
							) : (
								"Log In"
							)}
						</Button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-gray-400 text-sm">
							{isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
							<button
								onClick={() => {
									setIsSignUp(!isSignUp)
									setError("")
									setFormData({
										firstName: "",
										lastName: "",
										email: "",
										password: "",
									})
								}}
								className="text-white font-semibold hover:underline"
							>
								{isSignUp ? "Log In" : "Sign Up"}
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
