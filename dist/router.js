"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadImages_1 = __importDefault(require("./uploadImages"));
const router = (0, express_1.default)();
router.post('/uploadImage', uploadImages_1.default.UploadImage);
router.post('/deleteImage', uploadImages_1.default.DeleteImage);
router.get('/imageList', uploadImages_1.default.Image_List);
router.post('/pre_signedUrl', uploadImages_1.default.pre_signed_url);
exports.default = router;
