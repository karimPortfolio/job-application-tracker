import { useEffect, useRef, useState } from 'react';
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

  return {
    jobs: data?.docs ?? [],
    meta: data,
    loading,

    query,
    setQuery,
    refetch: () => {
      lastFetchKeyRef.current = null;
      return getJobs(query).then((res) => {
        setData(res.data);
        return res;
      });
    },
  };
}
