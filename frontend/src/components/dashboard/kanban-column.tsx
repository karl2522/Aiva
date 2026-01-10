"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/db/db";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanban-card";

interface KanbanColumnProps {
    title: string;
    status: Task['status'];
    tasks: Task[];
    color: string;
}

export function KanbanColumn({ title, status, tasks, color }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: `kanban-${status}`,
        data: { status, isKanban: true }
    });

    return (
        <div
            ref={setNodeRef}
            className={`flex flex-col h-full min-w-[280px] rounded-lg border transition-all ${isOver
                    ? 'bg-green-50 dark:bg-green-900/40 border-green-400 dark:border-green-500 shadow-lg'
                    : 'bg-gray-50 dark:bg-neutral-900/50 border-gray-200 dark:border-neutral-800'
                }`}
        >
            {/* Column Header */}
            <div className="p-4 border-b border-gray-200 dark:border-neutral-800 shrink-0">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <h3 className="font-semibold text-sm text-foreground">{title}</h3>
                    <span className="text-xs text-muted-foreground bg-gray-200 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Scrollable Task List */}
            <ScrollArea className="flex-1">
                <div className="p-3 space-y-2 min-h-[200px]">
                    {tasks.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground/50 py-8">
                            No tasks
                        </div>
                    ) : (
                        tasks.map(task => (
                            <KanbanCard key={task.id} task={task} />
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
