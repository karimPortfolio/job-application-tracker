"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDepartmentSort = buildDepartmentSort;
function buildDepartmentSort(sortBy, order) {
    return {
        [sortBy || 'createdAt']: order === 'asc' ? 1 : -1,
    };
}
//# sourceMappingURL=department.sort.js.map