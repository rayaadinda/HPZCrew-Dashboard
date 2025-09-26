"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
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
import {
	IconMail,
	IconLock,
	IconEye,
	IconEyeOff,
	IconLoader,
} from "@tabler/icons-react"
import Link from "next/link"

export default function AuthPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { signIn, signUp, loading } = useAuth()
	const [isSignUp, setIsSignUp] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Handle callback errors from URL parameters
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
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="flex items-center gap-2">
					<IconLoader className="h-5 w-5 animate-spin" />
					<span>Loading...</span>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-4">
					<h1 className="text-2xl font-bold text-gray-900">
						HPZ Crew Dashboard
					</h1>
					<p className="text-gray-600 mt-2">
						{isSignUp ? "Create your account" : "Welcome back"}
					</p>
				</div>

				{/* Auth Card */}
				<Card>
					<CardHeader>
						<CardTitle>{isSignUp ? "Create Account" : "Sign In"}</CardTitle>
						<CardDescription>
							{isSignUp
								? "Enter your details to create your crew account"
								: "Enter your credentials to access your dashboard"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Email Field */}
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="relative">
									<IconMail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="your@email.com"
										value={formData.email}
										onChange={handleInputChange}
										className="pl-10"
										required
									/>
								</div>
							</div>

							{/* Password Field */}
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<IconLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										value={formData.password}
										onChange={handleInputChange}
										className="pl-10 pr-10"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
									>
										{showPassword ? (
											<IconEyeOff className="h-4 w-4" />
										) : (
											<IconEye className="h-4 w-4" />
										)}
									</button>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className="p-3 rounded-lg bg-red-50 border border-red-200">
									<p className="text-sm text-red-600">{error}</p>
								</div>
							)}

							{/* Submit Button */}
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<IconLoader className="h-4 w-4 mr-2 animate-spin" />
										{isSignUp ? "Creating Account..." : "Signing In..."}
									</>
								) : isSignUp ? (
									"Create Account"
								) : (
									"Sign In"
								)}
							</Button>
						</form>

						<Separator className="my-6" />

						{/* Toggle Auth Mode */}
						<div className="text-center">
							<p className="text-sm text-gray-600">
								{isSignUp
									? "Already have an account?"
									: "Don't have an account?"}
							</p>
							<Button
								variant="link"
								onClick={() => {
									setIsSignUp(!isSignUp)
									setError("")
									setFormData({ email: "", password: "" })
								}}
								className="p-0 h-auto font-medium"
							>
								{isSignUp ? "Sign in here" : "Create account"}
							</Button>
						</div>

						{/* Help Text */}
						<div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
							<p className="text-sm text-blue-800">
								<strong>Note:</strong> Only approved HPZ crew members can access
								this dashboard. If you're approved but can't sign in, try
								creating your account first. If you haven't applied yet, please
								submit your application through our main website.
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Footer */}
				<div className="text-center mt-6">
					<p className="text-xs text-gray-500">
						© 2024 HPZ. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	)
}
