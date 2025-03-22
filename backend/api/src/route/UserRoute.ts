import express from 'express';
import User from '../controller/UserController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('/', User.getAllUser);
router.delete('/:username', User.deleteUser);
router.post('/signin',  User.createUser);
router.get('/login/:username/:password', User.loginUser);
router.get('/getUser/:username', User.getUser);

export default router;
