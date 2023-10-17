import { Router } from 'express';
import { getBusinessAll, 
  getBusinessById, 
  getBusinessByRegdate, 
  updateBusinessStatus,
  updateBusinessProfile,
  bizAccountVerify,
  bizAccountDisable,
  bizLogin, 
  insertNewBusiness } from '../controllers/businessController';

const router = Router();

router.get('/getAll', getBusinessAll);
router.post('/getById', getBusinessById);
router.post('/getByDate', getBusinessByRegdate);
router.post('/addNewBusiness', insertNewBusiness);
router.put('/editStatus', updateBusinessStatus);
router.put('/editProfile', updateBusinessProfile);
router.put('/verifyBiz', bizAccountVerify);
router.put('/disableBiz', bizAccountDisable);
router.post('/bizLogin', bizLogin);


export default router;
