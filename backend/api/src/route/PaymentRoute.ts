import express from 'express';
import paymentRoutes from '../controller/PaymentController';
import { authenticateToken } from "../middleware/AuthMiddleware";

const router = express.Router();

router.post('/',authenticateToken, paymentRoutes.createPayment);
router.get('/getTotal',authenticateToken, paymentRoutes.findTotal);
router.get('/getPayment',authenticateToken, paymentRoutes.findPayment);
router.get('/:username',authenticateToken, paymentRoutes.findPaymentByUserName);

export default router;
