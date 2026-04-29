"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Uploader = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = require("crypto");
let S3Uploader = class S3Uploader {
    s3 = null;
    bucket;
    region;
    publicBaseUrl;
    isConfigured;
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
    initS3() {
        if (!this.s3) {
            if (!this.isConfigured) {
                throw new common_1.BadRequestException('S3 upload not configured');
            }
            this.s3 = new client_s3_1.S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
                },
            });
        }
        return this.s3;
    }
    isS3Configured() {
        return this.isConfigured;
    }
    async upload({ file, keyPrefix, metadata, acl, bucket, errMessage }) {
        if (!file)
            throw new common_1.BadRequestException(errMessage || 'File is required');
        if (!this.isConfigured) {
            throw new common_1.BadRequestException('S3 upload not configured');
        }
        const safeName = (file.originalname || 'file').replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const key = `${keyPrefix ? `${keyPrefix.replace(/\/+$/, '')}/` : ''}${Date.now()}-${(0, crypto_1.randomUUID)()}-${safeName}`;
        const s3 = this.initS3();
        await s3.send(new client_s3_1.PutObjectCommand({
            Bucket: bucket || this.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: acl || 'private',
            Metadata: metadata,
        }));
        if (!this.publicBaseUrl)
            return key;
        return `${this.publicBaseUrl}/${key}`;
    }
    async delete(key, bucket) {
        if (!this.isConfigured) {
            throw new common_1.BadRequestException('S3 upload not configured');
        }
        const s3 = this.initS3();
        await s3.send(new client_s3_1.DeleteObjectCommand({
            Bucket: bucket || this.bucket,
            Key: key,
        }));
    }
    async getFileStream(key, bucket) {
        if (!this.isConfigured) {
            throw new common_1.BadRequestException('S3 upload not configured');
        }
        const s3 = this.initS3();
        const command = new client_s3_1.GetObjectCommand({
            Bucket: bucket || this.bucket,
            Key: key,
        });
        try {
            const response = await s3.send(command);
            return response.Body;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error retrieving file from S3');
        }
    }
};
exports.S3Uploader = S3Uploader;
exports.S3Uploader = S3Uploader = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Uploader);
//# sourceMappingURL=s3-uploader.js.map