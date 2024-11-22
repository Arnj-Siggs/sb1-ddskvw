import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Chromebook } from '../../types/chromebooks';
import { updateChromebook, reportDamage, assignChromebook } from '../../lib/api/chromebooks';
import { usePermissions } from '../../hooks/usePermissions';
import { Battery, WifiOff, AlertTriangle, Wrench, User, Calendar, Hammer } from 'lucide-react';
import { AssetStatus } from '../../types/assets';

const damageReportSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  severity: z.enum(['MINOR', 'MODERATE', 'SEVERE']),
  cost: z.string().optional(),
});

type DamageReportFormData = z.infer<typeof damageReportSchema>;

interface ChromebookDetailsProps {
  chromebook: Chromebook;
}

export function ChromebookDetails({ chromebook }: ChromebookDetailsProps) {
  const queryClient = useQueryClient();
  const { can } = usePermissions();
  const [showDamageForm, setShowDamageForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DamageReportFormData>({
    resolver: zodResolver(damageReportSchema),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Chromebook>) => updateChromebook(chromebook.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chromebooks'] });
    },
  });

  const damageReportMutation = useMutation({
    mutationFn: (data: DamageReportFormData) => reportDamage(chromebook.id, {
      ...data,
      cost: data.cost ? parseFloat(data.cost) : undefined,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chromebooks'] });
      setShowDamageForm(false);
      reset();
    },
  });

  const assignMutation = useMutation({
    mutationFn: (studentId: string) => assignChromebook(chromebook.id, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chromebooks'] });
      setShowAssignForm(false);
    },
  });

  const needsAttention = 
    (chromebook.batteryHealth && chromebook.batteryHealth < 70) ||
    (chromebook.lastSync && new Date(chromebook.lastSync).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000) ||
    chromebook.damageReports.some(report => report.status === 'PENDING');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{chromebook.model}</h3>
            <p className="mt-1 text-sm text-gray-500">Serial: {chromebook.serialNumber}</p>
          </div>
          
          {can.manageChromebooks() && (
            <select
              value={chromebook.status}
              onChange={(e) => updateMutation.mutate({ status: e.target.value as AssetStatus })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              {Object.values(AssetStatus).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          )}
        </div>

        {needsAttention && (
          <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-3 rounded-md">
            <AlertTriangle className="h-5 w-5" />
            <span>This device needs attention</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-gray-500">Purchased:</span>
              <span className="ml-1 font-medium">
                {format(new Date(chromebook.purchaseDate), 'PP')}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-gray-500">Warranty Until:</span>
              <span className="ml-1 font-medium">
                {format(new Date(chromebook.warrantyEnd), 'PP')}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {chromebook.batteryHealth && (
              <div className="flex items-center text-sm">
                <Battery className={`h-4 w-4 mr-2 ${
                  chromebook.batteryHealth < 70 ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <span className="text-gray-500">Battery Health:</span>
                <span className="ml-1 font-medium">{chromebook.batteryHealth}%</span>
              </div>
            )}
            {chromebook.lastSync && (
              <div className="flex items-center text-sm">
                <WifiOff className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-500">Last Sync:</span>
                <span className="ml-1 font-medium">
                  {format(new Date(chromebook.lastSync), 'PPp')}
                </span>
              </div>
            )}
          </div>
        </div>

        {chromebook.assignedTo && (
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Assigned to {chromebook.assignedTo.name}
                </p>
                {chromebook.assignedTo.grade && (
                  <p className="text-sm text-gray-500">
                    Grade {chromebook.assignedTo.grade}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {can.manageChromebooks() && (
          <div className="flex space-x-2">
            <button
              onClick={() => setShowDamageForm(!showDamageForm)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Wrench className="h-4 w-4 mr-2" />
              Report Damage
            </button>
            <button
              onClick={() => setShowAssignForm(!showAssignForm)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <User className="h-4 w-4 mr-2" />
              {chromebook.assignedTo ? 'Reassign' : 'Assign'}
            </button>
          </div>
        )}

        {showDamageForm && (
          <form onSubmit={handleSubmit((data) => damageReportMutation.mutate(data))} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Severity
              </label>
              <select
                {...register('severity')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="MINOR">Minor</option>
                <option value="MODERATE">Moderate</option>
                <option value="SEVERE">Severe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Repair Cost (optional)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('cost')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowDamageForm(false)}
                className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}

        {chromebook.damageReports.length > 0 && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Damage Reports</h4>
            <div className="space-y-4">
              {chromebook.damageReports.map((report) => (
                <div key={report.id} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Hammer className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {report.severity} Damage
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(report.reportedAt), 'PPP')}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      report.status === 'REPAIRING' ? 'bg-blue-100 text-blue-800' :
                      report.status === 'REPAIRED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{report.description}</p>
                  {report.cost && (
                    <p className="mt-1 text-sm text-gray-500">
                      Cost: ${report.cost.toFixed(2)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}