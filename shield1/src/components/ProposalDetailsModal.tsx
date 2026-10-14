import React, { useState } from 'react';
import { 
  X, 
  Check, 
  DollarSign, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { ProposalItem } from '../types';

interface ProposalDetailsModalProps {
  proposal: ProposalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (proposalId: string) => void;
  onDecline: (proposalId: string, reason?: string) => void;
}

export const ProposalDetailsModal: React.FC<ProposalDetailsModalProps> = ({
  proposal,
  isOpen,
  onClose,
  onAccept,
  onDecline
}) => {
  const [showDeclineReason, setShowDeclineReason] = useState(false);
  const [declineReason, setDeclineReason] = useState('Schedule currently booked to capacity');

  if (!isOpen || !proposal) return null;

  const handleConfirmAccept = () => {
    onAccept(proposal.id);
    onClose();
  };

  const handleConfirmDecline = () => {
    onDecline(proposal.id, declineReason);
    setShowDeclineReason(false);
    onClose();
  };

  const isPending = proposal.status === 'pending';
  const isAccepted = proposal.status === 'accepted';
  const isDeclined = proposal.status === 'declined';

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-[#0b1322] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-100 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                isAccepted 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : isDeclined
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
              }`}>
                {isAccepted ? '✓ Proposal Accepted' : isDeclined ? '✕ Proposal Declined' : '● Action Required (Pending)'}
              </span>
              {proposal.niche && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {proposal.niche}
                </span>
              )}
              <span className="text-xs text-slate-500 font-mono">
                Received: {proposal.date}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white pt-1">
              {proposal.title}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Profile Card */}
        <div className="p-4 rounded-2xl bg-[#070d18] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={proposal.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={proposal.clientName}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">{proposal.clientName}</h4>
                <span className="text-[10px] px-2 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{proposal.clientEmail}</p>
              <p className="text-[11px] text-slate-500 font-mono">{proposal.clientPhone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {proposal.clientPhone && (
              <a
                href={`tel:${proposal.clientPhone}`}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>
            )}
            <a
              href={`mailto:${proposal.clientEmail}`}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-medium flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Proposal Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[#09111e] border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offered Budget</span>
            </div>
            <p className="text-xl font-bold font-mono text-emerald-400">
              {proposal.budget}
            </p>
            <span className="text-[10px] text-slate-500">Escrow backed</span>
          </div>

          <div className="p-4 rounded-xl bg-[#09111e] border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Target Timeline</span>
            </div>
            <p className="text-xl font-bold font-mono text-white">
              {proposal.timeline}
            </p>
            <span className="text-[10px] text-slate-500">Client requested delivery</span>
          </div>

          <div className="p-4 rounded-xl bg-[#09111e] border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Milestones</span>
            </div>
            <p className="text-xl font-bold font-mono text-purple-400">
              5 Phases
            </p>
            <span className="text-[10px] text-slate-500">From Brief to 4K Master</span>
          </div>
        </div>

        {/* Full Scope & Brief */}
        <div className="p-5 rounded-2xl bg-[#070d18] border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Project Scope & Requirements</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line pt-1">
            {proposal.scope}
          </p>
        </div>

        {/* Optional Decline Reason Prompt */}
        {showDeclineReason && isPending && (
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Select reason for declining this proposal (Client will be notified):</span>
            </div>
            <select
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full bg-[#0c1626] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="Schedule currently booked to capacity">Schedule currently booked to capacity</option>
              <option value="Budget does not match required scope and revisions">Budget does not match required scope and revisions</option>
              <option value="Timeline is too tight for television-grade production">Timeline is too tight for television-grade production</option>
              <option value="Outside my creative niche and technical direction">Outside my creative niche and technical direction</option>
            </select>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowDeclineReason(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDecline}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Confirm Decline & Notify Client
              </button>
            </div>
          </div>
        )}

        {/* Status Banners */}
        {isAccepted && (
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              This proposal has been accepted! The active collaboration project workspace is available in your <strong>Project Management</strong> tab.
            </span>
          </div>
        )}

        {isDeclined && (
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>
              This proposal was declined ({proposal.rejectionReason || 'Unavailable'}). The client was notified in their notifications.
            </span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <span className="text-[11px] text-slate-500 font-mono">
            Shield Verified Proposal Engine • Escrow Protected
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>

            {isPending && !showDeclineReason && (
              <>
                <button
                  type="button"
                  onClick={() => setShowDeclineReason(true)}
                  className="px-4 py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reject Proposal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAccept}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Accept Proposal</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
