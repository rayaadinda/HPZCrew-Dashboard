"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react"

export function LoginForm() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const { signIn, signUp, resetPassword } = useAuth()

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setMessage("")
		setIsLoading(true)

		const result = await signIn(email, password)

		if (result.error) {
			setError(result.error)
		}

		setIsLoading(false)
	}

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setMessage("")

		if (password !== confirmPassword) {
			setError("Passwords do not match")
			return
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters")
			return
		}

		setIsLoading(true)

		const result = await signUp(email, password)

		if (result.error) {
			setError(result.error)
		} else {
			setMessage("Check your email for verification link!")
		}

		setIsLoading(false)
	}

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setMessage("")

		if (!email) {
			setError("Please enter your email address")
			return
		}

		setIsLoading(true)

		const result = await resetPassword(email)

		if (result.error) {
			setError(result.error)
		} else {
			setMessage("Password reset email sent! Check your inbox.")
		}

		setIsLoading(false)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className="text-center space-y-2">
					<div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
						<span className="text-2xl font-bold text-white">HPZ</span>
					</div>
					<CardTitle className="text-2xl font-bold">
						HPZ Crew Dashboard
					</CardTitle>
					<CardDescription>
						Access your personalized dashboard for approved crew members
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Tabs defaultValue="signin" className="space-y-4">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="signin">Sign In</TabsTrigger>
							<TabsTrigger value="signup">Sign Up</TabsTrigger>
						</TabsList>

						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						{message && (
							<Alert>
								<Mail className="h-4 w-4" />
								<AlertDescription>{message}</AlertDescription>
							</Alert>
						)}

						<TabsContent value="signin">
							<form onSubmit={handleSignIn} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="signin-email">Email</Label>
									<Input
										id="signin-email"
										type="email"
										placeholder="your@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										disabled={isLoading}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="signin-password">Password</Label>
									<Input
										id="signin-password"
										type="password"
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										disabled={isLoading}
									/>
								</div>

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Signing in...
										</>
									) : (
										<>
											<Lock className="mr-2 h-4 w-4" />
											Sign In
										</>
									)}
								</Button>

								<Button
									type="button"
									variant="link"
									className="w-full text-sm"
									onClick={handleResetPassword}
									disabled={isLoading}
								>
									Forgot your password?
								</Button>
							</form>
						</TabsContent>

						<TabsContent value="signup">
							<form onSubmit={handleSignUp} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="signup-email">Email</Label>
									<Input
										id="signup-email"
										type="email"
										placeholder="your@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										disabled={isLoading}
									/>
									<p className="text-xs text-gray-600">
										Use the same email from your approved application
									</p>
								</div>

								<div className="space-y-2">
									<Label htmlFor="signup-password">Password</Label>
									<Input
										id="signup-password"
										type="password"
										placeholder="Create a password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										disabled={isLoading}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirm-password">Confirm Password</Label>
									<Input
										id="confirm-password"
										type="password"
										placeholder="Confirm your password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
										disabled={isLoading}
									/>
								</div>

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Creating account...
										</>
									) : (
										<>
											<Mail className="mr-2 h-4 w-4" />
											Create Account
										</>
									)}
								</Button>
							</form>
						</TabsContent>
					</Tabs>

					<div className="mt-6 pt-4 border-t border-gray-200">
						<p className="text-xs text-center text-gray-600">
							Only approved HPZ crew members can access this dashboard.
							<br />
							Need help? Contact our admin team.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
