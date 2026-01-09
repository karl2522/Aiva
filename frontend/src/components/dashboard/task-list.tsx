"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TaskList as TaskListType } from "@/db/db";
import { useTasksByList } from "@/hooks/use-tasks";
import { DraggableTask } from "./draggable-task";
import { ListContextMenu } from "./list-context-menu";

export function TaskList({ list }: { list: TaskListType }) {
    const tasks = useTasksByList(list.id);

    // Calculate count of unfinished tasks
    const count = tasks?.filter(t => t.status !== 'done').length ?? 0;

    return (
        <Accordion type="single" collapsible defaultValue={list.id} className="w-full border-none shadow-none">
            <AccordionItem value={list.id} className="border-none">
                <div className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-muted/50 data-[state=open]:bg-muted/50 group transition-colors">
                    <ListContextMenu list={list}>
                        <div className="flex items-center gap-2 flex-1 cursor-pointer">
                            <div className="w-2 h-2 rounded-full ring-1 ring-inset ring-black/5" style={{ backgroundColor: list.color }} />
                            <span className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">{list.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{count}</span>
                        </div>
                    </ListContextMenu>
                    <AccordionTrigger className="p-1 hover:no-underline [&[data-state=open]>svg]:rotate-180 shrink-0 cursor-pointer">
                        {/* Chevron will render here */}
                    </AccordionTrigger>
                </div>
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