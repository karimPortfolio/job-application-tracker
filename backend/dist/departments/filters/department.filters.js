"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDepartmentFilter = buildDepartmentFilter;
function buildDepartmentFilter(company, query) {
    const filter = {
        company: company,
    };
    if (query.search) {
        filter.$or = [
            { title: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } },
        ];
    }
    if (query.createdStart || query.createdEnd) {
        filter.createdAt = {};
        if (query.createdStart) {
            filter.createdAt.$gte = new Date(query.createdStart);
        }
        if (query.createdEnd) {
            filter.createdAt.$lte = new Date(query.createdEnd);
        }
    }
    return filter;
}
//# sourceMappingURL=department.filters.js.map