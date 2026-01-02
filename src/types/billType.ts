export interface Bill {
  _id: string;
  projectId: string;
  description: string;
  amount: number;
  createdAt: string;
}

export interface CreateBillPayload {
  projectId: string;
  description: string;
  amount: number;
}

export interface ICreateBillResponse {
  success: true;
  bill: Bill;
}

export interface IGetProjectBillsResponse {
  success: true;
  count: number;
  bills: Bill[];
}
