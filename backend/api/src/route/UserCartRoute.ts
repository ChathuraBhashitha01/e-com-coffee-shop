import express from 'express';
import UserCart from '../controller/UserCartController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('/', UserCart.getAllUserCarts);
router.post('/',  UserCart.createUserCart);
router.delete('/:username',  UserCart.deleteUserCart);
router.get('/find/:username', UserCart.findUserCartByUserName);

export default router;