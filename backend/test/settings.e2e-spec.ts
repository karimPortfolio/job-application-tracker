jest.setTimeout(30000)

import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, CanActivate } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { SubscriptionsService } from '../src/billing/subscriptions.service'
import { getModelToken } from '@nestjs/mongoose'
import { User } from '../src/users/user.schema'
import { Company } from '../src/companies/company.schema'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'

describe('Settings Controller (AppModule e2e)', () => {
  let app: INestApplication
  let mongo: MongoMemoryServer
  let cookie: string
  let companyId: string

  const mockSubscriptionsService = {
    cancelCompanySubscription: jest.fn().mockResolvedValue({ message: 'Your subscription has been successfully canceled.' }),
  }

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create()
    process.env.MONGO_URI = mongo.getUri()
    process.env.JWT_SECRET = 'e2e-secret'

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SubscriptionsService)
      .useValue(mockSubscriptionsService)
      .compile()

    app = moduleFixture.createNestApplication()

    useContainer(app.select(AppModule), { fallbackOnErrors: true })
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.use(cookieParser())

    const userModel = moduleFixture.get(getModelToken(User.name))
    const companyModel = moduleFixture.get(getModelToken(Company.name))

    await app.init()

    const userPayload = {
      first_name: 'E2E',
      last_name: 'Tester',
      email: 'e2e@example.com',
      password: 'password123',
    }

    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(userPayload)
      .expect(201)

    const cookies = res.get('set-cookie') || []
    cookie = cookies[0]
    expect(cookie).toBeDefined()

    const savedUser = await userModel.findOne({ email: userPayload.email }).exec()
    const company = await companyModel.create({ name: 'E2E Co', industry: 'Tech', adminEmail: userPayload.email, stripeSubscriptionId: 'sub_123' })
    await userModel.findByIdAndUpdate(savedUser._id, { company: company._id, emailVerifiedAt: new Date() })

    companyId = company._id.toString()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongo.stop()
    await app.close()
  })

  it('PATCH /api/settings/company -> calls companiesService.update', async () => {
    const dto = { name: 'New Company Name' }
    const res = await request(app.getHttpServer())
      .patch('/api/settings/company')
      .set('Cookie', cookie)
      .send(dto)
      .expect(200)

    expect(res.status).toBe(200)
  })

  it('POST /api/settings/company/billing/cancel -> returns cancellation message', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/settings/company/billing/cancel')
      .set('Cookie', cookie)
      .send({})
      .expect(201)

    expect(res.body).toHaveProperty('message')
  })

  it('PATCH /api/settings/preferences -> returns prefrences update message', async () => {
    const res = await request(app.getHttpServer())
      .patch('/api/settings/preferences')
      .set('Cookie', cookie)
      .send({
        theme: 'dark'
      })
      .expect(200)

    expect(res.body).toHaveProperty('message')
  })
})
