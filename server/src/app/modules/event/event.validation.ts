import { z } from "zod"

const createEventZodSchema = z.object({
        body: z.object({
            title: z.string().trim().min(1, { message: "Title is required" }),
            date: z.string().trim().min(1, { message: "Date is required" }),
            time: z.string().trim().min(1, { message: "Time is required" }),
            notes: z.string().trim().optional()
    })
})

export const eventValidation = {
    createEventZodSchema
}