import express from 'express';
import { CreateReservation, deleteReservationById, getReservationByListingId, getReservationByUserId, getReservationsByOwner } from '../controllers/reservationsController.js';
import authMiddleware from '../middlewares/Authmiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, CreateReservation)
router.get('/owners', authMiddleware, getReservationsByOwner)
router.get('/userId', authMiddleware, getReservationByUserId)
router.get('/:id', getReservationByListingId)
router.delete('/:id', authMiddleware, deleteReservationById)


export default router