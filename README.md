# UploadImage_on_s3_nodejs
## What is Amazon S3 ?
Amazon S3 (Simple Storage Service) is a scalable cloud storage service provided by Amazon Web Services (AWS). It is designed to store and retrieve large amounts of data reliably and securely. S3 is widely used for various purposes, such as backup and restore, data archiving, content distribution, and hosting static websites.

Here are some key features and concepts related to Amazon S3:

Object Storage: Amazon S3 offers object storage, where data is stored as objects within containers called "buckets." Each object in S3 consists of data, a unique key, and metadata.

Scalability and Durability: S3 is highly scalable and can store virtually unlimited amounts of data. It is designed to provide durability, meaning that your data is redundantly stored across multiple devices and facilities to ensure high availability.

Data Security: S3 provides various security features, including encryption at rest and in transit. You can encrypt your data using server-side encryption with Amazon S3 managed keys (SSE-S3), AWS Key Management Service (SSE-KMS), or your own customer-provided keys (SSE-C).

Access Control: S3 allows you to control access to your buckets and objects using AWS Identity and Access Management (IAM) policies, bucket policies, and Access Control Lists (ACLs). You can define fine-grained access permissions based on users, groups, or IP addresses.
## Setup node js project:

`Run commonds on terminal:`

`mkdir folder Name(create a folder)`

`Inside This folder`

`npm init -y`

`npm install --save-dev @types/typescript`

`npm install --save-dev @types/nodemon`

`npm install rimraf dist && tsc`

`npx tsc --init (Set root_dir and out_dir)`

`npm i ts-node`

`mkdir src`

`Inside src folder create a index.ts file`

`Set these lines In package.json :`

`"start":"nodemon src/index.ts" (Server start command)`

`"build":"rimraf dist && tsc" (create a build command)`

## Amazon S3 setup

`npm install aws-sdk`

`Configure it with your AWS credentials:`

const AWS = require('aws-sdk');

AWS.config.update({

  accessKeyId: 'YOUR_ACCESS_KEY',

  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',

  region: 'YOUR_REGION' // e.g., 'us-east-1'

});

## Create an instance of the S3 service:
`const s3 = new AWS.S3();`

## Create Bucket

![ss](https://github.com/Aashusharm/UploadImage_on_s3_nodejs/assets/117743698/df30ad78-5c1f-4545-b875-c79315493a02)


## Postman APIs
`http://localhost:5009/uploadImage req:{formData:{files:file_path,BucketName:"Bucket_name"}}`

`http://localhost:5009/pre_signedUrl req:{files:file_name,BucketName:"Bucket_name"}}`

`http://localhost:5009/imageList req:{BucketName:"Bucket_name"}}`

`http://localhost:5009/deleteImage req:{BucketName:"Bucket_name",files:file_name}`
