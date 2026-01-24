import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const user = await this.userModel.findById(userId).select('emailVerifiedAt');

    if (!user?.emailVerifiedAt) {
      throw new ForbiddenException('Email is not verified');
    }

    return true;
  }
}
