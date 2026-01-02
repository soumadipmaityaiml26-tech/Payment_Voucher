export interface Vendor {
  _id: string;
  name: string;
  phone: string;
  address: string;
  pan: string;
  gstin?: string;
  createdAt: string;
}

export interface ICreateVendorResponse {
  success: boolean;
  vendor: Vendor;
}

export interface IGetVendorsResponse {
  success: boolean;
  count: number;
  vendors: Vendor[];
}
export interface CreateVendorPayload {
  name: string;
  phone: string;
  address: string;
  pan: string;
  gstin?: string;
}
