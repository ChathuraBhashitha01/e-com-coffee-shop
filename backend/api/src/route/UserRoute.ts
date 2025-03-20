import express from 'express';
import User from '../controller/UserController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/saveUser',protect,  User.createUser);
router.get('/login',protect, User.loginUser);
router.get('/getUser',protect, User.getUser);

export default router;
