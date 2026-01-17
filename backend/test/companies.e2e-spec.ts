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
import { Company } from '../src/companies/company.schema';
import { User } from '../src/users/user.schema';

describe('Companies E2E Tests', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;
  let token: string;
  let companyModel: Model<Company>;
  let userModel: Model<User>;

  const user = {
    name: 'Test Test',
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
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
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
      .send(user)
      .expect(201);

    token = loginRes.body.accessToken;
    expect(token).toBeDefined();
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
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });

  it('POST /api/v1/company → create company', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/company')
      .set('Authorization', `Bearer ${token}`)
      .send(company)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(company.name);
    expect(res.body.industry).toBe(company.industry);

    const userUpdated = await userModel.findOne({ email: user.email }).exec();
    expect(userUpdated?.company).toBeDefined();
    expect(userUpdated?.company?.toString()).toBe(res.body._id);
  });

  it('GET /api/v1/company → get company', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/company')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('PATCH /api/v1/company → update company', async () => {
    const res = await request(app.getHttpServer())
      .patch('/api/v1/company')
      .set('Authorization', `Bearer ${token}`)
      .send(company.name)
      .expect(200);
  });

  it('POST /api/v1/company → forbid creating second company', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Another Company',
        industry: 'Industry'
      })
      .expect(403);
  });
});
