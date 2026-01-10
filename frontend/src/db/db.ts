import Dexie, { type EntityTable } from 'dexie';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'backlog' | 'planned' | 'in_progress' | 'blocked' | 'done';
    listId: string; // 'personal', 'work', etc.
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

const db = new Dexie('AivaDatabase') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
    lists: EntityTable<TaskList, 'id'>;
};

// Schema
db.version(1).stores({
    tasks: 'id, listId, status, scheduledDate, order',
    lists: 'id, order'
});

// Migration to version 2: Normalize status values for Kanban
db.version(2).stores({
    tasks: 'id, listId, status, scheduledDate, order',
    lists: 'id, order'
}).upgrade(tx => {
    return tx.table('tasks').toCollection().modify(task => {
        // Normalize old status values to new Kanban-compatible values
        if (task.status === 'todo') {
            task.status = 'backlog';
        } else if (task.status === 'in-progress') {
            task.status = 'in_progress'; // Normalize hyphen to underscore
        } else if (task.status === 'done') {
            task.status = 'done'; // No change
        } else {
            // Fallback for unknown/legacy statuses
            task.status = 'backlog';
        }
    });
});

db.on('populate', () => {
    db.lists.bulkAdd([
        { id: 'inbox', name: 'Inbox', color: '#64748b', order: 0 },
        { id: 'today', name: 'Today', color: '#22c55e', order: 1 },
        { id: 'personal', name: 'Personal', color: '#3b82f6', order: 2 },
        { id: 'work', name: 'Work', color: '#a855f7', order: 3 },
    ]);
});


export { db };

