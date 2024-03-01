import express from 'express';
import authMiddleware from '../middlewares/Authmiddleware.js';
import { CreateListing, GetAllListing, GetListingbyId, GetListingsByUsers, deleteListingByUsers } from '../controllers/listingControllers.js';


const router = express.Router();

router.get('/listing-user', authMiddleware, GetListingsByUsers)
router.get('/allListings', GetAllListing)
router.get('/listing/:id', GetListingbyId)
router.post('/create', authMiddleware, CreateListing)
router.delete('/:id', authMiddleware, deleteListingByUsers)


export default router