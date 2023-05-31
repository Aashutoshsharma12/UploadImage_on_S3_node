// const AWS = require('aws-sdk');
import AWS from 'aws-sdk'
const BucketName = "graph-imageupload"
const region = 'ap-south-1'
// configure it with your AWS credentials:
AWS.config.update({ region: 'ap-south-1' });
var s3 = new AWS.S3({
    credentials: {
        accessKeyId: 'AKIARXOWZL5DMJY4C6HJ',
        secretAccessKey: 'M9pLQFkoZkPckcPkyqGfs1bt/2Etkfvi/t5hOt2s'
    }
});


//Upload Image 
const UploadImage = (req: any, res: any) => {
    try {
        const uploadParams: any = {
            Bucket: BucketName,
            Key: req.files.files.name,
            Body: Buffer.from(req.files.files.data), // Image buffer or stream
            ACL: req.body.ACL ? req.body.ACL : "private" // Set ACL to public-read for public access //private
        };
        s3.upload(uploadParams, async (err: any, data: any) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                return res.status(200).json({message:"Image uploaded successfully", url: data.Location })
            }
        });
    } catch (err: any) {
        res.json({ message: err })
    }
}

// Delete Image
const DeleteImage = (req: any, res: any) => {
    try {
        const imageUrl = req.body.imageUrl
        const lastSlashIndex = imageUrl.lastIndexOf('/');
        const filename = imageUrl.substring(lastSlashIndex + 1);

        const deleteParams = {
            Bucket: BucketName, //Bucket Name
            Key: filename, //Image Name 
        }
        s3.deleteObject(deleteParams, function (err: any, data: any) {
            if (err) {
                res.json({ errr: err })
            } else {
                res.json({ data, message: "Image delete successfully" })
            }
        });
    } catch (err: any) {
        res.json({ message: err })
    }
}

//image list ***************************************//
const Image_List = (req: any, res: any) => {
    const listParams = {
        Bucket: BucketName
    };
    s3.listObjectsV2(listParams, function (err: any, data: any) {
        if (err) {
            return res.json({ message: err.message })
        } else {
            const imageDetails = data.Contents
            var array: any = []
            imageDetails.map((data: any) => {
                array.push({ "imageUrl": `https://${BucketName}.s3.${region}.amazonaws.com/${data.Key}` })
            })
            return res.json({ data:array })
        }
    });
}

//Private image url convert into public url for some time//
const pre_signed_url = (req: any, res: any) => {
    try {
        const imageUrl = req.body.imageUrl
        const lastSlashIndex = imageUrl.lastIndexOf('/');
        const filename = imageUrl.substring(lastSlashIndex + 1);

        const getURLParams = {
            Bucket: BucketName, //Bucket Name
            Key: filename, //Image Name
            Expires: req.body.expiredTime // Expiration time in seconds (e.g., 1 hour)
        };
        const imageURL = s3.getSignedUrl('getObject', getURLParams);
        return res.json({ pre_signed_url: imageURL })
    } catch (err: any) {
        res.json({ message: err })
    }
}


export default {
    UploadImage,
    DeleteImage,
    Image_List,
    pre_signed_url
} as const