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
});
