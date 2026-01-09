"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TaskList as TaskListType } from "@/db/db";
import { useTasksByList } from "@/hooks/use-tasks";
import { DraggableTask } from "./draggable-task";

export function TaskList({ list }: { list: TaskListType }) {
    const tasks = useTasksByList(list.id);

    // Calculate count of unfinished tasks
    const count = tasks?.filter(t => t.status !== 'done').length ?? 0;

    return (
        <Accordion type="single" collapsible defaultValue={list.id} className="w-full border-none shadow-none">
            <AccordionItem value={list.id} className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline px-2 rounded-md hover:bg-muted/50 data-[state=open]:bg-muted/50 group !no-underline transition-colors">
                    <div className="flex items-center gap-2 w-full">
                        <div className="w-2 h-2 rounded-full ring-1 ring-inset ring-black/5" style={{ backgroundColor: list.color }} />
                        <span className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">{list.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{count}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pl-2 pr-1 pb-2">
                    <div className="space-y-2">
                        {tasks?.map(task => (
                            <DraggableTask key={task.id} task={task} />
                        ))}
                        {tasks?.length === 0 && (
                            <div className="p-4 text-xs text-muted-foreground border border-dashed border-border rounded-lg text-center bg-muted/20">
                                No tasks
                            </div>
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
