"use client"

import { Task } from "@/db/db";
import { useTasks } from "@/hooks/use-tasks";
import { useMemo } from "react";
import { KanbanColumn } from "./kanban-column";

const KANBAN_COLUMNS = [
    { status: 'backlog' as const, title: 'Backlog', color: '#64748b' },
    { status: 'planned' as const, title: 'Planned', color: '#3b82f6' },
    { status: 'in_progress' as const, title: 'In Progress', color: '#eab308' },
    { status: 'blocked' as const, title: 'Blocked', color: '#ef4444' },
    { status: 'done' as const, title: 'Done', color: '#22c55e' },
];

export function KanbanView() {
    const allTasks = useTasks();

    // Group tasks by status using useMemo for performance
    const tasksByStatus = useMemo(() => {
        const grouped: Record<Task['status'], Task[]> = {
            backlog: [],
            planned: [],
            in_progress: [],
            blocked: [],
            done: []
        };

        allTasks?.forEach(task => {
            if (grouped[task.status]) {
                grouped[task.status].push(task);
            }
        });

        return grouped;
    }, [allTasks]);

    return (
        <div className="flex flex-col h-full bg-[#f5f4f0] dark:bg-neutral-900 overflow-hidden">
            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <div className="flex gap-4 p-6 h-full min-w-max">
                    {KANBAN_COLUMNS.map(column => (
                        <KanbanColumn
                            key={column.status}
                            title={column.title}
                            status={column.status}
                            tasks={tasksByStatus[column.status]}
                            color={column.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
