"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/db/db"
import { useLists } from "@/hooks/use-lists"
import { useState } from "react"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

interface CreateTaskDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: React.ReactNode
    defaultListId?: string
    defaultDate?: Date
    defaultHour?: number
}

export function CreateTaskDialog({
    open,
    onOpenChange,
    trigger,
    defaultListId = "inbox",
    defaultDate,
    defaultHour
}: CreateTaskDialogProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [listId, setListId] = useState(defaultListId)
    const lists = useLists()
    const [isLoading, setIsLoading] = useState(false)
    const [internalOpen, setInternalOpen] = useState(false)

    // Handle controlled vs uncontrolled state
    const isControlled = open !== undefined
    const show = isControlled ? open : internalOpen

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)

        // Reset form when closing
        if (!newOpen) {
            setTimeout(() => {
                setTitle("")
                setDescription("")
                setListId(defaultListId)
            }, 300)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!title.trim()) return

        setIsLoading(true)
        try {
            let scheduledDate: Date | undefined = undefined;

            if (defaultDate && defaultHour !== undefined) {
                // If created from Calendar slot
                scheduledDate = new Date(defaultDate);
                scheduledDate.setHours(defaultHour);
                scheduledDate.setMinutes(0);
            }

            await db.tasks.add({
                id: uuidv4(),
                title,
                description,
                status: 'todo',
                listId,
                createdAt: new Date(),
                scheduledDate,
                order: Date.now(), // simple ordering
            })

            toast.success("Task created successfully")
            handleOpenChange(false)

        } catch (error) {
            console.error("Failed to create task:", error)
            toast.error("Failed to create task")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={show} onOpenChange={handleOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Add a new task to your list.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Buy groceries"
                            className="col-span-3"
                            autoFocus
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Desc
                        </Label>
                        <Textarea
                            id="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Milk, eggs, bread..."
                            className="col-span-3 resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="list" className="text-right">
                            List
                        </Label>
                        <Select value={listId} onValueChange={setListId}>
                            <SelectTrigger className="col-span-3 cursor-pointer">
                                <SelectValue placeholder="Select a list" />
                            </SelectTrigger>
                            <SelectContent>
                                {lists?.map((list) => (
                                    <SelectItem key={list.id} value={list.id}>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: list.color }} />
                                            {list.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={!title.trim() || isLoading} className="cursor-pointer">
                        {isLoading ? "Saving..." : "Create Task"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
