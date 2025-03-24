import express from 'express';
import UserCart from '../controller/UserCartController';
import { authenticateToken } from "../middleware/AuthMiddleware";

const router = express.Router();

router.get('/',authenticateToken, UserCart.getAllUserCarts);
router.post('/',authenticateToken, UserCart.createUserCart);
router.delete('/:username',authenticateToken, UserCart.deleteUserCart);
router.get('/find/:username',authenticateToken, UserCart.findUserCartByUserName);

export default router;
