import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../../users/user.schema'

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const userId = user?.sub || user?.id || user?._id

    if (!userId) {
      throw new UnauthorizedException('User not authenticated')
    }

    // Fetch latest user to ensure company is present even if token was issued before company creation
    const freshUser = await this.userModel
      .findById(userId)
      .select('company')
      .lean()

    const companyId = freshUser?.company || user?.companyId || user?.company

    if (!companyId) {
      throw new ForbiddenException('Company not found')
    }

    request.user = { ...user, company: companyId }
    request.companyId = companyId
    return true
  }
}
