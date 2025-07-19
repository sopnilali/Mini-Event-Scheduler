"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://mini-event-scheduler-api.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// middlwares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
// routers
app.use('/', routes_1.default);
//global routes
app.get('/', (req, res) => {
    res.json({
        status: http_status_1.default.OK,
        message: "Mini Event Scheduler server is running"
    });
});
// global error handler
app.use(globalErrorHandler_1.default);
// not found route handler
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Api Not Found",
        error: {
            path: req.originalUrl,
            message: "Your request path is not found!"
        }
    });
});
exports.default = app;
