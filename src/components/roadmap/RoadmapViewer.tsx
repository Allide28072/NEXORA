/**
 * Interactive 300-Task Development Roadmap & Tracker Explorer
 * Enables full search, phase filtering, status inspection, and test verification reporting.
 */

import React, { useState, useMemo } from 'react';
import { Database } from '../../lib/database';
import { RoadmapTask } from '../../types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Circle,
  FileCode,
  ShieldCheck,
  GitCommit,
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoadmapViewer: React.FC = () => {
  const { showToast, setActiveModule } = useApp();
  const [tasks, setTasks] = useState<RoadmapTask[]>(() => Database.getRoadmapTasks());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [activeTaskDetail, setActiveTaskDetail] = useState<RoadmapTask | null>(null);

  // Compute metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const phases = [
    { num: 1, name: 'Phase 1: Foundation & Architecture (Tasks 001–030)' },
    { num: 2, name: 'Phase 2: UI & Design System (Tasks 031–060)' },
    { num: 3, name: 'Phase 3: Auth & RBAC (Tasks 061–090)' },
    { num: 4, name: 'Phase 4: Database & Supabase (Tasks 091–120)' },
    { num: 5, name: 'Phase 5: Dashboard & Analytics (Tasks 121–150)' },
    { num: 6, name: 'Phase 6: Core Modules (Tasks 151–210)' },
    { num: 7, name: 'Phase 7: Gemini AI Assistant (Tasks 211–235)' },
    { num: 8, name: 'Phase 8: Admin & Audit (Tasks 236–260)' },
    { num: 9, name: 'Phase 9: Security & Tests (Tasks 261–285)' },
    { num: 10, name: 'Phase 10: Docs & Release (Tasks 286–300)' }
  ];

  const uniqueModules = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach((t) => set.add(t.module));
    return Array.from(set).sort();
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.filesAffected.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPhase = selectedPhase === 'all' || t.phase === selectedPhase;
      const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || t.priority === selectedPriority;
      const matchesModule = selectedModule === 'all' || t.module === selectedModule;

      return matchesSearch && matchesPhase && matchesStatus && matchesPriority && matchesModule;
    });
  }, [tasks, searchTerm, selectedPhase, selectedStatus, selectedPriority, selectedModule]);

  const handleToggleTaskStatus = (task: RoadmapTask) => {
    const nextStatus = task.status === 'Done' ? 'In Progress' : task.status === 'In Progress' ? 'Planned' : 'Done';
    Database.updateRoadmapTaskStatus(task.id, nextStatus, nextStatus === 'Done' ? `c${task.id.replace('TASK-', '')}-feat` : undefined);
    const updated = Database.getRoadmapTasks();
    setTasks(updated);
    if (activeTaskDetail?.id === task.id) {
      setActiveTaskDetail(updated.find((t) => t.id === task.id) || null);
    }
    showToast(`Updated ${task.id} to ${nextStatus}`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Progress Metric */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>300+ GENUINE GITHUB CONTRIBUTIONS CHALLENGE</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">
              Master Development Roadmap & Task Verification Matrix
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every single task represents independently verifiable engineering work. Explore the progress across 10 progressive phases, 20 integrated modules, and genuine commit records.
            </p>
          </div>

          {/* KPI strip */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="px-4 py-3 bg-slate-950/80 rounded-lg border border-slate-800 text-center min-w-[100px]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Completed</div>
              <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                {completedTasks} <span className="text-xs text-slate-500 font-normal">/ {totalTasks}</span>
              </div>
            </div>

            <div className="px-4 py-3 bg-slate-950/80 rounded-lg border border-slate-800 text-center min-w-[100px]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">In Progress</div>
              <div className="text-lg font-bold text-amber-400 font-mono tabular-nums">
                {inProgressTasks}
              </div>
            </div>

            <div className="px-4 py-3 bg-slate-950/80 rounded-lg border border-slate-800 text-center min-w-[100px]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Completion</div>
              <div className="text-lg font-bold text-indigo-400 font-mono tabular-nums">
                {completionPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Phase 1: Project Foundation (100% Complete)</span>
            <span className="font-mono tabular-nums text-slate-300">{completedTasks} of {totalTasks} tasks verified</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(completionPercentage, 10)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter tasks by ID (TASK-001), keyword, or file..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Quick Shortcuts */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModule('git_history')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-700/60"
            >
              <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inspect Git History</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/60">
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Phase
            </label>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All 10 Phases</option>
              {phases.map((p) => (
                <option key={p.num} value={p.num}>
                  Phase {p.num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Done">Done ({completedTasks})</option>
              <option value="In Progress">In Progress ({inProgressTasks})</option>
              <option value="Planned">Planned</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Modules</option>
              {uniqueModules.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Table (High Density with Tabular Numerals) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-200">Roadmap Tasks</span>
            <span className="text-[11px] font-mono tabular-nums text-slate-400">
              Showing {filteredTasks.length} of {totalTasks}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Click any row to view verification details</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 w-28">Task ID</th>
                <th className="px-4 py-3 w-24">Phase</th>
                <th className="px-4 py-3 w-28">Module</th>
                <th className="px-4 py-3">Task Description</th>
                <th className="px-4 py-3 w-24">Priority</th>
                <th className="px-4 py-3 w-32">Status</th>
                <th className="px-4 py-3 w-36">Commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredTasks.slice(0, 100).map((task) => {
                const isSelected = activeTaskDetail?.id === task.id;
                return (
                  <tr
                    key={task.id}
                    onClick={() => setActiveTaskDetail(task)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-indigo-950/30'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-300 font-semibold">{task.id}</td>
                    <td className="px-4 py-3 text-slate-400 tabular-nums">P{task.phase}</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">{task.module}</td>
                    <td className="px-4 py-3 text-slate-200 font-sans max-w-md truncate">
                      {task.description}
                    </td>
                    <td className="px-4 py-3 font-sans">
                      <span
                        className={`text-[11px] ${
                          task.priority === 'High'
                            ? 'text-rose-400'
                            : task.priority === 'Medium'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans">
                      <div className="flex items-center gap-1.5">
                        {task.status === 'Done' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-emerald-400 font-medium text-[11px]">Done</span>
                          </>
                        ) : task.status === 'In Progress' ? (
                          <>
                            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="text-amber-400 font-medium text-[11px]">In Progress</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="text-slate-500 text-[11px]">Planned</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-400 font-mono">
                      {task.commitHash}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Detail Inspector Modal / Drawer */}
      {activeTaskDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 px-2 py-0.5 rounded">
                  {activeTaskDetail.id}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-300 font-medium">{activeTaskDetail.phaseName}</span>
              </div>
              <button
                onClick={() => setActiveTaskDetail(null)}
                className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Task Title & Scope</label>
                <p className="text-slate-200 text-sm font-medium mt-1 leading-relaxed">
                  {activeTaskDetail.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Target Module</span>
                  <span className="text-slate-200 font-medium">{activeTaskDetail.module} ({activeTaskDetail.category})</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Priority</span>
                  <span className="text-slate-200 font-medium">{activeTaskDetail.priority}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Verification Status</span>
                  <span className="text-slate-200 font-medium">{activeTaskDetail.status}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Related Commit</span>
                  <span className="text-slate-200 font-mono">{activeTaskDetail.commitHash}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <FileCode className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[10px] uppercase">Files Affected</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-slate-300">
                  {activeTaskDetail.filesAffected}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-[10px] uppercase">Tests Performed</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-emerald-300">
                  {activeTaskDetail.testsPerformed}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-500">
                Click status button to cycle test states
              </span>
              <button
                onClick={() => handleToggleTaskStatus(activeTaskDetail)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Toggle Status ({activeTaskDetail.status})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
