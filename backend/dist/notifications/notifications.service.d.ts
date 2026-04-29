import { Model } from 'mongoose';
import type { PaginateModel } from 'mongoose';
import { UserDocument } from 'src/users/user.schema';
import { Notification, NotificationDocument } from './notifications.schema';
import { NotificationQueryDto } from './dto/notification-query.dto';
export declare class NotificationsService {
    private readonly notificationModel;
    private readonly userModel;
    constructor(notificationModel: PaginateModel<NotificationDocument>, userModel: Model<UserDocument>);
    findUserNotifications(user: {
        sub: string;
    }, query: NotificationQueryDto): Promise<import("mongoose").PaginateResult<(import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | (import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        [key: string]: any;
    })>>;
    markAsRead(user: {
        sub: string;
    }, notification: string): Promise<{
        message: string;
    }>;
    markAllAsRead(user: {
        sub: string;
    }): Promise<{
        message: string;
    }>;
    private getUserOrThrow;
}
