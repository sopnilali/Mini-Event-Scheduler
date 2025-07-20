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
exports.eventController = void 0;
const event_service_1 = require("./event.service");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const catchAsync_1 = require("../../helper/catchAsync");
const createEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_service_1.eventService.createEvent(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Event created successfully",
        data: result
    });
}));
// get all events
const getAllEvents = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy = 'date', sortOrder = 'asc', category } = req.query;
    const filters = {
        category: category ? category.toUpperCase() : undefined
    };
    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sortBy: sortBy,
        sortOrder: sortOrder,
        skip: (parseInt(req.query.page) - 1) * (parseInt(req.query.limit) || 10)
    };
    const result = yield event_service_1.eventService.getAllEvents(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Events fetched successfully",
        data: result
    });
}));
// get event by id
const getEventById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_service_1.eventService.getEventById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Event fetched successfully",
        data: result
    });
}));
// update event
const updateEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_service_1.eventService.updateEvent(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Event archived status updated successfully",
        data: result
    });
}));
// delete event
const deleteEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_service_1.eventService.deleteEvent(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Event deleted successfully",
        data: result
    });
}));
exports.eventController = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
