export function buildPagination(page = 1, limit = 10) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Number(limit) || 10, 50);

  return {
    skip: (safePage - 1) * safeLimit,
    limit: safeLimit,
    page: safePage,
  };
}