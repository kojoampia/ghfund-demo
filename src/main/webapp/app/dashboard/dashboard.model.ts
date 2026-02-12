// --- TYPES & MODELS ---
export type UserRole = 'PUBLIC' | 'INVESTOR' | 'ADMIN' | 'REGULATOR';
export type DashboardView = 'OVERVIEW' | 'LEDGER';

export interface Project {
  id: string;
  name: string;
  sector: string;
  status: 'ACTIVE' | 'VETTING' | 'CLOSED';
  targetAmount: number;
  currentRaised: number;
  impactScore: number;
}

export interface Circle {
  id: string;
  name: string;
  members: number;
  impact: number;
  focus: string;
}

export interface Investment {
  id: string;
  project: string;
  amount: number;
  date: Date;
  roi: number;
  status: string;
  hash: string;
}
