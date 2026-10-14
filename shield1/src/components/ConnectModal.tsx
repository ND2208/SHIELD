import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, DollarSign, Clock, FileText } from 'lucide-react';
import { Creator, CreatorNiche } from '../types';

interface ConnectModalProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
  onSendSuccess?: (creatorName: string, title: string) => void;
  onSendProposal?: (data: {
    creatorId: string;
    creatorName: string;
    creatorAvatar?: string;
    title: string;
    budget: string;
    timeline: string;
    scope: string;
    niche?: CreatorNiche;
  }) => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  creator,
  isOpen,
  onClose,
  onSendSuccess,
  onSendProposal
}) => {
  const [projectTitle, setProjectTitle] = useState('Brand Video Campaign 2026');
  const [projectScope, setProjectScope] = useState('We need high-impact commercial promo videos for our upcoming product launch. Looking for editing, color grading, and motion graphics.');
  const [budget, setBudget] = useState('$2,500');
  const [timeline, setTimeline] = useState('2-3 Weeks');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !creator) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim()) return;

    setSubmitted(true);

    if (onSendProposal) {
      onSendProposal({
        creatorId: creator.id,
        creatorName: creator.name,
        creatorAvatar: creator.avatar,
        title: projectTitle.trim(),
        budget: budget.trim() || '$1,500',
        timeline: timeline.trim() || '2 Weeks',
        scope: projectScope.trim(),
        niche: creator.primaryNiche
      });
    }

    if (onSendSuccess) {
      onSendSuccess(creator.name, projectTitle);
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0b1322] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-100 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-500/50"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Send Proposal to {creator.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                  {creator.primaryNiche}
                </span>
              </div>
              <p className="text-xs text-slate-400">{creator.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Direct Connect Toolbar */}
        <div className="p-3 bg-[#070d18] rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-slate-400">Direct Contacts:</span>
            <span className="font-semibold text-white">{creator.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${creator.phone}`}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium text-[11px]"
            >
              Call
            </a>
            {creator.whatsapp && (
              <a
                href={`https://wa.me/${creator.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium text-[11px]"
              >
                WhatsApp
              </a>
            )}
            <a
              href={`mailto:${creator.email}`}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-medium text-[11px]"
            >
              Email
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-white text-base">Proposal Dispatched!</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {creator.name} will receive this proposal directly in their creator notifications & proposals queue with an option to accept or decline.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Project Title *</span>
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
                placeholder="e.g. Apex Launch Commercial & Brand Promo"
                className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Budget</span>
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="$2,500"
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Estimated Timeline</span>
                </label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="2-3 Weeks"
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Project Brief / Scope & Requirements</label>
              <textarea
                rows={3}
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                required
                placeholder="Outline pacing, tone, key message, format (16:9, 9:16) and expected deliverables..."
                className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-xs text-white focus:outline-none resize-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-blue-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span>The creator will receive an instant notification with options to accept or decline.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-xs font-semibold rounded-xl text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Proposal to Creator</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
