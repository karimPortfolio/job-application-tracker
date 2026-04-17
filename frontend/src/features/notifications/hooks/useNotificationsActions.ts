import { useApiError } from "@/hooks/useApiError";
import { useState } from "react"
import { markAllAsRead, markAsRead } from "../services/notifications.service";


export function useNotificationsActions(refetch?: () => any) {

    const [loading, setLoading] = useState(false);
    const { error, handleError, clearError } = useApiError();

    const markNotificationAsRead = async (id: string) => {
        setLoading(true);
        try
        {
            const res = await markAsRead(id);
            if (refetch) refetch();
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const markAllNotificationsAsRead = async () => {
        setLoading(true);
        try
        {
            const res = await markAllAsRead();
            if (refetch) refetch();
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        markNotificationAsRead,
        markAllNotificationsAsRead,
        
        loading,
        apiError: error,
        clearApiError: clearError
    }
 }
