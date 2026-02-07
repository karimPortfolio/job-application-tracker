import { Module } from '@nestjs/common';
import { JwtModule, type JwtSignOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from '../users/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordReset, PasswordResetSchema } from './password-reset.schema';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthGuard } from './google-auth.guard';
import {
  EmailVerification,
  EmailVerificationSchema,
} from './email-verification.schema';
import { EmailVerifiedGuard } from './email-verified.guard';
import { IsUserEmailUniqueConstraint } from 'src/common/decorators/is-user-email-uniqe.validator';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PasswordReset.name, schema: PasswordResetSchema },
      { name: EmailVerification.name, schema: EmailVerificationSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const expiresIn = config.get<string | number>(
          'TOKEN_EXPIRATION',
          '1h',
        ) as JwtSignOptions['expiresIn'];

        return {
          secret: config.get<string>('JWT_SECRET', 'test-secret'),
          signOptions: { expiresIn },
        };
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    GoogleAuthGuard,
    EmailVerifiedGuard,
    IsUserEmailUniqueConstraint
  ],
  exports: [EmailVerifiedGuard],
  controllers: [AuthController],
})
export class AuthModule {}
