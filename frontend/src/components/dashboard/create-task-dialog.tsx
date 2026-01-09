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
    const [startTime, setStartTime] = useState(defaultHour !== undefined ? `${defaultHour.toString().padStart(2, '0')}:00` : "")
    const [endTime, setEndTime] = useState("")

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
                setStartTime(defaultHour !== undefined ? `${defaultHour.toString().padStart(2, '0')}:00` : "")
                setEndTime("")
            }, 300)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!title.trim()) return

        setIsLoading(true)
        try {
            let scheduledDate: Date | undefined = undefined;

            if (startTime) {
                // If user selected a time, we schedule it!
                // Use the context date (if clicked on calendar) OR today (if clicked via sidebar)
                const baseDate = defaultDate ? new Date(defaultDate) : new Date();
                const [hours, minutes] = startTime.split(':').map(Number);
                baseDate.setHours(hours);
                baseDate.setMinutes(minutes);
                baseDate.setSeconds(0);
                baseDate.setMilliseconds(0);
                scheduledDate = baseDate;
            } else if (defaultDate && defaultHour !== undefined) {
                // If created from Calendar slot but NO manual time set (user just clicked slot)
                // We use that slot time.
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
                startTime: startTime || undefined,
                endTime: endTime || undefined,
                order: Date.now(),
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
                            placeholder="Study for Finals"
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
                            placeholder="Chapters 4-5"
                            className="col-span-3 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Time <span className="text-muted-foreground text-xs">(optional)</span>
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="flex-1 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                            />
                            <span className="text-muted-foreground text-xs font-medium">to</span>
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="flex-1 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                            />
                        </div>
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
