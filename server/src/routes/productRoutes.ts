import { Router } from 'express';
import { getProdAll, getProdById, getProdByBizId, getProdByCatId , updateProductInfo, insertNewProduct, deleteProduct ,
    getProdCatAll} from '../controllers/productController';

const router = Router();

router.get('/getAll', getProdAll);
router.post('/getById', getProdById);
router.post('/getByBizId', getProdByBizId);
router.post('/getByCatId', getProdByCatId);
router.post('/addNewProd', insertNewProduct);
router.put('/editInfo', updateProductInfo);
router.put('/deleteProd', deleteProduct);


/**Prod cat */ //getProdCatAll
router.get('/getCatAll', getProdCatAll);

export default router;
