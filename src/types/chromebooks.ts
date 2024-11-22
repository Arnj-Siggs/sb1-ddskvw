import { AssetStatus } from './assets';

export interface Chromebook {
  id: string;
  serialNumber: string;
  model: string;
  status: AssetStatus;
  purchaseDate: string;
  warrantyEnd: string;
  lastSync?: string;
  osVersion?: string;
  batteryHealth?: number;
  assignedTo?: {
    id: string;
    name: string;
    email: string;
    grade?: number;
  };
  damageReports: DamageReport[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DamageReport {
  id: string;
  description: string;
  severity: 'MINOR' | 'MODERATE' | 'SEVERE';
  cost?: number;
  status: 'PENDING' | 'REPAIRING' | 'REPAIRED' | 'UNREPAIRABLE';
  reportedAt: string;
  repairedAt?: string;
}