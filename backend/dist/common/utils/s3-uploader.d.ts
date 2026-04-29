export interface UploadOptions {
    file: Express.Multer.File;
    keyPrefix?: string;
    metadata?: Record<string, string>;
    acl?: 'private' | 'public-read';
    bucket?: string;
    errMessage?: string;
}
export declare class S3Uploader {
    private s3;
    private readonly bucket;
    private readonly region;
    private readonly publicBaseUrl;
    private readonly isConfigured;
    constructor();
    private initS3;
    isS3Configured(): boolean;
    upload({ file, keyPrefix, metadata, acl, bucket, errMessage }: UploadOptions): Promise<string>;
    delete(key: string, bucket?: string): Promise<void>;
    getFileStream(key: string, bucket?: string): Promise<any>;
}
