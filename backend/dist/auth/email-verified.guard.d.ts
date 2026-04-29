import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../users/user.schema';
export declare class EmailVerifiedGuard implements CanActivate {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
