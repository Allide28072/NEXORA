/**
 * NEXORA Master Application Shell
 * Orchestrates Sidebar, Navbar, Dynamic Viewports, Command Palette, and Gemini Copilot.
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { CommandPalette } from '../search/CommandPalette';
import { AiAssistantDock } from '../ai/AiAssistantDock';
import { RoadmapViewer } from '../roadmap/RoadmapViewer';
import { GitHistoryViewer } from '../roadmap/GitHistoryViewer';
import { DashboardOverview } from '../dashboard/DashboardOverview';
import { ProjectsDirectory } from '../projects/ProjectsDirectory';
import { KanbanBoard } from '../projects/KanbanBoard';
import { LmsViewer } from '../lms/LmsViewer';
import { CommunityViewer } from '../community/CommunityViewer';
import { MarketplaceViewer } from '../marketplace/MarketplaceViewer';
import { StorageViewer } from '../storage/StorageViewer';
import { AdminConsole } from '../admin/AdminConsole';
import { AuditLogViewer } from '../admin/AuditLogViewer';
import { SettingsViewer } from '../settings/SettingsViewer';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { activeModule, toast } = useApp();

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'roadmap':
        return <RoadmapViewer />;
      case 'git_history':
        return <GitHistoryViewer />;
      case 'dashboard':
        return <DashboardOverview />;
      case 'projects':
        return <ProjectsDirectory />;
      case 'kanban':
        return <KanbanBoard />;
      case 'lms':
        return <LmsViewer />;
      case 'community':
        return <CommunityViewer />;
      case 'marketplace':
        return <MarketplaceViewer />;
      case 'storage':
        return <StorageViewer />;
      case 'ai':
        return <RoadmapViewer />; // AI dock handles floating copilot, shows roadmap as background
      case 'admin':
        return <AdminConsole />;
      case 'audit':
        return <AuditLogViewer />;
      case 'settings':
        return <SettingsViewer />;
      default:
        return <RoadmapViewer />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Bar Contract Header */}
        <Navbar />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950/60">
          <div className="max-w-7xl mx-auto">
            {renderActiveModule()}
          </div>
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Floating Gemini AI Assistant Dock */}
      <AiAssistantDock />

      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-slate-100 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};
