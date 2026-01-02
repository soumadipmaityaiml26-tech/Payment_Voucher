/* ===============================
   Vendor Snapshot
================================ */

export interface VendorSnapshot {
  name: string;
  gstin?: string;
  address: string;
  pan: string;
  phone: string;
}

/* ===============================
   Company Snapshot
================================ */

export interface CompanySnapshot {
  name: string;
  address: string;
  phone: string;
  email: string;
}

/* ===============================
   Payment Item
================================ */

export interface PaymentItem {
  description: string;
  amount: number;
}

/* ===============================
   GST
================================ */

export interface GST {
  amount: number;
  percentage: number;
}

/* ===============================
   Payment (Voucher)
================================ */

export type PaymentMode =
  | "Bank Transfer"
  | "Cheque"
  | "UPI"
  | "Cash"
  | "Demand Draft"
  | "Others";

export interface PaymentSummary {
  mode: PaymentMode;
  bankName: string | null;
  chequeNumber: string | null;
}

export interface Payment {
  _id: string;
  projectId: string;

  vendor: VendorSnapshot;
  company: CompanySnapshot;

  items: PaymentItem[];
  itemsTotal: number;

  gst: GST;
  total: number;

  paymentSummary: PaymentSummary; // 👈 NEW (critical)

  createdAt: string;
}

/* ===============================
   API Responses
================================ */

export interface ICreatePaymentResponse {
  success: boolean;
  payment: Payment;
}

export interface IGetPaymentsByProjectResponse {
  success: boolean;
  payments: Payment[];
}
