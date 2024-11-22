import axios from 'axios';
import { Form, FormSubmission } from '../../types/forms';

// Mock data for development
const MOCK_FORMS: Form[] = [
  {
    id: 'helpdesk-template',
    title: 'Help Desk Ticket Form',
    description: 'Submit a help desk ticket for IT support',
    sections: [
      {
        id: 'basic-info',
        title: 'Basic Information',
        fields: [
          {
            id: 'title',
            type: 'text',
            label: 'Issue Title',
            required: true,
            placeholder: 'Brief description of the issue',
          },
          {
            id: 'description',
            type: 'textarea',
            label: 'Detailed Description',
            required: true,
            placeholder: 'Please provide detailed information about your issue',
          },
          {
            id: 'priority',
            type: 'select',
            label: 'Priority',
            required: true,
            options: ['Low', 'Medium', 'High', 'Urgent'],
          },
        ],
      },
      {
        id: 'attachments',
        title: 'Attachments',
        fields: [
          {
            id: 'screenshots',
            type: 'file',
            label: 'Screenshots',
            required: false,
            description: 'Upload any relevant screenshots (optional)',
          },
        ],
      },
    ],
    settings: {
      requireAuth: true,
      allowedRoles: ['END_USER', 'HELP_DESK', 'ADMINISTRATOR'],
      submitMessage: 'Your ticket has been submitted successfully.',
      notifyEmails: ['helpdesk@example.com'],
    },
    status: 'published',
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isTemplate: true,
    templateType: 'helpdesk',
  },
];

interface GetFormsOptions {
  isTemplate?: boolean;
}

export async function getForms(options: GetFormsOptions = {}): Promise<Form[]> {
  try {
    if (options.isTemplate) {
      return MOCK_FORMS.filter(form => form.isTemplate);
    }
    return MOCK_FORMS.filter(form => !form.isTemplate);
  } catch (error) {
    throw new Error('Failed to fetch forms');
  }
}

export async function getForm(id: string): Promise<Form> {
  try {
    const form = MOCK_FORMS.find(f => f.id === id);
    if (!form) throw new Error('Form not found');
    return form;
  } catch (error) {
    throw new Error('Failed to fetch form');
  }
}

export async function createForm(formData: Partial<Form>): Promise<Form> {
  try {
    const newForm: Form = {
      id: `form-${Date.now()}`,
      title: formData.title || 'Untitled Form',
      description: formData.description || '',
      sections: formData.sections || [],
      settings: formData.settings || {
        requireAuth: true,
      },
      status: 'draft',
      createdBy: formData.createdBy || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isTemplate: formData.isTemplate || false,
      templateType: formData.templateType,
    };

    MOCK_FORMS.push(newForm);
    return newForm;
  } catch (error) {
    throw new Error('Failed to create form');
  }
}

export async function updateForm(id: string, formData: Partial<Form>): Promise<Form> {
  try {
    const index = MOCK_FORMS.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Form not found');

    MOCK_FORMS[index] = {
      ...MOCK_FORMS[index],
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    return MOCK_FORMS[index];
  } catch (error) {
    throw new Error('Failed to update form');
  }
}

export async function deleteForm(id: string): Promise<void> {
  try {
    const index = MOCK_FORMS.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Form not found');

    MOCK_FORMS.splice(index, 1);
  } catch (error) {
    throw new Error('Failed to delete form');
  }
}

export async function submitForm(formId: string, data: Record<string, any>, files?: File[]): Promise<FormSubmission> {
  try {
    const submission: FormSubmission = {
      id: `submission-${Date.now()}`,
      formId,
      submittedAt: new Date().toISOString(),
      data,
    };

    return submission;
  } catch (error) {
    throw new Error('Failed to submit form');
  }
}

export async function getFormSubmissions(formId?: string): Promise<FormSubmission[]> {
  try {
    // Mock implementation
    return [];
  } catch (error) {
    throw new Error('Failed to fetch form submissions');
  }
}