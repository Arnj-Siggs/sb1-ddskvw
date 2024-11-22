import { CustomField, CustomFieldType } from '../../types/customFields';

// Mock data for development
const MOCK_CUSTOM_FIELDS: CustomField[] = [
  {
    id: 'cf1',
    name: 'impact',
    label: 'Business Impact',
    type: CustomFieldType.SELECT,
    description: 'How does this issue affect business operations?',
    required: true,
    options: ['Low', 'Medium', 'High', 'Critical'],
    order: 0,
    category: 'business',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cf2',
    name: 'affected_users',
    label: 'Number of Affected Users',
    type: CustomFieldType.NUMBER,
    description: 'How many users are affected by this issue?',
    required: false,
    validation: {
      min: 1,
    },
    order: 1,
    category: 'technical',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cf3',
    name: 'steps_to_reproduce',
    label: 'Steps to Reproduce',
    type: CustomFieldType.TEXTAREA,
    description: 'Please provide detailed steps to reproduce the issue',
    required: true,
    order: 2,
    category: 'technical',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getCustomFields(): Promise<CustomField[]> {
  try {
    return MOCK_CUSTOM_FIELDS.sort((a, b) => a.order - b.order);
  } catch (error) {
    throw new Error('Failed to fetch custom fields');
  }
}

export async function getCustomField(id: string): Promise<CustomField> {
  try {
    const field = MOCK_CUSTOM_FIELDS.find(f => f.id === id);
    if (!field) throw new Error('Custom field not found');
    return field;
  } catch (error) {
    throw new Error('Failed to fetch custom field');
  }
}

export async function createCustomField(data: Partial<CustomField>): Promise<CustomField> {
  try {
    const newField: CustomField = {
      id: `cf-${Date.now()}`,
      name: data.name!,
      label: data.label!,
      type: data.type!,
      description: data.description,
      required: data.required || false,
      options: data.options,
      validation: data.validation,
      order: MOCK_CUSTOM_FIELDS.length,
      category: data.category!,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_CUSTOM_FIELDS.push(newField);
    return newField;
  } catch (error) {
    throw new Error('Failed to create custom field');
  }
}

export async function updateCustomField(id: string, data: Partial<CustomField>): Promise<CustomField> {
  try {
    const index = MOCK_CUSTOM_FIELDS.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Custom field not found');

    MOCK_CUSTOM_FIELDS[index] = {
      ...MOCK_CUSTOM_FIELDS[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return MOCK_CUSTOM_FIELDS[index];
  } catch (error) {
    throw new Error('Failed to update custom field');
  }
}

export async function deleteCustomField(id: string): Promise<void> {
  try {
    const index = MOCK_CUSTOM_FIELDS.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Custom field not found');

    MOCK_CUSTOM_FIELDS.splice(index, 1);
  } catch (error) {
    throw new Error('Failed to delete custom field');
  }
}

export async function reorderCustomFields(fields: CustomField[]): Promise<void> {
  try {
    // Update the order of all fields
    fields.forEach((field, index) => {
      const existingField = MOCK_CUSTOM_FIELDS.find(f => f.id === field.id);
      if (existingField) {
        existingField.order = index;
      }
    });

    // Sort the array by the new order
    MOCK_CUSTOM_FIELDS.sort((a, b) => a.order - b.order);
  } catch (error) {
    throw new Error('Failed to reorder custom fields');
  }
}

export async function toggleCustomField(id: string, isActive: boolean): Promise<void> {
  try {
    const field = MOCK_CUSTOM_FIELDS.find(f => f.id === id);
    if (!field) throw new Error('Custom field not found');

    field.isActive = isActive;
    field.updatedAt = new Date().toISOString();
  } catch (error) {
    throw new Error('Failed to toggle custom field');
  }
}