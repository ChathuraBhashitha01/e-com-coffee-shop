import express from 'express';
import paymentRoutes from '../controller/PaymentController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/placeOrder',protect, paymentRoutes.createPayment);
router.get('/getTotal',protect, paymentRoutes.findTotal);
router.get('/getPayment',protect, paymentRoutes.findPayment);

export default router;
