const AWS = require("aws-sdk");
const parseMultipart = require("parse-multipart");

const { BUCKET_NAME } = process.env;

const s3 = new AWS.S3();

module.exports = async (event) => {
  try {
    const { filename, data } = extractFile(event);
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: filename,
        ACL: "public-read",
        Body: data,
      })
      .promise();

    const link = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`;

    console.log(link);

    return {
      statusCode: 200,
      body: JSON.stringify({
        link,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.stack }),
    };
  }
};

function extractFile(event) {
  const boundary = parseMultipart.getBoundary(event.headers["content-type"]);
  const parts = parseMultipart.Parse(
    Buffer.from(event.body, "base64"),
    boundary
  );
  const [{ filename, data }] = parts;

  return {
    filename,
    data,
  };
}
