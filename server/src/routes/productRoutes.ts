import { Router } from 'express';
import { getProdAll, getProdById, getProdByBizId, updateProductInfo, insertNewProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.get('/getAll', getProdAll);
router.post('/getById', getProdById);
router.post('/getByBizId', getProdByBizId);
router.post('/addNewProd', insertNewProduct);
router.put('/editInfo', updateProductInfo);
router.put('/deleteProd', deleteProduct);

export default router;
