import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import cookieParser from 'cookie-parser';
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

describe('Applications E2E Tests', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;

  let userModel: Model<User>;
  let companyModel: Model<Company>;
  let departmentModel: Model<Department>;
  let jobModel: Model<Job>;
  let applicationModel: Model<Application>;

  let cookie: string;
  let otherCookie: string;
  let companyId: string;
  let otherCompanyId: string;
  let departmentId: string;
  let jobId: string;
  let applicationId: string;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'e2e-secret-applications';

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
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.use(cookieParser());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    companyModel = moduleFixture.get<Model<Company>>(getModelToken(Company.name));
    departmentModel = moduleFixture.get<Model<Department>>(getModelToken(Department.name));
    jobModel = moduleFixture.get<Model<Job>>(getModelToken(Job.name));
    applicationModel = moduleFixture.get<Model<Application>>(getModelToken(Application.name));

    await app.init();

    // create and login user
    const userData = { first_name: 'App', last_name: 'Owner', email: 'app@test.com', password: 'password' };
    await request(app.getHttpServer()).post('/api/auth/register').send(userData).expect(201);
    const loginRes = await request(app.getHttpServer()).post('/api/auth/login').send({ email: userData.email, password: userData.password }).expect(201);
    cookie = loginRes.get('set-cookie')![0];
    await userModel.updateOne({ email: userData.email }, { emailVerifiedAt: new Date() });

    // create company and attach to user
    const company = await companyModel.create({ name: 'Apps Co', industry: 'Tech' });
    companyId = company._id.toString();
    await userModel.updateOne({ email: userData.email }, { company: companyId });
    const loginRes2 = await request(app.getHttpServer()).post('/api/auth/login').send({ email: userData.email, password: userData.password }).expect(201);
    cookie = loginRes2.get('set-cookie')![0];

    // create department and job
    const dept = await departmentModel.create({ title: 'Engineering', company: companyId });
    departmentId = dept._id.toString();

    const job = await jobModel.create({
      title: 'Backend Dev',
      description: 'Job desc',
      country: 'USA',
      status: 'published',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      company: companyId,
      department: departmentId,
    });
    jobId = job._id.toString();

    // create second user tied to different company
    const userDataOther = { first_name: 'Other', last_name: 'Owner', email: 'other@test.com', password: 'password' };
    await request(app.getHttpServer()).post('/api/auth/register').send(userDataOther).expect(201);
    const otherCompany = await companyModel.create({ name: 'Other Co', industry: 'Tech' });
    otherCompanyId = otherCompany._id.toString();
    await userModel.updateOne({ email: userDataOther.email }, { company: otherCompanyId, emailVerifiedAt: new Date() });
    const loginResOther = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: userDataOther.email, password: userDataOther.password })
      .expect(201);
    otherCookie = loginResOther.get('set-cookie')![0];
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    await app.close();
  });

  it('POST /api/applications creates application', async () => {
    const payload = {
      fullName: 'Jane Doe',
      email: 'jane@apps.com',
      phoneNumber: '123456789',
      country: 'USA',
      job: jobId,
      resumeUrl: 'https://example.com/resume.pdf',
    };

    const res = await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', payload.fullName)
      .field('email', payload.email)
      .field('phoneNumber', payload.phoneNumber)
      .field('country', payload.country)
      .field('job', payload.job)
      .field('resumeUrl', payload.resumeUrl)
      .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
        filename: 'resume.pdf',
        contentType: 'application/pdf',
      })
      .expect((res) => {
        if (res.status !== 201) {
          console.error('Create application response', res.status, res.body);
        }
      });

    expect(res.status).toBe(201);

    expect(res.body._id).toBeDefined();
    expect(res.body.email).toBe(payload.email);
    applicationId = res.body._id;
  });

  it('POST /api/applications rejects invalid email', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', 'Bad Email')
      .field('email', 'not-an-email')
      .field('phoneNumber', '123456789')
      .field('country', 'USA')
      .field('job', jobId)
      .field('resumeUrl', 'https://example.com/resume.pdf')
      .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
        filename: 'resume.pdf',
        contentType: 'application/pdf',
      })
      .expect(400);

    expect(res.body.message).toEqual(
      expect.arrayContaining(['email must be an email']),
    );
  });

  it('POST /api/applications rejects invalid file type', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', 'Bad File')
      .field('email', 'badfile@apps.com')
      .field('phoneNumber', '123456789')
      .field('country', 'USA')
      .field('job', jobId)
      .field('resumeUrl', 'https://example.com/resume.pdf')
      .attach('resume', Buffer.from('not a pdf'), {
        filename: 'resume.zip',
        contentType: 'application/zip',
      })
      .expect(400);

    expect(res.body.message).toContain('expected type is');
  });

  it('GET /api/applications returns list', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/applications')
      .set('Cookie', cookie)
      .expect(200);

    expect(Array.isArray(res.body?.docs)).toBe(true);
    expect(res.body.docs.length).toBeGreaterThanOrEqual(1);
  });

  it('GET /api/applications returns empty list for other company', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/applications')
      .set('Cookie', otherCookie)
      .expect(200);

    expect(Array.isArray(res.body?.docs)).toBe(true);
    expect(res.body.docs.length).toBe(0);
  });

  it('GET /api/applications/:id returns application', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/applications/${applicationId}`)
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body._id).toBe(applicationId);
    expect(res.body.email).toBe('jane@apps.com');
  });

  it('GET /api/applications/:id forbidden for other company', async () => {
    await request(app.getHttpServer())
      .get(`/api/applications/${applicationId}`)
      .set('Cookie', otherCookie)
      .expect(403);
  });

  it('PATCH /api/applications/:id/status updates status', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/applications/${applicationId}/status`)
      .set('Cookie', cookie)
      .send({ status: 'in_review' })
      .expect(200);

    expect(res.body.message).toBe('Application status updated successfully');
  });

  it('PATCH /api/applications/:id/status forbidden for other company', async () => {
    await request(app.getHttpServer())
      .patch(`/api/applications/${applicationId}/status`)
      .set('Cookie', otherCookie)
      .send({ status: 'in_review' })
      .expect(403);
  });

  it('PATCH /api/applications/:id/status rejects invalid status', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/applications/${applicationId}/status`)
      .set('Cookie', cookie)
      .send({ status: 'invalid_status' })
      .expect(400);

    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('status must be one of the following values'),
      ]),
    );
  });

  it('PATCH /api/applications/:id/stage updates stage', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/applications/${applicationId}/stage`)
      .set('Cookie', cookie)
      .send({ stage: 'technical_interview' })
      .expect(200);

    expect(res.body.message).toBe('Application stage updated successfully');
  });

  it('PATCH /api/applications/:id/stage forbidden for other company', async () => {
    await request(app.getHttpServer())
      .patch(`/api/applications/${applicationId}/stage`)
      .set('Cookie', otherCookie)
      .send({ stage: 'technical_interview' })
      .expect(403);
  });

  it('PATCH /api/applications/:id/stage rejects invalid stage', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/applications/${applicationId}/stage`)
      .set('Cookie', cookie)
      .send({ stage: 'unknown_stage' })
      .expect(400);

    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('stage must be one of the following values'),
      ]),
    );
  });

  it('DELETE /api/applications/:id deletes application', async () => {
    await request(app.getHttpServer())
      .delete(`/api/applications/${applicationId}`)
      .set('Cookie', cookie)
      .expect(200);

    const found = await applicationModel.findById(applicationId);
    expect(found).toBeNull();
  });

  it('DELETE /api/applications/:id forbidden for other company', async () => {
    await request(app.getHttpServer())
      .delete(`/api/applications/${applicationId}`)
      .set('Cookie', otherCookie)
      .expect(403);
  });

  it('PATCH /api/applications/:id updates application', async () => {
    // Create new application for update test
    const createRes = await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', 'Update Test')
      .field('email', 'updatetest@apps.com')
      .field('phoneNumber', '987654321')
      .field('country', 'UK')
      .field('city', 'London')
      .field('job', jobId)
      .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
        filename: 'resume.pdf',
        contentType: 'application/pdf',
      })
      .expect(201);

    const appId = createRes.body._id;

    const updateRes = await request(app.getHttpServer())
      .patch(`/api/applications/${appId}`)
      .set('Cookie', cookie)
      .field('fullName', 'Updated Name')
      .field('email', 'updated@apps.com')
      .field('phoneNumber', '111111111')
      .field('country', 'Canada')
      .field('city', 'Toronto')
      .expect(200);

    expect(updateRes.body.fullName).toBe('Updated Name');
    expect(updateRes.body.country).toBe('Canada');
    expect(updateRes.body.city).toBe('Toronto');
  });

  it('PATCH /api/applications/:id forbidden for other company', async () => {
    // Create new application first
    const createRes = await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', 'Forbidden Update')
      .field('email', 'forbiddenupdate@apps.com')
      .field('phoneNumber', '555555555')
      .field('country', 'USA')
      .field('job', jobId)
      .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
        filename: 'resume.pdf',
        contentType: 'application/pdf',
      })
      .expect(201);

    const appId = createRes.body._id;

    // Try to update with different company cookie
    await request(app.getHttpServer())
      .patch(`/api/applications/${appId}`)
      .set('Cookie', otherCookie)
      .field('fullName', 'Hacked')
      .field('email', 'hacked@apps.com')
      .field('phoneNumber', '000000000')
      .field('country', 'USA')
      .expect(403);
  });

  it('POST /api/applications/parse-resume parses resume file', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/applications/parse-resume')
      .set('Cookie', cookie)
      .attach('resume', Buffer.from('John Doe john.doe@example.com +1234567890'), {
        filename: 'resume.txt',
        contentType: 'text/plain',
      });

    // Accept both 201 (success) or 200 (success) responses
    expect([200, 201]).toContain(res.status);
    expect(res.body).toBeDefined();
    expect(typeof res.body).toBe('object');
  }, 10000); // Increase timeout for AI processing

  it('POST /api/applications/parse-resume rejects missing file', async () => {
    await request(app.getHttpServer())
      .post('/api/applications/parse-resume')
      .set('Cookie', cookie)
      .expect(400);
  });

  it('GET /api/applications/export exports as CSV', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/applications/export?format=csv')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.text).toBeDefined();
    expect(res.type).toMatch(/text\/csv/);
    expect(res.headers['content-disposition']).toContain('applications.csv');
  });

  it('GET /api/applications/export exports as XLSX', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/applications/export?format=xlsx')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.type).toMatch(/vnd.openxmlformats-officedocument.spreadsheetml.sheet/);
    expect(res.headers['content-disposition']).toContain('applications.xlsx');
  });

  it('GET /api/applications filters by search term', async () => {
    // Create applications with different data
    await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', 'Alice Smith')
      .field('email', 'alice@apps.com')
      .field('phoneNumber', '111111111')
      .field('country', 'USA')
      .field('job', jobId)
      .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
        filename: 'resume.pdf',
        contentType: 'application/pdf',
      })
      .expect(201);

    const searchRes = await request(app.getHttpServer())
      .get('/api/applications?search=alice')
      .set('Cookie', cookie)
      .expect(200);

    expect(searchRes.body.docs.length).toBeGreaterThan(0);
    expect(searchRes.body.docs.some((app: any) => app.fullName.toLowerCase().includes('alice') || app.email.toLowerCase().includes('alice'))).toBe(true);
  });

  it('GET /api/applications filters by country', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/applications?country=USA')
      .set('Cookie', cookie)
      .expect(200);

    expect(Array.isArray(res.body.docs)).toBe(true);
    // All returned applications should have country=USA or be empty
    if (res.body.docs.length > 0) {
      expect(res.body.docs.every((app: any) => app.country === 'USA' || !app.country)).toBe(true);
    }
  });

  it('GET /api/applications filters by status', async () => {
    // Create application with specific status
    const createRes = await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', 'Status Filter Test')
      .field('email', 'statustest@apps.com')
      .field('phoneNumber', '222222222')
      .field('country', 'USA')
      .field('status', 'in_review')
      .field('job', jobId)
      .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
        filename: 'resume.pdf',
        contentType: 'application/pdf',
      })
      .expect(201);

    const filterRes = await request(app.getHttpServer())
      .get('/api/applications?status=in_review')
      .set('Cookie', cookie)
      .expect(200);

    expect(Array.isArray(filterRes.body.docs)).toBe(true);
    if (filterRes.body.docs.length > 0) {
      expect(filterRes.body.docs.every((app: any) => app.status === 'in_review')).toBe(true);
    }
  });

  it('GET /api/applications filters by stage', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/applications?stage=screening')
      .set('Cookie', cookie)
      .expect(200);

    expect(Array.isArray(res.body.docs)).toBe(true);
    if (res.body.docs.length > 0) {
      expect(res.body.docs.every((app: any) => app.stage === 'screening' || !app.stage)).toBe(true);
    }
  });

  it('GET /api/applications supports pagination', async () => {
    const page1 = await request(app.getHttpServer())
      .get('/api/applications?page=1&limit=2')
      .set('Cookie', cookie)
      .expect(200);

    expect(page1.body.page).toBe(1);
    expect(page1.body.limit).toBe(2);
    expect(page1.body.docs.length).toBeLessThanOrEqual(2);
  });

  it('GET /api/applications supports sorting', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/applications?sortBy=createdAt&order=asc')
      .set('Cookie', cookie)
      .expect(200);

    expect(Array.isArray(res.body.docs)).toBe(true);
    // Basic check that response is valid
    expect(res.body.totalDocs).toBeDefined();
  });

  it('GET /api/applications/:id with populate shows job details', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/api/applications')
      .set('Cookie', cookie)
      .field('fullName', 'Job Popup Test')
      .field('email', 'jobpopuptest@apps.com')
      .field('phoneNumber', '333333333')
      .field('country', 'USA')
      .field('job', jobId)
      .attach('resume', Buffer.from('255044462d312e350a25aaaa0a', 'hex'), {
        filename: 'resume.pdf',
        contentType: 'application/pdf',
      })
      .expect(201);

    const appId = createRes.body._id;

    const getRes = await request(app.getHttpServer())
      .get(`/api/applications/${appId}`)
      .set('Cookie', cookie)
      .expect(200);

    expect(getRes.body.job).toBeDefined();
    expect(getRes.body.job.title).toBe('Backend Dev');
  });
});
