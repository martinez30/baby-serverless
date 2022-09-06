const AWS = require("aws-sdk");
const parseMultipart = require("parse-multipart");

const { BUCKET_NAME } = process.env;

const s3 = new AWS.S3();

module.exports.onUpload = async (event) => {
  try {
    const key = event.Records[0].s3.object.key;

    const data = await s3.getObject({
      Bucket: event.Records[0].s3.bucket.name,
      Key
    });

    const s3Object = JSON.parse(data.body);
    console.log("s3Object", s3Object);

    // const link = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`;
    // console.log("link", link);
    return;
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.stack }),
    };
  }
};