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
import { db } from "@/db/db"
import { useState } from "react"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

interface CreateListDialogProps {
    trigger?: React.ReactNode
}

const PRESET_COLORS = [
    "#EF4444", // Red
    "#F97316", // Orange
    "#F59E0B", // Amber
    "#22C55E", // Green
    "#06B6D4", // Cyan
    "#3B82F6", // Blue
    "#8B5CF6", // Violet
    "#EC4899", // Pink
]

export function CreateListDialog({ trigger }: CreateListDialogProps) {
    const [name, setName] = useState("")
    const [color, setColor] = useState(PRESET_COLORS[3]) // Default to Green
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (!newOpen) {
            setTimeout(() => {
                setName("")
                setColor(PRESET_COLORS[3])
            }, 300)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!name.trim()) return

        setIsLoading(true)
        try {
            await db.lists.add({
                id: uuidv4(),
                name,
                color,
                order: Date.now(),
            })

            toast.success("List created successfully")
            handleOpenChange(false)
        } catch (error) {
            console.error("Failed to create list:", error)
            toast.error("Failed to create list")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New List</DialogTitle>
                    <DialogDescription>
                        Create a new list to organize your tasks.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Project X"
                            className="col-span-3"
                            autoFocus
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Color
                        </Label>
                        <div className="col-span-3 flex flex-wrap gap-2">
                            {PRESET_COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-6 h-6 rounded-full transition-all cursor-pointer ${color === c ? 'ring-2 ring-offset-2 ring-foreground scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={!name.trim() || isLoading} className="cursor-pointer">
                        {isLoading ? "Creating..." : "Create List"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
