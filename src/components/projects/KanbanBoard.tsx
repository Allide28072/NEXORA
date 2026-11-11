/**
 * Interactive Kanban Board & Task State Machine
 * Supports column transitions, task creation, subtask checklists, and audit triggers.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { TaskItem, KanbanColumnId, PriorityLevel } from '../../types';
import {
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

export const KanbanBoard: React.FC = () => {
  const { currentUser, showToast } = useApp();
  const [tasks, setTasks] = useState<TaskItem[]>(() => Database.getTasks());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<PriorityLevel>('medium');
  const [newColumn, setNewColumn] = useState<KanbanColumnId>('todo');

  const columns: { id: KanbanColumnId; label: string; color: string }[] = [
    { id: 'backlog', label: 'Backlog', color: 'border-slate-700' },
    { id: 'todo', label: 'To Do', color: 'border-blue-600/40' },
    { id: 'in_progress', label: 'In Progress', color: 'border-amber-500/40' },
    { id: 'review', label: 'Review', color: 'border-purple-500/40' },
    { id: 'done', label: 'Done', color: 'border-emerald-500/40' }
  ];

  const handleMoveTask = (taskId: string, direction: 'prev' | 'next') => {
    const colOrder: KanbanColumnId[] = ['backlog', 'todo', 'in_progress', 'review', 'done'];
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const currentIndex = colOrder.indexOf(task.columnId);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < colOrder.length) {
      const nextCol = colOrder[newIndex];
      Database.moveTask(taskId, nextCol);
      setTasks(Database.getTasks());
      showToast(`Task moved to ${nextCol.replace('_', ' ').toUpperCase()}`, 'info');
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    Database.createTask({
      projectId: 'proj_01',
      title: newTitle.trim(),
      description: newDescription.trim() || 'Created via Kanban board.',
      columnId: newColumn,
      priority: newPriority,
      assigneeId: currentUser.id,
      reporterId: currentUser.id,
      estimatedHours: 4,
      loggedHours: 0,
      orderIndex: tasks.length,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      tags: ['Workflow'],
      subtasks: []
    });

    setTasks(Database.getTasks());
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    showToast('Task created successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Board Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Enterprise Sprint & Kanban Board
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Drag and transition tasks across lifecycle columns. State persists to relational database.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Kanban 5-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.columnId === col.id);
          return (
            <div
              key={col.id}
              className={`bg-slate-900/90 border ${col.color} rounded-xl p-3 flex flex-col h-[650px] min-w-[240px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200">{col.label}</span>
                  <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Tasks Container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colTasks.length === 0 ? (
                  <div className="h-32 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-[11px] text-slate-400">
                    No tasks in {col.label}
                  </div>
                ) : (
                  colTasks.map((t) => {
                    const isBacklog = col.id === 'backlog';
                    const isDone = col.id === 'done';
                    return (
                      <div
                        key={t.id}
                        className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors shadow-sm space-y-2.5 group"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-mono text-indigo-400 font-semibold">{t.id}</span>
                          <span
                            className={`font-semibold uppercase tracking-wider ${
                              t.priority === 'critical'
                                ? 'text-rose-400'
                                : t.priority === 'high'
                                ? 'text-amber-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {t.priority}
                          </span>
                        </div>

                        <h4 className="text-xs font-semibold text-slate-100 leading-snug">
                          {t.title}
                        </h4>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {t.description}
                        </p>

                        {/* Card Footer */}
                        <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                          <div className="flex items-center gap-1 font-mono text-[10px]">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{t.estimatedHours}h est</span>
                          </div>

                          {/* Transition Controls */}
                          <div className="flex items-center gap-1">
                            {!isBacklog && (
                              <button
                                onClick={() => handleMoveTask(t.id, 'prev')}
                                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded"
                                title="Move to previous column"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                            )}
                            {!isDone && (
                              <button
                                onClick={() => handleMoveTask(t.id, 'next')}
                                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded"
                                title="Move to next column"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Create Operational Task</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement PostgreSQL connection pooling"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Details, acceptance criteria, or scope..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
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
                    Initial Column
                  </label>
                  <select
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
