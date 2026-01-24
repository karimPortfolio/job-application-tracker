import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CompanyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const companyId = user?.companyId || user?.company;

    if (!companyId) {
      throw new ForbiddenException('Company not found');
    }
    
    request.companyId = companyId;
    return true;
  }
}
