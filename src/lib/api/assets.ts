import axios from 'axios';
import { Asset, AssetType, AssetStatus } from '../../types/assets';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Mock data for development
const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    type: AssetType.DESKTOP_PC,
    serialNumber: 'PC123456',
    name: 'Staff Workstation',
    status: AssetStatus.AVAILABLE,
    location: 'Main Office',
    purchaseDate: '2023-01-15',
    warrantyEnd: '2026-01-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: AssetType.PRINTER,
    serialNumber: 'PR789012',
    name: 'HP LaserJet Pro',
    status: AssetStatus.IN_REPAIR,
    location: 'Library',
    purchaseDate: '2022-08-20',
    warrantyEnd: '2025-08-20',
    notes: 'Paper jam issues',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface AssetFilters {
  type?: AssetType;
  status?: AssetStatus;
  search?: string;
  location?: string;
}

export async function getAssets(filters: AssetFilters = {}): Promise<Asset[]> {
  try {
    // For development, return filtered mock data
    let filteredAssets = [...MOCK_ASSETS];

    if (filters.type) {
      filteredAssets = filteredAssets.filter(asset => asset.type === filters.type);
    }
    if (filters.status) {
      filteredAssets = filteredAssets.filter(asset => asset.status === filters.status);
    }
    if (filters.location) {
      filteredAssets = filteredAssets.filter(asset => asset.location === filters.location);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredAssets = filteredAssets.filter(asset => 
        asset.name.toLowerCase().includes(search) ||
        asset.serialNumber.toLowerCase().includes(search)
      );
    }

    return filteredAssets;
  } catch (error) {
    throw new Error('Failed to fetch assets. Please try again.');
  }
}

export async function getAsset(id: string): Promise<Asset> {
  try {
    const asset = MOCK_ASSETS.find(a => a.id === id);
    if (!asset) {
      throw new Error('Asset not found');
    }
    return asset;
  } catch (error) {
    throw new Error('Failed to fetch asset details. Please try again.');
  }
}

export async function createAsset(assetData: Partial<Asset>): Promise<Asset> {
  try {
    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      type: assetData.type!,
      serialNumber: assetData.serialNumber!,
      name: assetData.name!,
      status: assetData.status || AssetStatus.AVAILABLE,
      location: assetData.location,
      purchaseDate: assetData.purchaseDate,
      warrantyEnd: assetData.warrantyEnd,
      notes: assetData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_ASSETS.push(newAsset);
    return newAsset;
  } catch (error) {
    throw new Error('Failed to create asset. Please try again.');
  }
}

export async function updateAsset(id: string, assetData: Partial<Asset>): Promise<Asset> {
  try {
    const index = MOCK_ASSETS.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Asset not found');
    }

    MOCK_ASSETS[index] = {
      ...MOCK_ASSETS[index],
      ...assetData,
      updatedAt: new Date().toISOString(),
    };

    return MOCK_ASSETS[index];
  } catch (error) {
    throw new Error('Failed to update asset. Please try again.');
  }
}

export async function deleteAsset(id: string): Promise<void> {
  try {
    const index = MOCK_ASSETS.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Asset not found');
    }

    MOCK_ASSETS.splice(index, 1);
  } catch (error) {
    throw new Error('Failed to delete asset. Please try again.');
  }
}

export async function bulkImportAssets(file: File): Promise<void> {
  try {
    // Mock implementation
    return Promise.resolve();
  } catch (error) {
    throw new Error('Failed to import assets. Please try again.');
  }
}

export async function exportAssets(filters: AssetFilters = {}): Promise<Blob> {
  try {
    // Mock implementation
    const data = 'Name,Serial Number,Type,Status\n' + 
      MOCK_ASSETS.map(asset => 
        `${asset.name},${asset.serialNumber},${asset.type},${asset.status}`
      ).join('\n');
    return new Blob([data], { type: 'text/csv' });
  } catch (error) {
    throw new Error('Failed to export assets. Please try again.');
  }
}