import { Router } from 'express';
import { getAllEnquiries, getEnquiryById, getEnquiryBySubmitId, getEnquiryBySubmitDateSorted, insertEnquiry, updateEnqByAdm } from '../controllers/enquiryController';

const router = Router();

router.get('/getAllEnquiries', getAllEnquiries);
router.post('/getEnquiryById', getEnquiryById);
router.post('/getEnquiryByMe', getEnquiryBySubmitId);
router.get('/getEnquiryBySubmitDateSorted', getEnquiryBySubmitDateSorted);
router.get('/getEnquiryBySubmitDateSorted', getEnquiryBySubmitDateSorted);
router.post('/insertEnquiry', insertEnquiry);
router.put('/updateEnqByAdm', updateEnqByAdm);







export default router;
