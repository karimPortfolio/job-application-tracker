import { useCallback, useEffect, useRef, useState } from "react";
import {
  Notification,
  NotificationQuery,
  PaginatedResponse,
} from "../types/notifications.types";
import { getNotifications } from "../services/notifications.service";

export function useNotificationsList(initialQuery?: NotificationQuery) {
  const [data, setData] = useState<PaginatedResponse<Notification> | null>(
    null,
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState<NotificationQuery>({
    page: 1,
    limit: 5,
    ...initialQuery,
  });

  const lastFetchKeyRef = useRef<string | null>(null);
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const fetchNotifications = useCallback(async (pageOverride?: number) => {
    const queryToUse = pageOverride
      ? { ...queryRef.current, page: pageOverride }
      : queryRef.current;

    const key = JSON.stringify(queryToUse);

    // Prevent duplicate fetches with same query
    if (lastFetchKeyRef.current === key) return;
    lastFetchKeyRef.current = key;

    setLoading(true);
    try {
      const res = await getNotifications(queryToUse);
      setData(res.data);
      setNotifications((prev) => [...prev, ...(res.data.docs ?? [])]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    lastFetchKeyRef.current = null;
    return getNotifications(queryRef.current).then((res) => {
      setData(res.data);
      setNotifications((prev) => [...prev, ...(res.data.docs ?? [])]);
      return res;
    });
  }, []);

  return {
    notifications,
    meta: data,
    loading,
    fetch: fetchNotifications,

    query,
    setQuery,
    refetch,
  };
}
