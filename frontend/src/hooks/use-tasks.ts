import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";

export function useTasks() {
    const tasks = useLiveQuery(() => db.tasks.toArray());
    return tasks ?? [];
}

export function useTasksByList(listId: string) {
    const tasks = useLiveQuery(() =>
        db.tasks.where('listId').equals(listId).sortBy('order')
    );
    return tasks ?? [];
}
