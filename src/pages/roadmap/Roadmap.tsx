import React from 'react';
import { CheckCircle, Circle, AlertCircle, Clock, ArrowRight } from 'lucide-react';

export function Roadmap() {
  const completionStatus = {
    completed: { icon: CheckCircle, class: 'text-green-500' },
    inProgress: { icon: Clock, class: 'text-yellow-500' },
    pending: { icon: Circle, class: 'text-gray-400' },
    blocked: { icon: AlertCircle, class: 'text-red-500' },
  };

  const features = {
    core: [
      { name: 'Authentication & Authorization', status: 'completed', details: 'Microsoft OAuth, Role-based access' },
      { name: 'User Management', status: 'completed', details: 'User CRUD, Role assignment' },
      { name: 'Navigation & Layout', status: 'completed', details: 'Responsive layout, Navigation structure' },
    ],
    tickets: [
      { name: 'Ticket Management', status: 'completed', details: 'Create, update, assign tickets' },
      { name: 'Ticket Categories', status: 'completed', details: 'Incidents, Problems' },
      { name: 'Custom Fields', status: 'completed', details: 'Dynamic field configuration' },
      { name: 'SLA Tracking', status: 'pending', details: 'Response time, Resolution time' },
      { name: 'Time Tracking', status: 'inProgress', details: 'Work time logging' },
    ],
    assets: [
      { name: 'Asset Tracking', status: 'completed', details: 'Asset lifecycle management' },
      { name: 'Asset Categories', status: 'completed', details: 'Multiple asset types' },
      { name: 'Warranty Tracking', status: 'completed', details: 'Warranty expiration alerts' },
      { name: 'Asset History', status: 'pending', details: 'Complete audit trail' },
    ],
    chromebooks: [
      { name: 'Device Management', status: 'completed', details: 'Track Chromebook inventory' },
      { name: 'Check In/Out', status: 'completed', details: 'Device assignment workflow' },
      { name: 'Google Integration', status: 'blocked', details: 'Sync with Google Admin', blocker: 'API Access' },
      { name: 'Bulk Operations', status: 'inProgress', details: 'Mass updates and imports' },
    ],
    forms: [
      { name: 'Form Builder', status: 'completed', details: 'Custom form creation' },
      { name: 'Form Templates', status: 'completed', details: 'Reusable templates' },
      { name: 'Form Submissions', status: 'completed', details: 'Response tracking' },
      { name: 'Advanced Validation', status: 'pending', details: 'Complex validation rules' },
    ],
  };

  const improvements = [
    {
      category: 'Performance',
      items: [
        { name: 'Query Optimization', priority: 'high', estimate: '2 weeks' },
        { name: 'Asset List Virtualization', priority: 'medium', estimate: '1 week' },
        { name: 'Image Optimization', priority: 'low', estimate: '3 days' },
      ],
    },
    {
      category: 'User Experience',
      items: [
        { name: 'Bulk Actions UI', priority: 'high', estimate: '1 week' },
        { name: 'Advanced Search', priority: 'medium', estimate: '2 weeks' },
        { name: 'Keyboard Shortcuts', priority: 'low', estimate: '1 week' },
      ],
    },
    {
      category: 'Integration',
      items: [
        { name: 'Google Workspace', priority: 'high', estimate: '3 weeks' },
        { name: 'JAMF Integration', priority: 'medium', estimate: '2 weeks' },
        { name: 'SSO Providers', priority: 'low', estimate: '1 week' },
      ],
    },
  ];

  const timeline = [
    {
      phase: 'Phase 1: Core Features',
      status: 'completed',
      items: ['Authentication', 'Basic CRUD', 'Core UI'],
      duration: 'Completed',
    },
    {
      phase: 'Phase 2: Advanced Features',
      status: 'inProgress',
      items: ['SLA Implementation', 'Advanced Search', 'Reporting'],
      duration: '4 weeks remaining',
    },
    {
      phase: 'Phase 3: Integrations',
      status: 'pending',
      items: ['Google Admin', 'JAMF', 'SSO'],
      duration: '8 weeks estimated',
    },
    {
      phase: 'Phase 4: Optimization',
      status: 'pending',
      items: ['Performance', 'UX Improvements', 'Mobile Support'],
      duration: '6 weeks estimated',
    },
  ];

  const metrics = [
    { name: 'Core Features', completed: 90, total: 100 },
    { name: 'Ticket Module', completed: 75, total: 100 },
    { name: 'Asset Module', completed: 85, total: 100 },
    { name: 'Chromebook Module', completed: 70, total: 100 },
    { name: 'Forms Module', completed: 80, total: 100 },
  ];

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2>Project Roadmap</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
          <h3 className="text-blue-800 font-medium m-0">Project Overview</h3>
          <p className="mt-2 text-blue-900">
            K12 Help Desk is currently at 80% completion of core features, with active development
            on advanced features and integrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(features).map(([category, items]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 capitalize mb-4">{category}</h3>
            <div className="space-y-4">
              {items.map((item) => {
                const StatusIcon = completionStatus[item.status].icon;
                return (
                  <div key={item.name} className="flex items-start space-x-3">
                    <StatusIcon className={`h-5 w-5 mt-0.5 ${completionStatus[item.status].class}`} />
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.details}</div>
                      {item.blocker && (
                        <div className="text-sm text-red-600 mt-1">
                          Blocker: {item.blocker}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Areas for Improvement</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {improvements.map((category) => (
            <div key={category.category}>
              <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div key={item.name} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className={`
                        ${item.priority === 'high' ? 'text-red-600' : ''}
                        ${item.priority === 'medium' ? 'text-yellow-600' : ''}
                        ${item.priority === 'low' ? 'text-green-600' : ''}
                      `}>
                        {item.priority} priority
                      </span>
                      <span className="text-gray-500">{item.estimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Development Timeline</h3>
        <div className="space-y-6">
          {timeline.map((phase) => (
            <div key={phase.phase} className="relative">
              <div className={`
                absolute left-0 top-0 w-3 h-3 rounded-full mt-1.5
                ${phase.status === 'completed' ? 'bg-green-500' : ''}
                ${phase.status === 'inProgress' ? 'bg-yellow-500' : ''}
                ${phase.status === 'pending' ? 'bg-gray-300' : ''}
              `} />
              <div className="ml-6">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{phase.phase}</h4>
                  <span className="text-sm text-gray-500">{phase.duration}</span>
                </div>
                <ul className="mt-2 text-sm text-gray-600">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Metrics</h3>
        <div className="space-y-4">
          {metrics.map((metric) => {
            const percentage = (metric.completed / metric.total) * 100;
            return (
              <div key={metric.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">{metric.name}</span>
                  <span className="text-gray-500">{percentage}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}