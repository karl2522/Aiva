"use client"

import { Task } from "@/db/db";
import { useLists } from "@/hooks/use-lists";
import { useDraggable } from "@dnd-kit/core";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface KanbanCardProps {
    task: Task;
}

export function KanbanCard({ task }: KanbanCardProps) {
    const lists = useLists();
    const list = lists?.find(l => l.id === task.listId);

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `kanban-${task.id}`,
        data: { ...task, origin: 'kanban' }
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`relative bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all select-none touch-none
                ${isDragging
                    ? 'opacity-50 scale-95'
                    : 'opacity-100 hover:shadow-lg hover:scale-[1.02] hover:border-gray-300 dark:hover:border-neutral-600 hover:-translate-y-0.5'
                }
            `}
        >
            {/* List color indicator */}
            <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg pointer-events-none transition-all"
                style={{ backgroundColor: list?.color || '#64748b' }}
            />

            {/* Task title */}
            <div className="pl-2 pointer-events-none">
                <p className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                    {task.title}
                </p>

                {/* Date badge if scheduled */}
                {task.scheduledDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(task.scheduledDate), 'MMM d')}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
