"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApplicationFilter = buildApplicationFilter;
function buildApplicationFilter(company, query) {
    const filter = {
        company,
    };
    if (query.fullName) {
        filter.fullName = { $regex: query.fullName, $options: 'i' };
    }
    if (query.country) {
        filter.country = query.country;
    }
    if (query.city) {
        filter.city = query.city;
    }
    if (query.job) {
        filter.job = query.job;
    }
    if (query.status) {
        filter.status = query.status;
    }
    if (query.stage) {
        filter.stage = query.stage;
    }
    if (query.source) {
        filter.source = query.source;
    }
    if (query.search) {
        filter.$or = [
            { fullName: { $regex: query.search, $options: 'i' } },
            { email: { $regex: query.search, $options: 'i' } },
            { phoneNumber: { $regex: query.search, $options: 'i' } },
        ];
    }
    if (query.appliedAtStart || query.appliedAtEnd) {
        filter.appliedAt = {};
        if (query.appliedAtStart) {
            filter.appliedAt.$gte = new Date(query.appliedAtStart);
        }
        if (query.appliedAtEnd) {
            filter.appliedAt.$lte = new Date(query.appliedAtEnd);
        }
    }
    return filter;
}
//# sourceMappingURL=applications.filters.js.map