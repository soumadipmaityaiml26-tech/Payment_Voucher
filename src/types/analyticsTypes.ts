export interface IFinanceStatsResponse {
  success: boolean;
  stats: {
    totalPaymentCount: number;
    totalPayments: number;
    totalBilled: number;
  };
}

export interface IChart {
  price: number;
  day: string;
  month: string;
}

export interface IGetSummaryResponse {
  success: boolean;
  analytics: {
    last30DaysPayments: IChart[];
  };
}
