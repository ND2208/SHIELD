import React, { useState, useRef } from 'react';
import { 
  ProjectCollaboration, 
  Creator, 
  UserProfile, 
  ThemeMode, 
  CreatorNiche,
  MilestoneStatus
} from '../types';
import { ProjectTimelineStatusBar } from './ProjectTimelineStatusBar';
import { allCreatorNiches } from '../data/mockData';
import { 
  Plus, 
  Search, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Upload, 
  FileVideo, 
  FileText, 
  FileImage, 
  Phone, 
  MessageCircle, 
  Mail, 
  ArrowLeft, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  FolderGit2,
  Check,
  X,
  MessageSquare,
  Layers
} from 'lucide-react';

interface ProjectManagementModuleProps {
  currentUser: UserProfile;
  projects: ProjectCollaboration[];
  creators: Creator[];
  theme: ThemeMode;
  onUpdateProject: (updated: ProjectCollaboration) => void;
  onCreateProject: (newProject: ProjectCollaboration) => void;
  onShowToast: (message: string) => void;
  onSelectCreatorProfile?: (creator: Creator) => void;
}

export const ProjectManagementModule: React.FC<ProjectManagementModuleProps> = ({
  currentUser,
  projects,
  creators,
  theme,
  onUpdateProject,
  onCreateProject,
  onShowToast
}) => {
  const isDark = theme === 'dark';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active view states
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'in_review' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNicheFilter, setSelectedNicheFilter] = useState<string>('All');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // New Collaboration Modal Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newSelectedCreatorId, setNewSelectedCreatorId] = useState(creators[0]?.id || 'cr_arjun');
  const [newNiche, setNewNiche] = useState<CreatorNiche>('Brand Promotion');
  const [newBudget, setNewBudget] = useState('$2,500');
  const [newDeadline, setNewDeadline] = useState('Nov 15, 2026');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('high');

  // Collaboration comment input in project detail view
  const [newComment, setNewComment] = useState('');
  const [feedbackInput, setFeedbackInput] = useState<{ [deliverableId: string]: string }>({});
  const [deliverableTitle, setDeliverableTitle] = useState('');

  // Selected project object
  const activeProject = projects.find(p => p.id === selectedProjectId);

  // Computed filtered list
  const filteredProjects = projects.filter(proj => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.niche.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      activeTab === 'all' ? true :
      activeTab === 'in_progress' ? proj.status === 'in_progress' :
      activeTab === 'in_review' ? proj.status === 'in_review' :
      proj.status === 'completed';

    const matchesNiche = 
      selectedNicheFilter === 'All' ? true : proj.niche === selectedNicheFilter;

    return matchesSearch && matchesStatus && matchesNiche;
  });

  // Top level stats
  const totalProjects = projects.length;
  const inProgressCount = projects.filter(p => p.status === 'in_progress').length;
  const inReviewCount = projects.filter(p => p.status === 'in_review').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const totalBudgetVal = projects.reduce((acc, p) => {
    const numeric = parseInt(p.budget.replace(/[^0-9]/g, '')) || 0;
    return acc + numeric;
  }, 0);

  // Handlers for Project Updates
  const handleAdvanceMilestone = (projectId: string, milestoneId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    let updatedMilestones = proj.milestones.map(m => {
      if (m.id === milestoneId) {
        return {
          ...m,
          status: 'completed' as MilestoneStatus,
          completedDate: 'Just now'
        };
      }
      return m;
    });

    const completedIndices = updatedMilestones.map((m, i) => m.status === 'completed' ? i : -1).filter(i => i >= 0);
    const lastCompleted = Math.max(...completedIndices, -1);
    
    if (lastCompleted + 1 < updatedMilestones.length) {
      if (updatedMilestones[lastCompleted + 1].status === 'pending') {
        updatedMilestones[lastCompleted + 1] = {
          ...updatedMilestones[lastCompleted + 1],
          status: 'in_progress'
        };
      }
    }

    const completedTotal = updatedMilestones.filter(m => m.status === 'completed').length;
    const newProgress = Math.round((completedTotal / updatedMilestones.length) * 100);
    const allDone = completedTotal === updatedMilestones.length;

    const newActivity = {
      id: `act_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      action: 'completed milestone',
      timestamp: 'Just now',
      comment: `Marked "${proj.milestones.find(m => m.id === milestoneId)?.title}" as completed.`
    };

    const updated: ProjectCollaboration = {
      ...proj,
      milestones: updatedMilestones,
      progressPercentage: newProgress,
      status: allDone ? 'completed' : 'in_progress',
      currentStage: allDone ? 'completed' : updatedMilestones[Math.min(lastCompleted + 1, updatedMilestones.length - 1)].stage,
      activityLog: [newActivity, ...proj.activityLog]
    };

    onUpdateProject(updated);
    onShowToast(`Milestone marked as complete! Project progress updated to ${newProgress}%.`);
  };

  const handleApproveDeliverable = (projectId: string, deliverableId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    const updatedDeliverables = proj.deliverables.map(d => {
      if (d.id === deliverableId) {
        return { ...d, status: 'approved' as const, feedback: 'Approved by client.' };
      }
      return d;
    });

    const newActivity = {
      id: `act_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      action: 'approved deliverable',
      timestamp: 'Just now',
      comment: `Deliverable approved without further revisions.`
    };

    const updated: ProjectCollaboration = {
      ...proj,
      deliverables: updatedDeliverables,
      activityLog: [newActivity, ...proj.activityLog]
    };

    onUpdateProject(updated);
    onShowToast('Deliverable approved successfully!');
  };

  const handleRequestRevision = (projectId: string, deliverableId: string) => {
    const feedback = feedbackInput[deliverableId] || 'Please refine based on creative discussion.';
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    const updatedDeliverables = proj.deliverables.map(d => {
      if (d.id === deliverableId) {
        return { ...d, status: 'revision_requested' as const, feedback };
      }
      return d;
    });

    const newActivity = {
      id: `act_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      action: 'requested revisions',
      timestamp: 'Just now',
      comment: feedback
    };

    const updated: ProjectCollaboration = {
      ...proj,
      status: 'in_progress',
      deliverables: updatedDeliverables,
      activityLog: [newActivity, ...proj.activityLog]
    };

    onUpdateProject(updated);
    setFeedbackInput(prev => ({ ...prev, [deliverableId]: '' }));
    onShowToast('Revision request and notes dispatched to creator.');
  };

  const handleAddComment = (projectId: string) => {
    if (!newComment.trim()) return;
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    const newActivity = {
      id: `act_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      action: 'posted a message in project timeline',
      timestamp: 'Just now',
      comment: newComment.trim()
    };

    const updated: ProjectCollaboration = {
      ...proj,
      activityLog: [newActivity, ...proj.activityLog]
    };

    onUpdateProject(updated);
    setNewComment('');
    onShowToast('Update added to project collaboration thread.');
  };

  // Direct Device File Upload for Project Deliverables
  const handleDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    const isVideo = file.type.startsWith('video');
    const isImage = file.type.startsWith('image');
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const objectUrl = URL.createObjectURL(file);

    const newDeliverable = {
      id: `del_up_${Date.now()}`,
      title: deliverableTitle || file.name.replace(/\.[^/.]+$/, ''),
      type: (isVideo ? 'video' : isImage ? 'design' : 'document') as any,
      status: 'submitted' as const,
      fileName: file.name,
      fileSize: sizeMb,
      fileUrl: objectUrl,
      submittedAt: 'Just now',
      version: `v${proj.deliverables.length + 1}.0`,
      feedback: 'Awaiting client review.'
    };

    const newActivity = {
      id: `act_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      action: `uploaded deliverable "${file.name}" directly from device`,
      timestamp: 'Just now',
      comment: `New deliverable uploaded: ${file.name} (${sizeMb}). Timeline status set to Needs Review.`
    };

    const updated: ProjectCollaboration = {
      ...proj,
      status: 'in_review',
      deliverables: [...proj.deliverables, newDeliverable],
      activityLog: [newActivity, ...proj.activityLog]
    };

    onUpdateProject(updated);
    setDeliverableTitle('');
    onShowToast(`File "${file.name}" uploaded from device to project!`);
  };

  // Handle Create New Collaboration
  const handleCreateNewCollaboration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      onShowToast('Please provide a project title.');
      return;
    }

    const creator = creators.find(c => c.id === newSelectedCreatorId) || creators[0];
    const newProject: ProjectCollaboration = {
      id: `proj_collab_${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim() || `Active collaboration with ${creator.name} specializing in ${newNiche}.`,
      clientId: currentUser.id,
      clientName: currentUser.name,
      clientAvatar: currentUser.avatar,
      clientEmail: currentUser.email,
      clientPhone: currentUser.phone,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatar,
      creatorRole: creator.role,
      creatorPhone: creator.phone,
      creatorWhatsapp: creator.whatsapp || creator.phone,
      niche: newNiche,
      budget: newBudget.trim() || '$1,500',
      status: 'in_progress',
      progressPercentage: 15,
      startDate: 'Today',
      deadline: newDeadline.trim() || 'In 3 weeks',
      priority: newPriority,
      currentStage: 'brief',
      milestones: [
        {
          id: `ms_c1_${Date.now()}`,
          title: 'Brief & Scope Alignment',
          description: 'Define moodboard, deliverables, target audience and format specs.',
          stage: 'brief',
          status: 'in_progress',
          dueDate: 'In 3 days'
        },
        {
          id: `ms_c2_${Date.now()}`,
          title: 'Concept & Rough Assembly',
          description: 'Storyboard, rough cut assembly, visual references and timing.',
          stage: 'concept',
          status: 'pending',
          dueDate: 'In 1 week'
        },
        {
          id: `ms_c3_${Date.now()}`,
          title: 'Production & VFX / Sound Design',
          description: 'Full rendering, motion design, color grading and audio mix.',
          stage: 'production',
          status: 'pending',
          dueDate: 'In 2 weeks'
        },
        {
          id: `ms_c4_${Date.now()}`,
          title: 'Review & Polish Revisions',
          description: 'Client review round, subtitle adjustments and feedback approval.',
          stage: 'review',
          status: 'pending',
          dueDate: 'In 2.5 weeks'
        },
        {
          id: `ms_c5_${Date.now()}`,
          title: 'Final Master Exports & Handover',
          description: 'High-res master package and source asset release.',
          stage: 'delivery',
          status: 'pending',
          dueDate: newDeadline.trim() || 'In 3 weeks'
        }
      ],
      deliverables: [
        {
          id: `del_initial_${Date.now()}`,
          title: 'Project Creative Brief Deck',
          type: 'document',
          status: 'pending',
          fileName: 'Creative_Brief.pdf',
          fileSize: 'Pending'
        }
      ],
      activityLog: [
        {
          id: `act_init_${Date.now()}`,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          authorRole: currentUser.role,
          action: 'initiated new collaboration',
          timestamp: 'Just now',
          comment: `Project launched with ${creator.name} under ${newNiche} specification.`
        }
      ],
      attachments: []
    };

    onCreateProject(newProject);
    setIsNewProjectModalOpen(false);
    setSelectedProjectId(newProject.id);
    onShowToast(`New collaboration "${newProject.title}" created with ${creator.name}!`);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 transition-colors ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* 1. Header Zone: Title & Start New Collaboration */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Project Management
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
              Collaborations & Timelines
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl">
            Track active collaborations between clients and creators. Monitor interactive milestone timelines, review video and design deliverables, and manage approvals in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Start New Collaboration</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#091220]/70 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Active Collaborations</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono">{inProgressCount + inReviewCount}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-400">
            <TrendingUp className="w-3 h-3" />
            <span>{inReviewCount} need review / approval</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#091220]/70 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Pending Review</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-amber-400">{inReviewCount}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Deliverables awaiting signoff</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#091220]/70 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Completed Projects</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400">{completedCount}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
            <Sparkles className="w-3 h-3" />
            <span>100% verified deliveries</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#091220]/70 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Total Value</span>
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-sky-400">
            ${totalBudgetVal.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Escrow & contract secured</span>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace: Either Project Detail View OR Project Grid/List */}
      {selectedProjectId && activeProject ? (
        /* DETAIL WORKSPACE VIEW */
        <div className="space-y-6">
          {/* Back button & quick action toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setSelectedProjectId(null)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-slate-800/70 hover:bg-slate-700/80 border-slate-700 text-slate-200' 
                  : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Projects</span>
            </button>

            {/* Direct Communication Buttons with collaborator */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${activeProject.creatorPhone || activeProject.clientPhone || '+919876543210'}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/25 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/${(activeProject.creatorWhatsapp || activeProject.creatorPhone || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-600/15 text-green-400 border border-green-500/30 hover:bg-green-600/25 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${activeProject.creatorId ? 'creator@shield.io' : 'client@shield.io'}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/15 text-blue-400 border border-blue-500/30 hover:bg-blue-600/25 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Project Header Card */}
          <div className={`p-6 rounded-2xl border transition-colors ${
            isDark ? 'bg-[#091220] border-slate-800' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {activeProject.niche}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    activeProject.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : activeProject.status === 'in_review'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    Status: {activeProject.status === 'completed' ? 'Completed' : activeProject.status === 'in_review' ? 'Needs Review' : 'In Progress'}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    Budget: {activeProject.budget}
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {activeProject.title}
                </h2>
                <p className="text-sm text-slate-400 max-w-3xl">
                  {activeProject.description}
                </p>
              </div>

              {/* Collaborator Profile Card */}
              <div className={`p-4 rounded-xl border flex items-center gap-3.5 shrink-0 ${
                isDark ? 'bg-[#0c1626] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <img
                  src={activeProject.creatorAvatar}
                  alt={activeProject.creatorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-white">{activeProject.creatorName}</p>
                    <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-mono">
                      Creator
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{activeProject.creatorRole}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{activeProject.creatorPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL TIMELINE & STATUS BAR COMPONENT */}
          <div className="space-y-2">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Interactive Collaboration Timeline</span>
            </h3>
            <ProjectTimelineStatusBar
              project={activeProject}
              theme={theme}
              userRole={currentUser.role}
              onAdvanceMilestone={(msId) => handleAdvanceMilestone(activeProject.id, msId)}
            />
          </div>

          {/* TWO COLUMN WORKSPACE: Deliverables & Milestones | Activity & Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Deliverables & Milestones */}
            <div className="lg:col-span-7 space-y-6">
              {/* Deliverables Card */}
              <div className={`p-5 rounded-2xl border space-y-4 transition-colors ${
                isDark ? 'bg-[#091220]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileVideo className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold">Project Deliverables & Files</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-slate-800 text-slate-300">
                      {activeProject.deliverables.length}
                    </span>
                  </div>

                  {/* Device File Upload Button */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*,image/*,.pdf,.zip"
                      onChange={(e) => handleDeviceFileUpload(e, activeProject.id)}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Work from Device</span>
                    </button>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3">
                  {activeProject.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isDark ? 'bg-[#0c1626]/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          del.type === 'video' ? 'bg-sky-500/15 text-sky-400' :
                          del.type === 'design' ? 'bg-purple-500/15 text-purple-400' :
                          'bg-amber-500/15 text-amber-400'
                        }`}>
                          {del.type === 'video' ? <FileVideo className="w-4 h-4" /> : 
                           del.type === 'design' ? <FileImage className="w-4 h-4" /> : 
                           <FileText className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold">{del.title}</p>
                            {del.version && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                                {del.version}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {del.fileName} • {del.fileSize} • {del.submittedAt}
                          </p>
                          {del.feedback && (
                            <p className="text-[11px] text-blue-400 mt-1 italic">
                              "{del.feedback}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Status & Review Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                          del.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          del.status === 'submitted' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          del.status === 'revision_requested' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {del.status === 'approved' ? 'Approved' : 
                           del.status === 'submitted' ? 'Needs Review' : 
                           del.status === 'revision_requested' ? 'Revision Asked' : 'Pending'}
                        </span>

                        {del.status === 'submitted' && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleApproveDeliverable(activeProject.id, del.id)}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleRequestRevision(activeProject.id, del.id)}
                              className="px-2 py-1 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              Revise
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Milestones List */}
              <div className={`p-5 rounded-2xl border space-y-4 transition-colors ${
                isDark ? 'bg-[#091220]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Milestone Breakdown & Requirements</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeProject.milestones.filter(m => m.status === 'completed').length} / {activeProject.milestones.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {activeProject.milestones.map((ms, index) => (
                    <div
                      key={ms.id}
                      className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                        ms.status === 'completed'
                          ? isDark ? 'bg-emerald-950/15 border-emerald-500/20' : 'bg-emerald-50/50 border-emerald-200'
                          : ms.status === 'in_progress'
                          ? isDark ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50/50 border-blue-200'
                          : isDark ? 'bg-[#0c1626]/50 border-slate-800/60' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                            ms.status === 'completed' ? 'bg-emerald-500 text-white' :
                            ms.status === 'in_progress' ? 'bg-blue-500 text-white' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {index + 1}
                          </span>
                          <p className="text-xs font-bold">{ms.title}</p>
                          <span className="text-[10px] font-mono text-slate-500">
                            Due {ms.dueDate}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-7">
                          {ms.description}
                        </p>
                        {ms.deliverableSummary && (
                          <p className="text-[11px] text-slate-300 pl-7 font-mono">
                            ↳ {ms.deliverableSummary}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0">
                        {ms.status === 'completed' ? (
                          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        ) : ms.status === 'in_progress' ? (
                          <button
                            onClick={() => handleAdvanceMilestone(activeProject.id, ms.id)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm"
                          >
                            Mark Done
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500">
                            Upcoming
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Activity Thread & Real-time Collaboration */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`p-5 rounded-2xl border space-y-4 flex flex-col h-full min-h-[480px] transition-colors ${
                isDark ? 'bg-[#091220]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between border-b pb-3 border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-bold">Activity & Collaboration Thread</h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Live updates</span>
                </div>

                {/* Activity Feed Items */}
                <div className="flex-1 overflow-y-auto space-y-3 max-h-[380px] pr-1">
                  {activeProject.activityLog.map((act) => (
                    <div
                      key={act.id}
                      className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                        isDark ? 'bg-[#0c1626]/80 border-slate-800/70' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={act.authorAvatar}
                            alt={act.authorName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="font-semibold text-white">{act.authorName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {act.action}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{act.timestamp}</span>
                      </div>
                      {act.comment && (
                        <p className="text-slate-300 pl-7 text-[11px] leading-relaxed">
                          {act.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="border-t pt-3 border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(activeProject.id);
                      }}
                      placeholder="Post a message or progress update to collaborator..."
                      className={`flex-1 px-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                        isDark 
                          ? 'bg-[#0c1626] border-slate-800 text-white placeholder-slate-500' 
                          : 'bg-slate-100 border-slate-300 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                    <button
                      onClick={() => handleAddComment(activeProject.id)}
                      disabled={!newComment.trim()}
                      className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Collaborators are notified instantly of timeline advances, feedback, and deliverables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PROJECT LIST VIEW */
        <div className="space-y-6">
          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({totalProjects})
              </button>
              <button
                onClick={() => setActiveTab('in_progress')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'in_progress'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                In Progress ({inProgressCount})
              </button>
              <button
                onClick={() => setActiveTab('in_review')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'in_review'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                In Review ({inReviewCount})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'completed'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>

            {/* Search and Niche Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter projects or creators..."
                  className={`pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors w-52 sm:w-64 ${
                    isDark 
                      ? 'bg-[#091220] border-slate-800 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
                  }`}
                />
              </div>

              <select
                value={selectedNicheFilter}
                onChange={(e) => setSelectedNicheFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  isDark 
                    ? 'bg-[#091220] border-slate-800 text-slate-300' 
                    : 'bg-white border-slate-300 text-slate-700'
                }`}
              >
                <option value="All">All Niches</option>
                {allCreatorNiches.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Cards List */}
          {filteredProjects.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border ${
              isDark ? 'bg-[#091220]/50 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-300">No collaborations found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                No active projects matched your search criteria. You can commission any creator in the database to start a new collaboration.
              </p>
              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Start New Collaboration
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`p-6 rounded-2xl border transition-all duration-200 hover:border-blue-500/50 ${
                    isDark ? 'bg-[#091220] border-slate-800/90' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  {/* Top row: Niche pill, Status, Title, Budget, Deadline */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
                          {project.niche}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          project.status === 'completed'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : project.status === 'in_review'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                        }`}>
                          {project.status === 'completed' ? 'Completed' : project.status === 'in_review' ? 'In Review' : 'In Progress'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded font-mono text-slate-400 bg-slate-800/60">
                          Started {project.startDate}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors cursor-pointer"
                        onClick={() => setSelectedProjectId(project.id)}
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                        {project.description}
                      </p>
                    </div>

                    {/* Collaborator + Budget + Action */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.creatorAvatar}
                          alt={project.creatorName}
                          className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                        />
                        <div className="text-right sm:text-left">
                          <p className="text-xs font-semibold text-white">{project.creatorName}</p>
                          <p className="text-[11px] text-slate-400">{project.budget}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProjectId(project.id)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                      >
                        <span>Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* EMBEDDED VISUAL TIMELINE & STATUS BAR */}
                  <ProjectTimelineStatusBar
                    project={project}
                    theme={theme}
                    userRole={currentUser.role}
                    onAdvanceMilestone={(msId) => handleAdvanceMilestone(project.id, msId)}
                    compact
                  />

                  {/* Bottom Deliverables & Activity Summary */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <FileVideo className="w-3.5 h-3.5 text-sky-400" />
                        <strong>{project.deliverables.length}</strong> Deliverables ({project.deliverables.filter(d => d.status === 'approved').length} Approved)
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Deadline: <strong className="text-slate-200">{project.deadline}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${project.creatorPhone || '+919845012345'}`}
                        className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${(project.creatorWhatsapp || project.creatorPhone || '').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. MODAL: START NEW COLLABORATION */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsNewProjectModalOpen(false)}
          />
          <div className={`relative w-full max-w-xl rounded-2xl border p-6 z-10 shadow-2xl transition-all ${
            isDark ? 'bg-[#09111e] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Start New Collaboration</h3>
                  <p className="text-xs text-slate-400">Commission a verified creator with an interactive timeline</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewCollaboration} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Collaboration Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Launch Commercial & Brand Promo"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDark ? 'bg-[#0c1626] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Select Creator Partner
                  </label>
                  <select
                    value={newSelectedCreatorId}
                    onChange={(e) => setNewSelectedCreatorId(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                      isDark ? 'bg-[#0c1626] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {creators.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.primaryNiche})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Niche / Specification
                  </label>
                  <select
                    value={newNiche}
                    onChange={(e) => setNewNiche(e.target.value as CreatorNiche)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                      isDark ? 'bg-[#0c1626] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {allCreatorNiches.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Budget
                  </label>
                  <input
                    type="text"
                    placeholder="$2,500"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      isDark ? 'bg-[#0c1626] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Target Deadline
                  </label>
                  <input
                    type="text"
                    placeholder="Nov 15, 2026"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      isDark ? 'bg-[#0c1626] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                      isDark ? 'bg-[#0c1626] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Standard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Creative Brief & Project Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline the core deliverables, format requirements (16:9, 9:16), reference links, and tone..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDark ? 'bg-[#0c1626] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Launch Collaboration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
