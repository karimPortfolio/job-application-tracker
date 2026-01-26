import { useEffect, useRef, useState } from 'react';
import {
  Department,
  DepartmentQuery,
  PaginatedResponse,
} from '../types/departments.types';
import { getDepartments } from '../services/departments.service';

export function useDepartmentsList(initialQuery?: DepartmentQuery) {
  const [data, setData] =
    useState<PaginatedResponse<Department> | null>(null);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState<DepartmentQuery>({
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

    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await getDepartments(query);
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [query]);

  return {
    departments: data?.docs ?? [],
    meta: data,
    loading,

    query,
    setQuery,
    refetch: () => {
      lastFetchKeyRef.current = null;
      return getDepartments(query).then((res) => {
        setData(res.data);
        return res;
      });
    },
  };
}
