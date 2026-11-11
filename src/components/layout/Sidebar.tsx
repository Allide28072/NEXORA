/**
 * NEXORA Enterprise Sidebar Navigation
 * Groups the 20 modules with single-line labels, unread counters, and quick role switching.
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
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
  ChevronRight,
  Shield,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  adminOnly?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, currentUser, switchRole, permissions } = useApp();

  const navGroups: NavGroup[] = [
    {
      group: 'Overview & Challenge',
      items: [
        { id: 'roadmap', label: '300-Task Roadmap', icon: Compass, badge: '30/300' },
        { id: 'git_history', label: 'Git Commit History', icon: GitBranch, badge: 'Active' },
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: 'Work & Workflows',
      items: [
        { id: 'projects', label: 'Projects Directory', icon: FolderGit2 },
        { id: 'kanban', label: 'Kanban Workflows', icon: Trello }
      ]
    },
    {
      group: 'Education & Community',
      items: [
        { id: 'lms', label: 'Learning Center (LMS)', icon: GraduationCap },
        { id: 'community', label: 'Community & Forums', icon: MessageSquare }
      ]
    },
    {
      group: 'Commerce & Storage',
      items: [
        { id: 'marketplace', label: 'Digital Marketplace', icon: ShoppingBag },
        { id: 'storage', label: 'Virtual File Storage', icon: HardDrive }
      ]
    },
    {
      group: 'Intelligence & Admin',
      items: [
        { id: 'ai', label: 'Gemini AI Copilot', icon: Sparkles },
        { id: 'admin', label: 'User & Access Control', icon: Users, adminOnly: true },
        { id: 'audit', label: 'Audit Logs & Activity', icon: ShieldAlert, adminOnly: true },
        { id: 'settings', label: 'Platform Settings', icon: Settings }
      ]
    }
  ];

  const roles: UserRole[] = ['admin', 'manager', 'member', 'guest'];

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
      {/* Brand & Workspace Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white tracking-wider shadow-sm">
            N
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-100 uppercase">
              NEXORA
            </h1>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight">
              Enterprise v1.0
            </p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navGroups.map((grp) => {
          const visibleItems = grp.items.filter((item) => !item.adminOnly || permissions.canViewAuditLogs || permissions.canManageUsers);
          if (visibleItems.length === 0) return null;

          return (
            <div key={grp.group} className="space-y-1">
              <div className="px-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {grp.group}
              </div>
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/25'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Profile & Role Switcher */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80 space-y-2">
        <div className="flex items-center gap-2.5 px-1 py-1">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.fullName}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full ring-1 ring-slate-700 object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-slate-200 truncate">
              {currentUser.fullName}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="capitalize">{currentUser.role}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{currentUser.department}</span>
            </div>
          </div>
        </div>

        {/* Quick RBAC Role Switcher */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="text-[10px] font-medium text-slate-400 px-1 mb-1.5 flex items-center justify-between">
            <span>Quick RBAC Tester</span>
            <Shield className="w-3 h-3 text-slate-400" />
          </div>
          <div className="grid grid-cols-4 gap-1 p-0.5 bg-slate-950 rounded-md border border-slate-800">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`py-1 text-[10px] font-medium rounded capitalize transition-colors ${
                  currentUser.role === r
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Switch active role to ${r}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
