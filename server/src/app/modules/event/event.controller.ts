import { Request, Response } from "express"
import { eventService } from "./event.service"
import sendResponse from "../../helper/sendResponse"
import { catchAsync } from "../../helper/catchAsync"
import pick from "../../routes/pick"


const createEvent = catchAsync(async (req: Request, res: Response) => {

    const result = await eventService.createEvent(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Event created successfully",
        data: result
    })
})

// get all events
const getAllEvents = catchAsync(async (req: Request, res: Response) => {

    const { sortBy = 'date', sortOrder = 'asc', category } = req.query

    const filters = {
        category: category ? (category as string).toUpperCase() : undefined
    };

    const options = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
        skip: (parseInt(req.query.page as string) - 1) * (parseInt(req.query.limit as string) || 10)
    };

    const result = await eventService.getAllEvents(filters, options)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Events fetched successfully",
        data: result
    })
})

// get event by id
const getEventById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await eventService.getEventById(id)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Event fetched successfully",
        data: result
    })
})

// update event

const updateEvent = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await eventService.updateEvent(id)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Event archived status updated successfully",
        data: result
    })
})

// delete event
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await eventService.deleteEvent(id)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Event deleted successfully",
        data: result
    })
})

export const eventController = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
}