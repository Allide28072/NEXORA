/**
 * NEXORA Immutable Audit Log & Activity Stream Viewer
 * Append-only compliance log with severity filtering, IP tracing, and CSV export.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { AuditLogItem, AuditSeverity } from '../../types';
import {
  ShieldAlert,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  User,
  Terminal
} from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const { showToast } = useApp();
  const [logs] = useState<AuditLogItem[]>(() => Database.getAuditLogs());
  const [selectedSeverity, setSelectedSeverity] = useState<AuditSeverity | 'all'>('all');

  const filteredLogs = selectedSeverity === 'all'
    ? logs
    : logs.filter((l) => l.severity === selectedSeverity);

  const handleExportCsv = () => {
    const headers = 'ID,Timestamp,Actor,Email,Action,Module,Severity,Details,IP\n';
    const rows = filteredLogs.map((l) =>
      `"${l.id}","${l.timestamp}","${l.actorName}","${l.actorEmail}","${l.action}","${l.module}","${l.severity}","${l.details.replace(/"/g, '""')}","${l.ipAddress}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexora_audit_logs_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Audit logs exported to CSV', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Immutable Audit Trail & Activity Logs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise compliance record tracking authentication events, administrative actions, and data mutations.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60 whitespace-nowrap cursor-pointer"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      {/* Severity Filter Strip */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
        {(['all', 'info', 'warning', 'critical'] as const).map((sev) => (
          <button
            key={sev}
            onClick={() => setSelectedSeverity(sev)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              selectedSeverity === sev
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {sev} {sev !== 'all' && `(${logs.filter((l) => l.severity === sev).length})`}
          </button>
        ))}
      </div>

      {/* Log Entries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200">Audit Events</span>
          <span className="text-[11px] font-mono text-slate-400 tabular-nums">
            {filteredLogs.length} verified events
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 w-40">Timestamp</th>
                <th className="px-4 py-3 w-28">Severity</th>
                <th className="px-4 py-3 w-48">Action</th>
                <th className="px-4 py-3 w-36">Module</th>
                <th className="px-4 py-3 w-44">Actor</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`uppercase text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        log.severity === 'critical'
                          ? 'text-rose-400 bg-rose-950/40 border-rose-800/60'
                          : log.severity === 'warning'
                          ? 'text-amber-400 bg-amber-950/40 border-amber-800/60'
                          : 'text-sky-400 bg-sky-950/40 border-sky-800/60'
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-200 font-bold">{log.action}</td>
                  <td className="px-4 py-3 text-indigo-400 font-sans">{log.module}</td>
                  <td className="px-4 py-3 text-slate-300 font-sans">{log.actorName}</td>
                  <td className="px-4 py-3 text-slate-400 font-sans max-w-md truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
