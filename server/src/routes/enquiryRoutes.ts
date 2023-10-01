import { Router } from 'express';
import { getAllEnquiries, getEnquiryById, getEnquiryBySubmitDateSorted, insertEnquiry, updateEnqByAdm } from '../controllers/enquiryController';

const router = Router();

router.get('/getAllEnquiries', getAllEnquiries);
router.get('/getEnquiryById', getEnquiryById);
router.get('/getEnquiryBySubmitDateSorted', getEnquiryBySubmitDateSorted);
router.get('/getEnquiryBySubmitDateSorted', getEnquiryBySubmitDateSorted);
router.post('/insertEnquiry', insertEnquiry);
router.put('/updateEnqByAdm', updateEnqByAdm);







export default router;
