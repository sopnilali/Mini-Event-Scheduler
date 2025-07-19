import express from 'express'
import { eventController } from './event.controller'
import validateRequest from '../../middleware/validateRequest'
import { eventValidation } from './event.validation'

const router = express.Router()

router.post('/', validateRequest(eventValidation.createEventZodSchema), eventController.createEvent)
router.get('/', eventController.getAllEvents)
router.get('/:id', eventController.getEventById)
router.put('/:id', eventController.updateEvent)
router.delete('/:id', eventController.deleteEvent)




export const eventRoutes = router