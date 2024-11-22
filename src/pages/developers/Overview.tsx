import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Workflow, Database, Puzzle, Package, BookOpen } from 'lucide-react';

export function Overview() {
  const sections = [
    {
      icon: Workflow,
      title: "Architecture",
      description: "System design, patterns, and architectural decisions",
      link: "/developers/architecture",
      topics: [
        "Component Architecture",
        "State Management",
        "Authentication Flow",
        "Error Handling",
        "Performance Optimizations"
      ]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation and integration guides",
      link: "/developers/api",
      topics: [
        "Authentication Endpoints",
        "Ticket Management",
        "Asset Management",
        "Form Management",
        "Error Handling"
      ]
    },
    {
      icon: Database,
      title: "Database Schema",
      description: "Database models, relationships, and migrations",
      link: "/developers/database",
      topics: [
        "Entity Relationships",
        "Model Definitions",
        "Migrations",
        "Indexes & Constraints",
        "Best Practices"
      ]
    },
    {
      icon: Puzzle,
      title: "Components",
      description: "Reusable UI components and usage guidelines",
      link: "/developers/components",
      topics: [
        "Common Components",
        "Form Components",
        "Layout Components",
        "Data Display Components",
        "Authentication Components"
      ]
    },
    {
      icon: Package,
      title: "Dependencies",
      description: "Project dependencies and package management",
      link: "/developers/dependencies",
      topics: [
        "Core Dependencies",
        "Development Tools",
        "UI Libraries",
        "State Management",
        "Testing Tools"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2>K12 Help Desk Documentation</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
          <h3 className="text-blue-800 font-medium m-0">Quick Start</h3>
          <p className="mt-2 text-blue-900">
            Get the application running locally in a few simple steps.
          </p>
          <pre className="bg-white p-4 rounded-md mt-2 overflow-x-auto">
{`# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev`}
          </pre>
        </div>

        <h3>Project Overview</h3>
        <p>
          The K12 Help Desk is a comprehensive IT asset and ticket management system designed
          specifically for educational institutions. Built with modern web technologies, it provides
          a robust platform for managing IT resources, support tickets, and Chromebook deployments.
        </p>

        <h4>Key Features</h4>
        <ul>
          <li><strong>Ticket Management:</strong> Full-featured help desk ticketing system</li>
          <li><strong>Asset Tracking:</strong> Comprehensive IT asset management</li>
          <li><strong>Chromebook Management:</strong> Specialized tools for Chromebook fleet management</li>
          <li><strong>Custom Forms:</strong> Dynamic form builder for various use cases</li>
          <li><strong>Role-Based Access:</strong> Granular permission system</li>
          <li><strong>Microsoft Integration:</strong> Seamless Microsoft 365 authentication</li>
        </ul>

        <h4>Technology Stack</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900">Frontend</h5>
            <ul className="mt-2 space-y-1">
              <li>• React with TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• React Query</li>
              <li>• React Router</li>
              <li>• React Hook Form</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900">Backend</h5>
            <ul className="mt-2 space-y-1">
              <li>• Node.js</li>
              <li>• PostgreSQL</li>
              <li>• Prisma ORM</li>
              <li>• Microsoft Graph API</li>
              <li>• JWT Authentication</li>
            </ul>
          </div>
        </div>

        <h3>Project Structure</h3>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`k12-helpdesk/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── common/    # Shared components
│   │   ├── layout/    # Layout components
│   │   └── [module]/  # Module-specific components
│   ├── contexts/      # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── lib/
│   │   └── api/      # API integration layer
│   ├── pages/         # Page components
│   └── types/         # TypeScript definitions
├── public/           # Static assets
└── prisma/          # Database schema and migrations`}
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.title}
            to={section.link}
            className="block group"
          >
            <div className="h-full bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <section.icon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.topics.map((topic) => (
                  <li key={topic} className="text-sm text-gray-500">• {topic}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      <div className="prose max-w-none">
        <h3>Development Guidelines</h3>
        
        <h4>Code Style</h4>
        <ul>
          <li>Follow TypeScript best practices</li>
          <li>Use ESLint and Prettier for code formatting</li>
          <li>Write meaningful component and variable names</li>
          <li>Document complex logic with comments</li>
          <li>Create reusable components and hooks</li>
        </ul>

        <h4>Git Workflow</h4>
        <ul>
          <li>Create feature branches from main</li>
          <li>Use conventional commits</li>
          <li>Submit pull requests for review</li>
          <li>Keep commits focused and atomic</li>
          <li>Write descriptive commit messages</li>
        </ul>

        <h4>Testing</h4>
        <ul>
          <li>Write unit tests for critical functionality</li>
          <li>Use React Testing Library for component tests</li>
          <li>Maintain good test coverage</li>
          <li>Test edge cases and error scenarios</li>
          <li>Write integration tests for key flows</li>
        </ul>

        <h3>Environment Setup</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="mt-0">Required Environment Variables</h4>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
{`# Authentication
VITE_MICROSOFT_CLIENT_ID=your_client_id
VITE_MICROSOFT_TENANT_ID=your_tenant_id
VITE_REDIRECT_URI=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/k12helpdesk

# Optional
VITE_API_URL=http://localhost:3000
VITE_ENABLE_MOCK_API=true`}
          </pre>
        </div>

        <h3>Additional Resources</h3>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <h4 className="font-medium text-gray-900">React Documentation</h4>
            <p className="text-sm text-gray-600">Official React documentation and guides</p>
          </a>
          <a
            href="https://www.typescriptlang.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <h4 className="font-medium text-gray-900">TypeScript Handbook</h4>
            <p className="text-sm text-gray-600">TypeScript language documentation</p>
          </a>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <h4 className="font-medium text-gray-900">Tailwind CSS</h4>
            <p className="text-sm text-gray-600">Utility-first CSS framework docs</p>
          </a>
        </div>
      </div>
    </div>
  );
}