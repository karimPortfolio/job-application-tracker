"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildJobSort = buildJobSort;
function buildJobSort(query) {
    const allowed = [
        'createdAt',
        'title',
        'applicationsCount',
        'viewsCount',
    ];
    const sortBy = allowed.includes(query.sortBy)
        ? query.sortBy
        : 'createdAt';
    const orderParam = query.order ?? query.sortOrder;
    const sortOrder = (orderParam === 'asc' || orderParam === 1) ? 1 : -1;
    return {
        [String(sortBy)]: sortOrder,
    };
}
//# sourceMappingURL=jobs.sort.js.map