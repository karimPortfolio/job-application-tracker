jest.setTimeout(30000)

import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Model } from 'mongoose'
import { User } from '../src/users/user.schema'
import { getModelToken } from '@nestjs/mongoose'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'

describe('Auth E2E Tests', () => {
  let app: INestApplication
  let mongo: MongoMemoryServer
  let cookie: string
  let userModel: Model<User>

  beforeAll(async () => {
    process.env.JWT_SECRET = 'e2e-secret'

    mongo = await MongoMemoryServer.create()
    process.env.MONGO_URI = mongo.getUri()

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile()

    app = moduleFixture.createNestApplication()
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.use(cookieParser());
    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    await app.init()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongo.stop()
    await app.close()
  })

  const user = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com',
    password: 'password123',
  }

  it('POST /api/auth/register', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(user)
      .expect(201)

    const savedUser = await userModel.findOne({ email: user.email }).exec();
    expect(savedUser).toBeDefined();
    expect(savedUser?.email).toBe(user.email);

    cookie = res.get('set-cookie')[0]
    expect(cookie).toBeDefined()
  })

  it('POST /api/auth/register checks validation', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({})
      .expect(400);
  });

  it('POST /api/auth/login', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201)

    cookie = res.get('set-cookie')[0]
    expect(cookie).toBeDefined()
  })

  it('POST /api/auth/login checks validation', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({})
      .expect(400);
  });

  it('GET /api/auth/me', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Cookie', cookie)
      .expect(200);
  })

  it('POST /api/auth/logout', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .set('Cookie', cookie)
      .expect(201)
  })

  it('GET /api/auth/me after logout → 401', async () => {
    await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Cookie', cookie)
      .expect(401)
  })
})
