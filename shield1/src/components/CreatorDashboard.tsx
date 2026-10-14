import React, { useState } from 'react';
import { 
  DollarSign, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  Upload, 
  ArrowRight, 
  Phone, 
  Mail, 
  X, 
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  Check,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { UserProfile, Creator, CreatorPortfolioItem, CreatorNiche, ProposalItem } from '../types';
import { allCreatorNiches } from '../data/mockData';
import { ProposalDetailsModal } from './ProposalDetailsModal';

interface CreatorDashboardProps {
  user: UserProfile;
  creatorData: Creator;
  proposals: ProposalItem[];
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string, reason?: string) => void;
  onViewClientFeed: () => void;
  onOpenProfile: () => void;
  onAddPortfolioItem?: (creatorId: string, item: CreatorPortfolioItem) => void;
  onNavigateToProjects?: () => void;
}

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  user,
  creatorData,
  proposals,
  onAcceptProposal,
  onDeclineProposal,
  onViewClientFeed,
  onOpenProfile,
  onAddPortfolioItem,
  onNavigateToProjects
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio'>('overview');
  const [selectedPortfolioNiche] = useState<string>('All');
  const [selectedProposalForModal, setSelectedProposalForModal] = useState<ProposalItem | null>(null);

  // Work upload state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CreatorNiche>(user.primaryNiche || 'Brand Promotion');
  const [duration, setDuration] = useState('1:30');
  const [year, setYear] = useState('2026');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80');

  // Filter proposals relevant to this creator
  const creatorProposals = proposals.filter(p => 
    p.creatorId === creatorData.id || 
    p.creatorName.toLowerCase() === creatorData.name.toLowerCase() ||
    p.creatorId === 'cr_arjun'
  );

  const pendingCount = creatorProposals.filter(p => p.status === 'pending').length;

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: CreatorPortfolioItem = {
      id: `dash_port_${Date.now()}`,
      title,
      category,
      duration: duration || '2:00',
      year: year || '2026',
      thumbnail,
      description: description || 'High-craft production featuring specialized editing and audio mastering.',
      clientName: clientName || 'Client Commission'
    };

    if (onAddPortfolioItem) {
      onAddPortfolioItem(creatorData.id, newItem);
    } else {
      creatorData.portfolio.unshift(newItem);
    }

    setIsUploadOpen(false);
    setTitle('');
    setDescription('');
    setClientName('');
    setActiveTab('portfolio');
  };

  const filteredPortfolio = selectedPortfolioNiche === 'All'
    ? creatorData.portfolio
    : creatorData.portfolio.filter(p => p.category.toLowerCase() === selectedPortfolioNiche.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 via-[#0b1322] to-sky-950/30 border border-slate-800 p-6 sm:p-8 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Creator Studio Hub
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                Business Account
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                Niche: {user.primaryNiche || creatorData.primaryNiche}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user.name} 🎬
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Clients are searching for <strong className="text-blue-400">{user.primaryNiche || creatorData.primaryNiche}</strong>. Review and respond to your incoming client proposals below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onNavigateToProjects && (
              <button
                onClick={onNavigateToProjects}
                className="py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Track Active Collaborations</span>
              </button>
            )}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Work</span>
            </button>
            <button
              onClick={onViewClientFeed}
              className="py-2.5 px-4 bg-[#070d18] hover:bg-[#0c1626] border border-slate-700 rounded-xl text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Client Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Creator Direct Contact Info Bar */}
      <div className="p-4 rounded-2xl bg-[#09111e] border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Phone className="w-4 h-4 text-blue-400" />
          <span>Active Client Phone: <strong className="text-white">{user.phone}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Mail className="w-4 h-4 text-sky-400" />
          <span>Client Inquiries Email: <strong className="text-white">{user.email}</strong></span>
        </div>
        <button
          onClick={onOpenProfile}
          className="text-blue-400 hover:text-blue-300 font-semibold underline text-xs cursor-pointer"
        >
          Update Contact Info
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#09111e] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Monthly Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">$6,850</p>
          <span className="text-[11px] text-emerald-400 font-medium">+18% from last month</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#09111e] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Received Proposals</span>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{creatorProposals.length}</p>
          <span className="text-[11px] text-amber-400 font-medium">
            {pendingCount} pending decision
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#09111e] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Profile Views</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-white">1,420</p>
          <span className="text-[11px] text-slate-400 font-medium">Past 30 days</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#09111e] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Average Rating</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white">4.8 / 5.0</p>
          <span className="text-[11px] text-slate-400 font-medium">Based on 24 client reviews</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors relative cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Incoming Client Proposals ({creatorProposals.length})</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
              {pendingCount} new
            </span>
          )}
          {activeTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 transition-colors relative cursor-pointer ${
            activeTab === 'portfolio' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          My Portfolio Works ({creatorData.portfolio.length})
          {activeTab === 'portfolio' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Click any proposal to inspect full scope and specifications, or use the quick Accept / Reject buttons.
            </span>
            <span className="text-[11px] font-mono text-blue-400">
              Auto-notifies client upon decision
            </span>
          </div>

          {creatorProposals.length === 0 ? (
            <div className="p-12 text-center bg-[#09111e] rounded-2xl border border-slate-800 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">No incoming proposals at this moment</p>
              <p className="text-xs text-slate-400">
                When clients send you project proposals via your profile, they will appear here with instant notifications.
              </p>
            </div>
          ) : (
            creatorProposals.map((prop) => {
              const isPending = prop.status === 'pending';
              const isAccepted = prop.status === 'accepted';
              const isDeclined = prop.status === 'declined';

              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProposalForModal(prop)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer space-y-3.5 ${
                    isPending
                      ? 'bg-[#09111e] hover:bg-[#0c1626] border-slate-800 hover:border-blue-500/50 shadow-lg'
                      : isAccepted
                      ? 'bg-emerald-950/10 border-emerald-500/30'
                      : 'bg-slate-900/40 border-slate-800/60 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-white text-base hover:text-blue-400 transition-colors">
                          {prop.title}
                        </h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          isAccepted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isDeclined
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                        }`}>
                          {isAccepted ? 'Accepted ✓' : isDeclined ? 'Declined ✕' : 'Pending Decision'}
                        </span>
                        {prop.niche && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                            {prop.niche}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400">
                        Client: <strong className="text-slate-200">{prop.clientName}</strong> • Phone: {prop.clientPhone} • {prop.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                      <span className="text-emerald-400 font-bold text-sm">{prop.budget}</span>
                      <span className="text-slate-400">| Timeline: {prop.timeline}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {prop.scope}
                  </p>

                  {/* Bottom Action Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                    <span className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-medium">
                      <span>Click to view full project scope & details</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {isPending ? (
                        <>
                          <button 
                            onClick={() => onDeclineProposal(prop.id)}
                            className="px-3.5 py-1.5 rounded-lg border border-rose-500/40 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => onAcceptProposal(prop.id)}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md shadow-emerald-600/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept Proposal</span>
                          </button>
                        </>
                      ) : isAccepted ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accepted</span>
                          </span>
                          {onNavigateToProjects && (
                            <button
                              onClick={onNavigateToProjects}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium cursor-pointer"
                            >
                              Go to Project Workspace
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>Declined ({prop.rejectionReason || 'Unavailable'})</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white">Active Showcase Works & Edits</h3>
              <p className="text-xs text-slate-400">Clients see these videos when reviewing your profile</p>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="py-2 px-3.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload New Work</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPortfolio.map((item) => (
              <div key={item.id} className="rounded-2xl bg-[#09111e] border border-slate-800 overflow-hidden group">
                <div className="h-40 relative bg-slate-900">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600 text-[10px] text-white font-bold">
                    {item.category}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono">
                    {item.duration || 'Video'}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <p className="font-bold text-xs text-white">{item.title}</p>
                  {item.clientName && (
                    <p className="text-[11px] text-blue-400 font-medium">Client: {item.clientName}</p>
                  )}
                  <p className="text-[11px] text-slate-400 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Proposal Details with Accept & Reject Actions */}
      <ProposalDetailsModal
        proposal={selectedProposalForModal}
        isOpen={Boolean(selectedProposalForModal)}
        onClose={() => setSelectedProposalForModal(null)}
        onAccept={(id) => {
          onAcceptProposal(id);
          // Update selected proposal status locally for modal view
          if (selectedProposalForModal) {
            setSelectedProposalForModal({ ...selectedProposalForModal, status: 'accepted' });
          }
        }}
        onDecline={(id, reason) => {
          onDeclineProposal(id, reason);
          if (selectedProposalForModal) {
            setSelectedProposalForModal({ ...selectedProposalForModal, status: 'declined', rejectionReason: reason });
          }
        }}
      />

      {/* Upload New Work Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-lg w-full bg-[#0b1322] border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-white text-base">Upload Work & Edits</h3>
              </div>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Work Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Esports Frag Movie / Luxury Wedding Cinematic"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category / Niche</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CreatorNiche)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    {allCreatorNiches.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Video Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 1:45"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Client / Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Innovations"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Year</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Description & Edits Breakdown</label>
                <textarea
                  rows={2}
                  placeholder="Outline pacing, VFX, transitions, sound design..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl p-2.5 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Select Showcase Frame</label>
                <select
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80">Commercial Studio Frame (4K Film)</option>
                  <option value="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80">Gaming RGB Arena Showcase</option>
                  <option value="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80">Royal Destination Wedding Frame</option>
                  <option value="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80">High CTR 3D Thumbnail</option>
                  <option value="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80">Product Showcase Studio</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3.5 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  Save to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
