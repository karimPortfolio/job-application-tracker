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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @InjectModel(PasswordReset.name)
    private readonly passwordResetModel: Model<PasswordReset>,

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
    });

    return this.sign(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user)
      throw new UnauthorizedException('Email or password does not match.');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match)
      throw new UnauthorizedException('Email or password does not match.');

    return this.sign(user);
  }

  private sign(user: UserDocument) {
    return {
      accessToken: this.jwtService.sign({
        sub: user._id.toString(),
        company: user.company,
      }),
    };
  }

  async sendResetPasswordEmail(dto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) return; // silently ignore

    const token = randomUUID();
    const hashedToken = await bcrypt.hash(token, 10);

    await this.passwordResetModel.deleteMany({ email: dto.email });
    await this.passwordResetModel.create({
      email: dto.email,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });

    const resetUrl = `${this.config.get('FRONTEND_URL')}/auth/reset-password?token=${token}&email=${dto.email}`;

    await transporter.sendMail({
      from: '"Job Tracker" <no-reply@jobtracker.com>',
      to: dto.email,
      subject: 'Reset your password',
      html: this.getHtmlTemplate({
        resetUrl,
        appName: this.config.get('APP_NAME') || 'Hirely',
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

  private getHtmlTemplate({
    resetUrl,
    appName,
  }: {
    resetUrl: string;
    appName: string;
  }): string {
    const templatePath = path.join(
      process.cwd(),
      'src/templates/reset-password.html',
    );

    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{RESET_URL}}', resetUrl);
    html = html.replace('{{APP_NAME}}', appName);

    return html;
  }
}
