"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Columns } from "lucide-react"

interface DashboardHeaderProps {
    selectedDate: Date
    onDateChange: (date: Date) => void
    view: "week" | "month" | "kanban"
    onViewChange: (view: "week" | "month" | "kanban") => void
}

export function DashboardHeader({ selectedDate, onDateChange, view, onViewChange }: DashboardHeaderProps) {
    // Centralized view type checking
    const isCalendarView = view === 'week' || view === 'month';
    const mainView = isCalendarView ? 'calendar' : 'kanban';

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

    const handleMainViewChange = (newMainView: string) => {
        if (newMainView === 'calendar') {
            // Default to month view when switching to calendar
            onViewChange('month');
        } else {
            onViewChange('kanban');
        }
    }

    return (
        <div className="border-b border-slate-200 dark:border-neutral-800 bg-slate-50/80 dark:bg-neutral-950 p-4 md:p-6">
            <div className="flex items-center justify-between">
                {/* Left Side: Main View Switcher */}
                <Tabs value={mainView} onValueChange={handleMainViewChange}>
                    <TabsList className="bg-white dark:bg-neutral-900 h-11">
                        <TabsTrigger value="calendar" className="gap-2 text-base font-semibold px-4">
                            <CalendarIcon className="w-5 h-5" />
                            Calendar
                        </TabsTrigger>
                        <TabsTrigger value="kanban" className="gap-2 text-base font-semibold px-4">
                            <Columns className="w-5 h-5" />
                            Kanban
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Right Side: Date Navigation + Month/Week Toggle (Calendar only) */}
                {isCalendarView && (
                    <div className="flex items-center gap-3">
                        {/* Date Navigation */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={handlePrev} className="text-foreground hover:bg-secondary h-9 w-9 p-0">
                                <ChevronLeft size={18} />
                            </Button>
                            <div className="text-sm font-medium text-foreground min-w-[140px] text-center">
                                {view === 'week'
                                    ? `${monthName} ${year} / W${weekNumber}`
                                    : `${monthName} ${year}`
                                }
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleNext} className="text-foreground hover:bg-secondary h-9 w-9 p-0">
                                <ChevronRight size={18} />
                            </Button>
                        </div>

                        {/* Separator */}
                        <div className="h-8 w-px bg-slate-300 dark:bg-neutral-700" />

                        {/* Month/Week Switcher */}
                        <Tabs value={view} onValueChange={(v) => onViewChange(v as "week" | "month")}>
                            <TabsList className="h-9">
                                <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                                <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                )}
            </div>
        </div>
    )
}
