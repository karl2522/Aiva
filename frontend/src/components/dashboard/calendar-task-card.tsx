"use client"

import { Task } from "@/db/db"
import { useLists } from "@/hooks/use-lists"
import { cn } from "@/lib/utils"

interface CalendarTaskCardProps {
    task: Task
    isMonthView?: boolean
    className?: string
    style?: React.CSSProperties
    showDescription?: boolean
}

export function CalendarTaskCard({
    task,
    isMonthView,
    className,
    style: propStyle,
    showDescription
}: CalendarTaskCardProps) {
    const lists = useLists();
    const list = lists?.find(l => l.id === task.listId);
    const listColor = list?.color || "#22c55e"; // Default green if not found

    // Determine whether to show description: explicit prop overrides view-based logic
    const shouldShowDescription = showDescription !== undefined
        ? showDescription
        : (!isMonthView && !!task.description);

    return (
        <div
            className={cn(
                "rounded text-xs shadow-sm overflow-hidden text-foreground",
                isMonthView ? "px-2 py-1.5 text-xs font-medium" : "pl-2 py-1.5",
                className
            )}
            style={{
                ...propStyle,
                backgroundColor: `${listColor}26`, // ~15% opacity
                border: `1px solid ${listColor}`,
                borderLeftWidth: '4px'
            }}
        >
            <div className="flex flex-col h-full w-full">
                <p className="truncate font-semibold leading-tight text-foreground/90">{task.title}</p>

                {(task.startTime && !isMonthView) && (
                    <p className="text-[10px] text-foreground/70 mt-0.5 truncate font-medium">
                        {task.startTime} - {task.endTime}
                    </p>
                )}

                {shouldShowDescription && task.description && (
                    <p className="text-[10px] text-foreground/70 line-clamp-2 leading-tight mt-0.5">
                        {task.description}
                    </p>
                )}
            </div>
        </div>
    )
}
