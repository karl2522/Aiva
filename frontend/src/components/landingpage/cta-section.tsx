import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

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
                <div className="flex justify-center pt-4">
                    <Link href="/dashboard">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base cursor-pointer">
                            Launch App <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
