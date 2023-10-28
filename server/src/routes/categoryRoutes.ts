import { Router } from 'express';
import { getCategoryAll,
  getCategoryById,
  registerCategory,
  updateCategoryDetails,
  deleteCategory,
  getSubCategoryAll,
  getSubCategoryActive,
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
router.post('/upsertSubcat', upsertSubCategory);
router.delete('/deleteSubCat', deleteSubCategory);

export default router;
