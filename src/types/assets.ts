export enum AssetType {
  CHROMEBOOK = 'CHROMEBOOK',
  DESKTOP_PC = 'DESKTOP_PC',
  MAC = 'MAC',
  INTERACTIVE_PANEL = 'INTERACTIVE_PANEL',
  PRINTER = 'PRINTER',
  PROJECTOR = 'PROJECTOR',
  OTHER = 'OTHER',
}

export enum AssetStatus {
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  IN_REPAIR = 'IN_REPAIR',
  RETIRED = 'RETIRED',
  LOST = 'LOST',
}

export interface Asset {
  id: string;
  type: AssetType;
  serialNumber: string;
  name: string;
  status: AssetStatus;
  purchaseDate?: string;
  warrantyEnd?: string;
  location?: string;
  notes?: string;
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  };
  customFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}