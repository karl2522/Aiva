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
import { db } from "@/db/db"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface TaskContextMenuProps {
    children: React.ReactNode
    taskId: string
}

export function TaskContextMenu({ children, taskId }: TaskContextMenuProps) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)

    const handleDelete = async () => {
        try {
            await db.tasks.delete(taskId)
            toast.success("Task deleted")
        } catch (error) {
            console.error("Failed to delete task:", error)
            toast.error("Failed to delete task")
        }
    }

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
                        Delete Task
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the task.
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
