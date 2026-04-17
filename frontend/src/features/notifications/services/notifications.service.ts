import { api } from "@/lib/api/axios";
import { NOTIFICATIONS_ROUTES } from "../routes/notifications.routes";
import { Notification, NotificationQuery, PaginatedResponse } from "../types/notifications.types";

export const getNotifications = async (query: NotificationQuery) => {
    return await api.get<PaginatedResponse<Notification>>(NOTIFICATIONS_ROUTES.getNotifications, {
        params: query
    });
};

export const markAsRead = async (id: string) => {
    return await api.patch<{ message: string }>(NOTIFICATIONS_ROUTES.markAsRead(id));
}

export const markAllAsRead = async () => {
    return await api.post<{ message: string }>(NOTIFICATIONS_ROUTES.markAllAsRead);
}
