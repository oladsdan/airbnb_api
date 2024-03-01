import { login, logout, register } from "../controllers/authControllers.js";
import express from "express";
import handleRefreshToken from "../controllers/refreshController.js";

const router = express.Router();

router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.post('/register', register)
router.post('/sign-in', login)




export default router