"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLists } from "@/hooks/use-lists";
import { Plus } from "lucide-react";
import { CreateListDialog } from "./create-list-dialog";
import { CreateTaskDialog } from "./create-task-dialog";
import { TaskList } from "./task-list";

interface AppSidebarProps {
    className?: string;
    isOpen?: boolean;
    onToggle?: () => void;
}

export function AppSidebar({ className, isOpen = true }: AppSidebarProps) {
    const lists = useLists();

    if (!isOpen) return null;

    return (
        <div className={`flex flex-col h-full bg-sidebar/50 text-foreground w-80 border-r border-border flex-shrink-0 transition-all duration-300 backdrop-blur-xl ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between h-[65px] bg-sidebar/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-green-500/20">A</div>
                    <span className="font-bold text-lg tracking-tight font-sans text-foreground">Aiva</span>
                </div>
            </div>

            {/* Quick Add */}
            <div className="p-3 pb-0">
                <CreateTaskDialog
                    trigger={
                        <Button className="w-full bg-white hover:bg-white/50 text-muted-foreground hover:text-foreground border border-border justify-start gap-2 h-9 text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer">
                            <Plus className="w-4 h-4" /> Add Task
                        </Button>
                    }
                />
            </div>

            {/* Task Lists */}
            <ScrollArea className="flex-1 px-3 py-4">

                <div className="flex items-center justify-between px-2 mb-2">
                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">My Lists</h3>
                    <CreateListDialog
                        trigger={
                            <Button variant="ghost" size="icon" className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer">
                                <Plus className="w-3 h-3" />
                            </Button>
                        }
                    />
                </div>
                <div className="space-y-1">
                    {lists?.map(list => (
                        <TaskList key={list.id} list={list} />
                    ))}
                </div>
            </ScrollArea>

            {/* Footer / User Rail */}
            <div className="p-4 border-t border-border bg-sidebar/30">
                <div className="mb-3 text-[10px] text-muted-foreground/60 text-center select-none">
                    Tip: Right-click items to delete
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-border shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <h4 className="font-semibold text-foreground text-sm relative z-10">Aiva Cloud</h4>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 relative z-10 leading-relaxed">
                        Sync tasks across devices and unlock advanced AI scheduling.
                    </p>

                    <Button size="sm" disabled className="w-full text-xs h-8 bg-muted text-muted-foreground border border-border hover:bg-muted/80 disabled:opacity-100 relative z-10">
                        Coming Soon
                    </Button>
                </div>
            </div>
        </div>
    );
}
