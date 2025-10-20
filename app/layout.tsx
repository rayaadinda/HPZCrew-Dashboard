import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AuthProvider } from "../hooks/useAuth"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "HPZ Crew Dashboard",
	description: "Personal dashboard for HPZ crew members",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
				suppressHydrationWarning
			>
				<AuthProvider>{children}</AuthProvider>
				<Toaster position="top-right" />
			</body>
		</html>
	)
}
