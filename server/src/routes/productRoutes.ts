import { Router } from 'express';
import { getProdAll, getProdById, getProdByBizId, getProdByCatId , updateProductInfo, insertNewProduct, deleteProduct, uploadImages, getImages, insertBatchProduct} from '../controllers/productController';

const router = Router();

router.get('/getAll', getProdAll);
router.post('/getById', getProdById);
router.post('/getByBizId', getProdByBizId);
router.post('/getByCatId', getProdByCatId);
router.post('/addNewProd', insertNewProduct);
router.post('/addNewProdBatch', insertBatchProduct);
router.put('/editInfo', updateProductInfo);
router.post('/deleteProd', deleteProduct);
router.post('/uploadImages/:prod_id', uploadImages);
router.get('/getImages/:prod_id', getImages);

export default router;
