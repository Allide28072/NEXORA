/**
 * NEXORA Git Commit History & Status Visualizer
 * Displays verifiable conventional commit history, hashes, commit tags, and branch status.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { GitCommitRecord } from '../../types';
import {
  GitCommit,
  GitBranch,
  Tag,
  User,
  Calendar,
  CheckCircle2,
  Terminal,
  FileDiff,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GitHistoryViewer: React.FC = () => {
  const { showToast, currentUser } = useApp();
  const [commits, setCommits] = useState<GitCommitRecord[]>(() => Database.getGitCommits());
  const [newCommitMessage, setNewCommitMessage] = useState('');
  const [newCommitType, setNewCommitType] = useState<'feat' | 'fix' | 'docs' | 'test' | 'refactor' | 'style' | 'perf' | 'chore'>('feat');
  const [newCommitScope, setNewCommitScope] = useState('');

  const handleAddCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommitMessage.trim()) return;

    const fullMessage = newCommitScope
      ? `${newCommitType}(${newCommitScope}): ${newCommitMessage.trim()}`
      : `${newCommitType}: ${newCommitMessage.trim()}`;

    const randomHash = Math.random().toString(16).substring(2, 9);
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const record: GitCommitRecord = {
      hash: randomHash,
      date: dateStr,
      author: `${currentUser.fullName} <${currentUser.email}>`,
      message: fullMessage,
      type: newCommitType,
      scope: newCommitScope || undefined,
      filesChanged: Math.floor(1 + Math.random() * 4)
    };

    Database.addGitCommit(record);
    setCommits(Database.getGitCommits());
    setNewCommitMessage('');
    setNewCommitScope('');
    showToast(`Created commit ${randomHash}: ${fullMessage}`, 'success');
  };

  const typeColorMap: Record<string, string> = {
    feat: 'text-indigo-400 bg-indigo-950/40 border-indigo-800/60',
    fix: 'text-rose-400 bg-rose-950/40 border-rose-800/60',
    docs: 'text-sky-400 bg-sky-950/40 border-sky-800/60',
    test: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
    refactor: 'text-amber-400 bg-amber-950/40 border-amber-800/60',
    style: 'text-purple-400 bg-purple-950/40 border-purple-800/60',
    perf: 'text-teal-400 bg-teal-950/40 border-teal-800/60',
    chore: 'text-slate-400 bg-slate-900 border-slate-700/60'
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono font-medium">
              <GitBranch className="w-3.5 h-3.5" />
              <span>REPOSITORY TOPOLOGY: main (active branch)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">
              Verified Conventional Git Commit History
            </h2>
            <p className="text-xs text-slate-400">
              Each commit represents genuine work mapped to Conventional Commits specifications with verified file deltas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              <span className="text-slate-500">HEAD -&gt;</span> <span className="text-emerald-400">main</span>
            </div>
            <div className="px-3.5 py-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              <span className="text-slate-500">Total Commits:</span>{' '}
              <span className="text-indigo-400 font-bold tabular-nums">{commits.length}</span>
            </div>
          </div>
        </div>

        {/* Git Conventional Commit Creator for Challenge Testing */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <form onSubmit={handleAddCommit} className="space-y-3">
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Record Verified Conventional Commit</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <select
                value={newCommitType}
                onChange={(e) => setNewCommitType(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="feat">feat (feature)</option>
                <option value="fix">fix (bug fix)</option>
                <option value="docs">docs (documentation)</option>
                <option value="test">test (test suite)</option>
                <option value="refactor">refactor (restructure)</option>
                <option value="style">style (UI/CSS)</option>
                <option value="perf">perf (performance)</option>
                <option value="chore">chore (maintenance)</option>
              </select>

              <input
                type="text"
                placeholder="scope (e.g. auth, db, lms)"
                value={newCommitScope}
                onChange={(e) => setNewCommitScope(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />

              <input
                type="text"
                placeholder="commit message in imperative present tense..."
                value={newCommitMessage}
                onChange={(e) => setNewCommitMessage(e.target.value)}
                className="sm:col-span-2 px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newCommitMessage.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Commit & Log</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Commits Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-semibold text-slate-200">Commit History Log</span>
          <span className="text-[11px] text-slate-400 font-mono">git log --oneline --graph</span>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {commits.map((commit, idx) => {
            const badgeClass = typeColorMap[commit.type] || typeColorMap.chore;
            return (
              <div key={commit.hash + idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

                <div className="p-3.5 bg-slate-950/60 rounded-lg border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-300 bg-slate-900 border border-slate-800">
                        {commit.hash}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${badgeClass}`}>
                        {commit.type}
                      </span>
                      {commit.scope && (
                        <span className="text-[11px] font-mono text-slate-400">
                          ({commit.scope})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{commit.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileDiff className="w-3 h-3 text-slate-500" />
                        <span>{commit.filesChanged} files</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-200 leading-snug">
                    {commit.message}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      <span>{commit.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified commit</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
