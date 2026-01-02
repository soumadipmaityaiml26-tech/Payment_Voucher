export interface CreateProjectPayload {
  vendorId: string;
  projectName: string;
  companyName: "Airde Real Estate" | "Airde Developer" | "Unique Realcon";
  estimated: Number;
}

export interface Project {
  _id: string;
  vendorId: string;
  projectName: string;
  companyName: "Airde Real Estate" | "Airde Developer" | "Unique Realcon";
  billed: number;
  paid: number;
  estimated: Number;
  balance: number;
  createdAt: string;
}

export interface ICreateProjectResponse {
  success: true;
  project: Project;
}

export interface IGetVendorProjectsResponse {
  success: true;
  count: number;
  projects: Project[];
}
