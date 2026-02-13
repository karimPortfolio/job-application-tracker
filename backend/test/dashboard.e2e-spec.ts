import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { AppModule } from '../src/app.module';
import { ApplicationDocument } from '../src/applications/applications.schema';
import { CompanyDocument } from '../src/companies/company.schema';
import { DepartmentDocument } from '../src/departments/departments.schema';
import { JobDocument } from '../src/jobs/jobs.schema';
import { UserDocument } from '../src/users/user.schema';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { de } from 'date-fns/locale';
import { count } from 'console';

describe('Dashboard E2E Tests', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;
  let companyModel: Model<CompanyDocument>;
  let userModel: Model<UserDocument>;
  let departmentModel: Model<DepartmentDocument>;
  let jobModel: Model<JobDocument>;
  let applicationModel: Model<ApplicationDocument>;
  let cookie: string;
  let secondCookie: string;

  const user = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com',
    password: 'testtest',
  };

  const secondUser = {
    first_name: 'Second',
    last_name: 'User',
    email: 'test2@gmail.com',
    password: 'testtest',
  };

  beforeAll(async () => {
    process.env.JWT_SECRET = 'e2e-secret';

    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    app.use(cookieParser());

    companyModel = moduleFixture.get<Model<CompanyDocument>>('CompanyModel');
    userModel = moduleFixture.get<Model<UserDocument>>('UserModel');
    departmentModel =
      moduleFixture.get<Model<DepartmentDocument>>('DepartmentModel');
    jobModel = moduleFixture.get<Model<JobDocument>>('JobModel');
    applicationModel =
      moduleFixture.get<Model<ApplicationDocument>>('ApplicationModel');

    await app.init();

    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(secondUser)
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);

    cookie = loginRes.headers['set-cookie'][0].split(';')[0];
    expect(cookie).toBeDefined();

    // initial data setup
    const initialCompany = {
      name: 'Company',
      industry: 'Industry',
    };

    const secondCompany = {
      name: 'Second Company',
      industry: 'Industry',
    };

    const company = await companyModel.create({
      ...initialCompany,
    });

    const company2 = await companyModel.create({
      ...secondCompany,
    });

    await userModel.updateOne(
      { email: user.email },
      { emailVerifiedAt: new Date(), company: company._id },
    );

    await userModel.updateOne(
      { email: secondUser.email },
      { emailVerifiedAt: new Date(), company: company2._id },
    );

    const loginRes2 = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);
    cookie = loginRes2.get('set-cookie')![0];

    const loginRes3 = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: secondUser.email, password: secondUser.password })
      .expect(201);
    secondCookie = loginRes3.get('set-cookie')![0];

    const initialDepartments = [
      { name: 'Department 1', company: company._id },
      { name: 'Department 2', company: company._id },
      { name: 'Department 3', company: company._id },
      { name: 'Department 4', company: company._id },
      { name: 'Department 4', company: company._id },
      { name: 'Department 5', company: company2._id },
      { name: 'Department 6', company: company2._id },
    ];

    const departments = await departmentModel.insertMany(
      initialDepartments.map((dept) => ({ ...dept })),
    );

    const initialJobs = [
      { title: 'Job 1', department: departments[0]._id, company: company._id },
      { title: 'Job 2', department: departments[0]._id, company: company._id },
      { title: 'Job 3', department: departments[2]._id, company: company._id },
      { title: 'Job 4', department: departments[1]._id, company: company._id },
      { title: 'Job 5', department: departments[1]._id, company: company2._id },
      { title: 'Job 6', department: departments[1]._id, company: company._id },
    ];

    const jobs = await jobModel.insertMany(
      initialJobs.map((job) => ({ ...job })),
    );

    const initialApplications = [
      {
        fullName: 'James James',
        email: 'james@example.com',
        job: jobs[0]._id,
        company: company._id,
        country: 'USA',
      },
      {
        fullName: 'Ahmed Ahmed',
        email: 'ahmed@example.com',
        job: jobs[0]._id,
        company: company._id,
        country: 'Morocco',
      },
      {
        fullName: 'Karim Karim',
        email: 'karim@example.com',
        job: jobs[1]._id,
        company: company._id,
        country: 'Morocco',
      },
      {
        fullName: 'Mohamed Mohamed',
        email: 'mohamed@example.com',
        job: jobs[2]._id,
        company: company._id,
        country: 'Spain',
      },
      {
        fullName: 'Raul Raul',
        email: 'raul@example.com',
        job: jobs[2]._id,
        company: company2._id,
        country: 'Spain',
      },
      {
        fullName: 'Tom Tom',
        email: 'tom@example.com',
        job: jobs[2]._id,
        company: company2._id,
        country: 'USA',
      },
      {
        fullName: 'Jones Jones',
        email: 'jones@example.com',
        job: jobs[5]._id,
        company: company2._id,
        country: 'USA',
      },
    ];

    await applicationModel.insertMany(
      initialApplications.map((app) => ({ ...app })),
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    await app.close();
  });

  describe('departments dashboard endpoints tests', () => {
    const url = '/api/v1/dashboard/departments';
    it("GET /api/v1/dashboard/departments/stats - should return only departments for the user's company", async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toEqual({
        total: 2,
        monthsDiff: {
          value: 2,
          percentage: 100,
          direction: 'up',
        },
      });
    });

    it('GET /api/v1/dashboard/departments/stats - should return total number of departments, diff', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toEqual({
        total: 5,
        monthsDiff: {
          value: 5,
          percentage: 100,
          direction: 'up',
        },
      });
    });
  });

  describe('jobs dashboard endpoints tests', () => {
    const url = '/api/v1/dashboard/jobs';
    it("GET /api/v1/dashboard/jobs/stats - should return only jobs for the user's company", async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toEqual({
        total: 1,
        monthsDiff: {
          value: 1,
          percentage: 100,
          direction: 'up',
        },
      });
    });

    it('GET /api/v1/dashboard/jobs/stats - should return total number of jobs, diff', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toEqual({
        total: 5,
        monthsDiff: {
          value: 5,
          percentage: 100,
          direction: 'up',
        },
      });
    });
  });

  describe('applications dashboard endpoints tests', () => {
    const url = '/api/v1/dashboard/applications';
    it("GET /api/v1/dashboard/applications/stats - should return only applications for the user's company", async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toEqual({
        total: 3,
        monthsDiff: {
          value: 3,
          percentage: 100,
          direction: 'up',
        },
      });
    });

    it('GET /api/v1/dashboard/applications/stats - should return total number of applications, diff', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toEqual({
        total: 4,
        monthsDiff: {
          value: 4,
          percentage: 100,
          direction: 'up',
        },
      });
    });

    it('GET /api/v1/dashboard/applications/monthly-stats - should return monthly stats for applications', async () => {
      const expectedResponse = [
        { month: 'January', total: 0 },
        { month: 'February', total: 4 },
        { month: 'March', total: 0 },
        { month: 'April', total: 0 },
        { month: 'May', total: 0 },
        { month: 'June', total: 0 },
        { month: 'July', total: 0 },
        { month: 'August', total: 0 },
        { month: 'September', total: 0 },
        { month: 'October', total: 0 },
        { month: 'November', total: 0 },
        { month: 'December', total: 0 },
      ];

      const response = await request(app.getHttpServer())
        .get(`${url}/monthly-stats`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toEqual(expectedResponse);
    });

    it('GET /api/v1/dashboard/applications/monthly-stats - should return monthly stats for applications for second company', async () => {
      const expectedResponse = [
        { month: 'January', total: 0 },
        { month: 'February', total: 3 },
        { month: 'March', total: 0 },
        { month: 'April', total: 0 },
        { month: 'May', total: 0 },
        { month: 'June', total: 0 },
        { month: 'July', total: 0 },
        { month: 'August', total: 0 },
        { month: 'September', total: 0 },
        { month: 'October', total: 0 },
        { month: 'November', total: 0 },
        { month: 'December', total: 0 },
      ];

      const response = await request(app.getHttpServer())
        .get(`${url}/monthly-stats`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toEqual(expectedResponse);
    });

    it('GET /api/v1/dashboard/applications/stats-by-jobs - should return stats by jobs for applications for second company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-jobs`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(2);
    });

    it('GET /api/v1/dashboard/applications/stats-by-jobs - should return stats by jobs for applications for first company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-jobs`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(3);
    });

    it('GET /api/v1/dashboard/applications/stats-by-countries - should return stats by countries for applications for second company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-countries`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toStrictEqual({
        countries: [
          { id: 'US', value: 2 },
          { id: 'ES', value: 1 },
        ],
        total: 3,
      });
    });

    it('GET /api/v1/dashboard/applications/stats-by-countries - should return stats by countries for applications for first company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-countries`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toStrictEqual({
        countries: [
          { id: 'MA', value: 2 },
          { id: 'ES', value: 1 },
          { id: 'US', value: 1 },
        ],
        total: 4,
      });
    });

    it('GET /api/v1/dashboard/applications/stats-by-status - should return stats by status for applications for second company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-status`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toStrictEqual([
        { status: 'Applied', total: 3 },
      ]);
    });

    it('GET /api/v1/dashboard/applications/stats-by-status - should return stats by status for applications for first company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-status`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toStrictEqual([
        { status: 'Applied', total: 4 },
      ]);
    });

    it('GET /api/v1/dashboard/applications/stats-by-stages - should return stats by stages for applications for second company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-stages`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(1);
      expect(response.body[0].stage).toBe('Screening');
      expect(response.body[0].total).toBe(3);
    });

    it('GET /api/v1/dashboard/applications/stats-by-stages - should return stats by stages for applications for first company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-stages`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(1);
      expect(response.body[0].stage).toBe('Screening');
      expect(response.body[0].total).toBe(4);
    });

    it('GET /api/v1/dashboard/applications/stats-by-departments - should return stats by departments for applications for second company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-departments`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(2);
    });
    
    it('GET /api/v1/dashboard/applications/stats-by-departments - should return stats by departments for applications for first company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/stats-by-departments`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(2);
    });

    it('GET /api/v1/dashboard/applications/top-jobs - should return top jobs for applications for first company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/top-jobs`)
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(3);
    });

    it('GET /api/v1/dashboard/applications/top-jobs - should return top jobs for applications for second company', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/top-jobs`)
        .set('Cookie', secondCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(2);
    });
  });
});
