import express from 'express';
import AuthController from '../controller/authController';

const router = express.Router();

router.post('/login', AuthController.loginUser);
router.post('/signin',AuthController.signinUser);
router.post('/refesh',AuthController.refechUser);

export default router;
