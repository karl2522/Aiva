"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/db/db";
import { useTasks } from "@/hooks/use-tasks";
import { useDroppable } from "@dnd-kit/core";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek
} from "date-fns";
import { CreateTaskDialog } from "./create-task-dialog";
import { DraggableCalendarTask } from "./draggable-calendar-task";

function MonthCell({ day, date, tasks }: { day: Date, date: Date, tasks?: Task[] }) {
    const isCurrentMonth = isSameMonth(day, date);
    const { setNodeRef, isOver } = useDroppable({
        id: day.toISOString(), // Drop ID is date only
        data: { day, isMonthView: true }
    });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-[120px] border-b border-r border-gray-100/50 dark:border-neutral-800 bg-background dark:bg-neutral-900 p-2 transition-colors relative group
                ${!isCurrentMonth ? 'bg-muted/30 dark:bg-neutral-950/50 text-muted-foreground dark:text-neutral-600' : ''}
                ${isOver ? 'bg-green-50 dark:bg-green-950/30 shadow-inner' : 'hover:bg-accent/5'}
            `}
        >
            <div className={`text-sm font-medium mb-1 ${isSameDay(day, new Date()) ? 'bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md' : ''}`}>
                {format(day, 'd')}
            </div>

            <div className="space-y-1 relative z-10 pointer-events-none">
                {tasks?.map(task => (
                    <DraggableCalendarTask key={task.id} task={task} isMonthView={true} />
                ))}
            </div>

            {/* Add Task Trigger (Hidden by default, shown on hover) */}
            <CreateTaskDialog
                defaultDate={day}
                defaultHour={9} // Default to 9 AM for month view
                trigger={
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="absolute bottom-1 right-1">
                            <span className="text-xl text-muted-foreground/50 hover:text-green-600 cursor-pointer">+</span>
                        </div>
                    </div>
                }
            />
        </div>
    )
}

export function MonthView({ selectedDate }: { selectedDate: Date }) {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const allTasks = useTasks();

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(day);
            day = addDays(day, 1);
        }
        rows.push(days);
        days = [];
    }

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="flex flex-col h-full bg-[#f5f4f0] dark:bg-neutral-900 overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-border dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm shrink-0">
                {weekDays.map(d => (
                    <div key={d} className="p-3 text-center border-r border-border dark:border-neutral-800 last:border-r-0 text-xs font-semibold uppercase text-muted-foreground">
                        {d}
                    </div>
                ))}
            </div>

            <ScrollArea className="flex-1">
                <div className="flex flex-col border-l border-t border-border bg-white min-h-[600px]">
                    {rows.map((row, i) => (
                        <div key={i} className="grid grid-cols-7 flex-1">
                            {row.map((dayItem, idx) => {
                                const dayTasks = allTasks?.filter(t =>
                                    t.scheduledDate && isSameDay(new Date(t.scheduledDate), dayItem)
                                );

                                return (
                                    <MonthCell
                                        key={dayItem.toISOString()}
                                        day={dayItem}
                                        date={selectedDate}
                                        tasks={dayTasks}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
