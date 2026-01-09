import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-foreground px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl w-full mx-auto text-center space-y-8">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance">
                    Ready to Transform Your Productivity?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
                    Join thousands of users who are already saving hours every week with intelligent task management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base">
                        Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-background text-background hover:bg-muted/20 text-base bg-transparent"
                    >
                        Schedule Demo
                    </Button>
                </div>
            </div>
        </section>
    )
}
