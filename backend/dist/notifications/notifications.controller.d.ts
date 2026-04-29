import { NotificationsService } from './notifications.service';
import { JobQueryDto } from 'src/jobs/dto/job-query.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(user: {
        sub: string;
    }, query: JobQueryDto): Promise<import("mongoose").PaginateResult<(import("mongoose").Document<unknown, {}, import("./notifications.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./notifications.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./notifications.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./notifications.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./notifications.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./notifications.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | (import("mongoose").Document<unknown, {}, import("./notifications.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./notifications.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("./notifications.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./notifications.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        [key: string]: any;
    })>>;
    markNotificationAsRead(user: {
        sub: string;
    }, id: string): Promise<{
        message: string;
    }>;
    markAllNotificationsAsRead(user: {
        sub: string;
    }): Promise<{
        message: string;
    }>;
}
