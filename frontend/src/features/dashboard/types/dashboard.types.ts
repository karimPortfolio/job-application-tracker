

export interface TotalStats {
    total: number;
    monthsDiff: {
        value: number;
        percentage: number;
        direction: 'up' | 'down';
    };
}

export interface MonthlyStats {
    month: string;
    total: number;
}

export interface ApplicationsStatsByJobs {
    job: string;
    total: number;
}

export interface ApplicationsStatsByCountries {
    countries: {
        id: string;
        value: number;
    }[];
    total: number;
}

export interface ApplicationsStatsByStatus {
    status: string;
    total: number;
}

export interface ApplicationsStatsByStages {
    stage: string;
    total: number;
}

export interface ApplicationsStatsByDepartments {
    department: string;
    total: number;
}
