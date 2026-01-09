"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { addDays, format, startOfWeek } from "date-fns";

import { useTasks } from "@/hooks/use-tasks";
import { isSameDay } from "date-fns";


import { Task } from "@/db/db";
import { useDroppable } from "@dnd-kit/core";
import { CreateTaskDialog } from "./create-task-dialog";
import { DraggableCalendarTask } from "./draggable-calendar-task";

function CalendarSlot({ day, hour, tasks }: { day: Date, hour: number, tasks?: Task[] }) {
    const { setNodeRef, isOver } = useDroppable({
        id: `${day.toISOString()}-${hour}`,
        data: { day, hour }
    });

    return (
        <div ref={setNodeRef} className={`h-20 border-b border-gray-100/50 transition-colors group relative cursor-pointer ${isOver ? 'bg-green-50 shadow-inner' : 'hover:bg-gray-50/80'}`}>

            <CreateTaskDialog
                defaultDate={day}
                defaultHour={hour}
                trigger={
                    <div className="absolute inset-0 z-0 cursor-pointer">
                        {/* Plus icon on hover to simulate add action */}
                        <div className={`absolute top-1 left-2 transition-opacity pointer-events-none ${isOver || (tasks && tasks.length > 0) ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                            <span className="text-xs text-gray-400 font-medium">+</span>
                        </div>
                    </div>
                }
            />

            {isOver && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full shadow-sm">Drop here</span>
                </div>
            )}

            {/* Render Tasks */}
            <div className="absolute inset-0 p-1 space-y-1 overflow-hidden pointer-events-none">
                {tasks?.map(task => (
                    <DraggableCalendarTask key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export function CalendarView({ selectedDate }: { selectedDate: Date }) {
    const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
    const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23 (Full Day)
    const allTasks = useTasks();

    return (
        <div className="flex flex-col h-full bg-[#f5f4f0] text-gray-900 overflow-hidden">
            {/* Calendar Header - Days */}
            <div className="grid grid-cols-8 border-b border-gray-200 bg-white shadow-sm z-10 w-full shrink-0">
                <div className="p-4 border-r border-gray-100 bg-gray-50/50"></div> {/* Time Col Header */}
                {days.map(day => (
                    <div key={day.toISOString()} className="p-3 text-center border-r border-gray-100 last:border-r-0 bg-white">
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">{format(day, 'EEE')}</div>
                        <div className={`text-xl font-bold ${day.toDateString() === new Date().toDateString()
                            ? 'bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto shadow-md shadow-green-200'
                            : 'text-gray-900'
                            }`}>
                            {format(day, 'd')}
                        </div>
                    </div>
                ))}
            </div>

            {/* Scrollable Grid */}
            <ScrollArea className="flex-1 h-full">
                <div className="grid grid-cols-8 relative min-w-[800px] bg-white pt-4 pb-20"> {/* Added padding for labels */}
                    {/* Time Column */}
                    <div className="border-r border-gray-100 bg-gray-50/30">
                        {hours.map(hour => (
                            <div key={hour} className="h-20 border-b border-gray-100 text-[11px] text-gray-400 p-2 pr-3 text-right font-medium relative select-none">
                                <span className="relative -top-3">
                                    {hour === 0 ? '12 AM' :
                                        hour === 12 ? '12 PM' :
                                            hour > 12 ? `${hour - 12} PM` :
                                                `${hour} AM`}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Day Columns */}
                    {days.map(day => (
                        <div key={day.toISOString()} className="border-r border-gray-100 last:border-r-0 relative">
                            {/* Grid Lines corresponding to time */}
                            {hours.map(hour => {
                                // Filter tasks for this slot
                                const slotTasks = allTasks?.filter(t =>
                                    t.scheduledDate &&
                                    isSameDay(new Date(t.scheduledDate), day) &&
                                    new Date(t.scheduledDate).getHours() === hour
                                );

                                return (
                                    <CalendarSlot
                                        key={`${day.toISOString()}-${hour}`}
                                        day={day}
                                        hour={hour}
                                        tasks={slotTasks}
                                    />
                                )
                            })}

                            {/* Dropped Tasks will be absolutely positioned here later */}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
