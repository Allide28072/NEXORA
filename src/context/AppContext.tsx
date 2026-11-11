/**
 * NEXORA Global Application Context & State Provider
 * Provides unified state for Authentication (RBAC), Active Navigation, Theme, and Notifications.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserPermission, AppNotification, SystemSettings } from '../types';
import { Database } from '../lib/database';
import { eventBus, EVENTS } from '../lib/events';
import { StorageEngine } from '../lib/storage';

interface AppContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  permissions: UserPermission;
  activeModule: string;
  setActiveModule: (module: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isAiDockOpen: boolean;
  setIsAiDockOpen: (open: boolean) => void;
  settings: SystemSettings;
  updateSettings: (updates: Partial<SystemSettings>) => void;
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  toast: { message: string; type: 'info' | 'success' | 'warning' | 'error' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function computePermissions(role: UserRole): UserPermission {
  switch (role) {
    case 'admin':
      return {
        canManageUsers: true,
        canEditSettings: true,
        canDeleteProjects: true,
        canCreateCourses: true,
        canModerateCommunity: true,
        canPublishMarketplace: true,
        canViewAuditLogs: true,
        canUseAiTools: true
      };
    case 'manager':
      return {
        canManageUsers: false,
        canEditSettings: false,
        canDeleteProjects: false,
        canCreateCourses: true,
        canModerateCommunity: true,
        canPublishMarketplace: true,
        canViewAuditLogs: false,
        canUseAiTools: true
      };
    case 'member':
      return {
        canManageUsers: false,
        canEditSettings: false,
        canDeleteProjects: false,
        canCreateCourses: false,
        canModerateCommunity: false,
        canPublishMarketplace: false,
        canViewAuditLogs: false,
        canUseAiTools: true
      };
    case 'guest':
    default:
      return {
        canManageUsers: false,
        canEditSettings: false,
        canDeleteProjects: false,
        canCreateCourses: false,
        canModerateCommunity: false,
        canPublishMarketplace: false,
        canViewAuditLogs: false,
        canUseAiTools: false
      };
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Ensure DB hydration
  Database.initialize();

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => Database.getUsers());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => allUsers[0]);
  const [activeModule, setActiveModuleState] = useState<string>(() => {
    return StorageEngine.get('active_module', 'roadmap');
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return StorageEngine.get<'dark' | 'light'>('theme', 'dark');
  });
  const [notifications, setNotifications] = useState<AppNotification[]>(() => Database.getNotifications());
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAiDockOpen, setIsAiDockOpen] = useState(false);
  const [settings, setSettings] = useState<SystemSettings>(() => Database.getSettings());
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    StorageEngine.set('theme', theme);
  }, [theme]);

  // Sync active module to storage
  const setActiveModule = (mod: string) => {
    setActiveModuleState(mod);
    StorageEngine.set('active_module', mod);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const switchUser = (userId: string) => {
    const target = allUsers.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      Database.addAuditLog('SWITCH_USER', 'Auth', `Switched active session to user ${target.fullName} (${target.role})`, 'info');
      showToast(`Switched active user to ${target.fullName}`, 'info');
    }
  };

  const switchRole = (newRole: UserRole) => {
    const updated = Database.updateUser(currentUser.id, { role: newRole });
    if (updated) {
      setCurrentUser(updated);
      setAllUsers(Database.getUsers());
      Database.addAuditLog('SWITCH_ROLE', 'Auth', `User ${updated.fullName} changed role to ${newRole}`, 'info');
      eventBus.emit(EVENTS.AUTH_ROLE_CHANGED, { userId: updated.id, role: newRole });
      showToast(`Role switched to ${newRole.toUpperCase()}`, 'success');
    }
  };

  const permissions = computePermissions(currentUser.role);

  const markNotificationRead = (id: string) => {
    Database.markNotificationRead(id);
    setNotifications(Database.getNotifications());
  };

  const markAllNotificationsRead = () => {
    Database.markAllNotificationsRead();
    setNotifications(Database.getNotifications());
    showToast('All notifications marked as read', 'info');
  };

  const updateSettings = (updates: Partial<SystemSettings>) => {
    const next = Database.updateSettings(updates);
    setSettings(next);
    showToast('Platform settings updated successfully', 'success');
  };

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Keyboard shortcut listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for storage events across tabs or internal writes
  useEffect(() => {
    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === 'notifications') {
        setNotifications(Database.getNotifications());
      }
    };
    window.addEventListener('nexora-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('nexora-storage-update', handleStorageUpdate);
  }, []);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        switchUser,
        switchRole,
        permissions,
        activeModule,
        setActiveModule,
        theme,
        toggleTheme,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isAiDockOpen,
        setIsAiDockOpen,
        settings,
        updateSettings,
        showToast,
        toast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
