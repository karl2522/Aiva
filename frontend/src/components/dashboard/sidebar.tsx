"use client"

import { useState } from "react"
import { ChevronDown, Plus, MoreHorizontal, Menu, X, ChevronLeft } from "lucide-react"

interface TaskList {
    id: string
    title: string
    tasks: string[]
    collapsed?: boolean
}

export function DashboardSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
    const [taskLists, setTaskLists] = useState<TaskList[]>([
        {
            id: "this-week",
            title: "This week",
            tasks: [
                "Design onboarding",
                "Write blog criteria",
                "Publish blog post",
                "Book offsite",
                "Setup Zapier integration",
                "Todo",
            ],
            collapsed: false,
        },
        {
            id: "this-month",
            title: "This month",
            tasks: [],
            collapsed: false,
        },
        {
            id: "personal",
            title: "Personal",
            tasks: ["Buy more coffee filters", "Cancel Disney+", "Donate to Unica", "Todo"],
            collapsed: false,
        },
        {
            id: "books",
            title: "Books to read",
            tasks: [],
            collapsed: false,
        },
    ])

    const toggleCollapse = (id: string) => {
        setTaskLists(taskLists.map((list) => (list.id === id ? { ...list, collapsed: !list.collapsed } : list)))
    }

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={onToggle}
                className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:relative md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 h-screen overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                {/* Header */}
                <div className="p-6 border-b border-sidebar-border">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-sidebar-foreground">Aiva</h1>
                        <button
                            onClick={onToggle}
                            className="hidden md:block text-sidebar-foreground hover:text-sidebar-accent transition"
                            title="Collapse sidebar"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button className="md:hidden text-sidebar-foreground hover:text-sidebar-accent transition">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-sidebar-accent"></div>
                        <span className="text-sm font-medium text-sidebar-foreground">Dashboard</span>
                    </div>
                </div>

                {/* Task Lists */}
                <div className="flex-1 p-4 space-y-4">
                    {taskLists.map((list) => (
                        <div key={list.id}>
                            <button
                                onClick={() => toggleCollapse(list.id)}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition text-sidebar-foreground font-medium"
                            >
                                <span>{list.title}</span>
                                <ChevronDown size={16} className={`transition-transform ${list.collapsed ? "-rotate-90" : ""}`} />
                            </button>

                            {!list.collapsed && (
                                <div className="ml-2 mt-2 space-y-1">
                                    {list.tasks.map((task, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-sidebar-foreground transition"
                                        >
                                            <input type="checkbox" className="w-4 h-4 rounded" />
                                            <span>{task}</span>
                                        </div>
                                    ))}
                                    <button className="flex items-center gap-2 p-2 text-sm text-sidebar-accent hover:text-sidebar-primary transition font-medium">
                                        <Plus size={14} /> Add task
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Professional Tier */}
                <div className="p-4 border-t border-sidebar-border bg-secondary rounded-lg m-4 text-sidebar-foreground">
                    <div className="text-sm font-bold mb-2">Professional</div>
                    <div className="text-2xl font-bold text-sidebar-accent mb-2">$10</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                        <div>— Unlimited history</div>
                        <div>— Unlimited share links</div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onToggle} />}
        </>
    )
}
