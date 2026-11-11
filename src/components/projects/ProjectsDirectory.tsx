/**
 * NEXORA Projects Directory & Workspaces
 * Full listing with budget metrics, team assignments, progress tracking, and creation modal.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { ProjectItem, ProjectStatus, PriorityLevel } from '../../types';
import {
  FolderGit2,
  Plus,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Tag,
  X
} from 'lucide-react';

export const ProjectsDirectory: React.FC = () => {
  const { currentUser, showToast, setActiveModule } = useApp();
  const [projects, setProjects] = useState<ProjectItem[]>(() => Database.getProjects());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [budget, setBudget] = useState(25000);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    Database.createProject({
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description.trim(),
      status: 'active',
      priority,
      ownerId: currentUser.id,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
      budget,
      progress: 0,
      tags: ['Workspace'],
      teamMemberIds: [currentUser.id]
    });

    setProjects(Database.getProjects());
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    showToast('Project created successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Directory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Enterprise Projects & Workspaces
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track multi-team initiatives, milestones, allocated budgets, and delivery timelines.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase">
                    {proj.slug}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span
                    className={`text-[10px] font-semibold uppercase ${
                      proj.priority === 'critical'
                        ? 'text-rose-400'
                        : proj.priority === 'high'
                        ? 'text-amber-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {proj.priority} Priority
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 leading-snug">
                  {proj.title}
                </h3>
              </div>

              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                  proj.status === 'active'
                    ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
                    : proj.status === 'planning'
                    ? 'text-sky-400 bg-sky-950/40 border-sky-800/60'
                    : 'text-slate-400 bg-slate-950 border-slate-800'
                }`}
              >
                {proj.status}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {proj.description}
            </p>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Completion</span>
                <span className="font-mono text-slate-200 tabular-nums">{proj.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${proj.progress}%` }}
                />
              </div>
            </div>

            {/* Card Metadata Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 font-mono text-[11px] tabular-nums">
                  <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                  <span>${proj.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{proj.dueDate}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModule('kanban')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Open Tasks →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Initiate New Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Real-Time Telemetry Microservice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Project scope and high-level milestones..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Allocated Budget ($)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
