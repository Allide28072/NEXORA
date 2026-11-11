/**
 * NEXORA Administration & Access Control Console
 * Manage users, configure RBAC role matrices, inspect session health, and audit capability gates.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { UserProfile, UserRole } from '../../types';
import {
  Users,
  Shield,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  RefreshCw,
  Lock
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const { allUsers, currentUser, switchUser, switchRole, showToast } = useApp();
  const [users, setUsers] = useState<UserProfile[]>(() => Database.getUsers());

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    Database.updateUser(userId, { role: newRole });
    const updated = Database.getUsers();
    setUsers(updated);
    if (currentUser.id === userId) {
      switchRole(newRole);
    }
    showToast(`Role updated for user`, 'success');
  };

  const systemProbes = [
    { service: 'PostgreSQL Relational DB (Supabase)', status: 'Nominal', latency: '4ms', health: 'Healthy' },
    { service: 'Client Reactive Storage Engine', status: 'Active', latency: '0.1ms', health: 'Healthy' },
    { service: 'Google Gemini AI 2.5 Flash API', status: 'Connected', latency: '180ms', health: 'Healthy' },
    { service: 'Pub/Sub Inter-Module Event Bus', status: 'Listening (12 events)', latency: '0.2ms', health: 'Healthy' },
    { service: 'Row Level Security Tenant Isolation', status: 'Enforced', latency: '0.4ms', health: 'Healthy' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Administration & Access Control
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Supervise user identities, manage Role-Based Access Control (RBAC), and review infrastructure health probes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500">Security Gate:</span>{' '}
            <span className="text-indigo-400 font-bold uppercase">{currentUser.role}</span>
          </div>
        </div>
      </div>

      {/* System Health Probes */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Infrastructure Health Probes</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>All systems nominal</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {systemProbes.map((probe, idx) => (
            <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1">
              <div className="text-xs font-medium text-slate-200 truncate">{probe.service}</div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="text-emerald-400">{probe.status}</span>
                <span className="tabular-nums">{probe.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200">Registered Users & Assigned Roles</span>
          <span className="text-[11px] font-mono text-slate-400 tabular-nums">{users.length} accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Quick Role Modify</th>
                <th className="px-4 py-3 w-32">Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {users.map((u) => {
                const isCurrent = currentUser.id === u.id;
                return (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 text-slate-200 font-sans flex items-center gap-2.5">
                      <img
                        src={u.avatarUrl}
                        alt={u.fullName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <div className="font-medium text-slate-100 flex items-center gap-1.5">
                          <span>{u.fullName}</span>
                          {isCurrent && (
                            <span className="text-[10px] text-indigo-400 font-mono">(You)</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                          u.role === 'admin'
                            ? 'text-indigo-400 bg-indigo-950/40 border-indigo-800/60'
                            : u.role === 'manager'
                            ? 'text-sky-400 bg-sky-950/40 border-sky-800/60'
                            : u.role === 'member'
                            ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
                            : 'text-slate-400 bg-slate-950 border-slate-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-300 font-sans text-[11px]">
                      {u.department}
                    </td>

                    <td className="px-4 py-3 font-sans">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                        className="px-2 py-1 bg-slate-950 border border-slate-800 text-[11px] text-slate-200 rounded focus:outline-none focus:border-indigo-500 capitalize"
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="member">Member</option>
                        <option value="guest">Guest</option>
                      </select>
                    </td>

                    <td className="px-4 py-3 font-sans">
                      {!isCurrent ? (
                        <button
                          onClick={() => switchUser(u.id)}
                          className="px-2.5 py-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 rounded transition-colors"
                        >
                          Switch User
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-mono">Active</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
