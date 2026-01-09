"use client"

import { Task } from "@/db/db"
import { useLists } from "@/hooks/use-lists"
import { cn } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { TaskContextMenu } from "./task-context-menu"

interface DraggableCalendarTaskProps {
    task: Task
    isMonthView?: boolean
    style?: React.CSSProperties
}

export function DraggableCalendarTask({ task, isMonthView, style: propStyle }: DraggableCalendarTaskProps) {
    const lists = useLists();
    const list = lists?.find(l => l.id === task.listId);
    const listColor = list?.color || "#22c55e"; // Default green if not found

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `calendar-${task.id}`,
        data: { ...task, origin: 'calendar' }
    });

    const transformStyle = transform ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 50,
    } : undefined;

    const combinedStyle = {
        ...transformStyle,
        ...propStyle,
        backgroundColor: `${listColor}26`, // ~15% opacity
        border: `1px solid ${listColor}`,
        borderLeftWidth: '4px'
    };

    if (isDragging) {
        // Leave a ghost placeholder or nothing? 
        // Usually rendering with lower opacity is good.
        return (
            <div
                ref={setNodeRef}
                className={cn(
                    "rounded text-xs shadow-sm opacity-90 pointer-events-none text-foreground",
                    isMonthView ? "px-2 py-1.5 text-xs font-medium" : "pl-2 py-1.5"
                )}
                style={combinedStyle}
            >
                <div className="flex flex-col h-full">
                    <p className="truncate font-semibold leading-tight text-foreground/90">{task.title}</p>
                    {/* Optional: Show time range if height is sufficient? */}
                    {(!isMonthView && task.description) && (
                        <p className="text-[10px] text-foreground/70 line-clamp-2 leading-tight mt-0.5">
                            {task.description}
                        </p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={transformStyle} {...listeners} {...attributes} className="pointer-events-auto relative z-10 touch-none">
            <TaskContextMenu taskId={task.id}>
                <div
                    className={cn(
                        "rounded text-xs shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group/task overflow-hidden text-foreground",
                        isMonthView ? "px-2 py-1.5 text-xs font-medium" : "pl-2 py-1.5"
                    )}
                    style={{
                        ...propStyle,
                        backgroundColor: `${listColor}26`,
                        border: `1px solid ${listColor}`,
                        borderLeftWidth: '4px'
                    }}
                >
                    <p className="truncate font-semibold leading-tight text-foreground/90">{task.title}</p>
                    {(task.startTime && !isMonthView) && (
                        <p className="text-[10px] text-foreground/70 mt-0.5 truncate font-medium">
                            {task.startTime} - {task.endTime}
                        </p>
                    )}
                    {(!isMonthView && task.description) && (
                        <p className="text-[10px] text-foreground/70 line-clamp-2 leading-tight mt-0.5">
                            {task.description}
                        </p>
                    )}
                </div>
            </TaskContextMenu>
        </div>
    )
}
