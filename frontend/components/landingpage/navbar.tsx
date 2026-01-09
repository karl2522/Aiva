"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Fixed Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo / Brand */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
                                <span className="font-bold text-accent-foreground text-lg">A</span>
                            </div>
                            <span className="text-xl font-bold text-foreground hidden sm:inline">Aiva</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="#features" className="text-foreground hover:text-accent transition-colors font-medium">
                                Features
                            </Link>
                            <Link href="#how-it-works" className="text-foreground hover:text-accent transition-colors font-medium">
                                How It Works
                            </Link>
                            <Link href="#pricing" className="text-foreground hover:text-accent transition-colors font-medium">
                                Pricing
                            </Link>
                            <Link href="#" className="text-foreground hover:text-accent transition-colors font-medium">
                                About
                            </Link>
                        </div>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                                Sign In
                            </Button>
                            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                        <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
                            <Link
                                href="#features"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                How It Works
                            </Link>
                            <Link
                                href="#pricing"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="#"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <div className="flex flex-col gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                                >
                                    Sign In
                                </Button>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="h-16 sm:h-20" />
        </>
    )
}
