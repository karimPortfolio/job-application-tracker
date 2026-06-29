import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../users/user.schema';
import { SKIP_RECRUITER_GUARD_KEY } from '../decorators/skip-recruiter-guard-check.decorator';

@Injectable()
export class RecruiterRoleGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const skipRoleCheck = this.reflector.getAllAndOverride<boolean>(SKIP_RECRUITER_GUARD_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipRoleCheck) {
      return true;
    }

    const userId = request.user.sub || request.user.id || request.user._id;

    if (!userId) {
      throw new ForbiddenException("Can't access this resource.");
    }

    const user = await this.userModel.findById(userId).lean();

    if (!user || !user.role || user.role !== 'recruiter') {
      throw new ForbiddenException("Can't access this resource.");
    }

    return true;
  }
}
