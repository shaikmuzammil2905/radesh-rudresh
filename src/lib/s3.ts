import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

const bucketName = process.env.AWS_S3_BUCKET_NAME || 'rudra-infra';
const region = process.env.AWS_REGION || 'ap-south-2';

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function uploadBufferToS3(
  buffer: Buffer,
  fileName: string,
  contentType: string,
  folder: string = 'media'
): Promise<{ url: string; key: string }> {
  // Sanitize filename and add timestamp
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `${folder}/${Date.now()}-${sanitizedName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Return public URL (works with the public bucket policy configured)
  const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
  return { url, key };
}

export async function listS3Objects(prefix: string = 'media/') {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: 100,
    });
    const response = await s3Client.send(command);
    return (response.Contents || []).map((item) => ({
      key: item.Key || '',
      size: item.Size || 0,
      lastModified: item.LastModified || new Date(),
      url: `https://${bucketName}.s3.${region}.amazonaws.com/${item.Key}`,
    }));
  } catch (error) {
    console.error('Failed to list S3 objects:', error);
    return [];
  }
}

export async function deleteObjectFromS3(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error(`Failed to delete S3 object ${key}:`, error);
    return false;
  }
}
