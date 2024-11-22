```typescript
export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'date' | 'email' | 'number' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, multiselect, radio
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  defaultValue?: any;
  description?: string;
  width?: 'full' | 'half';
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface Form {
  id: string;
  title: string;
  description: string;
  sections: FormSection[];
  settings: {
    requireAuth: boolean;
    allowedRoles?: string[];
    allowedEmails?: string[];
    submitMessage?: string;
    redirectUrl?: string;
    notifyEmails?: string[];
    expiresAt?: string;
    maxSubmissions?: number;
  };
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isTemplate?: boolean;
  templateType?: 'helpdesk' | 'chromebook' | 'custom';
}

export interface FormSubmission {
  id: string;
  formId: string;
  submittedBy?: string;
  submittedAt: string;
  data: Record<string, any>;
  files?: {
    fieldId: string;
    fileUrl: string;
    fileName: string;
  }[];
}
```