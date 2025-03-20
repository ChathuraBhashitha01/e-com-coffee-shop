import express from 'express';
import itemRoutes from '../controller/ItemController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('/', itemRoutes.getAllItems);
router.post('/',  itemRoutes.createItem);
router.put('/:code',  itemRoutes.updateItem);
router.delete('/:code',  itemRoutes.deleteItem);
router.get('/find/:code', itemRoutes.findItemByCode);
router.get('/findByName/:name', itemRoutes.findItemByName);
router.get('/findByCategory/:category', itemRoutes.findItemsByCategory);

export default router;