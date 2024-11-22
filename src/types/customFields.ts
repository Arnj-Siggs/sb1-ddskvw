import { z } from 'zod';

export enum CustomFieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  NUMBER = 'number',
}

export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: CustomFieldType;
  description?: string;
  required: boolean;
  options?: string[]; // For select/multiselect fields
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  order: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const customFieldSchema = z.object({
  name: z.string().min(1, 'Name is required')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores are allowed')
    .transform(val => val.toLowerCase()),
  label: z.string().min(1, 'Label is required'),
  type: z.nativeEnum(CustomFieldType),
  description: z.string().optional(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
  defaultValue: z.any().optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    message: z.string().optional(),
  }).optional(),
  category: z.string(),
});