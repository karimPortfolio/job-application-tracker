import { PaginatedResponse, JobQuery } from '@/features/jobs/types/jobs.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getSavedJobs } from '../services/saved-jobs.service';
import { SavedJob } from '../types/saved-jobs.type';

export function useSavedJobsList(initialQuery?: JobQuery) {
  const [data, setData] =
    useState<PaginatedResponse<SavedJob> | null>(null);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState<JobQuery>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'desc',
    ...initialQuery,
  });

  const lastFetchKeyRef = useRef<string | null>(null);
  const queryRef = useRef(query);

  // Keep latest query in a ref for stable refetch
  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    const key = JSON.stringify(query);
    if (lastFetchKeyRef.current === key) return;
    lastFetchKeyRef.current = key;

    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const res = await getSavedJobs(query);
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [query]);

  const refetch = useCallback(() => {
    lastFetchKeyRef.current = null;
    return getSavedJobs(queryRef.current).then((res) => {
      setData(res.data);
      return res;
    });
  }, []);

  return {
    savedJobs: data?.docs ?? [],
    meta: data,
    loading,

    query,
    setQuery,
    refetch,
  };
}
