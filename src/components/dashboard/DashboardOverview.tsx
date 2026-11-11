/**
 * NEXORA Executive Dashboard & Analytics
 * Conforms strictly to SaaS design guidelines with tabular numerals, velocity chart, and KPI grids.
 */

import React from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import {
  FolderGit2,
  CheckCircle2,
  Users,
  HardDrive,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { setActiveModule, currentUser } = useApp();
  const projects = Database.getProjects();
  const tasks = Database.getTasks();
  const users = Database.getUsers();
  const files = Database.getFiles();
  const activity = Database.getActivity();

  const activeProjectsCount = projects.filter((p) => p.status === 'active').length;
  const completedTasksCount = tasks.filter((t) => t.columnId === 'done').length;
  const totalStorageMb = Math.round(
    files.reduce((acc, f) => acc + f.fileSizeBytes, 0) / (1024 * 1024)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Welcome back, {currentUser.fullName}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            NEXORA Digital Ecosystem operational status: All systems nominal across 20 modules.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveModule('kanban')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Open Kanban</span>
          </button>
          <button
            onClick={() => setActiveModule('roadmap')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700/60 whitespace-nowrap"
          >
            <span>Roadmap Progress</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (Tabular Numerals strictly enforced) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Projects</span>
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono tabular-nums">
            {activeProjectsCount}{' '}
            <span className="text-xs text-slate-500 font-normal">/ {projects.length} total</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+12.5% this month</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono tabular-nums">
            {completedTasksCount}{' '}
            <span className="text-xs text-slate-500 font-normal">/ {tasks.length} tasks</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+84% velocity rate</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Users</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono tabular-nums">
            {users.length}{' '}
            <span className="text-xs text-slate-500 font-normal">active seats</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            <span>RBAC Enforced</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Storage Consumed</span>
            <HardDrive className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono tabular-nums">
            {totalStorageMb} <span className="text-xs text-slate-500 font-normal">MB of 50 GB</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Quota healthy (&lt;1%)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Velocity Chart Simulation & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Velocity Chart / Project Progress (2 columns) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Sprint Velocity & Active Projects
              </h3>
              <p className="text-[11px] text-slate-400">
                Weekly task completion rates across operational projects
              </p>
            </div>
            <button
              onClick={() => setActiveModule('projects')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View all projects</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Projects Bar Progress List */}
          <div className="space-y-4 pt-2">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">{proj.title}</span>
                  <span className="font-mono text-slate-400 tabular-nums">{proj.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Priority: {proj.priority}</span>
                  <span className="font-mono tabular-nums">Due {proj.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Stream (1 column) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Real-Time Activity</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Live</span>
          </div>

          <div className="space-y-3">
            {activity.map((act) => (
              <div key={act.id} className="flex gap-2.5 text-xs">
                <img
                  src={act.userAvatar}
                  alt={act.userName}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-slate-200 text-[11px] leading-snug">
                    <span className="font-medium text-slate-100">{act.userName}</span>{' '}
                    <span className="text-slate-400">{act.action}</span>{' '}
                    <span className="text-indigo-400 font-medium">{act.target}</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
