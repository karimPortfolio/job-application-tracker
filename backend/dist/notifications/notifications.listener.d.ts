import { Queue } from 'bullmq';
export declare class NotificationsListener {
    private notificationQueue;
    constructor(notificationQueue: Queue);
    handlePasswordUpdate(payload: any): Promise<void>;
    handleApplicationCreate(payload: any): Promise<void>;
}
