"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const event_constant_1 = require("./event.constant");
// create event
const createEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, time, notes } = eventData;
    if (!title || !date || !time) {
        throw new AppError_1.default(400, "Title, date, and time are required");
    }
    const result = yield prisma_1.default.event.create({
        data: {
            title: eventData.title,
            date: eventData.date,
            time: eventData.time,
            notes: eventData.notes,
            category: (0, event_constant_1.categorizeEvent)(eventData.title, eventData.notes)
        }
    });
    return Object.assign(Object.assign({}, result), { categoryReason: `Automatically categorized as ${(0, event_constant_1.categorizeEvent)(title || notes)} based on content analysis` });
});
// get all events
const getAllEvents = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = filters;
    const { page, limit, sortBy, sortOrder } = options;
    // Handle date and time sorting
    let orderBy = {};
    if (sortBy === 'date' || sortBy === 'time') {
        orderBy[sortBy] = sortOrder;
    }
    else if (sortBy === 'datetime') {
        // Sort by both date and time
        orderBy = { date: sortOrder, time: sortOrder };
    }
    else {
        // Default sorting
        orderBy = { date: 'asc', time: 'asc' };
    }
    const events = yield prisma_1.default.event.findMany({
        where: Object.assign({}, (category && { category: category })),
        skip: options.skip || 0,
        take: options.limit || undefined,
        orderBy: orderBy,
    });
    return events;
});
const getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma_1.default.event.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!event) {
        throw new AppError_1.default(404, "Event not found");
    }
    return event;
});
const updateEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // First get the current event to check its archived status
    const currentEvent = yield prisma_1.default.event.findUnique({
        where: { id }
    });
    if (!currentEvent) {
        throw new AppError_1.default(404, "Event not found");
    }
    // Toggle the archived status
    const newArchivedStatus = !currentEvent.archivedStatus;
    const event = yield prisma_1.default.event.update({
        where: { id },
        data: {
            archivedStatus: newArchivedStatus
        }
    });
    return event;
});
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleEvent = yield prisma_1.default.event.findUnique({
        where: { id }
    });
    if (!singleEvent) {
        throw new AppError_1.default(404, "Event not found");
    }
    const event = yield prisma_1.default.event.delete({
        where: { id }
    });
    return event;
});
exports.eventService = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};
