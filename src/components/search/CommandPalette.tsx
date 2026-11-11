/**
 * Global Command Palette (Cmd+K / Ctrl+K)
 * Omni-search across all 20 modules, 300 roadmap tasks, projects, courses, and documentation.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Database } from '../../lib/database';
import {
  Search,
  Compass,
  GitBranch,
  LayoutDashboard,
  FolderGit2,
  Trello,
  GraduationCap,
  MessageSquare,
  ShoppingBag,
  HardDrive,
  Sparkles,
  Users,
  ShieldAlert,
  Settings,
  ArrowRight,
  X
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, setActiveModule } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickNavItems = [
    { id: 'roadmap', label: '300-Task Development Roadmap', category: 'Roadmap & Challenge', icon: Compass },
    { id: 'git_history', label: 'Git Commit History & Verifications', category: 'Roadmap & Challenge', icon: GitBranch },
    { id: 'dashboard', label: 'Executive Analytics Dashboard', category: 'Workflows', icon: LayoutDashboard },
    { id: 'projects', label: 'Project Directory & Budgets', category: 'Workflows', icon: FolderGit2 },
    { id: 'kanban', label: 'Interactive Kanban Boards', category: 'Workflows', icon: Trello },
    { id: 'lms', label: 'Learning Management System (LMS)', category: 'Education', icon: GraduationCap },
    { id: 'community', label: 'Community Discussion Forums', category: 'Community', icon: MessageSquare },
    { id: 'marketplace', label: 'Digital Marketplace & Assets', category: 'Commerce', icon: ShoppingBag },
    { id: 'storage', label: 'Virtual File Storage Manager', category: 'Storage', icon: HardDrive },
    { id: 'ai', label: 'Gemini AI Assistant Copilot', category: 'Intelligence', icon: Sparkles },
    { id: 'admin', label: 'User Management & Permissions', category: 'Administration', icon: Users },
    { id: 'audit', label: 'Audit Trail & Activity Stream', category: 'Administration', icon: ShieldAlert },
    { id: 'settings', label: 'Platform Settings & Feature Flags', category: 'Settings', icon: Settings }
  ];

  // Search tasks
  const tasks = Database.getRoadmapTasks();
  const matchingTasks = query.trim()
    ? tasks.filter(
        (t) =>
          t.id.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.module.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const filteredNav = query.trim()
    ? quickNavItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : quickNavItems;

  const handleSelectModule = (id: string) => {
    setActiveModule(id);
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, module name, or task ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="text-slate-500 hover:text-slate-300 p-1 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Nav Modules */}
          <div>
            <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-400">
              Module Navigation
            </div>
            <div className="space-y-1 mt-1">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectModule(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors cursor-pointer text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matching Tasks */}
          {matchingTasks.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-400">
                Matching Roadmap Tasks
              </div>
              <div className="space-y-1 mt-1">
                {matchingTasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectModule('roadmap')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/60">
                        {t.id}
                      </span>
                      <span className="truncate">{t.description}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                      P{t.phase}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigation: Up/Down</span>
          <span>Select: Enter</span>
          <span>Close: Esc</span>
        </div>
      </div>
    </div>
  );
};
