"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
// configure it with your AWS credentials:
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_REGION' // e.g., 'us-east-1'
});
// Create an instance of the S3 service:
const s3 = new AWS.S3();
//Upload Image 
const UploadImage = (req, res) => {
    try {
        const uploadParams = {
            Bucket: 'YOUR_BUCKET_NAME',
            Key: req.files.files.name,
            Body: Buffer.from(req.files.files.data),
            ACL: 'private' // Set ACL to public-read and private for public access 
        };
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                res.json({ message: err });
            }
            else {
                res.json({ imageUrl: data.Location });
            }
        });
    }
    catch (err) {
        res.json({ message: err });
    }
};
// Delete Image
const DeleteImage = (req, res) => {
    try {
        const deleteParams = {
            Bucket: 'YOUR_BUCKET_NAME',
            Key: "PATH_TO_IMAGE_OBJECT", //Image Name 
        };
        s3.deleteObject(deleteParams, function (err, data) {
            if (err) {
                console.error('Error deleting object from S3:', err);
            }
            else {
                console.log('Object deleted from S3:', data);
            }
        });
    }
    catch (err) {
        res.json({ message: err });
    }
};
//image list ***************************************//
const Image_List = (req, res) => {
    const listParams = {
        Bucket: 'YOUR_BUCKET_NAME'
    };
    s3.listObjectsV2(listParams, function (err, data) {
        if (err) {
            console.error('Error listing objects in S3:', err);
            return res.json({ message: err });
        }
        else {
            console.log('Images in S3:', data);
            return res.json({ data: data });
        }
    });
};
//Private image url convert into public url for some time//
const pre_signed_url = (req, res) => {
    try {
        const getURLParams = {
            Bucket: 'YOUR_BUCKET_NAME',
            Key: "PATH_TO_IMAGE_OBJECT",
            Expires: 30 // Expiration time in seconds (e.g., 1 hour)
        };
        const imageURL = s3.getSignedUrl('getObject', getURLParams);
        return res.json({ data: imageURL });
    }
    catch (err) {
        res.json({ message: err });
    }
};
exports.default = {
    UploadImage,
    DeleteImage,
    Image_List,
    pre_signed_url
};
