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
const UploadImage = (req: any, res: any) => {
    try {
        const uploadParams = {
            Bucket: 'YOUR_BUCKET_NAME', //Bucket Name
            Key: req.files.files.name, //Image Name
            Body: Buffer.from(req.files.files.data), // Image buffer or stream
            ACL: 'private' // Set ACL to public-read and private for public access 
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
            Bucket: 'YOUR_BUCKET_NAME', //Bucket Name
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
        Bucket: 'YOUR_BUCKET_NAME'
    };
    s3.listObjectsV2(listParams, function (err: any, data: any) {
        if (err) {
            console.error('Error listing objects in S3:', err);
            return res.json({ message: err })
        } else {
            console.log('Images in S3:', data);
            return res.json({ data: data })

        }
    });
}

//Private image url convert into public url for some time//
const pre_signed_url = (req:any,res:any) =>{
    try {
        const getURLParams = {
            Bucket: 'YOUR_BUCKET_NAME', //Bucket Name
            Key: "PATH_TO_IMAGE_OBJECT", //Image Name
            Expires: 30 // Expiration time in seconds (e.g., 1 hour)
        };
        const imageURL = s3.getSignedUrl('getObject', getURLParams);
        return res.json({ data: imageURL })
    } catch (err:any) {
        res.json({message:err})
    }
}


export default {
    UploadImage,
    DeleteImage,
    Image_List,
    pre_signed_url
} as const