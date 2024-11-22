import { z } from 'zod';

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMINISTRATOR = 'ADMINISTRATOR',
  CHROMEBOOK_ADMIN = 'CHROMEBOOK_ADMIN',
  HELP_DESK = 'HELP_DESK',
  END_USER = 'END_USER'
}

export const PERMISSIONS = {
  // User permissions
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  UPDATE_USERS: 'update_users',
  DELETE_USERS: 'delete_users',

  // Ticket permissions
  VIEW_TICKETS: 'view_tickets',
  CREATE_TICKETS: 'create_tickets',
  UPDATE_TICKETS: 'update_tickets',
  DELETE_TICKETS: 'delete_tickets',
  ASSIGN_TICKETS: 'assign_tickets',
  VIEW_REPORTS: 'view_reports',

  // Asset permissions
  VIEW_ASSETS: 'view_assets',
  CREATE_ASSETS: 'create_assets',
  UPDATE_ASSETS: 'update_assets',
  DELETE_ASSETS: 'delete_assets',

  // Chromebook permissions
  VIEW_CHROMEBOOKS: 'view_chromebooks',
  CREATE_CHROMEBOOKS: 'create_chromebooks',
  UPDATE_CHROMEBOOKS: 'update_chromebooks',
  DELETE_CHROMEBOOKS: 'delete_chromebooks',
  MANAGE_CHROMEBOOKS: 'manage_chromebooks',

  // Form permissions
  VIEW_FORMS: 'view_forms',
  CREATE_FORMS: 'create_forms',
  EDIT_FORMS: 'edit_forms',
  DELETE_FORMS: 'delete_forms',
  SUBMIT_FORMS: 'submit_forms',
  VIEW_FORM_SUBMISSIONS: 'view_form_submissions',
  MANAGE_FORM_TEMPLATES: 'manage_form_templates',

  // System permissions
  MANAGE_SYSTEM_SETTINGS: 'manage_system_settings',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_INTEGRATIONS: 'manage_integrations',

  // Developer permissions
  ACCESS_DEVELOPER_DOCS: 'access_developer_docs',
} as const;

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const PERMISSION_DETAILS: Permission[] = [
  // User permissions
  {
    id: PERMISSIONS.VIEW_USERS,
    name: 'View Users',
    description: 'Can view user list and details',
    category: 'users',
  },
  {
    id: PERMISSIONS.CREATE_USERS,
    name: 'Create Users',
    description: 'Can create new users',
    category: 'users',
  },
  {
    id: PERMISSIONS.UPDATE_USERS,
    name: 'Update Users',
    description: 'Can update existing users',
    category: 'users',
  },
  {
    id: PERMISSIONS.DELETE_USERS,
    name: 'Delete Users',
    description: 'Can delete users',
    category: 'users',
  },

  // Ticket permissions
  {
    id: PERMISSIONS.VIEW_TICKETS,
    name: 'View Tickets',
    description: 'Can view tickets',
    category: 'tickets',
  },
  {
    id: PERMISSIONS.CREATE_TICKETS,
    name: 'Create Tickets',
    description: 'Can create new tickets',
    category: 'tickets',
  },
  {
    id: PERMISSIONS.UPDATE_TICKETS,
    name: 'Update Tickets',
    description: 'Can update existing tickets',
    category: 'tickets',
  },
  {
    id: PERMISSIONS.DELETE_TICKETS,
    name: 'Delete Tickets',
    description: 'Can delete tickets',
    category: 'tickets',
  },
  {
    id: PERMISSIONS.ASSIGN_TICKETS,
    name: 'Assign Tickets',
    description: 'Can assign tickets to users',
    category: 'tickets',
  },
  {
    id: PERMISSIONS.VIEW_REPORTS,
    name: 'View Reports',
    description: 'Can view ticket reports',
    category: 'tickets',
  },

  // Asset permissions
  {
    id: PERMISSIONS.VIEW_ASSETS,
    name: 'View Assets',
    description: 'Can view assets',
    category: 'assets',
  },
  {
    id: PERMISSIONS.CREATE_ASSETS,
    name: 'Create Assets',
    description: 'Can create new assets',
    category: 'assets',
  },
  {
    id: PERMISSIONS.UPDATE_ASSETS,
    name: 'Update Assets',
    description: 'Can update existing assets',
    category: 'assets',
  },
  {
    id: PERMISSIONS.DELETE_ASSETS,
    name: 'Delete Assets',
    description: 'Can delete assets',
    category: 'assets',
  },

  // Chromebook permissions
  {
    id: PERMISSIONS.VIEW_CHROMEBOOKS,
    name: 'View Chromebooks',
    description: 'Can view Chromebooks',
    category: 'chromebooks',
  },
  {
    id: PERMISSIONS.CREATE_CHROMEBOOKS,
    name: 'Create Chromebooks',
    description: 'Can create new Chromebooks',
    category: 'chromebooks',
  },
  {
    id: PERMISSIONS.UPDATE_CHROMEBOOKS,
    name: 'Update Chromebooks',
    description: 'Can update existing Chromebooks',
    category: 'chromebooks',
  },
  {
    id: PERMISSIONS.DELETE_CHROMEBOOKS,
    name: 'Delete Chromebooks',
    description: 'Can delete Chromebooks',
    category: 'chromebooks',
  },
  {
    id: PERMISSIONS.MANAGE_CHROMEBOOKS,
    name: 'Manage Chromebooks',
    description: 'Can manage Chromebook assignments and check-in/out',
    category: 'chromebooks',
  },

  // Form permissions
  {
    id: PERMISSIONS.VIEW_FORMS,
    name: 'View Forms',
    description: 'Can view and access forms',
    category: 'forms',
  },
  {
    id: PERMISSIONS.CREATE_FORMS,
    name: 'Create Forms',
    description: 'Can create new forms',
    category: 'forms',
  },
  {
    id: PERMISSIONS.EDIT_FORMS,
    name: 'Edit Forms',
    description: 'Can edit existing forms',
    category: 'forms',
  },
  {
    id: PERMISSIONS.DELETE_FORMS,
    name: 'Delete Forms',
    description: 'Can delete forms',
    category: 'forms',
  },
  {
    id: PERMISSIONS.SUBMIT_FORMS,
    name: 'Submit Forms',
    description: 'Can submit form responses',
    category: 'forms',
  },
  {
    id: PERMISSIONS.VIEW_FORM_SUBMISSIONS,
    name: 'View Form Submissions',
    description: 'Can view form submissions',
    category: 'forms',
  },
  {
    id: PERMISSIONS.MANAGE_FORM_TEMPLATES,
    name: 'Manage Form Templates',
    description: 'Can create and manage form templates',
    category: 'forms',
  },

  // System permissions
  {
    id: PERMISSIONS.MANAGE_SYSTEM_SETTINGS,
    name: 'Manage System Settings',
    description: 'Can manage system settings',
    category: 'system',
  },
  {
    id: PERMISSIONS.MANAGE_ROLES,
    name: 'Manage Roles',
    description: 'Can manage user roles and permissions',
    category: 'system',
  },
  {
    id: PERMISSIONS.MANAGE_INTEGRATIONS,
    name: 'Manage Integrations',
    description: 'Can manage system integrations',
    category: 'system',
  },
  {
    id: PERMISSIONS.ACCESS_DEVELOPER_DOCS,
    name: 'Access Developer Documentation',
    description: 'Can access developer documentation and resources',
    category: 'system',
  },
];

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  microsoftId?: string;
  googleId?: string;
  customPermissions?: string[];
}

export interface CustomRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const roleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
});