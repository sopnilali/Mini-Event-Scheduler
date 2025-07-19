import express from 'express'
import { eventRoutes } from '../modules/event/event.route';


const router = express.Router()

const moduleRoutes = [
    {
        path: '/events',
        route: eventRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;