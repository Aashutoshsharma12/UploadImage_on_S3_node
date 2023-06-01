const AWS = require('aws-sdk');

// configure it with your AWS credentials:
const BucketName = "graph-imageupload"
const region = process.env.REGION
console.log(region)
// configure it with your AWS credentials:
AWS.config.update({ region: process.env.REGION});
var s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.ACCESS_KEYID,
        secretAccessKey: process.env.SECRETACESS_ID
    }
});
const cloudfront = new AWS.CloudFront();


// Create an instance of the S3 service:
// const s3 = new AWS.S3();


//Upload Image 
const UploadImage = (req: any, res: any) => {
    try {
        const uploadParams = {
            Bucket: BucketName, //Bucket Name
            Key: req.files.files.name, //Image Name
            Body: Buffer.from(req.files.files.data), // Image buffer or stream
            ACL: req.body.ACL // Set ACL to public-read and private for public access 
        }

        s3.upload(uploadParams, (err: any, data: any) => {
            if (err) {
                res.json({ message: err })
            } else {
                res.json({ imageUrl: data.Location })
            }
        })
    } catch (err: any) {
        res.json({ message: err })
    }
}

// Delete Image
const DeleteImage = (req: any, res: any) => {
    try {
        const deleteParams = {
            Bucket: BucketName, //Bucket Name
            Key: "PATH_TO_IMAGE_OBJECT", //Image Name 
        }
        s3.deleteObject(deleteParams, function (err: any, data: any) {
            if (err) {
                console.error('Error deleting object from S3:', err);
            } else {
                console.log('Object deleted from S3:', data);
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
            return res.json({ message: err })
        } else {
            return res.json({ data: data })

        }
    });
}

//Private image url convert into public url for some time//
const pre_signed_url = (req: any, res: any) => {
    console.log(region)

    try {
        const imageUrl = req.body.imageUrl
        const lastSlashIndex = imageUrl.lastIndexOf('/');
        const filename = imageUrl.substring(lastSlashIndex + 1);

        const getURLParams = {
            Bucket: BucketName, //Bucket Name
            Key: 'Screenshot from 2022-01-18 11-55-58.png', //Image Name
            Expires: req.body.expiredTime // Expiration time in seconds (e.g., 1 hour)
        };
        const imageURL = s3.getSignedUrl('getObject', getURLParams);
        return res.json({ data: imageURL })
    } catch (err: any) {
        res.json({ message: err })
    }
}

//Private image url convert into public url for some time//
const pre_signed_url_Cdn = (req: any, res: any) => {
    try {
        const imageUrl = req.body.imageUrl
        const lastSlashIndex = imageUrl.lastIndexOf('/');
        const filename = imageUrl.substring(lastSlashIndex + 1);
        const cloudFrontUrl = process.env.CLOUDFRONT_URL;

        const params = {
            Bucket: BucketName,
            Key: filename,
            // expires: Math.floor((Date.now() + 3600000) / 1000) // URL expiration time in seconds (1 hour in this example)
            Expires: 30
        };
        const pre_signedUrl = s3.getSignedUrl('getObject', params);
        const finalUrl = `${cloudFrontUrl}/${filename}?${pre_signedUrl.split('?')[1]}`;
        // const modifiedUrl = pre_signedUrl.replace('s3.ap-south-1.amazonaws.com', cloudFrontUrl);

        return res.json({ CDN_Url: finalUrl })
    } catch (err: any) {
        res.json({ message: err })
    }
}



export default {
    UploadImage,
    DeleteImage,
    Image_List,
    pre_signed_url,
    pre_signed_url_Cdn
} as const