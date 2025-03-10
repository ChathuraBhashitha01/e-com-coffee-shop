import express from 'express';
import User from '../controller/UserController';
// import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/saveUser',  User.createUser);
router.get('/login', User.loginUser);
router.get('/getUser', User.getUser);

export default router;
