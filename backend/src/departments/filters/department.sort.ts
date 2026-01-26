// filters/department.sort.ts
export function buildDepartmentSort(
  sortBy?: 'title' | 'createdAt',
  order?: 'asc' | 'desc',
) {
  return {
    [sortBy || 'createdAt']: order === 'asc' ? 1 : -1,
  };
}
