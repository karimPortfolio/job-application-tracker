import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/users/user.schema';

@Injectable()
export class RecruiterRoleGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
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
