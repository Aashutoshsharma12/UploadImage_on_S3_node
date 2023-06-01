import Router from 'express'
import images from './uploadImages'
const router =  Router();

router.post('/uploadImage',images.UploadImage);
router.post('/deleteImage',images.DeleteImage);
router.get('/imageList',images.Image_List);
router.post('/pre_signedUrl',images.pre_signed_url);
router.post('/CDN_Url',images.pre_signed_url_Cdn);

export default router;