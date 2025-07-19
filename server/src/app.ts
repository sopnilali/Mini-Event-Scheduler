import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import status from 'http-status'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'


const app = express()

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173' ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// middlwares

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())

// routers
app.use('/', router)


//global routes
app.get('/', (req, res) => {
    res.json({
        status: status.OK,
        message: "Mini Event Scheduler server is running"
    })
})

// global error handler
app.use(globalErrorHandler)

// not found route handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: "Api Not Found",
        error: {
            path: req.originalUrl,
            message: "Your request path is not found!"
        }
    })
})


export default app