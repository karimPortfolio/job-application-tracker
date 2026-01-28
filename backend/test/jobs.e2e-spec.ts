import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { AppModule } from '../src/app.module';
import { User } from '../src/users/user.schema';
import { Job } from '../src/jobs/jobs.schema';
import { Company } from '../src/companies/company.schema';
import { Department } from '../src/departments/departments.schema';
import cookieParser from 'cookie-parser';

function binaryParser(res, callback) {
  res.setEncoding('binary');
  res.data = '';
  res.on('data', function (chunk) {
    res.data += chunk;
  });
  res.on('end', function () {
    callback(null, Buffer.from(res.data, 'binary'));
  });
}

describe('Jobs E2E Tests', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;
  
  let userAModel: Model<User>;
  let jobModel: Model<Job>;
  let companyModel: Model<Company>;
  let departmentModel: Model<Department>;

  let cookieA: string;
  let cookieB: string;
  let cookieNoCompany: string;

  let companyAId: string;
  let companyBId: string;
  let departmentAId: string;
  let jobAId: string;
  let jobBId: string;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'e2e-secret-jobs';

    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    app.use(cookieParser());
    
    userAModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    jobModel = moduleFixture.get<Model<Job>>(getModelToken(Job.name));
    companyModel = moduleFixture.get<Model<Company>>(getModelToken(Company.name));
    departmentModel = moduleFixture.get<Model<Department>>(getModelToken(Department.name));

    await app.init();

    const userAData = { first_name: 'User', last_name: 'A', email: 'a@test.com', password: 'password' };
    await request(app.getHttpServer()).post('/api/auth/register').send(userAData).expect(201);
    const loginA = await request(app.getHttpServer()).post('/api/auth/login').send({ email: userAData.email, password: userAData.password }).expect(201);
    cookieA = loginA.get('set-cookie')![0];
    await userAModel.updateOne({ email: userAData.email }, { emailVerifiedAt: new Date() });

    const compA = await companyModel.create({ name: 'Company A', industry: 'Tech' });
    companyAId = compA._id.toString();
    await userAModel.updateOne({ email: userAData.email }, { company: companyAId });
    const loginA2 = await request(app.getHttpServer()).post('/api/auth/login').send({ email: userAData.email, password: userAData.password }).expect(201);
    cookieA = loginA2.get('set-cookie')![0];

    const userBData = { first_name: 'User', last_name: 'B', email: 'b@test.com', password: 'password' };
    await request(app.getHttpServer()).post('/api/auth/register').send(userBData).expect(201);
    const loginB = await request(app.getHttpServer()).post('/api/auth/login').send({ email: userBData.email, password: userBData.password }).expect(201);
    cookieB = loginB.get('set-cookie')![0];
    await userAModel.updateOne({ email: userBData.email }, { emailVerifiedAt: new Date() });

    const compB = await companyModel.create({ name: 'Company B', industry: 'Design' });
    companyBId = compB._id.toString();
    await userAModel.updateOne({ email: userBData.email }, { company: companyBId });
    const loginB2 = await request(app.getHttpServer()).post('/api/auth/login').send({ email: userBData.email, password: userBData.password }).expect(201);
    cookieB = loginB2.get('set-cookie')![0];

    const noCompData = { first_name: 'No', last_name: 'Comp', email: 'none@test.com', password: 'password' };
    await request(app.getHttpServer()).post('/api/auth/register').send(noCompData).expect(201);
    const loginNoComp = await request(app.getHttpServer()).post('/api/auth/login').send({ email: noCompData.email, password: noCompData.password }).expect(201);
    cookieNoCompany = loginNoComp.get('set-cookie')![0];
    await userAModel.updateOne({ email: noCompData.email }, { emailVerifiedAt: new Date() });

    const deptA = await departmentModel.create({ title: 'Engineering', company: companyAId });
    departmentAId = deptA._id.toString();

    const jobA = await jobModel.create({
      title: 'Fullstack Dev',
      description: 'Desc',
      country: 'USA',
      company: companyAId,
      department: departmentAId,
      employmentType: 'full-time',
      experienceLevel: 'mid'
    });
    jobAId = jobA._id.toString();

    const jobB = await jobModel.create({
      title: 'Backend Dev',
      description: 'Desc',
      country: 'USA',
      company: companyBId,
      employmentType: 'full-time',
      experienceLevel: 'senior'
    });
    jobBId = jobB._id.toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    await app.close();
  });

  describe('Authentication and Authorization', () => {
    it('should return 401 if user is not authenticated', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/jobs')
        .expect(401);
    });

    it('should return 403 if user does not have a company', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/jobs')
        .set('Cookie', cookieNoCompany)
        .expect(403);
    });
  });

  describe('Tenant Isolation', () => {
    it('should not allow User A to access Job B (Company B)', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/jobs/${jobBId}`)
        .set('Cookie', cookieA)
        .expect(403);
      
      expect(res.body.message).toBe('Access to this resource is forbidden');
    });

    it('should not allow User A to update Job B (Company B)', async () => {
      await request(app.getHttpServer())
        .patch(`/api/v1/jobs/${jobBId}`)
        .set('Cookie', cookieA)
        .send({ title: 'Hacked title' })
        .expect(403);
    });

    it('should not allow User A to delete Job B (Company B)', async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/jobs/${jobBId}`)
        .set('Cookie', cookieA)
        .expect(403);
    });
  });

  describe('Jobs CRUD (Positive)', () => {
    it('should get company jobs for User A', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/jobs')
        .set('Cookie', cookieA)
        .expect(200);
      
      expect(res.body.docs).toBeDefined();
      expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it('should create a job for Company A', async () => {
      const newJob = {
        title: 'Frontend Developer',
        description: 'New Job Desc',
        country: 'UK',
        department: departmentAId,
        employmentType: 'full-time',
        experienceLevel: 'junior',
        isRemote: true
      };

      const res = await request(app.getHttpServer())
        .post('/api/v1/jobs')
        .set('Cookie', cookieA)
        .send(newJob)
        .expect(201);
      
      expect(res.body.title).toBe(newJob.title);
      expect(res.body.company).toBe(companyAId);
    });

    it('should get job detail by ID for Company A', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/jobs/${jobAId}`)
        .set('Cookie', cookieA)
        .expect(200);
      
      expect(res.body._id).toBe(jobAId);
    });

    it('should update job for Company A', async () => {
      const updatedTitle = 'Updated Fullstack Dev';
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/jobs/${jobAId}`)
        .set('Cookie', cookieA)
        .send({ title: updatedTitle })
        .expect(200);
      
      expect(res.body.title).toBe(updatedTitle);
    });

    it('should increment applications count', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/jobs/${jobAId}/increment-applications`)
        .set('Cookie', cookieA)
        .expect(200);

      expect(res.body.message).toBe('Applications count incremented');
    });

    it('should increment views count', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/jobs/${jobAId}/increment-views`)
        .set('Cookie', cookieA)
        .expect(200);

      expect(res.body.message).toBe('Views count incremented');
    });

    it('should update job status', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/jobs/${jobAId}/status`)
        .set('Cookie', cookieA)
        .send({ status: 'published' })
        .expect(200);

      expect(res.body.message).toBe('Job status updated successfully');
      
      // Verify update
      const getRes = await request(app.getHttpServer())
        .get(`/api/v1/jobs/${jobAId}`)
        .set('Cookie', cookieA)
        .expect(200);
      expect(getRes.body.status).toBe('published');
    });

    it('should return 400 for invalid status', async () => {
      await request(app.getHttpServer())
        .patch(`/api/v1/jobs/${jobAId}/status`)
        .set('Cookie', cookieA)
        .send({ status: 'invalid-status' })
        .expect(400);
    });

    it('should delete job for Company A', async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/jobs/${jobAId}`)
        .set('Cookie', cookieA)
        .expect(200);
      
      await request(app.getHttpServer())
        .get(`/api/v1/jobs/${jobAId}`)
        .set('Cookie', cookieA)
        .expect(400); 
    });
  });

  describe('Export', () => {
    it('should export jobs as CSV for Company A', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/jobs/export?format=csv')
        .set('Cookie', cookieA)
        .expect(200);

      expect(res.headers['content-type']).toContain('text/csv');
      expect(res.headers['content-disposition']).toContain('jobs.csv');
      expect(res.text).toContain('Title');
      expect(res.text).toContain('Frontend Developer');
      expect(res.text).not.toContain('Backend Dev');
    });

    it('should export jobs as XLSX for Company A', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/jobs/export?format=xlsx')
        .set('Cookie', cookieA)
        .buffer()
        .parse(binaryParser)
        .expect(200);

      expect(res.headers['content-type']).toContain('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      expect(res.headers['content-disposition']).toContain('jobs.xlsx');
      expect(Buffer.isBuffer(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
