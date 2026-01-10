"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { CalendarTaskCard } from "@/components/dashboard/calendar-task-card"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Task, db } from "@/db/db"
import { applyTaskDrop } from "@/db/taskDomain"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { GripVertical } from "lucide-react"
import { useState } from "react"

import { KanbanView } from "@/components/dashboard/kanban-view"
import { MonthView } from "@/components/dashboard/month-view"

export default function DashboardPage() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [view, setView] = useState<"week" | "month" | "kanban">("month")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeTask, setActiveTask] = useState<(Task & { origin?: 'sidebar' | 'calendar' | 'kanban', isMonthView?: boolean }) | null>(null)
    const [dragDimensions, setDragDimensions] = useState<{ width: number, height: number } | null>(null)

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3,
            tolerance: 5,
        },
    }))

    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current) {
            setActiveTask(event.active.data.current as Task & { origin?: 'sidebar' | 'calendar' | 'kanban', isMonthView?: boolean })

            // Capture dimensions of the dragged element
            const activeNode = event.active.data.current?.origin === 'calendar'
                ? document.getElementById(`calendar-${event.active.data.current.id}`)
                : null;

            if (activeNode) {
                const rect = activeNode.getBoundingClientRect();
                setDragDimensions({ width: rect.width, height: rect.height });
            } else {
                setDragDimensions(null);
            }
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveTask(null);
        setDragDimensions(null);

        if (over && over.data.current && active.data.current) {
            const task = active.data.current as Task;
            const activeTaskData = active.data.current as Task & { origin?: string };

            // Determine target type based on drop zone data
            let targetType: 'calendar-week' | 'calendar-month' | 'kanban';
            if (over.data.current.isKanban) {
                targetType = 'kanban';
            } else if (over.data.current.isMonthView) {
                targetType = 'calendar-month';
            } else {
                targetType = 'calendar-week';
            }

            // Use centralized domain logic to determine updates
            const updates = applyTaskDrop({
                task,
                source: {
                    type: (activeTaskData.origin || 'sidebar') as 'sidebar' | 'calendar' | 'kanban',
                    data: active.data.current
                },
                target: {
                    type: targetType,
                    data: over.data.current
                }
            });

            // Apply updates to database
            await db.tasks.update(task.id, updates);
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
                    ) : view === 'month' ? (
                        <MonthView selectedDate={selectedDate} />
                    ) : (
                        <KanbanView />
                    )}
                </div>

                <DragOverlay>
                    {activeTask ? (
                        activeTask.origin === 'calendar' ? (
                            <CalendarTaskCard
                                task={activeTask}
                                isMonthView={activeTask.isMonthView}
                                className="cursor-grabbing shadow-2xl opacity-90"
                                style={dragDimensions ? { width: dragDimensions.width, height: dragDimensions.height } : undefined}
                            />
                        ) : activeTask.origin === 'kanban' ? (
                            <div className="w-64 opacity-90 cursor-grabbing">
                                <Card className="p-3 bg-card border-border shadow-xl text-left">
                                    <p className="text-sm text-foreground line-clamp-2 font-medium">{activeTask.title}</p>
                                </Card>
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
