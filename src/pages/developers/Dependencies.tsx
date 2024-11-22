import React from 'react';

export function Dependencies() {
  return (
    <div className="prose max-w-none">
      <h2>Project Dependencies</h2>

      <h3>Core Dependencies</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4>React and TypeScript</h4>
        <pre className="bg-gray-100 p-4 rounded-md">
{`"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@types/react": "^18.2.56",
  "@types/react-dom": "^18.2.19",
  "typescript": "^5.2.2"
}`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Core React library with TypeScript support for type safety and better developer experience.
        </p>
      </div>

      <h3>Routing</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"react-router-dom": "^6.22.1"`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Handles client-side routing with features like nested routes, route protection, and navigation.
        </p>
      </div>

      <h3>State Management</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"@tanstack/react-query": "^5.24.1",
"zustand": "^4.5.1"`}
        </pre>
        <ul className="mt-2 text-sm text-gray-600">
          <li><strong>React Query:</strong> Handles server state, caching, and data synchronization</li>
          <li><strong>Zustand:</strong> Lightweight state management for client-side state</li>
        </ul>
      </div>

      <h3>Forms and Validation</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"react-hook-form": "^7.50.1",
"@hookform/resolvers": "^3.3.4",
"zod": "^3.22.4"`}
        </pre>
        <ul className="mt-2 text-sm text-gray-600">
          <li><strong>React Hook Form:</strong> Form state management and validation</li>
          <li><strong>Zod:</strong> TypeScript-first schema validation</li>
        </ul>
      </div>

      <h3>UI Components and Styling</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"@headlessui/react": "^1.7.18",
"tailwindcss": "^3.4.1",
"lucide-react": "^0.344.0",
"clsx": "^2.1.0"`}
        </pre>
        <ul className="mt-2 text-sm text-gray-600">
          <li><strong>Headless UI:</strong> Unstyled, accessible UI components</li>
          <li><strong>Tailwind CSS:</strong> Utility-first CSS framework</li>
          <li><strong>Lucide React:</strong> Icon library</li>
          <li><strong>clsx:</strong> Utility for constructing className strings</li>
        </ul>
      </div>

      <h3>Data Visualization</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"recharts": "^2.12.1"`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Composable charting library built on React components.
        </p>
      </div>

      <h3>Authentication</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"@azure/msal-browser": "^3.10.0",
"@azure/msal-react": "^2.0.12",
"@microsoft/microsoft-graph-client": "^3.0.7",
"jsonwebtoken": "^9.0.2"`}
        </pre>
        <ul className="mt-2 text-sm text-gray-600">
          <li><strong>MSAL:</strong> Microsoft Authentication Library for Azure AD</li>
          <li><strong>Microsoft Graph:</strong> API client for Microsoft services</li>
          <li><strong>JWT:</strong> JSON Web Token handling</li>
        </ul>
      </div>

      <h3>Database and ORM</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"@prisma/client": "^5.10.2",
"prisma": "^5.10.2"`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Prisma ORM for database access with type safety and migrations.
        </p>
      </div>

      <h3>Development Tools</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"devDependencies": {
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.1.4",
  "autoprefixer": "^10.4.17",
  "postcss": "^8.4.35",
  "@typescript-eslint/eslint-plugin": "^7.0.2",
  "@typescript-eslint/parser": "^7.0.2",
  "eslint": "^8.56.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.5"
}`}
        </pre>
        <ul className="mt-2 text-sm text-gray-600">
          <li><strong>Vite:</strong> Build tool and development server</li>
          <li><strong>ESLint:</strong> Code linting and best practices</li>
          <li><strong>PostCSS & Autoprefixer:</strong> CSS processing</li>
        </ul>
      </div>

      <h3>Drag and Drop</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"@dnd-kit/core": "^6.1.0",
"@dnd-kit/sortable": "^8.0.0",
"@dnd-kit/utilities": "^3.2.2",
"@hello-pangea/dnd": "^16.5.0"`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Libraries for implementing drag and drop functionality in various components.
        </p>
      </div>

      <h3>Date Handling</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"date-fns": "^3.3.1"`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Modern JavaScript date utility library.
        </p>
      </div>

      <h3>Markdown Support</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`"react-markdown": "^9.0.1",
"remark-gfm": "^4.0.0"`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Markdown rendering with GitHub Flavored Markdown support.
        </p>
      </div>

      <h3>Version Management</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4>Package Manager</h4>
        <p>The project uses npm as the package manager. Key commands:</p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`# Install dependencies
npm install

# Add a new dependency
npm install package-name

# Add a dev dependency
npm install -D package-name

# Update dependencies
npm update`}
        </pre>
      </div>

      <h3>Dependency Management Best Practices</h3>
      <ul>
        <li>Regularly update dependencies for security patches</li>
        <li>Use exact versions for critical dependencies</li>
        <li>Keep package-lock.json in version control</li>
        <li>Review dependency updates for breaking changes</li>
        <li>Monitor bundle size impact of dependencies</li>
        <li>Use dependency auditing tools</li>
      </ul>

      <h3>Security Considerations</h3>
      <ul>
        <li>Regular security audits with <code>npm audit</code></li>
        <li>Review dependency licenses</li>
        <li>Monitor for vulnerable dependencies</li>
        <li>Use trusted and well-maintained packages</li>
        <li>Keep dependencies up to date</li>
      </ul>

      <h3>Performance Impact</h3>
      <ul>
        <li>Monitor bundle size with build analysis tools</li>
        <li>Use code splitting for large dependencies</li>
        <li>Consider tree-shaking support</li>
        <li>Evaluate alternatives for heavy dependencies</li>
        <li>Use production builds of dependencies</li>
      </ul>
    </div>
  );
}