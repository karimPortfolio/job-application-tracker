
export const NOTIFICATIONS_ROUTES = {
    getNotifications: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/notifications`,
    markAsRead: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/notifications/${id}`,
    markAllAsRead: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/notifications`,
};
