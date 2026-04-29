export declare class DepartmentQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'title' | 'createdAt';
    order?: 'asc' | 'desc';
    title?: string;
    createdStart?: string;
    createdEnd?: string;
}
