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
  deleteMemberPreferenceInfo, 
  getMemberWishlist,
  memberLogViewProduct,
  getMemberCartDetails} from '../controllers/memberController';

const router = Router();

router.get('/getAll', getMemberAll);
router.get('/getById', getMemberById);
router.get('/getByDate', getMemberByRegdate);
router.get('/getPreference', getMemberPreference);
router.get('/getTransaction', getMemberTransactions);
router.get('/getWishlist', getMemberWishlist);
router.get('/getCart', getMemberCartDetails);
router.post('/addNewMember', insertNewMember);
router.post('/addNewPref', insertPreferenceInfo);
router.post('/addNewRating', insertProdRating);
router.post('/addNewWishlist', insertProdWishlist);
router.post('/addToCart', insertMemberCartItem);
router.post('/memberSendTransaction', memberSendTransaction); //purchase
router.post('/memberLogViewProduct', memberLogViewProduct);
router.put('/editPref', updateMemberPreferenceInfo);
router.put('/editProfile', updateMemberProfileInfo);
router.delete('/delWish', deleteMemberWishItem);
router.delete('/delCart', deleteMemberCartItem);
router.delete('/delPref', deleteMemberPreferenceInfo);



export default router;
