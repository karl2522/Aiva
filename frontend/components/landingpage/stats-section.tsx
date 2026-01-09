export function StatsSection() {
    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-muted px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-6xl w-full mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                        Trusted by Teams Worldwide
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        See the impact Aiva has made on productivity
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-card rounded-lg p-8 border border-border text-center">
                        <div className="text-4xl font-bold text-accent mb-2">50K+</div>
                        <p className="text-muted-foreground">Active Users</p>
                    </div>
                    <div className="bg-card rounded-lg p-8 border border-border text-center">
                        <div className="text-4xl font-bold text-accent mb-2">2.5M</div>
                        <p className="text-muted-foreground">Tasks Completed</p>
                    </div>
                    <div className="bg-card rounded-lg p-8 border border-border text-center">
                        <div className="text-4xl font-bold text-accent mb-2">94%</div>
                        <p className="text-muted-foreground">Satisfaction Rate</p>
                    </div>
                    <div className="bg-card rounded-lg p-8 border border-border text-center">
                        <div className="text-4xl font-bold text-accent mb-2">30h+</div>
                        <p className="text-muted-foreground">Time Saved Monthly</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
