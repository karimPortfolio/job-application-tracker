import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { AppModule } from '../src/app.module';
import { User } from '../src/users/user.schema';
import { Application } from '../src/applications/applications.schema';
import { Company } from '../src/companies/company.schema';
import { Job } from '../src/jobs/jobs.schema';
import { Department } from '../src/departments/departments.schema';
import { IsUserEmailUniqueConstraint } from '../src/common/decorators/is-user-email-uniqe.validator';
import { IsApplicationEmailUniqueConstraint } from '../src/common/decorators/is-application-email-uniqe.validator';
import { useContainer } from 'class-validator';

jest.setTimeout(30000);

describe('Public Applications E2E Tests', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;

  let userModel: Model<User>;
  let companyModel: Model<Company>;
  let departmentModel: Model<Department>;
  let jobModel: Model<Job>;
  let applicationModel: Model<Application>;

  let companyId: string;
  let departmentId: string;
  let publishedJobId: string;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'e2e-secret-public-applications';

    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IsUserEmailUniqueConstraint)
      .useValue({ validate: () => true })
      .overrideProvider(IsApplicationEmailUniqueConstraint)
      .useValue({ validate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.use(require('cookie-parser')());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      }),
    );

    await app.init();

    userModel = moduleFixture.get<Model<User>>(getModelToken('User'));
    companyModel = moduleFixture.get<Model<Company>>(getModelToken('Company'));
    departmentModel = moduleFixture.get<Model<Department>>(getModelToken('Department'));
    jobModel = moduleFixture.get<Model<Job>>(getModelToken('Job'));
    applicationModel = moduleFixture.get<Model<Application>>(getModelToken('Application'));

    // Create test company
    const company = await companyModel.create({
      name: 'Public Test Co',
      industry: 'Technology',
    });
    companyId = company._id.toString();

    // Create test department
    const dept = await departmentModel.create({
      title: 'Engineering',
      company: companyId,
    });
    departmentId = dept._id.toString();

    // Create published job (available for public applications)
    const publishedJob = await jobModel.create({
      title: 'Senior Backend Engineer',
      description: 'We are looking for an experienced backend engineer',
      country: 'USA',
      city: 'San Francisco',
      status: 'published',
      employmentType: 'full-time',
      experienceLevel: 'senior',
      isRemote: true,
      salaryMin: 120000,
      salaryMax: 160000,
      company: companyId,
      department: departmentId,
    });
    publishedJobId = publishedJob._id.toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    await app.close();
  });

  describe('POST /api/public-applications', () => {
    it('should create public application with file upload', async () => {
      const payload = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1-555-0100',
        country: 'USA',
        city: 'New York',
        job: publishedJobId,
        linkedInUrl: 'https://linkedin.com/in/johndoe',
        source: 'linkedin',
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('city', payload.city)
        .field('job', payload.job)
        .field('linkedInUrl', payload.linkedInUrl)
        .field('source', payload.source)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(201);
      expect(res.body._id).toBeDefined();
      expect(res.body.fullName).toBe(payload.fullName);
      expect(res.body.email).toBe(payload.email);
      expect(res.body.phoneNumber).toBe(payload.phoneNumber);
      expect(res.body.country).toBe(payload.country);
      expect(res.body.city).toBe(payload.city);
      expect(res.body.job).toBeDefined();
      expect(res.body.linkedInUrl).toBe(payload.linkedInUrl);
      expect(res.body.source).toBe(payload.source);
      expect(res.body.status).toBe('applied');
      expect(res.body.stage).toBe('screening');
      expect(res.body.company).toBe(companyId);
    });

    it('should create public application with resume URL', async () => {
      const payload = {
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '+1-555-0101',
        country: 'USA',
        job: publishedJobId,
        resumeUrl: 'https://example.com/resume.pdf',
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .field('resumeUrl', payload.resumeUrl)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(201);
      expect(res.body._id).toBeDefined();
      expect(res.body.email).toBe(payload.email);
      expect(res.body.resumeUrl).toBe(payload.resumeUrl);
    });

    it('should fail with missing required fields', async () => {
      const payload = {
        // missing fullName
        email: 'test@example.com',
        phoneNumber: '+1-555-0102',
        country: 'USA',
        job: publishedJobId,
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should fail with invalid email format', async () => {
      const payload = {
        fullName: 'Test User',
        email: 'not-an-email',
        phoneNumber: '+1-555-0103',
        country: 'USA',
        job: publishedJobId,
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should fail with duplicate application email', async () => {
      const email = `duplicate-${Date.now()}@example.com`;
      const payload = {
        fullName: 'Duplicate Test',
        email,
        phoneNumber: '+1-555-0104',
        country: 'USA',
        job: publishedJobId,
      };

      // First application - should succeed
      const firstRes = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(firstRes.status).toBe(201);

      // Second application with same email - should fail
      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', 'Another User')
        .field('email', payload.email)
        .field('phoneNumber', '+1-555-0105')
        .field('country', 'USA')
        .field('job', publishedJobId)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should fail with invalid file type', async () => {
      const payload = {
        fullName: 'File Type Test',
        email: 'filetype@example.com',
        phoneNumber: '+1-555-0106',
        country: 'USA',
        job: publishedJobId,
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('This is not a PDF'), {
          filename: 'resume.txt',
          contentType: 'text/plain',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should fail with non-existent job ID', async () => {
      const payload = {
        fullName: 'Invalid Job Test',
        email: 'invalidjob@example.com',
        phoneNumber: '+1-555-0108',
        country: 'USA',
        job: new mongoose.Types.ObjectId().toString(),
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Job not found');
    });

    it('should accept optional fields', async () => {
      const payload = {
        fullName: 'Optional Fields Test',
        email: 'optional@example.com',
        phoneNumber: '+1-555-0109',
        country: 'USA',
        job: publishedJobId,
        linkedInUrl: 'https://linkedin.com/in/optional',
        source: 'referral',
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .field('linkedInUrl', payload.linkedInUrl)
        .field('source', payload.source)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(201);
      expect(res.body.linkedInUrl).toBe(payload.linkedInUrl);
      expect(res.body.source).toBe(payload.source);
    });

    it('should set correct application status and stage', async () => {
      const payload = {
        fullName: 'Status Test',
        email: 'status@example.com',
        phoneNumber: '+1-555-0110',
        country: 'USA',
        job: publishedJobId,
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('applied');
      expect(res.body.stage).toBe('screening');
    });

    it('should correctly associate application with job company', async () => {
      const payload = {
        fullName: 'Company Association Test',
        email: 'company@example.com',
        phoneNumber: '+1-555-0111',
        country: 'USA',
        job: publishedJobId,
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(201);
      expect(res.body.company).toBe(companyId);
    });

    it('should handle minimum length validation for fullName', async () => {
      const payload = {
        fullName: 'A', // Less than minimum length of 2
        email: 'minlength@example.com',
        phoneNumber: '+1-555-0112',
        country: 'USA',
        job: publishedJobId,
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should increment job applicationsCount', async () => {
      // Get initial applicationsCount
      const jobBefore = await jobModel.findById(publishedJobId);
      expect(jobBefore).not.toBeNull();
      const initialCount = jobBefore!.applicationsCount || 0;

      const payload = {
        fullName: 'Count Increment Test',
        email: `countincrement-${Date.now()}@example.com`,
        phoneNumber: '+1-555-0114',
        country: 'USA',
        job: publishedJobId,
      };

      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect(res.status).toBe(201);

      // Get updated applicationsCount
      const jobAfter = await jobModel.findById(publishedJobId);
      expect(jobAfter).not.toBeNull();
      expect(jobAfter!.applicationsCount).toBeGreaterThan(initialCount);
    });

    it('should allow unauthenticated access', async () => {
      const payload = {
        fullName: 'Public Access Test',
        email: `publicaccess-${Date.now()}@example.com`,
        phoneNumber: '+1-555-0116',
        country: 'USA',
        job: publishedJobId,
      };

      // No authentication headers provided
      const res = await request(app.getHttpServer())
        .post('/api/public-applications')
        .field('fullName', payload.fullName)
        .field('email', payload.email)
        .field('phoneNumber', payload.phoneNumber)
        .field('country', payload.country)
        .field('job', payload.job)
        .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
        });

      expect([201, 400]).toContain(res.status);
    });
  });
});
