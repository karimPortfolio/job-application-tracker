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
import cookieParser from 'cookie-parser';
import { Company } from '../src/companies/company.schema';
import { Department } from '../src/departments/departments.schema';


describe('Departments E2E Tests', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;
  let cookie: string;
  let otherCookie: string;
  let userModel: Model<User>;
  let companyModel: Model<Company>;
  let departmentModel: Model<Department>;
  let departmentId: string;

  const user = {
    first_name: 'Test',
    last_name: 'User',
    email: 'dept@example.com',
    password: 'testtest',
  };

  const otherUser = {
    first_name: 'Other',
    last_name: 'User',
    email: 'other@example.com',
    password: 'testtest',
  };

  const departmentPayload = {
    title: 'Engineering',
    description: 'Builds the product',
  };

  beforeAll(async () => {
    process.env.JWT_SECRET = 'e2e-secret';

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

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    companyModel = moduleFixture.get<Model<Company>>(getModelToken(Company.name));
    departmentModel = moduleFixture.get<Model<Department>>(getModelToken(Department.name));

    await app.init();

    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(user)
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);

    cookie = loginRes.get('set-cookie')[0];
    expect(cookie).toBeDefined();

    // Mark email as verified for guards.
    await userModel.updateOne(
      { email: user.email },
      { emailVerifiedAt: new Date() },
    );

    // Create a company to satisfy CompanyGuard.
    const companyRes = await request(app.getHttpServer())
      .post('/api/v1/company')
      .set('Cookie', cookie)
      .send({ name: 'TestCo', industry: 'Tech' })
      .expect(201);

    expect(companyRes.body).toHaveProperty('_id');

    // Login again so the JWT payload contains the company id.
    const loginAfterCompany = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);

    cookie = loginAfterCompany.get('set-cookie')[0];

    // create a second user with a different company
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(otherUser)
      .expect(201);

    const otherLogin = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: otherUser.email, password: otherUser.password })
      .expect(201);

    otherCookie = otherLogin.get('set-cookie')[0];

    await userModel.updateOne(
      { email: otherUser.email },
      { emailVerifiedAt: new Date() },
    );

    await request(app.getHttpServer())
      .post('/api/v1/company')
      .set('Cookie', otherCookie)
      .send({ name: 'OtherCo', industry: 'Tech' })
      .expect(201);

    const otherLoginAfterCompany = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: otherUser.email, password: otherUser.password })
      .expect(201);

    otherCookie = otherLoginAfterCompany.get('set-cookie')[0];
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    await app.close();
  });

  it('GET /api/v1/departments → requires auth', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/departments')
      .expect(401);
  });

  it('GET /api/v1/departments → returns empty list initially', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/departments')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.docs).toEqual([]);
    expect(res.body.totalDocs).toBe(0);
  });

  it('POST /api/v1/departments → create department', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/departments')
      .set('Cookie', cookie)
      .send(departmentPayload)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(departmentPayload.title);
    expect(res.body.description).toBe(departmentPayload.description);

    departmentId = res.body._id;
  });

  it('GET /api/v1/departments → returns created department', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/departments')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.totalDocs).toBe(1);
    expect(res.body.docs.length).toBe(1);
    expect(res.body.docs[0].title).toBe(departmentPayload.title);
  });

  it('GET /api/v1/departments → pagination works', async () => {
    const extraDepartments = Array.from({ length: 4 }).map((_, i) => ({
      title: `Dept ${i}`,
      description: `Desc ${i}`,
    }));

    for (const dept of extraDepartments) {
      await request(app.getHttpServer())
        .post('/api/v1/departments')
        .set('Cookie', cookie)
        .send(dept)
        .expect(201);
    }

    const res = await request(app.getHttpServer())
      .get('/api/v1/departments?page=2&limit=2')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.limit).toBe(2);
    expect(res.body.page).toBe(2);
    expect(res.body.totalDocs).toBe(5);
    expect(res.body.totalPages).toBe(3);
    expect(res.body.docs.length).toBe(2);
  });

  it('GET /api/v1/departments/:id → fetch by id', async () => {
    const department = await departmentModel.findOne({ title: departmentPayload.title }).lean();
    expect(department?._id).toBeDefined();

    const res = await request(app.getHttpServer())
      .get(`/api/v1/departments/${department?._id.toString()}`)
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body._id).toBe(department?._id.toString());
    expect(res.body.title).toBe(departmentPayload.title);
  });

  it('GET /api/v1/departments/:id with other company → forbidden', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/departments/${departmentId}`)
      .set('Cookie', otherCookie)
      .expect(403);

    expect(res.body.message).toContain('forbidden');
  });

  it('PATCH /api/v1/departments/:id with other company → forbidden', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/v1/departments/${departmentId}`)
      .set('Cookie', otherCookie)
      .send({ title: 'Should Fail' })
      .expect(403);

    expect(res.body.message).toContain('forbidden');
  });

  it('DELETE /api/v1/departments/:id with other company → forbidden', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/api/v1/departments/${departmentId}`)
      .set('Cookie', otherCookie)
      .expect(403);

    expect(res.body.message).toContain('forbidden');
  });

  it('PATCH /api/v1/departments/:id → update department', async () => {
    const department = await departmentModel.findOne({ title: departmentPayload.title }).lean();
    expect(department?._id).toBeDefined();

    const updatedTitle = 'Product';

    const res = await request(app.getHttpServer())
      .patch(`/api/v1/departments/${department?._id.toString()}`)
      .set('Cookie', cookie)
      .send({ title: updatedTitle })
      .expect(200);

    expect(res.body.title).toBe(updatedTitle);
  });

  it('DELETE /api/v1/departments/:id → delete department', async () => {
    const department = await departmentModel.findOne({ title: 'Product' }).lean();
    expect(department?._id).toBeDefined();

    const res = await request(app.getHttpServer())
      .delete(`/api/v1/departments/${department?._id.toString()}`)
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body).toEqual({ message: 'Department deleted successfully' });
  });
});
