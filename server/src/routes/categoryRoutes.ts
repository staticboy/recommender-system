import { Router } from 'express';
import { getCategoryAll,
  getCategoryById,
  registerCategory,
  updateCategoryDetails,
  deleteCategory,
  deactivateCategory
} from '../controllers/categoryController';

const router = Router();

router.get('/getCatAll', getCategoryAll);
router.post('/getCatById', getCategoryById);
router.post('/registerCategory', registerCategory);
router.put('/updateCategory', updateCategoryDetails);
router.put('/deactivateCategory', deactivateCategory);
router.patch('/deleteCategory', deleteCategory)

export default router;
