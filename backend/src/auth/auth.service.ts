import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import type { Cache } from 'cache-manager';

import { User, UserDocument } from '../users/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      name: dto.name,
      email: dto.email,
      password: hash,
    });
    return this.sign(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Email or password does not match.');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Email or password does not match.');

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

  async logout(token: string) {
    await this.cache.set(`bl:${token}`, true, 3600);
  }

  async me(userId: string) {
    return this.userModel.findById(userId).select('-password').populate('company');
  }
}
