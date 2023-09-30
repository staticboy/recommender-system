import { Router } from 'express';
import { getCategoryAll,
  getCategoryById,
  registerCategory,
  updateCategoryDetails,
  deleteCategory
} from '../controllers/categoryController';

const router = Router();

router.get('/getCatAll', getCategoryAll);
router.post('/getCatById', getCategoryById);
router.post('/registerCategory', registerCategory);
router.put('/updateCategory', updateCategoryDetails);
router.delete('/deleteCategory', deleteCategory)

export default router;
