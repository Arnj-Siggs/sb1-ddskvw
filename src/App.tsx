import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { RoleProvider } from './contexts/RoleContext';
import { DialogProvider } from './hooks/useDialog';
import { NotificationProvider } from './contexts/NotificationContext';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { AsyncBoundary } from './components/error/AsyncBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PermissionGuard } from './components/auth/PermissionGuard';
import { PERMISSIONS } from './types/auth';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UserList } from './pages/users/UserList';
import { AssetList } from './pages/assets/AssetList';
import { TicketDashboard } from './pages/tickets/TicketDashboard';
import { IncidentList } from './pages/tickets/incidents/IncidentList';
import { ProblemList } from './pages/tickets/problems/ProblemList';
import { TicketReports } from './pages/tickets/reports/TicketReports';
import { ChromebookDashboard } from './pages/chromebooks/ChromebookDashboard';
import { ChromebookDevices } from './pages/chromebooks/devices/ChromebookDevices';
import { ChromebookTickets } from './pages/chromebooks/tickets/ChromebookTickets';
import { ChromebookCheckIn } from './pages/chromebooks/ChromebookCheckIn';
import { ChromebookCheckOut } from './pages/chromebooks/ChromebookCheckOut';
import { Settings } from './pages/settings/Settings';
import { Unauthorized } from './pages/unauthorized';
import { FormsList } from './pages/forms/FormsList';
import { FormTemplates } from './pages/forms/FormTemplates';
import { FormSubmissions } from './pages/forms/FormSubmissions';
import { FormBuilder } from './pages/forms/FormBuilder';
import { DevelopersLayout } from './pages/developers/DevelopersLayout';
import { Overview } from './pages/developers/Overview';
import { Architecture } from './pages/developers/Architecture';
import { ApiReference } from './pages/developers/ApiReference';
import { DatabaseSchema } from './pages/developers/DatabaseSchema';
import { Components } from './pages/developers/Components';
import { Dependencies } from './pages/developers/Dependencies';
import { Roadmap } from './pages/roadmap/Roadmap';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RoleProvider>
          <SettingsProvider>
            <NotificationProvider>
              <DialogProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    
                    {/* Ticket Routes */}
                    <Route path="tickets">
                      <Route index element={<TicketDashboard />} />
                      <Route path="incidents" element={<IncidentList />} />
                      <Route path="problems" element={<ProblemList />} />
                      <Route
                        path="reports"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.VIEW_REPORTS}
                            fallback={<Unauthorized />}
                          >
                            <AsyncBoundary>
                              <TicketReports />
                            </AsyncBoundary>
                          </PermissionGuard>
                        }
                      />
                    </Route>

                    {/* Chromebook Routes */}
                    <Route path="chromebooks">
                      <Route
                        index
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.VIEW_CHROMEBOOKS}
                            fallback={<Unauthorized />}
                          >
                            <AsyncBoundary>
                              <ChromebookDashboard />
                            </AsyncBoundary>
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="devices"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.VIEW_CHROMEBOOKS}
                            fallback={<Unauthorized />}
                          >
                            <AsyncBoundary>
                              <ChromebookDevices />
                            </AsyncBoundary>
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="tickets"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.VIEW_TICKETS}
                            fallback={<Unauthorized />}
                          >
                            <AsyncBoundary>
                              <ChromebookTickets />
                            </AsyncBoundary>
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="check-in"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.MANAGE_CHROMEBOOKS}
                            fallback={<Unauthorized />}
                          >
                            <AsyncBoundary>
                              <ChromebookCheckIn />
                            </AsyncBoundary>
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="check-out"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.MANAGE_CHROMEBOOKS}
                            fallback={<Unauthorized />}
                          >
                            <AsyncBoundary>
                              <ChromebookCheckOut />
                            </AsyncBoundary>
                          </PermissionGuard>
                        }
                      />
                    </Route>

                    {/* Asset Routes */}
                    <Route
                      path="assets"
                      element={
                        <PermissionGuard
                          permission={PERMISSIONS.VIEW_ASSETS}
                          fallback={<Unauthorized />}
                        >
                          <AsyncBoundary>
                            <AssetList />
                          </AsyncBoundary>
                        </PermissionGuard>
                      }
                    />

                    {/* User Routes */}
                    <Route
                      path="users"
                      element={
                        <PermissionGuard
                          permission={PERMISSIONS.VIEW_USERS}
                          fallback={<Unauthorized />}
                        >
                          <AsyncBoundary>
                            <UserList />
                          </AsyncBoundary>
                        </PermissionGuard>
                      }
                    />

                    {/* Form Routes */}
                    <Route path="forms">
                      <Route
                        index
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.VIEW_FORMS}
                            fallback={<Unauthorized />}
                          >
                            <FormsList />
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="templates"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.MANAGE_FORM_TEMPLATES}
                            fallback={<Unauthorized />}
                          >
                            <FormTemplates />
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="submissions"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.VIEW_FORM_SUBMISSIONS}
                            fallback={<Unauthorized />}
                          >
                            <FormSubmissions />
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="builder"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.CREATE_FORMS}
                            fallback={<Unauthorized />}
                          >
                            <FormBuilder />
                          </PermissionGuard>
                        }
                      />
                      <Route
                        path="builder/:formId"
                        element={
                          <PermissionGuard
                            permission={PERMISSIONS.EDIT_FORMS}
                            fallback={<Unauthorized />}
                          >
                            <FormBuilder />
                          </PermissionGuard>
                        }
                      />
                    </Route>

                    {/* Settings Routes */}
                    <Route
                      path="settings"
                      element={
                        <PermissionGuard
                          permission={PERMISSIONS.MANAGE_SYSTEM_SETTINGS}
                          fallback={<Unauthorized />}
                        >
                          <AsyncBoundary>
                            <Settings />
                          </AsyncBoundary>
                        </PermissionGuard>
                      }
                    />

                    {/* Developer Routes */}
                    <Route
                      path="developers"
                      element={
                        <PermissionGuard
                          permission={PERMISSIONS.ACCESS_DEVELOPER_DOCS}
                          fallback={<Unauthorized />}
                        >
                          <DevelopersLayout />
                        </PermissionGuard>
                      }
                    >
                      <Route index element={<Overview />} />
                      <Route path="architecture" element={<Architecture />} />
                      <Route path="api" element={<ApiReference />} />
                      <Route path="database" element={<DatabaseSchema />} />
                      <Route path="components" element={<Components />} />
                      <Route path="dependencies" element={<Dependencies />} />
                    </Route>

                    {/* Roadmap Route */}
                    <Route
                      path="roadmap"
                      element={
                        <PermissionGuard
                          permission={PERMISSIONS.ACCESS_DEVELOPER_DOCS}
                          fallback={<Unauthorized />}
                        >
                          <Roadmap />
                        </PermissionGuard>
                      }
                    />
                  </Route>
                </Routes>
              </DialogProvider>
            </NotificationProvider>
          </SettingsProvider>
        </RoleProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}