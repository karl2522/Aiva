import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";

export function useLists() {
    const lists = useLiveQuery(() => db.lists.orderBy('order').toArray());
    return lists ?? [];
}
