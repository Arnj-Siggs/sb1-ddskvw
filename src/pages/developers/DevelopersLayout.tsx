import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Code, BookOpen, Database, Package, Workflow, Puzzle, Map } from 'lucide-react';

export function DevelopersLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.endsWith(path);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Developer Documentation</h1>
        <p className="mt-1 text-sm text-gray-500">
          Technical documentation and resources for developers
        </p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/developers')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            location.pathname === '/developers'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </div>
        </button>

        <button
          onClick={() => navigate('/developers/architecture')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('architecture')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Workflow className="h-4 w-4 mr-2" />
            Architecture
          </div>
        </button>

        <button
          onClick={() => navigate('/developers/api')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('api')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Code className="h-4 w-4 mr-2" />
            API Reference
          </div>
        </button>

        <button
          onClick={() => navigate('/developers/database')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('database')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Database Schema
          </div>
        </button>

        <button
          onClick={() => navigate('/developers/components')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('components')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Puzzle className="h-4 w-4 mr-2" />
            Components
          </div>
        </button>

        <button
          onClick={() => navigate('/developers/dependencies')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('dependencies')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Dependencies
          </div>
        </button>

        <button
          onClick={() => navigate('/roadmap')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('roadmap')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Map className="h-4 w-4 mr-2" />
            Roadmap
          </div>
        </button>
      </div>

      <Outlet />
    </div>
  );
}