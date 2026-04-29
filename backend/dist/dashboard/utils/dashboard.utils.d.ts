import { Model } from 'mongoose';
export interface DiffResult {
    value: number;
    percentage: number;
    direction: 'up' | 'down';
}
export interface MonthlyStats {
    month: string;
    total: number;
}
export declare class DashboardUtils {
    getApplicationsTotalByJobs(company: string, model: Model<any>, year: string, limit?: number | null): Promise<{
        job: string;
        total: number;
    }[]>;
    getTotalsByCountries(company: string, model: Model<any>, year: string): Promise<{
        countries: {
            id: string;
            value: number;
        }[];
        total: number;
    }>;
    getTotalsByYearPeriod(year: string, company: string, model: Model<any>): Promise<MonthlyStats[]>;
    private getMonthName;
    calculateDiff(current: number, previous: number): DiffResult;
    currentMonthTotal(company: string, model: Model<any>): Promise<number>;
    lastMonthTotal(company: string, model: Model<any>): Promise<number>;
}
