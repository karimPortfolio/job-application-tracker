import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Injectable,
  UnauthorizedException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import type { Cache } from 'cache-manager';
import fs from 'fs';
import path from 'path';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { randomUUID } from 'crypto';
import { PasswordReset } from './password-reset.schema';
import { ConfigService } from '@nestjs/config';
import { transporter } from '../config/transporter';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import jwt from 'jsonwebtoken';
import { GoogleProfilePayload } from './google.strategy';
import { EmailVerification } from './email-verification.schema';
import { EmailVerificationDto } from './dto/email-verification.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @InjectModel(PasswordReset.name)
    private readonly passwordResetModel: Model<PasswordReset>,
    @InjectModel(EmailVerification.name)
    private readonly emailVerificationModel: Model<EmailVerification>,

    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const name = `${dto.first_name} ${dto.last_name}`;
    const user = await this.userModel.create({
      name,
      email: dto.email,
      password: hash,
      provider: 'local',
    });

    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user)
      throw new UnauthorizedException('Email or password does not match.');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match)
      throw new UnauthorizedException('Email or password does not match.');

    return this.signToken(user);
  }

  async handleGoogleLogin(profile: GoogleProfilePayload) {
    const existing = await this.userModel.findOne({
      $or: [{ googleId: profile.googleId }, { email: profile.email }],
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(randomUUID(), 10);
      const user = await this.userModel.create({
        name: profile.name,
        email: profile.email,
        password: hashedPassword,
        provider: 'google',
        googleId: profile.googleId,
      });

      return this.signToken(user);
    }

    if (!existing.googleId) {
      existing.googleId = profile.googleId;
      existing.provider = 'google';
      await existing.save();
    }

    return this.signToken(existing);
  }

  private signToken(user: UserDocument) {
    return {
      accessToken: this.jwtService.sign({
        sub: user._id.toString(),
        company: user.company,
      }),
    };
  }

  async sendResetPasswordEmail(dto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) return; 

    const token = randomUUID();
    const hashedToken = await bcrypt.hash(token, 10);

    await this.passwordResetModel.deleteMany({ email: dto.email });
    await this.passwordResetModel.create({
      email: dto.email,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });

    const resetUrl = `${this.config.get('FRONTEND_URL')}/auth/reset-password?token=${token}&email=${dto.email}`;
    const appName = this.config.get('APP_NAME') || 'Hirely';

    await transporter.sendMail({
      from: '"Hirely" <no-reply@hirely.com>',
      to: dto.email,
      subject: 'Reset your password',
      html: this.renderTemplate('reset-password.html', {
        RESET_URL: resetUrl,
        APP_NAME: appName,
      }),
    });
  }

  async resetPassword(dto: ResetPasswordDto) {
    const record = await this.passwordResetModel.findOne({
      email: dto.email,
      expiresAt: { $gt: new Date() },
    });
    if (!record) {
      throw new BadRequestException('Invalid or expired token');
    }

    const tokenValid = await bcrypt.compare(dto.token, record.token);
    if (!tokenValid) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.userModel.updateOne(
      { email: dto.email },
      { password: await bcrypt.hash(dto.password, 10) },
    );

    await record.deleteOne();
  }

  async sendEmailVerificationLink(user: {sub: string}) {

    const userRecord = await this.userModel.findById(user.sub);

    if (!userRecord) {
      throw new BadRequestException('User not found.');
    }

    if (userRecord.emailVerifiedAt) {
      throw new BadRequestException('Email is already verified.');
    }
    const token = randomUUID();
    const hashedToken = await bcrypt.hash(token, 10);

    await this.emailVerificationModel.deleteMany({ email: userRecord.email });
    await this.emailVerificationModel.create({
      email: userRecord.email,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    const verifyUrl = `${this.config.get('FRONTEND_URL')}/auth/verify-email?token=${token}&email=${userRecord.email}`;

    const appName = this.config.get('APP_NAME') || 'Hirely';
    const cloudfrontUrl = this.config.get('AWS_CLOUDFRONT_URL') || '';

    await transporter.sendMail({
      from: '"Hirely" <no-reply@hirely.com>',
      to: userRecord.email,
      subject: 'Verify your email',
      html: this.renderTemplate('email-verification.html', {
        VERIFY_URL: verifyUrl,
        APP_NAME: appName,
        CLOUDFRONT_URL: cloudfrontUrl,
      }),
    });
  }

  async verifyEmail(dto: EmailVerificationDto) {
    const record = await this.emailVerificationModel.findOne({
      email: dto.email,
      expiresAt: { $gt: new Date() },
    });
    if (!record) {
      throw new BadRequestException('Invalid or expired token');
    }

    const tokenValid = await bcrypt.compare(dto.token, record.token);
    if (!tokenValid) {
      throw new BadRequestException('Invalid or expired token');
    }
    
    await this.userModel.updateOne(
      { email: dto.email },
      { emailVerifiedAt: new Date() },
    );

    await record.deleteOne();
  }

  async logout(token: string) {
    const decoded = jwt.decode(token) as { exp?: number };

    if (!decoded?.exp) return;

    const ttl = decoded.exp - Math.floor(Date.now() / 1000);

    if (ttl > 0) {
      await this.cache.set(`bl:${token}`, true, ttl);
    }
  }

  async me(userId: string) {
    return this.userModel
      .findById(userId)
      .select('-password')
      .populate('company');
  }

  private renderTemplate(
    templateName: string,
    replacements: Record<string, string>,
  ): string {
    const templatePath = path.join(
      process.cwd(),
      'src/templates',
      templateName,
    );

    let html = fs.readFileSync(templatePath, 'utf8');

    Object.entries(replacements).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return html;
  }
}
