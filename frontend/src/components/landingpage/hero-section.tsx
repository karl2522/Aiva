"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-7xl w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full border border-border w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-muted-foreground font-medium">Aiva is currently in public beta</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                            Master Your Day with <span className="text-accent">AI-Powered Priorities</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-balance">
                            Aiva analyzes your tasks and suggests smart priority recommendations. Focus on what matters most,
                            eliminate distractions, and achieve your goals with intelligent task management.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-medium cursor-pointer">
                                    Launch App <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>


                    </div>

                    {/* Right Column - Dashboard Mockup */}
                    <div className="relative h-full min-h-[500px] order-1 lg:order-2 flex items-center justify-center">
                        {/* Background Grid Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent rounded-2xl" />

                        {/* Main Dashboard Card */}
                        <div className="relative w-full max-w-sm">
                            {/* Top Card - Sidebar & Main View */}
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-border/50">
                                <div className="flex">
                                    {/* Sidebar */}
                                    <div className="w-24 bg-gradient-to-b from-accent/10 to-accent/5 border-r border-border/50 p-4 space-y-6">
                                        <div className="w-8 h-8 rounded-lg bg-accent" />
                                        <div className="space-y-4">
                                            <div className="w-6 h-6 rounded bg-accent/30" />
                                            <div className="w-6 h-6 rounded bg-accent/20" />
                                            <div className="w-6 h-6 rounded bg-accent/20" />
                                            <div className="w-6 h-6 rounded bg-accent/20" />
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 p-6 space-y-5">
                                        {/* Header */}
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-slate-900 text-lg">Tasks Today</h3>
                                            <p className="text-xs text-gray-500">8 tasks • 3 prioritized by AI</p>
                                        </div>

                                        {/* Task Items */}
                                        <div className="space-y-3">
                                            {/* High Priority Task */}
                                            <div className="p-3 rounded-lg bg-red-50 border border-red-200/50">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-slate-900 truncate">Finalize Q1 Strategy</p>
                                                        <p className="text-xs text-gray-500">Due in 2 hours • AI suggested</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Medium Priority Task */}
                                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/50">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-slate-900 truncate">Design Review</p>
                                                        <p className="text-xs text-gray-500">Due tomorrow • 60% complete</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Low Priority Task */}
                                            <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-slate-900 truncate">Email Client Follow-up</p>
                                                        <p className="text-xs text-gray-500">This week • AI suggested</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Insights Badge */}
                                        <div className="pt-2 border-t border-border/50">
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/5 border border-accent/20">
                                                <Sparkles className="w-3 h-3 text-accent flex-shrink-0" />
                                                <span className="text-xs font-medium text-accent">AI Insights Ready</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-8 -left-12 bg-white rounded-xl shadow-lg p-4 border border-border/50 w-40">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">42%</p>
                                    <p className="text-xs text-gray-500 mt-1">Productivity Boost</p>
                                </div>
                            </div>

                            {/* Floating Priority Chip */}
                            <div className="absolute top-8 -right-8 bg-white rounded-full shadow-lg p-3 border border-border/50 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-xs font-medium text-slate-900">High Priority</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
