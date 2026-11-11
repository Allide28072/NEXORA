/**
 * Clean Typographic Breadcrumb Engine
 * Implements unboxed hierarchical navigation trails complying with the zero-pill design constitution.
 */

import React from 'react';
import { useApp } from '../../context/AppContext';

export const Breadcrumbs: React.FC = () => {
  const { activeModule } = useApp();

  const moduleNames: Record<string, { category: string; title: string }> = {
    roadmap: { category: 'Overview', title: '300-Task Development Roadmap' },
    git_history: { category: 'Overview', title: 'Git Commit History' },
    dashboard: { category: 'Overview', title: 'Executive Dashboard & Analytics' },
    projects: { category: 'Workflows', title: 'Projects Directory' },
    kanban: { category: 'Workflows', title: 'Interactive Kanban Boards' },
    lms: { category: 'Education', title: 'Learning Management System & Certificates' },
    community: { category: 'Community', title: 'Discussion Forums & Threads' },
    marketplace: { category: 'Commerce', title: 'Digital Marketplace & Assets' },
    storage: { category: 'Storage', title: 'Virtual File Storage & Quotas' },
    ai: { category: 'Intelligence', title: 'Gemini AI Assistant Copilot' },
    admin: { category: 'Administration', title: 'User Management & Permissions' },
    audit: { category: 'Administration', title: 'Audit Trail & Activity Stream' },
    settings: { category: 'Settings', title: 'Platform Settings & Feature Flags' }
  };

  const current = moduleNames[activeModule] || { category: 'Platform', title: activeModule };

  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span className="hover:text-slate-200 transition-colors cursor-pointer">
        NEXORA
      </span>
      <span aria-hidden="true" className="text-slate-600">/</span>
      <span className="text-slate-400">
        {current.category}
      </span>
      <span aria-hidden="true" className="text-slate-600">/</span>
      <span className="font-medium text-slate-200">
        {current.title}
      </span>
    </div>
  );
};
