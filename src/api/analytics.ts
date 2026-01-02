import type {
  IFinanceStatsResponse,
  IGetSummaryResponse,
} from "@/types/analyticsTypes";
import api from "./axios";

export const getFinancialData = async () => {
  const token = localStorage.getItem("authToken");

  const res = await api.get<IFinanceStatsResponse>(`/analytics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getSummary = async () => {
  const token = localStorage.getItem("authToken");

  const res = await api.get<IGetSummaryResponse>("/analytics/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
