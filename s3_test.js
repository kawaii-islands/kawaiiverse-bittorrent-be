require('dotenv').config();
const aws = require('aws-sdk');

const S3_BUCKET = "anime.kawaii.global"

async function test(){
    const s3 = new aws.S3({
        accessKeyId: process.env.ACCESS_KEY_S3,
        secretAccessKey:  process.env.SECRET_ACCESS_KEY_S3
    });

    const fileName = "1"
    const fileType = "png"
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `${fileName}.${fileType}`,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {

        console.log("err",err);
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        console.log("returnData",returnData);

    });
}
test()
