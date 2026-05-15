import { Global, Module } from '@nestjs/common';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          apiKey: config.get<string>('STRIPE_SECRET_KEY') ?? '',
          webhookConfig: {
            stripeSecrets: {
              stripeWebhookSecret: config.get<string>('STRIPE_WEBHOOK_SECRET') ?? '',
              accountTest: config.get<string>('STRIPE_WEBHOOK_SECRET') ?? '',
            },
            requestBodyProperty: 'rawBody',
            controllerPrefix: 'stripe',
          } as any,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [StripeModule],
})
export class SharedStripeModule {}
