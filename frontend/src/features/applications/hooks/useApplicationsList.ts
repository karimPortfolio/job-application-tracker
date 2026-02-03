import { useCallback, useEffect, useRef, useState } from 'react';
import { Application, ApplicationQuery, PaginatedResponse } from '../types/applications.types';
import { getApplications } from '../services/applications.service';

export function useApplicationsList(initialQuery?: ApplicationQuery) {
  const [data, setData] =
    useState<PaginatedResponse<Application> | null>(null);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState<ApplicationQuery>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'desc',
    ...initialQuery,
  });

  const lastFetchKeyRef = useRef<string | null>(null);
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    const key = JSON.stringify(query);
    if (lastFetchKeyRef.current === key) return;
    lastFetchKeyRef.current = key;

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await getApplications(query);
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [query]);

  const refetch = useCallback(() => {
    lastFetchKeyRef.current = null;
    return getApplications(queryRef.current).then((res) => {
      setData(res.data);
      return res;
    });
  }, []);

  return {
    applications: data?.docs ?? [],
    meta: data,
    loading,

    query,
    setQuery,
    refetch,
  };
}
