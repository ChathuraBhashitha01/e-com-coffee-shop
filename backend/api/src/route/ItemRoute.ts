import express from 'express';
import itemRoutes from '../controller/ItemController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('/',protect, itemRoutes.getAllItems);
router.post('/',protect,  itemRoutes.createItem);
router.put('/:code',protect,  itemRoutes.updateItem);
router.delete('/:code',protect,  itemRoutes.deleteItem);
router.get('/find/:code',protect, itemRoutes.findItemByCode);
router.get('/findByName/:name',protect, itemRoutes.findItemByName);
router.get('/findByCategory/:category',protect, itemRoutes.findItemsByCategory);

export default router;