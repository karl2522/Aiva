"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DashboardHeaderProps {
    selectedDate: Date
    onDateChange: (date: Date) => void
    view: "week" | "month"
    onViewChange: (view: "week" | "month") => void
}

export function DashboardHeader({ selectedDate, onDateChange, view, onViewChange }: DashboardHeaderProps) {
    const weekStart = new Date(selectedDate)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    const monthName = selectedDate.toLocaleString("default", { month: "long" })
    const year = selectedDate.getFullYear()
    const weekNumber = Math.ceil((selectedDate.getDate() + 6) / 7)

    const handlePrev = () => {
        const newDate = new Date(selectedDate)
        if (view === "week") {
            newDate.setDate(newDate.getDate() - 7)
        } else {
            newDate.setMonth(newDate.getMonth() - 1)
        }
        onDateChange(newDate)
    }

    const handleNext = () => {
        const newDate = new Date(selectedDate)
        if (view === "week") {
            newDate.setDate(newDate.getDate() + 7)
        } else {
            newDate.setMonth(newDate.getMonth() + 1)
        }
        onDateChange(newDate)
    }

    const handleJumpToday = () => {
        onDateChange(new Date())
    }

    return (
        <div className="border-b border-slate-200 bg-slate-50/80 p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="text-lg md:text-xl font-bold text-foreground">
                        {view === 'week' ? `${monthName} ${year} / W${weekNumber}` : `${monthName} ${year}`}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handlePrev} className="text-foreground hover:bg-secondary">
                            <ChevronLeft size={18} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleNext} className="text-foreground hover:bg-secondary">
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <Tabs value={view} onValueChange={(v) => onViewChange(v as "week" | "month")}>
                        <TabsList>
                            <TabsTrigger value="month">Month</TabsTrigger>
                            <TabsTrigger value="week">Week</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Button variant="outline" size="sm" onClick={handleJumpToday} className="text-foreground bg-transparent">
                        Today
                    </Button>
                </div>
            </div>
        </div>
    )
}
