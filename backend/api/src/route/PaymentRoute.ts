import express from 'express';
import paymentRoutes from '../controller/PaymentController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/', paymentRoutes.createPayment);
router.get('/getTotal', paymentRoutes.findTotal);
router.get('/getPayment', paymentRoutes.findPayment);
router.get('/:username', paymentRoutes.findPaymentByUserName);

export default router;
