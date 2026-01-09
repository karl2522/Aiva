"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { db, TaskList } from "@/db/db"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ListContextMenuProps {
    children: React.ReactNode
    list: TaskList
}

export function ListContextMenu({ children, list }: ListContextMenuProps) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)

    const handleDelete = async () => {
        try {
            // Delete the list
            await db.lists.delete(list.id)

            // Optional: Delete associated tasks?
            // For now we will leave them orphaned or we can simple delete them
            // Aiva is simple, so let's delete tasks in that list to avoid data zombies
            const tasks = await db.tasks.where('listId').equals(list.id).toArray();
            const taskIds = tasks.map(t => t.id);
            await db.tasks.bulkDelete(taskIds);

            toast.success("List deleted")
        } catch (error) {
            console.error("Failed to delete list:", error)
            toast.error("Failed to delete list")
        }
    }

    // Prevent deleting system lists if we had any, but "Inbox" is usually hardcoded in logic not DB?
    // Actually in CreateTaskDialog we default to 'inbox'.
    // If 'inbox' is in the DB, we might want to protect it.
    // But based on previous code, `useLists` returns lists from DB.
    // The Sidebar iterates over them.
    // If "Inbox" is just a list in DB, we should check ID.
    // If the user manually created "Inbox", they can delete it. 
    // But usually there is a default immutable list. 
    // For now, I'll allow deleting any list passed to this component.

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                    <ContextMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
                        onSelect={() => setShowDeleteAlert(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete List
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{list.name}"?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this list and all {list.id === 'inbox' ? '' : 'its'} tasks. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
