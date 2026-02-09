import { Injectable } from '@nestjs/common';
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

@Injectable()
export class DashboardUtils {
  async getTotalsByYearPeriod(
    year: string,
    company: string,
    model: Model<any>,
  ): Promise<MonthlyStats[]> {
    const startDate = new Date(parseInt(year), 0, 1);
    const endDate = new Date(parseInt(year) + 1, 0, 1);

    const result = await model.aggregate([
      {
        $match: {
          company: company,
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Ensure all months are represented
    const monthlyStats: MonthlyStats[] = [];
    for (let month = 1; month <= 12; month++) {
      const monthData = result.find((r) => r.month === month);
      monthlyStats.push({
        month: this.getMonthName(month),
        total: monthData ? monthData.count : 0,
      });
    }

    return monthlyStats;
  }

  private getMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('default', { month: 'long' });
  }

  calculateDiff(current: number, previous: number): DiffResult {
    if (previous === 0) {
      return {
        value: current - previous,
        percentage: current === 0 ? 0 : 100,
        direction: current >= previous ? 'up' : 'down',
      };
    }

    const diff = current - previous;

    return {
      value: diff,
      percentage: Math.round((diff / previous) * 100),
      direction: diff >= 0 ? 'up' : 'down',
    };
  }

  async currentMonthTotal(company: string, model: Model<any>): Promise<number> {
    const currentMonthDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    return await model.countDocuments({
      company: company,
      createdAt: {
        $gte: currentMonthDate,
      },
    });
  }

  async lastMonthTotal(company: string, model: Model<any>): Promise<number> {
    const lastMonthStartDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1,
    );
    const lastMonthEndDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    return await model.countDocuments({
      company: company,
      createdAt: {
        $gte: lastMonthStartDate,
        $lt: lastMonthEndDate,
      },
    });
  }
}
