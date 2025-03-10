import express from 'express';
import paymentRoutes from '../controller/PaymentController';
// import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/placeOrder', paymentRoutes.createPayment);
router.get('/getTotal', paymentRoutes.findTotal);
router.get('/getPayment', paymentRoutes.findPayment);

export default router;
