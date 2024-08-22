import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('Missing AWS environment variables');
}

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToS3(bucketName: string, key: string, fileContent: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
    ACL: 'public-read',
  });

  try {
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
}