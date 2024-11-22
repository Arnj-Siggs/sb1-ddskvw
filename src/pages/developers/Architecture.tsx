import React from 'react';

export function Architecture() {
  return (
    <div className="prose max-w-none">
      <h2>System Architecture</h2>

      <h3>Overview</h3>
      <p>
        The K12 Help Desk follows a modern React application architecture with a focus on modularity,
        type safety, and maintainability. The system is built using a component-based architecture
        with clear separation of concerns.
      </p>

      <h3>Core Architecture Components</h3>
      
      <h4>1. Component Layer</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h5 className="text-lg font-medium mb-4">Structure</h5>
        <pre className="bg-gray-100 p-4 rounded-md">
{`components/
├── common/          # Shared UI components
├── layout/          # Layout structure
├── forms/          # Form-related components
└── [module]/       # Module-specific components`}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          Components are organized by functionality and reusability, with common components
          separated from module-specific implementations.
        </p>
      </div>

      <h4>2. State Management</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h5 className="text-lg font-medium mb-4">Implementation</h5>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>React Query:</strong> Server state management</li>
          <li><strong>Zustand:</strong> Client-side state</li>
          <li><strong>Context API:</strong> Global application state</li>
        </ul>
        <pre className="bg-gray-100 p-4 rounded-md">
{`// Example React Query implementation
const { data, isLoading } = useQuery({
  queryKey: ['tickets'],
  queryFn: getTickets
});

// Example Zustand store
const useStore = create((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters })
}));`}
        </pre>
      </div>

      <h4>3. Data Flow</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`UI Component -> Event Handler -> API Call -> Server
                               -> State Update -> UI Update`}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          Unidirectional data flow ensures predictable state updates and maintainable code.
        </p>
      </div>

      <h3>Key Design Patterns</h3>
      
      <h4>1. Provider Pattern</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`// Auth Provider Example
export function AuthProvider({ children }) {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null
  });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}`}
        </pre>
      </div>

      <h4>2. Custom Hooks</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`// Permission Hook Example
export function usePermissions() {
  const { user } = useAuth();
  const { roles } = useRoles();

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    return user.role === 'SUPER_ADMIN' || 
           roles.some(r => r.permissions.includes(permission));
  }, [user, roles]);

  return { hasPermission };
}`}
        </pre>
      </div>

      <h4>3. Higher-Order Components</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`// Protected Route Example
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}`}
        </pre>
      </div>

      <h3>Authentication Flow</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`1. User accesses protected route
2. ProtectedRoute checks authentication
3. If not authenticated:
   - Redirect to login
   - Microsoft OAuth flow
   - Token storage
4. If authenticated:
   - Load user data
   - Check permissions
   - Render protected content`}
        </pre>
      </div>

      <h3>Error Handling</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h5 className="text-lg font-medium mb-4">Implementation</h5>
        <pre className="bg-gray-100 p-4 rounded-md">
{`// Error Boundary
export class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    // Log error to service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}`}
        </pre>
      </div>

      <h3>Performance Optimizations</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <ul className="list-disc pl-6">
          <li>React Query for efficient data caching</li>
          <li>Code splitting by route</li>
          <li>Lazy loading of components</li>
          <li>Memoization of expensive computations</li>
          <li>Optimistic updates for better UX</li>
        </ul>
        <pre className="bg-gray-100 p-4 rounded-md mt-4">
{`// Code Splitting Example
const TicketDetails = React.lazy(() => 
  import('./TicketDetails')
);

// Component with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <TicketDetails />
</Suspense>`}
        </pre>
      </div>

      <h3>Security Measures</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <ul className="list-disc pl-6">
          <li>Role-based access control (RBAC)</li>
          <li>JWT token management</li>
          <li>XSS prevention through React</li>
          <li>CSRF protection</li>
          <li>Secure authentication flow</li>
        </ul>
        <pre className="bg-gray-100 p-4 rounded-md mt-4">
{`// Permission Guard Example
export function PermissionGuard({ permission, children }) {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(permission)) {
    return <Unauthorized />;
  }
  
  return children;
}`}
        </pre>
      </div>

      <h3>Testing Strategy</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h5 className="text-lg font-medium mb-4">Testing Layers</h5>
        <ul className="list-disc pl-6">
          <li>Unit tests for utilities and hooks</li>
          <li>Component tests with React Testing Library</li>
          <li>Integration tests for key flows</li>
          <li>E2E tests for critical paths</li>
        </ul>
        <pre className="bg-gray-100 p-4 rounded-md mt-4">
{`// Component Test Example
test('TicketCard displays status correctly', () => {
  render(<TicketCard ticket={mockTicket} />);
  expect(screen.getByText('OPEN')).toBeInTheDocument();
});`}
        </pre>
      </div>

      <h3>Build and Deployment</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h5 className="text-lg font-medium mb-4">Pipeline</h5>
        <pre className="bg-gray-100 p-4 rounded-md">
{`1. Code Push
2. CI Pipeline
   - Install dependencies
   - Type checking
   - Linting
   - Tests
   - Build
3. Deployment
   - Environment configuration
   - Asset optimization
   - CDN distribution`}
        </pre>
      </div>

      <h3>Monitoring and Logging</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <ul className="list-disc pl-6">
          <li>Error tracking service integration</li>
          <li>Performance monitoring</li>
          <li>User analytics</li>
          <li>Audit logging</li>
          <li>Health checks</li>
        </ul>
      </div>
    </div>
  );
}