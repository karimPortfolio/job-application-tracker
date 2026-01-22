import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { User, UserSchema } from '../users/user.schema'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PasswordReset, PasswordResetSchema } from './password-reset.schema'
import { GoogleStrategy } from './google.strategy'
import { GoogleAuthGuard } from './google-auth.guard'

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PasswordReset.name, schema: PasswordResetSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'test-secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, GoogleAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
