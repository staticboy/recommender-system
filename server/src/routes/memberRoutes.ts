import { Router } from 'express';
import { getMemberAll, getMemberById, getMemberByRegdate, getMemberPreference } from '../controllers/memberController';

  const router = Router();

router.get('/getAll', getMemberAll);
router.post('/getById', getMemberById);
router.post('/getByDate', getMemberByRegdate);
router.post('/getPreference', getMemberPreference);

export default router;
