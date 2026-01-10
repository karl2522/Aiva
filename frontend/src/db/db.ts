import Dexie, { type EntityTable } from 'dexie';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'backlog' | 'planned' | 'in_progress' | 'blocked' | 'done';
    listId: string; // 'personal', 'work', etc. Empty string for virtual Inbox
    createdAt: Date;
    scheduledDate?: Date; // For calendar
    duration?: number; // In minutes
    startTime?: string; // "HH:mm"
    endTime?: string; // "HH:mm"
    order: number; // For sorting in the list
}

export interface TaskList {
    id: string;
    name: string;
    color: string;
    order: number;
}

const database = new Dexie('AivaDatabase') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
    lists: EntityTable<TaskList, 'id'>;
};

// Schema v2 - Added Kanban status values
database.version(2).stores({
    tasks: 'id, listId, status, scheduledDate, order',
    lists: 'id, order'
}).upgrade(tx => {
    // Migration: Update old status values to new Kanban-compatible values
    return tx.table('tasks').toCollection().modify(task => {
        if (task.status === 'todo') {
            task.status = 'backlog';
        } else if (task.status === 'in-progress') {
            task.status = 'in_progress'; // Normalize hyphen to underscore
        } else if (!['backlog', 'planned', 'in_progress', 'blocked', 'done'].includes(task.status)) {
            // Fallback for any unknown status
            task.status = 'backlog';
        }
    });
});

// Initial population
database.on('populate', () => {
    database.lists.bulkAdd([
        { id: 'today', name: 'Today', color: '#22c55e', order: 0 },
        { id: 'personal', name: 'Personal', color: '#3b82f6', order: 1 },
        { id: 'work', name: 'Work', color: '#a855f7', order: 2 },
    ]);
});

export const db = database;
