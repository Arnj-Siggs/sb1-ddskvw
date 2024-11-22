import { AssetStatus } from '../../types/assets';
import { Chromebook } from '../../types/chromebooks';

// Mock data for development
const MOCK_CHROMEBOOKS: Chromebook[] = [
  {
    id: '1',
    serialNumber: 'CB123456',
    model: 'Lenovo 300e',
    status: AssetStatus.ASSIGNED,
    purchaseDate: '2023-01-15',
    warrantyEnd: '2026-01-15',
    lastSync: new Date().toISOString(),
    osVersion: '102.0.5005.75',
    batteryHealth: 85,
    assignedTo: {
      id: 'student1',
      name: 'John Smith',
      email: 'john.smith@school.edu',
      grade: 9,
    },
    damageReports: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    serialNumber: 'CB789012',
    model: 'HP Chromebook 11 G8',
    status: AssetStatus.IN_REPAIR,
    purchaseDate: '2022-08-20',
    warrantyEnd: '2025-08-20',
    lastSync: '2023-12-01T12:00:00Z',
    osVersion: '101.0.4951.59',
    batteryHealth: 65,
    damageReports: [
      {
        id: 'damage1',
        description: 'Cracked screen',
        severity: 'SEVERE',
        cost: 150,
        status: 'PENDING',
        reportedAt: '2024-01-15T09:00:00Z',
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface ChromebookFilters {
  status?: AssetStatus;
  search?: string;
  grade?: string;
}

export async function getChromebooks(filters: ChromebookFilters = {}): Promise<Chromebook[]> {
  try {
    let filteredChromebooks = [...MOCK_CHROMEBOOKS];

    if (filters.status) {
      filteredChromebooks = filteredChromebooks.filter(cb => cb.status === filters.status);
    }
    if (filters.grade) {
      filteredChromebooks = filteredChromebooks.filter(cb => 
        cb.assignedTo?.grade?.toString() === filters.grade
      );
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredChromebooks = filteredChromebooks.filter(cb => 
        cb.serialNumber.toLowerCase().includes(search) ||
        cb.model.toLowerCase().includes(search) ||
        cb.assignedTo?.name.toLowerCase().includes(search)
      );
    }

    return filteredChromebooks;
  } catch (error) {
    throw new Error('Failed to fetch Chromebooks. Please try again.');
  }
}

export async function getChromebookBySerial(serialNumber: string): Promise<Chromebook | null> {
  try {
    const chromebook = MOCK_CHROMEBOOKS.find(cb => cb.serialNumber === serialNumber);
    if (!chromebook) throw new Error('Chromebook not found');
    return chromebook;
  } catch (error) {
    throw new Error('Failed to fetch Chromebook');
  }
}

export async function getChromebook(id: string): Promise<Chromebook> {
  try {
    const chromebook = MOCK_CHROMEBOOKS.find(cb => cb.id === id);
    if (!chromebook) {
      throw new Error('Chromebook not found');
    }
    return chromebook;
  } catch (error) {
    throw new Error('Failed to fetch Chromebook details. Please try again.');
  }
}

export async function createChromebook(chromebookData: Partial<Chromebook>): Promise<Chromebook> {
  try {
    const newChromebook: Chromebook = {
      id: `chromebook-${Date.now()}`,
      serialNumber: chromebookData.serialNumber!,
      model: chromebookData.model!,
      status: chromebookData.status || AssetStatus.AVAILABLE,
      purchaseDate: chromebookData.purchaseDate!,
      warrantyEnd: chromebookData.warrantyEnd!,
      osVersion: chromebookData.osVersion,
      batteryHealth: chromebookData.batteryHealth,
      lastSync: new Date().toISOString(),
      damageReports: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_CHROMEBOOKS.push(newChromebook);
    return newChromebook;
  } catch (error) {
    throw new Error('Failed to create Chromebook. Please try again.');
  }
}

export async function updateChromebook(id: string, chromebookData: Partial<Chromebook>): Promise<Chromebook> {
  try {
    const index = MOCK_CHROMEBOOKS.findIndex(cb => cb.id === id);
    if (index === -1) {
      throw new Error('Chromebook not found');
    }

    MOCK_CHROMEBOOKS[index] = {
      ...MOCK_CHROMEBOOKS[index],
      ...chromebookData,
      updatedAt: new Date().toISOString(),
    };

    return MOCK_CHROMEBOOKS[index];
  } catch (error) {
    throw new Error('Failed to update Chromebook. Please try again.');
  }
}

export async function assignChromebook(id: string, studentId: string): Promise<void> {
  try {
    const chromebook = MOCK_CHROMEBOOKS.find(cb => cb.id === id);
    if (!chromebook) {
      throw new Error('Chromebook not found');
    }

    // In a real application, you would fetch the student details
    chromebook.assignedTo = {
      id: studentId,
      name: 'Student Name',
      email: 'student@school.edu',
      grade: 9,
    };
    chromebook.status = AssetStatus.ASSIGNED;
    chromebook.updatedAt = new Date().toISOString();
  } catch (error) {
    throw new Error('Failed to assign Chromebook. Please try again.');
  }
}

export async function unassignChromebook(id: string): Promise<void> {
  try {
    const chromebook = MOCK_CHROMEBOOKS.find(cb => cb.id === id);
    if (!chromebook) throw new Error('Chromebook not found');

    chromebook.status = AssetStatus.AVAILABLE;
    chromebook.assignedTo = undefined;
    chromebook.updatedAt = new Date().toISOString();
  } catch (error) {
    throw new Error('Failed to unassign Chromebook');
  }
}

export async function reportDamage(id: string, damageReport: {
  description: string;
  severity: 'MINOR' | 'MODERATE' | 'SEVERE';
  cost?: number;
}): Promise<void> {
  try {
    const chromebook = MOCK_CHROMEBOOKS.find(cb => cb.id === id);
    if (!chromebook) {
      throw new Error('Chromebook not found');
    }

    chromebook.damageReports.push({
      id: `damage-${Date.now()}`,
      ...damageReport,
      status: 'PENDING',
      reportedAt: new Date().toISOString(),
    });

    chromebook.status = AssetStatus.IN_REPAIR;
    chromebook.updatedAt = new Date().toISOString();
  } catch (error) {
    throw new Error('Failed to report damage. Please try again.');
  }
}

export async function importChromebooks(file: File): Promise<void> {
  try {
    // Mock implementation
    return Promise.resolve();
  } catch (error) {
    throw new Error('Failed to import Chromebooks. Please try again.');
  }
}

export async function exportChromebooks(): Promise<Blob> {
  try {
    const data = 'Serial Number,Model,Status,Assigned To\n' + 
      MOCK_CHROMEBOOKS.map(cb => 
        `${cb.serialNumber},${cb.model},${cb.status},${cb.assignedTo?.name || ''}`
      ).join('\n');
    return new Blob([data], { type: 'text/csv' });
  } catch (error) {
    throw new Error('Failed to export Chromebooks. Please try again.');
  }
}

export async function syncWithGoogle(): Promise<void> {
  try {
    // Mock implementation
    return Promise.resolve();
  } catch (error) {
    throw new Error('Failed to sync with Google Admin SDK. Please try again.');
  }
}