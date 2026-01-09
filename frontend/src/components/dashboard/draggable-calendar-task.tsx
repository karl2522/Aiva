import { Task } from "@/db/db"
import { cn } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { CalendarTaskCard } from "./calendar-task-card"
import { TaskContextMenu } from "./task-context-menu"

interface DraggableCalendarTaskProps {
    task: Task
    isMonthView?: boolean
    style?: React.CSSProperties
}

export function DraggableCalendarTask({ task, isMonthView, style: propStyle }: DraggableCalendarTaskProps) {
    const isTimed = !!task.startTime;

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `calendar-${task.id}`,
        data: { ...task, origin: 'calendar', isMonthView }, // Pass isMonthView in data for DragOverlay logic
        disabled: isTimed
    });

    const transformStyle = transform ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 50,
        transition: 'transform 0.2s ease-out',
    } : undefined;

    const combinedStyle = {
        ...transformStyle,
        ...propStyle,
    };

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={combinedStyle}>
                <CalendarTaskCard
                    task={task}
                    isMonthView={isMonthView}
                    className="opacity-0 pointer-events-none"
                />
            </div>
        )
    }

    return (
        <div
            id={`calendar-${task.id}`}
            ref={setNodeRef}
            style={{ ...transformStyle, ...propStyle }}
            {...listeners}
            {...attributes}
            className="pointer-events-auto relative z-10 touch-none"
        >
            <TaskContextMenu taskId={task.id}>
                <CalendarTaskCard
                    task={task}
                    isMonthView={isMonthView}
                    className={cn(
                        "h-full group/task transition-shadow",
                        isTimed ? "cursor-default" : "hover:shadow-md cursor-grab active:cursor-grabbing"
                    )}
                />
            </TaskContextMenu>
        </div>
    )
}
