"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidation = void 0;
const zod_1 = require("zod");
const createEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1, { message: "Title is required" }),
        date: zod_1.z.string().trim().min(1, { message: "Date is required" }),
        time: zod_1.z.string().trim().min(1, { message: "Time is required" }),
        notes: zod_1.z.string().trim().optional()
    })
});
exports.eventValidation = {
    createEventZodSchema
};
