import { Task } from "./db";

/**
 * Context for a task drop operation
 */
export interface DropContext {
    task: Task;
    source: {
        type: 'sidebar' | 'calendar' | 'kanban';
        data?: any;
    };
    target: {
        type: 'calendar-week' | 'calendar-month' | 'kanban';
        data: any;
    };
}

/**
 * Centralized domain logic for task status and scheduling transitions
 * 
 * This function encapsulates all business rules for how tasks should be updated
 * when moved between different views and contexts.
 */
export function applyTaskDrop(context: DropContext): Partial<Task> {
    const { task, source, target } = context;
    const updates: Partial<Task> = {};

    // Rule 1: Kanban → Kanban (Column Change)
    // Only update status, preserve everything else
    if (target.type === 'kanban') {
        updates.status = target.data.status;
        return updates;
    }

    // Rule 2: Any → Calendar (Week View)
    // Set date/time and status to 'planned'
    if (target.type === 'calendar-week') {
        const { day, hour } = target.data;
        const newScheduledDate = new Date(day);
        newScheduledDate.setHours(hour);
        newScheduledDate.setMinutes(0);

        updates.scheduledDate = newScheduledDate;
        updates.status = 'planned';
        return updates;
    }

    // Rule 3: Any → Calendar (Month View)
    // Set date (default 9 AM) and status to 'planned'
    if (target.type === 'calendar-month') {
        const { day } = target.data;
        const newScheduledDate = new Date(day);
        newScheduledDate.setHours(9); // Default to 9 AM
        newScheduledDate.setMinutes(0);

        updates.scheduledDate = newScheduledDate;
        updates.status = 'planned';
        return updates;
    }

    return updates;
}

/**
 * Helper to determine if a task belongs in the virtual "Inbox"
 * 
 * Inbox semantics:
 * - Status is 'backlog'
 * - No scheduled date
 * - Represents unplanned, unscheduled tasks
 */
export function isInboxTask(task: Task): boolean {
    return task.status === 'backlog' && !task.scheduledDate;
}

/**
 * Helper to get all inbox tasks from a task list
 */
export function getInboxTasks(tasks: Task[]): Task[] {
    return tasks.filter(isInboxTask);
}

/**
 * Future: Detect time conflicts in week view
 * 
 * This is a placeholder for future conflict detection logic
 * when implementing AI scheduling or auto-resolve overlaps.
 * 
 * @param tasks - Tasks to check for conflicts
 * @param newTask - New task being scheduled
 * @returns Array of conflicting tasks
 */
export function detectTimeConflicts(tasks: Task[], newTask: Task): Task[] {
    // TODO: Implement when adding AI scheduling
    // Will need to convert startTime/endTime strings to Date objects
    // and check for overlaps
    return [];
}

/**
 * Future: Convert string times to Date objects for better time handling
 * 
 * This will be useful when implementing:
 * - Conflict detection
 * - AI scheduling
 * - Auto-resolve overlaps
 * 
 * @param scheduledDate - Base date
 * @param timeString - Time in "HH:mm" format
 * @returns Full Date object
 */
export function parseTaskTime(scheduledDate: Date, timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date(scheduledDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}
