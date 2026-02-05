import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

export interface UploadOptions {
  file: Express.Multer.File;
  keyPrefix?: string;
  metadata?: Record<string, string>;
  acl?: 'private' | 'public-read';
  bucket?: string;
  errMessage?: string;
}

@Injectable()
export class S3Uploader {
  private s3: S3Client | null = null;
  private readonly bucket: string;
  private readonly region: string;
  private readonly publicBaseUrl: string;
  private readonly isConfigured: boolean;

  constructor() {
    this.bucket = process.env.AWS_BUCKET || '';
    this.region = process.env.AWS_DEFAULT_REGION || process.env.AWS_REGION || '';
    this.publicBaseUrl =
      process.env.AWS_CLOUDFRONT_URL2 ||
      (this.bucket && this.region
        ? `https://${this.bucket}.s3.${this.region}.amazonaws.com`
        : '');

    this.isConfigured = !!(this.bucket && this.region);
  }

  private initS3(): S3Client {
    if (!this.s3) {
      if (!this.isConfigured) {
        throw new BadRequestException('S3 upload not configured');
      }
      this.s3 = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
      });
    }
    return this.s3;
  }

  isS3Configured(): boolean {
    return this.isConfigured;
  }

  async upload({ file, keyPrefix, metadata, acl, bucket, errMessage }: UploadOptions) {
    if (!file) throw new BadRequestException(errMessage || 'File is required');

    if (!this.isConfigured) {
      throw new BadRequestException('S3 upload not configured');
    }

    const safeName = (file.originalname || 'file').replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const key = `${keyPrefix ? `${keyPrefix.replace(/\/+$/, '')}/` : ''}${Date.now()}-${randomUUID()}-${safeName}`;

    const s3 = this.initS3();
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket || this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: acl || 'private',
        Metadata: metadata,
      }),
    );

    if (!this.publicBaseUrl) return key;
    return `${this.publicBaseUrl}/${key}`;
  }

  async delete(key: string, bucket?: string) {
    if (!this.isConfigured) {
      throw new BadRequestException('S3 upload not configured');
    }

    const s3 = this.initS3();
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket || this.bucket,
        Key: key,
      }),
    );
  }
}
