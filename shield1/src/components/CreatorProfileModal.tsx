import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  Star, 
  MapPin, 
  Bookmark, 
  CheckCircle2, 
  Play, 
  Clock, 
  Send, 
  Phone, 
  Mail, 
  Plus, 
  Upload, 
  Video, 
  FolderGit2,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Creator, CreatorPortfolioItem, CreatorNiche, UserProfile, ProjectCollaboration } from '../types';
import { allCreatorNiches } from '../data/mockData';

interface CreatorProfileModalProps {
  creator: Creator | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleBookmark: (creatorId: string) => void;
  onConnect: (creator: Creator) => void;
  currentUser?: UserProfile | null;
  projects?: ProjectCollaboration[];
  onNavigateToProjects?: (projectId?: string) => void;
  onAddPortfolioItem?: (creatorId: string, item: CreatorPortfolioItem) => void;
}

export const CreatorProfileModal: React.FC<CreatorProfileModalProps> = ({
  creator,
  onClose,
  isSaved,
  onToggleBookmark,
  onConnect,
  currentUser,
  projects = [],
  onNavigateToProjects,
  onAddPortfolioItem
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'projects' | 'reviews'>('overview');
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<CreatorPortfolioItem | null>(null);

  // Upload work state (only allowed for creator account viewing own profile)
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CreatorNiche>('Brand Promotion');
  const [newDuration, setNewDuration] = useState('1:30');
  const [newYear, setNewYear] = useState('2026');
  const [newClient, setNewClient] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newThumbnail, setNewThumbnail] = useState('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80');
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  if (!creator) return null;

  // Determine if viewing user is a Client account
  const isClient = currentUser ? currentUser.role === 'client' : true;
  // Upload work is only permissible if user is a creator AND is this creator
  const canUploadWork = !isClient && currentUser?.role === 'creator' && currentUser?.id === creator.id;

  // Existing project collaborations between this user and creator
  const directProjects = projects.filter(p => 
    p.creatorId === creator.id || 
    p.creatorName.toLowerCase() === creator.name.toLowerCase()
  );

  // Extract unique portfolio categories
  const portfolioCategories = ['All', ...Array.from(new Set(creator.portfolio.map(p => p.category)))];
  const filteredPortfolio = selectedPortfolioCategory === 'All'
    ? creator.portfolio
    : creator.portfolio.filter(p => p.category.toLowerCase() === selectedPortfolioCategory.toLowerCase());

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedContact(label);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const handleUploadWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !canUploadWork) return;

    const newItem: CreatorPortfolioItem = {
      id: `port_custom_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      duration: newDuration || '2:00',
      year: newYear || '2026',
      thumbnail: newThumbnail,
      description: newDescription || 'Showcase piece highlighting editing, color grading, and creative storytelling.',
      clientName: newClient || 'Client Project'
    };

    if (onAddPortfolioItem) {
      onAddPortfolioItem(creator.id, newItem);
    } else {
      creator.portfolio.unshift(newItem);
    }

    setIsUploadOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewClient('');
    setActiveTab('portfolio');
  };

  const handleOpenProjectWorkspace = (projId: string) => {
    onClose();
    if (onNavigateToProjects) {
      onNavigateToProjects(projId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#080e1a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-slate-100 flex flex-col max-h-[92vh]">
        {/* Cover Photo Header */}
        <div className="relative h-44 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80"
            alt="Scenic creator cover"
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080e1a] via-[#080e1a]/40 to-black/40" />

          {/* Navigation Bar inside cover */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 hover:bg-black/75 backdrop-blur-md text-xs font-medium text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to creators</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/50 hover:bg-black/75 backdrop-blur-md text-white transition-colors cursor-pointer"
              aria-label="Close profile"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Creator Info Section */}
        <div className="px-6 sm:px-8 -mt-16 sm:-mt-20 relative z-20 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#080e1a] shadow-xl"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{creator.name}</h2>
                  {creator.verified && (
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {creator.primaryNiche}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">{creator.role}</p>

                {/* Rating & Location metadata */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-slate-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{creator.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({creator.reviewsCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{creator.followers} followers</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{creator.location}</span>
                  </div>
                  {creator.available && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Available for work
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Connect, Bookmark, and Role-specific options */}
            <div className="flex items-center gap-2 mb-2 shrink-0">
              <button
                onClick={() => onConnect(creator)}
                className="py-2.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Connect</span>
              </button>

              <button
                onClick={() => onToggleBookmark(creator.id)}
                className={`p-2.5 rounded-xl border border-slate-800 transition-colors cursor-pointer ${
                  isSaved ? 'bg-blue-600/20 text-blue-400 border-blue-500/40' : 'bg-[#0c1626] text-slate-400 hover:text-white'
                }`}
                aria-label="Save creator"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-400' : ''}`} />
              </button>

              {/* USER REQUIREMENT: In client account, REMOVE upload work option!
                  Instead, let client view existing project history */}
              {isClient ? (
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`py-2.5 px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-blue-600/25 border-blue-400 text-blue-300'
                      : 'border-slate-700/80 bg-[#0c1626] text-slate-300 hover:text-white hover:border-blue-500/50'
                  }`}
                  title="View your existing project history with this creator"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Project History</span>
                  {directProjects.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                  )}
                </button>
              ) : canUploadWork ? (
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="py-2.5 px-3.5 rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Upload work to your creator portfolio"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Upload Work</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-800 text-xs sm:text-sm font-medium overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors relative whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Contacts
              {activeTab === 'overview' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`pb-3 transition-colors relative whitespace-nowrap cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Previous Works & Edits ({creator.portfolio.length})
              {activeTab === 'portfolio' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>

            {/* USER REQUIREMENT: Dedicated Existing Project History Tab */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-3 transition-colors relative whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'projects'
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Project History</span>
              {directProjects.length > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300">
                  {directProjects.length}
                </span>
              ) : (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-800 text-slate-400">
                  {creator.projectsCount} Total
                </span>
              )}
              {activeTab === 'projects' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors relative whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Reviews ({creator.reviewsCount})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:px-8 sm:py-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: OVERVIEW & CONTACT DETAILS */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">About Me</h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {creator.about}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">
                    Specialized Skills & Niches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm">
                      {creator.primaryNiche} Specialist
                    </span>
                    {creator.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0c1626] border border-slate-800 text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Creator Contact Details */}
                <div className="p-5 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>Direct Creator Contact Details</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Connect directly with {creator.name} via phone, WhatsApp, or email for custom requests.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Mobile Number */}
                    <div className="p-3 rounded-xl bg-[#070d18] border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase font-mono">Mobile Number</span>
                        <p className="text-xs font-semibold text-white">{creator.phone}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${creator.phone}`}
                          className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                          title="Call creator"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleCopy(creator.phone, 'phone')}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] rounded text-slate-300 cursor-pointer"
                        >
                          {copiedContact === 'phone' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="p-3 rounded-xl bg-[#070d18] border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5 min-w-0 pr-2">
                        <span className="text-[10px] text-slate-500 uppercase font-mono">Email Address</span>
                        <p className="text-xs font-semibold text-white truncate">{creator.email}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`mailto:${creator.email}`}
                          className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                          title="Email creator"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleCopy(creator.email, 'email')}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] rounded text-slate-300 cursor-pointer"
                        >
                          {copiedContact === 'email' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {creator.whatsapp && (
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-300">
                      <span className="text-emerald-400 font-medium">WhatsApp Available</span>
                      <a
                        href={`https://wa.me/${creator.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 text-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Card */}
              <div className="lg:col-span-5 bg-[#0c1626] border border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Creator Metrics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Primary Specialization</span>
                    <span className="font-bold text-blue-400">{creator.primaryNiche}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Followers</span>
                    <span className="font-bold text-white">{creator.followers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Projects Completed</span>
                    <span className="font-bold text-white">{creator.projectsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Rating</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {creator.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Response Time</span>
                    <span className="font-bold text-emerald-400">{creator.responseTime || '< 1 hour'}</span>
                  </div>
                  {creator.hourlyRate && (
                    <div className="flex items-center justify-between text-sm py-1.5">
                      <span className="text-slate-400">Starting Rate</span>
                      <span className="font-bold text-emerald-400">{creator.hourlyRate}</span>
                    </div>
                  )}
                </div>

                {/* Quick Project History Button in Stats card */}
                <button
                  onClick={() => setActiveTab('projects')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>View Existing Project History</span>
                </button>

                <button
                  onClick={() => onConnect(creator)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Project Proposal</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO & PREVIOUS WORKS (READ-ONLY FOR CLIENTS) */}
          {activeTab === 'portfolio' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Previous Works & Edits</h3>
                    {isClient && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        Client View Only
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Browse verified client videos and edits organized by niche. Click to play in high-definition.
                  </p>
                </div>

                {/* Upload work is HIDDEN for Client accounts as requested */}
                {canUploadWork ? (
                  <button
                    onClick={() => setIsUploadOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30 shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Previous Work</span>
                  </button>
                ) : (
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-[#0c1626] px-3 py-1.5 rounded-xl border border-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Shield Verified Showcase</span>
                  </div>
                )}
              </div>

              {/* Category Filter for Portfolio */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {portfolioCategories.map(cat => {
                  const isActive = selectedPortfolioCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedPortfolioCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-[#0c1626] text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Works Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPlayingVideo(item)}
                    className="group bg-[#0c1626] border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all shadow-md"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </div>
                      
                      {/* Category Badge & Duration */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-blue-600/90 text-[10px] font-semibold text-white backdrop-blur-sm">
                        {item.category}
                      </div>
                      {item.duration && (
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-white">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-slate-500 font-mono text-[11px]">{item.year}</span>
                      </div>
                      {item.clientName && (
                        <p className="text-[11px] text-blue-400 font-medium">
                          Client: {item.clientName}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPortfolio.length === 0 && (
                <div className="p-12 text-center bg-[#0c1626] rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-xs text-slate-400">No works uploaded under category "{selectedPortfolioCategory}".</p>
                  <button
                    onClick={() => setSelectedPortfolioCategory('All')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg cursor-pointer"
                  >
                    View All Works
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EXISTING PROJECT HISTORY & COLLABORATIONS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-blue-400" />
                    <h3 className="text-base font-bold text-white">Existing Project History</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      Collaborations
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    View complete collaboration timeline, milestones, deliverable drafts, and progress status with {creator.name}.
                  </p>
                </div>

                <button
                  onClick={() => onConnect(creator)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-md shadow-blue-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Commission New Project</span>
                </button>
              </div>

              {/* Direct collaborations with this client */}
              {directProjects.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-slate-300">
                      Your Active & Past Collaborations ({directProjects.length})
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Direct Contract Records</span>
                    </span>
                  </div>

                  {directProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-2xl bg-[#0c1626] border border-slate-800 hover:border-blue-500/40 transition-colors space-y-4"
                    >
                      {/* Project Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                              {proj.niche}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              proj.status === 'completed' 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : proj.status === 'in_review'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-sky-500/20 text-sky-400'
                            }`}>
                              {proj.status === 'completed' ? 'Completed' : proj.status === 'in_review' ? 'Needs Review' : 'In Progress'}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              Started {proj.startDate}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {proj.description}
                          </p>
                        </div>

                        <div className="text-left sm:text-right shrink-0 space-y-1">
                          <p className="text-xs font-mono font-bold text-emerald-400">
                            Budget: {proj.budget}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Deadline: <strong className="text-slate-200">{proj.deadline}</strong>
                          </p>
                          <button
                            onClick={() => handleOpenProjectWorkspace(proj.id)}
                            className="mt-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Open Project Workspace</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Project Progress:</span>
                          <span className="font-mono font-bold text-white">{proj.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400"
                            style={{ width: `${proj.progressPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestone Summary badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                        {proj.milestones.map((ms, i) => (
                          <div
                            key={ms.id}
                            className={`p-2 rounded-xl border text-[10px] space-y-0.5 ${
                              ms.status === 'completed'
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                                : ms.status === 'in_progress'
                                ? 'bg-blue-950/30 border-blue-500/50 text-blue-300'
                                : 'bg-slate-900/50 border-slate-800 text-slate-500'
                            }`}
                          >
                            <p className="font-semibold truncate">Step {i + 1}: {ms.title}</p>
                            <span className="opacity-75 capitalize">
                              {ms.status === 'completed' ? '✓ Completed' : ms.status === 'in_progress' ? 'Active' : 'Pending'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Deliverables summary */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-400 border-t border-slate-800/60">
                        <div className="flex items-center gap-3">
                          <span>
                            Files: <strong className="text-white">{proj.deliverables.length} deliverables</strong>
                          </span>
                          <span>•</span>
                          <span>
                            Approved: <strong className="text-emerald-400">{proj.deliverables.filter(d => d.status === 'approved').length}</strong>
                          </span>
                        </div>
                        <span className="text-[11px] text-blue-400">
                          {proj.activityLog[0]?.comment ? `Latest: "${proj.activityLog[0].comment.slice(0, 50)}..."` : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* No direct projects yet with this specific creator */
                <div className="p-8 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">No Direct Projects With You Yet</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      You haven't initiated a collaboration with {creator.name} yet. However, {creator.name} has completed <strong>{creator.projectsCount} verified projects</strong> across {creator.primaryNiche} on the platform.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => onConnect(creator)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/30 cursor-pointer"
                    >
                      Connect & Launch Project
                    </button>
                  </div>
                </div>
              )}

              {/* Creator's Verified Track Record & Past Completed Deliverables */}
              <div className="p-5 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Creator's Verified Delivery Track Record</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#070d18] border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono">Total Projects</span>
                    <p className="text-base font-bold text-white mt-0.5">{creator.projectsCount}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070d18] border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono">Completed Campaigns</span>
                    <p className="text-base font-bold text-emerald-400 mt-0.5">{creator.completedCampaignsCount || 38}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070d18] border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono">Satisfaction Score</span>
                    <p className="text-base font-bold text-blue-400 mt-0.5">{creator.recommendationScore}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070d18] border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono">Response Rate</span>
                    <p className="text-base font-bold text-white mt-0.5">{creator.responseTime || '< 1 hour'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Client Reviews</h3>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{creator.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="space-y-3">
                {creator.reviews.length > 0 ? (
                  creator.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-[#0c1626] border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.clientAvatar}
                            alt={rev.clientName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-white">{rev.clientName}</p>
                            <p className="text-[11px] text-slate-500">{rev.projectTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(rev.rating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-500">{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-10">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500 bg-[#0c1626] rounded-xl border border-slate-800">
                    No public reviews available yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* UPLOAD WORK MODAL (ONLY ACCESSIBLE BY CREATOR ON OWN ACCOUNT) */}
      {canUploadWork && isUploadOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-lg w-full bg-[#0b1322] border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-white text-base">Upload Work to Portfolio</h3>
              </div>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadWork} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cyberpunk Gaming Montage / Luxury Wedding Film"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Work Category / Niche</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CreatorNiche)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    {allCreatorNiches.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 1:45"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Client / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Innovations / Aura"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Year</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Brief Description & Edits Breakdown</label>
                <textarea
                  rows={2}
                  placeholder="Describe your editing role, color grading, sound design, or 3D effects..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl p-2.5 text-xs text-white focus:outline-none resize-none"
                />
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
                  Publish to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal with real video playback */}
      {playingVideo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="max-w-3xl w-full bg-[#09111e] border border-slate-700 rounded-2xl overflow-hidden p-4 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-bold text-sm text-white truncate">{playingVideo.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono shrink-0">
                  {playingVideo.category}
                </span>
                {playingVideo.isFileUpload && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold shrink-0">
                    Device File
                  </span>
                )}
              </div>
              <button 
                onClick={() => setPlayingVideo(null)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-slate-800">
              {playingVideo.videoUrl || playingVideo.fileType === 'video' || playingVideo.thumbnail.startsWith('blob:') ? (
                <video
                  src={playingVideo.videoUrl || playingVideo.thumbnail}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={playingVideo.thumbnail}
                    alt={playingVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white space-y-2">
                    <Play className="w-12 h-12 text-blue-400" />
                    <p className="text-xs font-mono">4K Master Showcase</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 pt-1">
              <div>
                {playingVideo.clientName && (
                  <span>Client / Brand: <strong className="text-slate-200">{playingVideo.clientName}</strong> • </span>
                )}
                <span>Year: <strong className="text-slate-200">{playingVideo.year}</strong></span>
              </div>
              <p className="text-slate-300 text-xs italic">{playingVideo.description}</p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setPlayingVideo(null)}
                className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-semibold cursor-pointer"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
