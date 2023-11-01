import { Router } from 'express';
import { getProdAll, getProdById, getProdByBizId, getProdByCatId , updateProductInfo, insertNewProduct, deleteProduct, uploadImages, getImages} from '../controllers/productController';

const router = Router();

router.get('/getAll', getProdAll);
router.post('/getById', getProdById);
router.post('/getByBizId', getProdByBizId);
router.post('/getByCatId', getProdByCatId);
router.post('/addNewProd', insertNewProduct);
router.put('/editInfo', updateProductInfo);
router.post('/deleteProd', deleteProduct);
router.post('/uploadImages/:prod_id', uploadImages);
router.get('/getImages/:prod_id', getImages);

export default router;
