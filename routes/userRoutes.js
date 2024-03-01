import express from 'express';
import { getFavoriteListings, getUserbyId, likeListing } from '../controllers/userControlleres.js';
import authMiddleware from '../middlewares/Authmiddleware.js';

const router = express.Router();

router.get('/favorites', authMiddleware, getFavoriteListings)
router.get('/:userId', getUserbyId)
router.put('/favorite/:id', authMiddleware, likeListing)


export default router