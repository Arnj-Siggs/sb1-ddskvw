import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { GeneralSettings } from './GeneralSettings';
import { EmailTemplates } from './EmailTemplates';
import { IntegrationSettings } from './IntegrationSettings';
import { RoleSettings } from './RoleSettings';
import { AuditLogs } from './AuditLogs';
import { BackupRestore } from './BackupRestore';
import { TicketFields } from './TicketFields';
import { ChromebookTicketFields } from './ChromebookTicketFields';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';
import { Unauthorized } from '../unauthorized';

export function Settings() {
  const { hasPermission } = usePermissions();

  if (!hasPermission(PERMISSIONS.MANAGE_SYSTEM_SETTINGS)) {
    return <Unauthorized />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your help desk system settings and configurations
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border-b border-gray-200">
          <TabsTrigger value="general">General</TabsTrigger>
          {hasPermission(PERMISSIONS.MANAGE_ROLES) && (
            <TabsTrigger value="roles">Roles</TabsTrigger>
          )}
          <TabsTrigger value="ticket-fields">Ticket Fields</TabsTrigger>
          <TabsTrigger value="chromebook-fields">Chromebook Fields</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        {hasPermission(PERMISSIONS.MANAGE_ROLES) && (
          <TabsContent value="roles">
            <RoleSettings />
          </TabsContent>
        )}

        <TabsContent value="ticket-fields">
          <TicketFields />
        </TabsContent>

        <TabsContent value="chromebook-fields">
          <ChromebookTicketFields />
        </TabsContent>

        <TabsContent value="email">
          <EmailTemplates />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLogs />
        </TabsContent>

        <TabsContent value="backup">
          <BackupRestore />
        </TabsContent>
      </Tabs>
    </div>
  );
}