import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';
import {
  LayoutDashboard,
  Users,
  Ticket,
  Monitor,
  Settings,
  Laptop,
  LogIn,
  LogOut,
  FileText,
  Box,
  Code,
  Map,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export function Sidebar() {
  const { hasPermission } = usePermissions();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (name: string) => {
    setExpandedSections(current => 
      current.includes(name) 
        ? current.filter(n => n !== name)
        : [...current, name]
    );
  };

  // Check if a section should be expanded based on current route
  const isSectionExpanded = (name: string, children: any[]) => {
    if (expandedSections.includes(name)) return true;
    return children.some(child => child.href && location.pathname.startsWith(child.href));
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: 'Tickets',
      icon: Ticket,
      show: hasPermission(PERMISSIONS.VIEW_TICKETS),
      children: [
        {
          name: 'Dashboard',
          href: '/tickets',
          icon: LayoutDashboard,
          exact: true,
        },
        {
          name: 'Incidents',
          href: '/tickets/incidents',
          icon: Box,
        },
        {
          name: 'Problems',
          href: '/tickets/problems',
          icon: Box,
        },
        {
          name: 'Reports',
          href: '/tickets/reports',
          icon: FileText,
          show: hasPermission(PERMISSIONS.VIEW_REPORTS),
        },
      ],
    },
    {
      name: 'Chromebooks',
      icon: Laptop,
      show: hasPermission(PERMISSIONS.VIEW_CHROMEBOOKS),
      children: [
        {
          name: 'Dashboard',
          href: '/chromebooks',
          icon: LayoutDashboard,
          exact: true,
        },
        {
          name: 'Devices',
          href: '/chromebooks/devices',
          icon: Laptop,
        },
        {
          name: 'Tickets',
          href: '/chromebooks/tickets',
          icon: Ticket,
          show: hasPermission(PERMISSIONS.VIEW_TICKETS),
        },
        {
          name: 'Check In',
          href: '/chromebooks/check-in',
          icon: LogIn,
          show: hasPermission(PERMISSIONS.MANAGE_CHROMEBOOKS),
        },
        {
          name: 'Check Out',
          href: '/chromebooks/check-out',
          icon: LogOut,
          show: hasPermission(PERMISSIONS.MANAGE_CHROMEBOOKS),
        },
      ],
    },
    {
      name: 'Assets',
      href: '/assets',
      icon: Monitor,
      show: hasPermission(PERMISSIONS.VIEW_ASSETS),
    },
    {
      name: 'Users',
      href: '/users',
      icon: Users,
      show: hasPermission(PERMISSIONS.VIEW_USERS),
    },
    {
      name: 'Forms',
      icon: FileText,
      show: hasPermission(PERMISSIONS.VIEW_FORMS),
      children: [
        {
          name: 'My Forms',
          href: '/forms',
          icon: FileText,
          exact: true,
        },
        {
          name: 'Templates',
          href: '/forms/templates',
          icon: FileText,
          show: hasPermission(PERMISSIONS.MANAGE_FORM_TEMPLATES),
        },
        {
          name: 'Submissions',
          href: '/forms/submissions',
          icon: Box,
          show: hasPermission(PERMISSIONS.VIEW_FORM_SUBMISSIONS),
        },
      ],
    },
    {
      name: 'Developers',
      icon: Code,
      show: hasPermission(PERMISSIONS.ACCESS_DEVELOPER_DOCS),
      children: [
        {
          name: 'Overview',
          href: '/developers',
          icon: LayoutDashboard,
          exact: true,
        },
        {
          name: 'Architecture',
          href: '/developers/architecture',
          icon: Box,
        },
        {
          name: 'API Reference',
          href: '/developers/api',
          icon: FileText,
        },
        {
          name: 'Database Schema',
          href: '/developers/database',
          icon: Box,
        },
        {
          name: 'Components',
          href: '/developers/components',
          icon: Box,
        },
        {
          name: 'Dependencies',
          href: '/developers/dependencies',
          icon: Box,
        },
      ],
    },
    {
      name: 'Roadmap',
      href: '/roadmap',
      icon: Map,
      show: hasPermission(PERMISSIONS.ACCESS_DEVELOPER_DOCS),
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      show: hasPermission(PERMISSIONS.MANAGE_SYSTEM_SETTINGS),
    },
  ];

  return (
    <nav className="flex-shrink-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {navigation.map((item) => {
          if (item.show === false) return null;

          if (item.children) {
            const isExpanded = isSectionExpanded(item.name, item.children);
            return (
              <div key={item.name} className="mb-4">
                <button
                  onClick={() => toggleSection(item.name)}
                  className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {isExpanded && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.children.map((child) => {
                      if (child.show === false) return null;
                      
                      return (
                        <NavLink
                          key={child.name}
                          to={child.href || '#'}
                          end={child.exact}
                          className={({ isActive }) =>
                            `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                              isActive
                                ? 'text-primary bg-primary/5'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`
                          }
                        >
                          <child.icon className="h-5 w-5 mr-2" />
                          {child.name}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.href || '#'}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 ${
                  isActive
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}