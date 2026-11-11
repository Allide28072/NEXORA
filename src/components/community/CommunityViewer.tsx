/**
 * NEXORA Community Discussions & Forums
 * Channels, threaded discussions, comments, and live emoji reactions.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { ForumTopic, ForumChannel } from '../../types';
import {
  MessageSquare,
  ThumbsUp,
  Sparkles,
  Lightbulb,
  Pin,
  Send,
  Plus,
  Hash,
  X
} from 'lucide-react';

export const CommunityViewer: React.FC = () => {
  const { currentUser, showToast } = useApp();
  const [topics, setTopics] = useState<ForumTopic[]>(() => Database.getTopics());
  const [selectedChannel, setSelectedChannel] = useState<ForumChannel | 'all'>('all');
  const [activeTopic, setActiveTopic] = useState<ForumTopic | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newChannel, setNewChannel] = useState<ForumChannel>('general');

  const channels: { id: ForumChannel | 'all'; label: string }[] = [
    { id: 'all', label: 'All Channels' },
    { id: 'announcements', label: '# announcements' },
    { id: 'engineering', label: '# engineering' },
    { id: 'design', label: '# design' },
    { id: 'general', label: '# general' },
    { id: 'support', label: '# support' }
  ];

  const filteredTopics = selectedChannel === 'all'
    ? topics
    : topics.filter((t) => t.channel === selectedChannel);

  const handleToggleReaction = (topicId: string, reaction: 'likes' | 'celebrate' | 'insightful') => {
    Database.toggleReaction(topicId, reaction);
    const updated = Database.getTopics();
    setTopics(updated);
    if (activeTopic?.id === topicId) {
      setActiveTopic(updated.find((t) => t.id === topicId) || null);
    }
    showToast(`Reaction recorded!`, 'info');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTopic || !commentText.trim()) return;

    Database.addComment(activeTopic.id, {
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      authorAvatar: currentUser.avatarUrl,
      content: commentText.trim()
    });

    const updated = Database.getTopics();
    setTopics(updated);
    setActiveTopic(updated.find((t) => t.id === activeTopic.id) || null);
    setCommentText('');
    showToast('Comment published', 'success');
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    Database.addTopic({
      title: newTitle.trim(),
      content: newContent.trim(),
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      authorAvatar: currentUser.avatarUrl,
      authorRole: currentUser.role,
      channel: newChannel,
      isPinned: false,
      isLocked: false,
      reactions: { likes: 0, celebrate: 0, insightful: 0 },
      tags: ['Discussion']
    });

    setTopics(Database.getTopics());
    setIsNewTopicModalOpen(false);
    setNewTitle('');
    setNewContent('');
    showToast('Topic published to community', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Community & Discussion Forums
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Exchange engineering insights, discuss architectural decisions, and participate in channel topics.
          </p>
        </div>

        <button
          onClick={() => setIsNewTopicModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Channel Filters (Segmented tabs) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setSelectedChannel(ch.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedChannel === ch.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {ch.label}
          </button>
        ))}
      </div>

      {/* Topics Feed */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3.5 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={topic.authorAvatar}
                  alt={topic.authorName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200">{topic.authorName}</span>
                    <span className="text-[10px] uppercase font-mono text-slate-400">({topic.authorRole})</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-[11px] font-mono text-indigo-400">#{topic.channel}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {topic.isPinned && (
                <div className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded">
                  <Pin className="w-3 h-3" />
                  <span>PINNED</span>
                </div>
              )}
            </div>

            <h3
              onClick={() => setActiveTopic(topic)}
              className="text-sm font-bold text-slate-100 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {topic.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {topic.content}
            </p>

            {/* Reactions & Comments Count Bar */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleReaction(topic.id, 'likes')}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-indigo-400 font-mono text-[11px] tabular-nums transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{topic.reactions.likes}</span>
                </button>

                <button
                  onClick={() => handleToggleReaction(topic.id, 'celebrate')}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-amber-400 font-mono text-[11px] tabular-nums transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{topic.reactions.celebrate}</span>
                </button>

                <button
                  onClick={() => handleToggleReaction(topic.id, 'insightful')}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-emerald-400 font-mono text-[11px] tabular-nums transition-colors"
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>{topic.reactions.insightful}</span>
                </button>
              </div>

              <button
                onClick={() => setActiveTopic(topic)}
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{topic.repliesCount} comments</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discussion Thread Modal */}
      {activeTopic && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full h-[650px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase">
                  #{activeTopic.channel}
                </span>
                <h3 className="text-sm font-bold text-slate-100 max-w-xl truncate">
                  {activeTopic.title}
                </h3>
              </div>
              <button onClick={() => setActiveTopic(null)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src={activeTopic.authorAvatar}
                    alt={activeTopic.authorName}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-200">{activeTopic.authorName}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeTopic.content}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Thread Responses ({activeTopic.comments.length})
                </div>

                {activeTopic.comments.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No responses yet. Be the first to reply!
                  </div>
                ) : (
                  activeTopic.comments.map((c) => (
                    <div key={c.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={c.authorAvatar}
                            alt={c.authorName}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-xs font-medium text-slate-200">{c.authorName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="p-3.5 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a response..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Topic Modal */}
      {isNewTopicModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Create Discussion Topic</h3>
              <button onClick={() => setIsNewTopicModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Topic Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed caching strategies with Redis & PostgreSQL"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Channel
                </label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="general"># general</option>
                  <option value="engineering"># engineering</option>
                  <option value="design"># design</option>
                  <option value="announcements"># announcements</option>
                  <option value="support"># support</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Post Content
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details, trade-offs, or questions for discussion..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewTopicModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                >
                  Publish Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
