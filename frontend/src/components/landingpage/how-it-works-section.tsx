"use client"

import { ArrowRight } from "lucide-react"

export function HowItWorksSection() {
    return (
        <section
            id="how-it-works"
            className="min-h-screen w-full flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 py-20"
        >
            <div className="max-w-6xl w-full mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">How Aiva Works</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        Three simple steps to intelligent task management
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Step 1 Card */}
                    <div className="group relative bg-gradient-to-br from-off-white to-background border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                1
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-3">Add Your Tasks</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Simply enter your tasks with relevant details. Aiva captures everything you need to stay on track.
                            </p>

                            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-xl p-8 mb-6">
                                <div className="space-y-3">
                                    <div className="h-3 bg-accent/30 rounded-full w-full" />
                                    <div className="h-3 bg-accent/20 rounded-full w-5/6" />
                                    <div className="h-3 bg-accent/10 rounded-full w-4/6" />
                                </div>
                            </div>

                            <div className="flex items-center text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                                Learn more <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </div>

                    {/* Step 2 Card */}
                    <div className="group relative bg-gradient-to-br from-off-white to-background border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 md:translate-y-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                2
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-3">AI Analyzes & Suggests</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Our AI engine processes your tasks and provides intelligent priority suggestions based on urgency and
                                impact.
                            </p>

                            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-xl p-8 mb-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        <div className="h-2 bg-accent/30 rounded-full flex-1" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent/60" />
                                        <div className="h-2 bg-accent/20 rounded-full flex-1" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent/30" />
                                        <div className="h-2 bg-accent/10 rounded-full flex-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                                Learn more <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 Card */}
                    <div className="group relative bg-gradient-to-br from-off-white to-background border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                3
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-3">Execute & Track</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Follow the AI recommendations, track your progress in real-time, and watch your productivity skyrocket.
                            </p>

                            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-xl p-8 mb-6">
                                <div className="space-y-4">
                                    <div className="w-full h-2 bg-accent/20 rounded-full overflow-hidden">
                                        <div className="w-4/5 h-full bg-accent rounded-full" />
                                    </div>
                                    <div className="text-xs text-muted-foreground text-right">80% Complete</div>
                                </div>
                            </div>

                            <div className="flex items-center text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                                Learn more <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center gap-2 text-muted-foreground text-sm mt-16 mb-12">
                    <div className="h-px bg-gradient-to-r from-background to-accent/50 flex-1" />
                    <span>Seamless workflow from start to finish</span>
                    <div className="h-px bg-gradient-to-l from-background to-accent/50 flex-1" />
                </div>
            </div>
        </section>
    )
}
