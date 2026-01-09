"use client"

import { Task } from "@/db/db"
import { cn } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { TaskContextMenu } from "./task-context-menu"

interface DraggableCalendarTaskProps {
    task: Task
    isMonthView?: boolean
}

export function DraggableCalendarTask({ task, isMonthView }: DraggableCalendarTaskProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `calendar-${task.id}`,
        data: { ...task, origin: 'calendar' }
    });

    const style = transform ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 50,
    } : undefined;

    if (isDragging) {
        // Leave a ghost placeholder or nothing? 
        // Usually rendering with lower opacity is good.
        return (
            <div
                ref={setNodeRef}
                className={cn(
                    "bg-white border-l-[3px] border-green-500 rounded text-xs shadow-sm opacity-50 pointer-events-none",
                    isMonthView ? "px-2 py-1 text-[10px]" : "pl-2 py-1.5"
                )}
                style={style}
            >
                <p className="truncate font-semibold text-gray-800 leading-tight">{task.title}</p>
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="pointer-events-auto relative z-10 touch-none">
            <TaskContextMenu taskId={task.id}>
                <div className={cn(
                    "bg-white border-l-[3px] border-green-500 rounded text-xs shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing truncate group/task",
                    isMonthView ? "px-2 py-1 text-[10px]" : "pl-2 py-1.5"
                )}>
                    <p className="truncate font-semibold text-gray-800 leading-tight">{task.title}</p>
                </div>
            </TaskContextMenu>
        </div>
    )
}
