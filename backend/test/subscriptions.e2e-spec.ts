jest.setTimeout(30000)

import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Controller, Post, Body } from '@nestjs/common'
import request from 'supertest'

// Import the real service type to match the controller's dependency
import { SubscriptionsService } from '../src/billing/subscriptions.service'

/**
 * Test wrapper controller that exposes the same routes as the real
 * `SubscriptionsController` but without auth/company guards. This allows
 * us to run lightweight e2e-style HTTP tests while mocking the service
 * and avoiding external dependencies (Stripe, DB) in these tests.
 */
@Controller('subscriptions')
class TestSubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('checkout')
  async createCheckout(@Body() body: any) {
    const session = await this.subscriptionsService.createCompanySubscription(
      body.companyId,
      body.plan,
      body.duration,
    )
    return { url: session.url }
  }

  @Post('cancel')
  async cancelSubscription(@Body() body: any) {
    return await this.subscriptionsService.cancelCompanySubscription(body.companyId)
  }
}

describe('Subscriptions Controller (e2e - minimal)', () => {
  let app: INestApplication

  const mockSubscriptionsService = {
    createCompanySubscription: jest.fn().mockResolvedValue({ url: 'https://example.com/checkout' }),
    cancelCompanySubscription: jest.fn().mockResolvedValue({ message: 'Your subscription has been successfully canceled.' }),
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestSubscriptionsController],
      providers: [
        {
          provide: SubscriptionsService,
          useValue: mockSubscriptionsService,
        },
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('POST /subscriptions/checkout -> returns checkout url', async () => {
    const payload = { companyId: 'company123', plan: 'PRO', duration: 'MONTHLY' }

    const res = await request(app.getHttpServer())
      .post('/subscriptions/checkout')
      .send(payload)
      .expect(201)

    expect(res.body).toHaveProperty('url', 'https://example.com/checkout')
    expect(mockSubscriptionsService.createCompanySubscription).toHaveBeenCalledWith(
      payload.companyId,
      payload.plan,
      payload.duration,
    )
  })
})
