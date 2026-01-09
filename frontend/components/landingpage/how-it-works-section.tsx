import { CheckCircle2, Brain, Zap } from "lucide-react"

export function HowItWorksSection() {
    return (
        <section
            id="how-it-works"
            className="min-h-screen w-full flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 py-20"
        >
            <div className="max-w-5xl w-full mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">How Aiva Works</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        Simple steps to transform your productivity
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-4">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-3">Add Your Tasks</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Simply enter your tasks with relevant details. Our platform captures everything you need to stay on
                                track.
                            </p>
                        </div>
                        <div className="md:w-1/2 h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
                            <div className="text-center">
                                <CheckCircle2 className="w-16 h-16 text-accent/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">Task Input Demo</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row-reverse gap-8 items-start md:items-center">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-4">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-3">AI Analyzes & Suggests</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Our AI engine processes your tasks and provides intelligent priority suggestions based on multiple
                                factors.
                            </p>
                        </div>
                        <div className="md:w-1/2 h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
                            <div className="text-center">
                                <Brain className="w-16 h-16 text-accent/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">AI Analysis Demo</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-4">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-3">Execute & Track</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Follow the AI recommendations, track your progress in real-time, and watch your productivity soar.
                            </p>
                        </div>
                        <div className="md:w-1/2 h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
                            <div className="text-center">
                                <Zap className="w-16 h-16 text-accent/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">Execution Demo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
