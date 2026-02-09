
export interface StatsResponse {
  total: number;
  monthsDiff: {
    value: number;
    percentage: number;
    direction: string;
  };
}

