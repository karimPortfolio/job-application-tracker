import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { countryNameToISO } from 'src/common/utils/country-to-iso';

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

  async getApplicationsTotalByJobs(company: string, model: Model<any>, year: string, limit?: number|null): Promise<{ job: string; total: number }[]> {
    return await model.aggregate([
      {
        $match: {
          company: company,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      { $group: { _id: '$job', total: { $sum: 1 } } },
      {
        $addFields: {
          jobId: { $toObjectId: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $addFields: {
          jobDetails: { $arrayElemAt: ['$jobDetails', 0] },
        },
      },
      {
        $project: {
          job: '$jobDetails.title',
          total: 1,
          _id: 0,
        },
      },
      { $sort: { total: -1, job: 1 } },
      ...(limit ? [{ $limit: limit }] : []),
    ]);
  };

  async getTotalsByCountries(company: string, model: Model<any>, year: string): Promise<{
    countries: { id: string; value: number }[];
    total: number;
  }> {
    const stats = await model.aggregate([
      {
        $match: {
          company: company,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: { _id: '$country', subtotal: { $sum: 1 } },
      },
      {
        $sort: { subtotal: -1, _id: 1 },
      },
      {
        $facet: {
          byCountry: [
            {
              $project: { country: '$_id', subtotal: 1, _id: 0 },
            },
          ],
          total: [
            {
              $group: {
                _id: null,
                total: { $sum: '$subtotal' },
              },
            },
            {
              $project: { _id: 0 },
            },
          ],
        },
      },
      {
        $addFields: {
          total: { $arrayElemAt: ['$total.total', 0] },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            countries: '$byCountry',
            total: '$total',
          },
        },
      },
    ]);

    const results = stats.length > 0 ? stats[0] : { countries: [], total: 0 };

    const mappedCountries = results.countries
      .map((c) => {
        const iso = countryNameToISO(c.country);

        if (!iso) return null;

        return {
          id: iso,
          value: c.subtotal,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.value !== b.value) {
          return b.value - a.value;
        }
        return a.id.localeCompare(b.id);
      });

    return {
      countries: mappedCountries,
      total: results.total,
    };
  }

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
