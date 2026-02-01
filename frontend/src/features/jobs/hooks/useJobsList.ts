import { useCallback, useEffect, useRef, useState } from 'react';
import { Job, JobQuery, PaginatedResponse } from '../types/jobs.types';
import { getJobs } from '../services/jobs.service';

export function useJobsList(initialQuery?: JobQuery) {
  const [data, setData] =
    useState<PaginatedResponse<Job> | null>(null);
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

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await getJobs(query);
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [query]);

  const refetch = useCallback(() => {
    lastFetchKeyRef.current = null;
    return getJobs(queryRef.current).then((res) => {
      setData(res.data);
      return res;
    });
  }, []);

  return {
    jobs: data?.docs ?? [],
    meta: data,
    loading,

    query,
    setQuery,
    refetch,
  };
}
