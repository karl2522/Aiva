import Dexie, { type EntityTable } from 'dexie';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'done' | 'in-progress';
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

db.on('populate', () => {
    db.lists.bulkAdd([
        { id: 'inbox', name: 'Inbox', color: '#64748b', order: 0 },
        { id: 'today', name: 'Today', color: '#22c55e', order: 1 },
        { id: 'personal', name: 'Personal', color: '#3b82f6', order: 2 },
        { id: 'work', name: 'Work', color: '#a855f7', order: 3 },
    ]);
});


export { db };
