/**
 * NEXORA Platform Settings & Feature Flags
 * System configurations, feature toggles, security thresholds, and database backup controls.
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageEngine } from '../../lib/storage';
import { Database } from '../../lib/database';
import {
  Settings,
  Flag,
  Save,
  Download,
  Upload,
  RotateCcw,
  Shield,
  Bell,
  Cpu
} from 'lucide-react';

export const SettingsViewer: React.FC = () => {
  const { settings, updateSettings, showToast } = useApp();
  const [formSettings, setFormSettings] = useState(settings);

  const handleToggleFeature = (key: keyof typeof settings.featureFlags) => {
    const updated = {
      ...formSettings,
      featureFlags: {
        ...formSettings.featureFlags,
        [key]: !formSettings.featureFlags[key]
      }
    };
    setFormSettings(updated);
    updateSettings(updated);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    showToast('Platform settings saved successfully', 'success');
  };

  const handleExportBackup = () => {
    const jsonStr = StorageEngine.exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexora_snapshot_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database snapshot exported', 'success');
  };

  const handleResetDatabase = () => {
    if (confirm('Are you sure you want to re-seed NEXORA to initial factory state?')) {
      StorageEngine.clearAll();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Platform Settings & Feature Flags
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure global ecosystem parameters, toggle experimental features, and manage database snapshots.
          </p>
        </div>

        <button
          onClick={handleExportBackup}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60 whitespace-nowrap cursor-pointer"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Export Database JSON</span>
        </button>
      </div>

      {/* Feature Flags Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Flag className="w-3.5 h-3.5 text-indigo-400" />
            <span>Active Feature Flags</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Real-Time Reactive</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-slate-200">Beta Gantt Timeline View</div>
              <div className="text-[11px] text-slate-400">Enable interactive milestone charting in project view</div>
            </div>
            <button
              onClick={() => handleToggleFeature('betaGanttTimeline')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                formSettings.featureFlags.betaGanttTimeline ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  formSettings.featureFlags.betaGanttTimeline ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-slate-200">Gemini AI Copilot Integration</div>
              <div className="text-[11px] text-slate-400">Provide automated prompt assistant docking</div>
            </div>
            <button
              onClick={() => handleToggleFeature('voiceDictationAi')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                formSettings.featureFlags.voiceDictationAi ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  formSettings.featureFlags.voiceDictationAi ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-slate-200">Strict Multi-Factor Auth (MFA)</div>
              <div className="text-[11px] text-slate-400">Require secondary TOTP challenge on login</div>
            </div>
            <button
              onClick={() => handleToggleFeature('strictMfaRequired')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                formSettings.featureFlags.strictMfaRequired ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  formSettings.featureFlags.strictMfaRequired ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-slate-200">Real-Time Event WebSocket</div>
              <div className="text-[11px] text-slate-400">Broadcast notifications across distributed sessions</div>
            </div>
            <button
              onClick={() => handleToggleFeature('realtimeWebsocket')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                formSettings.featureFlags.realtimeWebsocket ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  formSettings.featureFlags.realtimeWebsocket ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* General Settings Form */}
      <form onSubmit={handleSaveGeneral} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span>General Platform Parameters</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Ecosystem Platform Name
            </label>
            <input
              type="text"
              value={formSettings.appName}
              onChange={(e) => setFormSettings({ ...formSettings, appName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Support Email Endpoint
            </label>
            <input
              type="email"
              value={formSettings.supportEmail}
              onChange={(e) => setFormSettings({ ...formSettings, supportEmail: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Max Upload Size (MB)
            </label>
            <input
              type="number"
              value={formSettings.maxFileUploadMb}
              onChange={(e) => setFormSettings({ ...formSettings, maxFileUploadMb: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Session Inactivity Timeout (Minutes)
            </label>
            <input
              type="number"
              value={formSettings.sessionTimeoutMinutes}
              onChange={(e) => setFormSettings({ ...formSettings, sessionTimeoutMinutes: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-slate-900 border border-rose-900/40 rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
          Danger Zone & Disaster Recovery
        </h3>
        <p className="text-xs text-slate-400">
          Re-initialize all database tables to initial seed records.
        </p>
        <button
          onClick={handleResetDatabase}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/80 text-rose-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Seed State</span>
        </button>
      </div>
    </div>
  );
};
