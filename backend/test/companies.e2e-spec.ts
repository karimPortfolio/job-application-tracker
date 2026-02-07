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
import { useContainer } from 'class-validator';
import { AppModule } from '../src/app.module';
import { Company } from '../src/companies/company.schema';
import { User } from '../src/users/user.schema';
import cookieParser from 'cookie-parser';

describe('Companies E2E Tests', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;
  let cookie: string;
  let companyModel: Model<Company>;
  let userModel: Model<User>;

  const user = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com',
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
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    app.use(cookieParser());
    companyModel = moduleFixture.get<Model<Company>>(
      getModelToken(Company.name),
    );
    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
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

    // mark email as verified for guard
    await userModel.updateOne({ email: user.email }, { emailVerifiedAt: new Date() });
  });

  const company = {
    name: 'Company',
    industry: 'Industry',
  };

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    await app.close();
  });

  it('POST /api/v1/company check for auth', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/company')
      .expect(401);
  });

  it('POST /api/v1/company validation checks', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/company')
        .set('Cookie', cookie)
      .expect(400);
  });

  it('POST /api/v1/company → create company', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/company')
      .set('Cookie', cookie)
      .send(company)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(company.name);
    expect(res.body.industry).toBe(company.industry);

    const userUpdated = await userModel.findOne({ email: user.email }).exec();
    expect(userUpdated?.company).toBeDefined();
    expect(userUpdated?.company?.toString()).toBe(res.body._id);

    // Re-login to refresh JWT with company attached
    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);
    cookie = loginRes.get('set-cookie')[0];
  });

  it('GET /api/v1/company → get company', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/company')
        .set('Cookie', cookie)
      .expect(200);
  });

  it('PATCH /api/v1/company → update company', async () => {
    const res = await request(app.getHttpServer())
      .patch('/api/v1/company')
      .set('Cookie', cookie)
      .send({ name: 'Updated Company Name' })
      .expect(200);

    expect(res.body.name).toBe('Updated Company Name');
  });

  it('POST /api/v1/company → forbid creating second company', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/company')
      .set('Cookie', cookie)
      .send({
        name: 'Another Company',
        industry: 'Industry'
      })
      .expect(403);
  });
});
