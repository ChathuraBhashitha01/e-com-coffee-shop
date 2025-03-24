import express from 'express';
import itemRoutes from '../controller/ItemController';
import { authenticateToken } from "../middleware/AuthMiddleware";

const router = express.Router();

router.get('/',authenticateToken, itemRoutes.getAllItems);
router.post('/',authenticateToken,  itemRoutes.createItem);
router.put('/:code',authenticateToken,  itemRoutes.updateItem);
router.delete('/:code',authenticateToken,  itemRoutes.deleteItem);
router.get('/find/:code',authenticateToken, itemRoutes.findItemByCode);
router.get('/findByName/:name',authenticateToken, itemRoutes.findItemByName);
router.get('/findByCategory/:category',authenticateToken, itemRoutes.findItemsByCategory);

export default router;