import { Brain, Zap, CheckCircle2 } from "lucide-react"

export function FeaturesSection() {
    return (
        <section
            id="features"
            className="min-h-screen w-full flex items-center justify-center bg-muted px-4 sm:px-6 lg:px-8 py-20"
        >
            <div className="max-w-6xl w-full mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                        Smart Features for Smart Work
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        Everything you need to manage tasks efficiently and focus on what truly matters
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="group bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                            <Brain className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">AI Priority Analysis</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Our intelligent algorithm analyzes your tasks and automatically suggests the optimal order based on
                            urgency, importance, and dependencies.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="group bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                            <Zap className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">Lightning Fast Sync</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Real-time synchronization across all your devices. Start a task on your phone, finish it on your desktop
                            with zero lag.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="group bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                            <CheckCircle2 className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">Effortless Organization</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Organize tasks with smart categories, tags, and custom workflows. Find exactly what you need in seconds.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
