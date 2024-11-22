import React from 'react';

export function Components() {
  return (
    <div className="prose max-w-none">
      <h2>Component Library</h2>

      <h3>Overview</h3>
      <p>
        The K12 Help Desk uses a modular component architecture with reusable UI components.
        All components are built with TypeScript and styled using Tailwind CSS.
      </p>

      <h3>Common Components</h3>
      
      <h4>StatusBadge</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Displays status indicators for tickets, assets, and other items.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`interface StatusBadgeProps {
  status: TicketStatus | AssetStatus | Priority;
  size?: 'sm' | 'md';
}

<StatusBadge status={TicketStatus.OPEN} size="sm" />`}
        </pre>
      </div>

      <h4>LoadingSpinner</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Loading indicator component with customizable size.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

<LoadingSpinner size="md" />`}
        </pre>
      </div>

      <h4>EmptyState</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Empty state placeholder with icon and optional action button.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

<EmptyState
  icon={Plus}
  title="No items found"
  description="Get started by creating your first item"
  action={<button>Create Item</button>}
/>`}
        </pre>
      </div>

      <h3>Layout Components</h3>

      <h4>Layout</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Main application layout with header, sidebar, and content area.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`<Layout>
  <Header />
  <div className="flex">
    <Sidebar />
    <main><Outlet /></main>
  </div>
</Layout>`}
        </pre>
      </div>

      <h4>Header</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Application header with user menu and notifications.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`<Header>
  <NotificationBell />
  <UserMenu />
</Header>`}
        </pre>
      </div>

      <h3>Form Components</h3>

      <h4>FormField</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Reusable form field component with label and validation.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

<FormField
  label="Email"
  error={errors.email?.message}
  required
>
  <input {...register('email')} />
</FormField>`}
        </pre>
      </div>

      <h3>Data Display Components</h3>

      <h4>DataTable</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Reusable table component with sorting and column customization.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  visibleColumns: Record<string, boolean>;
  onRowClick?: (row: T) => void;
}

<DataTable
  data={tickets}
  columns={columns}
  visibleColumns={ticketColumns}
  onRowClick={handleRowClick}
/>`}
        </pre>
      </div>

      <h3>Authentication Components</h3>

      <h4>ProtectedRoute</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Route wrapper for authentication protection.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`<ProtectedRoute>
  <Component />
</ProtectedRoute>`}
        </pre>
      </div>

      <h4>PermissionGuard</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Component wrapper for permission-based access control.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`interface PermissionGuardProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

<PermissionGuard
  permission={PERMISSIONS.VIEW_TICKETS}
  fallback={<Unauthorized />}
>
  <TicketList />
</PermissionGuard>`}
        </pre>
      </div>

      <h3>Dialog Components</h3>

      <h4>DialogProvider</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Context provider for managing modal dialogs.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`interface DialogOptions {
  title: string;
  content: React.ReactNode;
}

const dialog = useDialog();
dialog.show({
  title: 'Confirm Action',
  content: <ConfirmationDialog />
});`}
        </pre>
      </div>

      <h3>Notification Components</h3>

      <h4>NotificationBell</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Notification indicator with unread count.</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`<NotificationBell />

// With NotificationProvider
const { notifications, markAsRead } = useNotifications();`}
        </pre>
      </div>

      <h3>Best Practices</h3>
      <ul>
        <li>Keep components focused and single-responsibility</li>
        <li>Use TypeScript interfaces for props</li>
        <li>Implement proper error handling</li>
        <li>Add loading states where appropriate</li>
        <li>Make components reusable and configurable</li>
        <li>Document props and usage examples</li>
        <li>Use consistent naming conventions</li>
      </ul>

      <h3>Component Organization</h3>
      <pre className="bg-gray-50 p-4 rounded-lg">
{`components/
├── common/          # Shared UI components
│   ├── Button
│   ├── Input
│   └── StatusBadge
├── layout/          # Layout components
│   ├── Header
│   └── Sidebar
├── forms/           # Form-related components
│   ├── FormField
│   └── FormBuilder
├── tickets/         # Ticket-specific components
├── assets/         # Asset-specific components
└── chromebooks/    # Chromebook-specific components`}
      </pre>

      <h3>Testing Components</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p>Example of component testing with React Testing Library:</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`import { render, screen } from '@testing-library/react';

test('StatusBadge renders with correct color', () => {
  render(<StatusBadge status={TicketStatus.OPEN} />);
  expect(screen.getByText('OPEN')).toHaveClass('bg-blue-100');
});`}
        </pre>
      </div>

      <h3>Styling Guidelines</h3>
      <ul>
        <li>Use Tailwind CSS utility classes</li>
        <li>Follow consistent spacing patterns</li>
        <li>Implement responsive design</li>
        <li>Use CSS variables for theming</li>
        <li>Maintain accessibility standards</li>
      </ul>

      <h3>Performance Considerations</h3>
      <ul>
        <li>Implement proper memoization</li>
        <li>Avoid unnecessary re-renders</li>
        <li>Lazy load components when possible</li>
        <li>Optimize images and assets</li>
        <li>Monitor component performance</li>
      </ul>
    </div>
  );
}