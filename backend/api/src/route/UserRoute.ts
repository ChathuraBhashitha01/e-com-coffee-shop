import express from 'express';
import User from '../controller/UserController';
import { authenticateToken } from "../middleware/AuthMiddleware";

const router = express.Router();

router.get('/',authenticateToken,User.getAllUser);
router.delete('/:username',authenticateToken, User.deleteUser);
router.get('/getUser/:username',authenticateToken, User.getUser);

export default router;
