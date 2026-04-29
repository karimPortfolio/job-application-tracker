"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApplicationSort = buildApplicationSort;
function buildApplicationSort(query) {
    const allowed = [
        'createdAt',
        'fullName',
        'phoneNumber',
        'appliedAt',
        'rating',
        'aiScore',
    ];
    const sortBy = allowed.includes(query.sortBy)
        ? query.sortBy
        : 'createdAt';
    const orderParam = query.order ?? query.order;
    const sortOrder = (orderParam === 'asc' || orderParam === 1) ? 1 : -1;
    return {
        [String(sortBy)]: sortOrder,
    };
}
//# sourceMappingURL=applications.sort.js.map