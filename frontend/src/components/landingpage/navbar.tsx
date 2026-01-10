"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                                <Image
                                    src="/aiva-logo.png"
                                    alt="Aiva"
                                    fill
                                    className="object-contain"
                                />
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
                            <Link href="#" className="text-foreground hover:text-accent transition-colors font-medium">
                                About
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Launch App</Button>
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
                                href="#"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <div className="flex flex-col gap-2 pt-2">
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Launch App</Button>
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
