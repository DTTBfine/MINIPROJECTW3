import express from 'express'
import * as eventController from '../controllers/event'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// router.use(verifyToken)
router.post('/add-event', verifyToken, eventController.addEvent)
router.post('/update-event', verifyToken, eventController.updateEvent)
router.post('/mark-event', verifyToken, eventController.markedEvent)
router.post('/delete-event', verifyToken, eventController.deletedEvent)
router.post('/get-event-in-date', verifyToken, eventController.getEventInDate)
router.post('/get-event-in-month', verifyToken, eventController.getEventInMonth)

export default router