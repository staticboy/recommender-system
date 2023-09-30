import { Router } from 'express';
import { getCategoryAll } from '../controllers/categoryController';

const router = Router();

router.get('/getCatAll', getCategoryAll);

export default router;
