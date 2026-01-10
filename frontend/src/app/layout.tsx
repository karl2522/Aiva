import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import type React from "react"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
    title: "Aiva - AI-Powered Productivity",
    description:
        "Intelligent task management with AI-powered priority suggestions. Organize, prioritize, and achieve more with smart task recommendations.",
    generator: "v0.app",
    icons: {
        icon: "/aiva-logo.png",
        shortcut: "/aiva-logo.png",
        apple: "/aiva-logo.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
                {children}
                <Analytics />
                <Toaster />
            </body>
        </html>
    )
}
