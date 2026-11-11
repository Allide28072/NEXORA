/**
 * Floating Gemini AI Copilot Assistant Dock
 * Provides contextual AI assistance, prompt shortcuts, task generation, and code explanation.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Wand2,
  Code,
  FileCheck,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { AiChatMessage } from '../../types';

export const AiAssistantDock: React.FC = () => {
  const { isAiDockOpen, setIsAiDockOpen, currentUser, activeModule, showToast } = useApp();
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      content: `Hello ${currentUser.fullName}! I'm your NEXORA AI Copilot powered by Google Gemini. How can I assist you across the 20 digital ecosystem modules today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isAiDockOpen) return null;

  const quickPrompts = [
    { label: 'Deconstruct Project into Tasks', prompt: `Analyze the active project in ${activeModule} and propose 4 breakdown tasks with acceptance criteria.` },
    { label: 'Audit Security & RLS Policy', prompt: 'Review our PostgreSQL Row Level Security (RLS) tenant isolation policies and suggest hardening steps.' },
    { label: 'Generate Quiz Questions', prompt: 'Create 3 knowledge check questions for our distributed systems architecture course.' }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt) return;

    const userMsg: AiChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    // AI Generation simulation responding contextually
    setTimeout(() => {
      let responseContent = '';
      if (prompt.toLowerCase().includes('project') || prompt.toLowerCase().includes('task')) {
        responseContent = `### Proposed Task Breakdown for Operational Workflow\n\n1. **TASK-A**: Configure connection pooling using PgBouncer for high concurrency.\n2. **TASK-B**: Add composite index on \`(tenant_id, created_at)\` for fast chronological paging.\n3. **TASK-C**: Implement automated heartbeat ping in \`src/lib/database.ts\`.\n4. **TASK-D**: Add e2e simulation in \`TESTING.md\`.\n\n*These tasks have been verified against the 300-Task Development Roadmap standards.*`;
      } else if (prompt.toLowerCase().includes('security') || prompt.toLowerCase().includes('rls')) {
        responseContent = `### Security Hardening Recommendation\n\n- **Policy Target**: \`public.projects\`\n- **Principle**: Enforce \`auth.uid() = owner_id OR auth.uid() IN (SELECT user_id FROM project_members)\`.\n- **Zero-Bypass Guarantee**: All service roles must authenticate through authenticated RPC endpoints rather than direct tables.`;
      } else if (prompt.toLowerCase().includes('quiz')) {
        responseContent = `### Course Knowledge Check: Distributed Systems\n\n1. **Q**: What ensures idempotency in event bus consumers?\n   - **Answer**: Unique event identifiers stored in an idempotency cache with TTL.\n2. **Q**: Why are tabular numerals required on metric cards?\n   - **Answer**: They guarantee uniform character width, preventing layout shifts during value updates.`;
      } else {
        responseContent = `I've analyzed your request in the context of the **${activeModule.toUpperCase()}** module. The NEXORA architecture provides dedicated services for this in \`src/services/\` with reactive local persistence and Supabase schema compatibility.`;
      }

      const aiMsg: AiChatMessage = {
        id: `msg_a_${Date.now()}`,
        sender: 'assistant',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokensUsed: Math.floor(60 + Math.random() * 120)
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg_welcome_${Date.now()}`,
        sender: 'assistant',
        content: `Chat session reset. Active workspace: ${activeModule}. How can I help you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast('AI conversation reset', 'info');
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] h-[580px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      {/* Copilot Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>Gemini Copilot</span>
              <span className="text-[10px] font-mono font-normal text-indigo-400 bg-indigo-950 px-1 rounded border border-indigo-800/60">
                2.5 Flash
              </span>
            </div>
            <div className="text-[10px] text-slate-400">Context: {activeModule}</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsAiDockOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Close Copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${
              m.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.sender === 'assistant' && (
              <div className="w-6 h-6 rounded-md bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 border border-slate-800/80 text-slate-200'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed text-[11px]">
                {m.content}
              </div>
              <div
                className={`mt-1.5 text-[9px] font-mono flex items-center justify-between ${
                  m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                <span>{m.timestamp}</span>
                {m.tokensUsed && <span>{m.tokensUsed} tokens</span>}
              </div>
            </div>
            {m.sender === 'user' && (
              <div className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Bot className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="font-mono text-[10px]">Copilot is synthesizing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick contextual prompt pills */}
      <div className="p-2 border-t border-slate-800/60 bg-slate-950/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.prompt)}
            className="text-[10px] text-slate-300 bg-slate-800/70 hover:bg-slate-800 hover:text-white px-2.5 py-1 rounded-md border border-slate-700/60 whitespace-nowrap shrink-0 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask Gemini anything..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || isTyping}
          className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
