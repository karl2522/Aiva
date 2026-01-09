import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full bg-muted px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="font-bold text-foreground mb-4">Aiva</h4>
                        <p className="text-sm text-muted-foreground">AI-powered task management for modern teams.</p>
                    </div>
                    <div>
                        <h5 className="font-semibold text-foreground mb-4 text-sm">Product</h5>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#features" className="text-muted-foreground hover:text-foreground transition">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold text-foreground mb-4 text-sm">Company</h5>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold text-foreground mb-4 text-sm">Legal</h5>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        {`© ${new Date().getFullYear()} Aiva. All rights reserved.`}
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                            Twitter
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                            LinkedIn
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
