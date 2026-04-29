import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../users/user.schema';
export declare class CompanyGuard implements CanActivate {
    private readonly userModel;
    constructor(userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
