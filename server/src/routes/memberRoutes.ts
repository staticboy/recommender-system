import { Router } from 'express';
import { getMemberAll, 
  getMemberById, 
  getMemberByRegdate, 
  getMemberPreference,
  getMemberTransactions,
  insertNewMember,
  insertPreferenceInfo,
  insertProdRating,
  insertProdWishlist,
  insertMemberCartItem,
  memberSendTransaction,
  updateMemberPreferenceInfo,
  updateMemberProfileInfo,
  deleteMemberWishItem,
  deleteMemberCartItem,
  deleteMemberPreferenceInfo } from '../controllers/memberController';

const router = Router();

router.get('/getAll', getMemberAll);
router.post('/getById', getMemberById);
router.post('/getByDate', getMemberByRegdate);
router.post('/getPreference', getMemberPreference);
router.post('/getTransaction', getMemberTransactions);
router.post('/addNewMember', insertNewMember);
router.post('/addNewPref', insertPreferenceInfo);
router.post('/addNewRating', insertProdRating);
router.post('/addNewWishlist', insertProdWishlist);
router.post('/addToCart', insertMemberCartItem);
router.post('/memberSendTransaction', memberSendTransaction); //purchase
router.put('/editPref', updateMemberPreferenceInfo);
router.put('/editProfile', updateMemberProfileInfo);
router.delete('/delWish', deleteMemberWishItem);
router.delete('/delCart', deleteMemberCartItem);
router.delete('/delPref', deleteMemberPreferenceInfo);



export default router;
