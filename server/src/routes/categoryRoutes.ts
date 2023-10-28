import { Router } from 'express';
import { getCategoryAll,
  getCategoryById,
  registerCategory,
  updateCategoryDetails,
  deleteCategory,
  getSubCategoryAll,
  getSubCategoryActive,
  getOneSubCategoryByName,
  upsertSubCategory,
  deleteSubCategory,
  deactivateCategory
} from '../controllers/categoryController';

const router = Router();

router.get('/getCatAll', getCategoryAll);
router.post('/getCatById', getCategoryById);
router.post('/registerCategory', registerCategory);
router.put('/updateCategory', updateCategoryDetails);
router.patch('/deleteCategory', deleteCategory);
router.put('/deactivateCategory', deactivateCategory);
router.get('/getSubCatAll', getSubCategoryAll);
router.get('/getSubCatActive', getSubCategoryActive);
router.post('/getOneSubCategoryByName', getOneSubCategoryByName);
router.post('/upsertSubcat', upsertSubCategory);
router.patch('/deleteSubCat', deleteSubCategory);

export default router;
