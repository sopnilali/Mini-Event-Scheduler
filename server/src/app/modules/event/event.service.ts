import AppError from "../../errors/AppError"
import prisma from "../../utils/prisma"
import { categorizeEvent } from "./event.constant"

// create event
const createEvent = async (eventData: any) => {


    const { title, date, time, notes } = eventData

    if (!title || !date || !time) {
        throw new AppError(400, "Title, date, and time are required")
    }


    const result = await prisma.event.create({
        data: {
            title: eventData.title,
            date: eventData.date,
            time: eventData.time,
            notes: eventData.notes,
            category: categorizeEvent(eventData.title, eventData.notes) as any
        }
    })
    return { ...result, categoryReason: `Automatically categorized as ${categorizeEvent(title || notes)} based on content analysis` }
}


// get all events
const getAllEvents = async (filters: any, options: any) => {

    const { category } = filters
    const { page, limit, sortBy, sortOrder } = options

    // Handle date and time sorting
    let orderBy: any = {};
    
    if (sortBy === 'date' || sortBy === 'time') {
        orderBy[sortBy] = sortOrder;
    } else if (sortBy === 'datetime') {
        // Sort by both date and time
        orderBy = [
            { date: sortOrder },
            { time: sortOrder }
        ];
    } else {
        // Default sorting
        orderBy = { date: 'desc' };
    }

    const events = await prisma.event.findMany({
        where: {
            ...(category && { category: category as any })
        },
        skip: options.skip || 0,
        take: options.limit || undefined,
        orderBy: orderBy,
    });
    return events
}

const getEventById = async (id: string) => {
        const event = await prisma.event.findFirst({
          where: {
            id,
            isDeleted: false
          }
        });

        if (!event) {
            throw new AppError(404, "Event not found")
        }

        return event
}


const updateEvent = async (id: string) => {
    // First get the current event to check its archived status
    const currentEvent = await prisma.event.findUnique({
        where: { id }
    });

    if (!currentEvent) {
        throw new AppError(404, "Event not found");
    }

    // Toggle the archived status
    const newArchivedStatus = !currentEvent.archivedStatus;

    const event = await prisma.event.update({
        where: { id },
        data: {
            archivedStatus: newArchivedStatus
        }
    });
    return event
}

const deleteEvent = async (id: string) => {

    const singleEvent = await prisma.event.findUnique({
        where: { id }
    });
    if (!singleEvent) {
        throw new AppError(404, "Event not found");
    }

    const event = await prisma.event.delete({
        where: { id }
    });
    return event
}





export const eventService = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
}