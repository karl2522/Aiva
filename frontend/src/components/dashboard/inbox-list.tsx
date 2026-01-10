"use client"

import { getInboxTasks } from "@/db/taskDomain";
import { useTasks } from "@/hooks/use-tasks";
import { ChevronDown, ChevronRight, Inbox } from "lucide-react";
import { useState } from "react";
import { DraggableTask } from "./draggable-task";

export function InboxList() {
    const tasks = useTasks();
    const [isExpanded, setIsExpanded] = useState(true);

    // Filter tasks using domain logic
    const inboxTasks = tasks ? getInboxTasks(tasks) : [];

    // Sort by creation date (newest first)
    const sortedTasks = [...inboxTasks].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-accent/50 dark:hover:bg-neutral-800/50 transition-colors group"
            >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                        {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                        ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Inbox className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground truncate">Inbox</span>
                    </div>
                </div>
                <span className="text-xs text-muted-foreground bg-muted dark:bg-neutral-800 px-1.5 py-0.5 rounded-md font-medium flex-shrink-0">
                    {inboxTasks.length}
                </span>
            </button>

            {isExpanded && (
                <div className="mt-1 space-y-0.5 pl-6">
                    {sortedTasks.length === 0 ? (
                        <div className="px-2 py-3 text-xs text-muted-foreground/60 text-center italic">
                            Inbox Zero! 🎉
                        </div>
                    ) : (
                        sortedTasks.map(task => (
                            <DraggableTask key={task.id} task={task} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
