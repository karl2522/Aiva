"use client"

import { Card } from "@/components/ui/card";
import { Task } from "@/db/db";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import { TaskContextMenu } from "./task-context-menu";

export function DraggableTask({ task }: { task: Task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: `sidebar-${task.id}`,
        data: { ...task, origin: "sidebar" },
    });

    const style = transform
        ? {
            transform: CSS.Translate.toString(transform),
            transition: 'transform 0.2s ease-out',
        }
        : undefined;

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-80 overflow-hidden"
            >
                <Card className="p-3 bg-card border-border shadow-md cursor-grabbing">
                    <div className="flex items-start gap-2">
                        <span className="mt-0.5 text-muted-foreground">
                            <GripVertical className="w-4 h-4" />
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-card-foreground">
                                {task.title}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="max-w-full overflow-hidden"
        >
            <TaskContextMenu taskId={task.id}>
                <Card className="p-3 bg-card hover:bg-accent/5 border-border hover:border-accent/20 text-left transition-all cursor-grab active:cursor-grabbing group shadow-sm hover:shadow-md overflow-hidden">
                    <div className="flex items-start gap-2 overflow-hidden">
                        <span className="mt-0.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0">
                            <GripVertical className="w-4 h-4" />
                        </span>
                        <div className="flex-1 min-w-0 overflow-hidden" style={{ maxWidth: '100%' }}>
                            <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-relaxed break-all">
                                {task.title}
                            </p>
                            {task.description && (
                                <p className="text-xs text-muted-foreground mt-1 break-all line-clamp-1">
                                    {task.description}
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            </TaskContextMenu>
        </div>
    );
}
