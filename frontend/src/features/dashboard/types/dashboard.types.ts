

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
