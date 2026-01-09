"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Task, db } from "@/db/db"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { GripVertical } from "lucide-react"
import { useState } from "react"

import { MonthView } from "@/components/dashboard/month-view"

export default function DashboardPage() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [view, setView] = useState<"week" | "month">("week")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeTask, setActiveTask] = useState<(Task & { origin?: 'sidebar' | 'calendar' }) | null>(null)

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        },
    }))

    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current) {
            setActiveTask(event.active.data.current as Task & { origin?: 'sidebar' | 'calendar' })
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveTask(null);

        if (over && over.data.current && active.data.current) {
            const task = active.data.current as Task;
            let newScheduledDate: Date;

            if (over.data.current.isMonthView) {
                // Month View Drop
                newScheduledDate = new Date(over.data.current.day);
                newScheduledDate.setHours(9); // Default to 9 AM
                newScheduledDate.setMinutes(0);
            } else {
                // Week View (CalendarSlot) Drop
                const overData = over.data.current as { day: Date, hour: number };
                newScheduledDate = new Date(overData.day);
                newScheduledDate.setHours(overData.hour);
                newScheduledDate.setMinutes(0);
            }

            await db.tasks.update(task.id, {
                scheduledDate: newScheduledDate,
                status: 'todo'
            });
        }
    }

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex h-screen bg-background overflow-hidden relative">
                {/* Sidebar */}
                <AppSidebar isOpen={sidebarOpen} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <DashboardHeader
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        view={view}
                        onViewChange={setView}
                    />
                    {view === 'week' ? (
                        <CalendarView selectedDate={selectedDate} />
                    ) : (
                        <MonthView selectedDate={selectedDate} />
                    )}
                </div>

                <DragOverlay>
                    {activeTask ? (
                        activeTask.origin === 'calendar' ? (
                            <div className="bg-white border-l-[3px] border-green-500 rounded px-2 py-1 text-xs shadow-xl opacity-90 cursor-grabbing w-32 truncate">
                                <p className="font-semibold text-gray-800 leading-tight">{activeTask.title}</p>
                            </div>
                        ) : (
                            <div className="w-64 opacity-90 rotate-2 cursor-grabbing">
                                <Card className="p-3 bg-card border-border shadow-xl text-left">
                                    <div className="flex items-start gap-2">
                                        <span className="mt-0.5 text-muted-foreground">
                                            <GripVertical className="w-4 h-4" />
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-foreground line-clamp-2 font-medium">{activeTask.title}</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    )
}
