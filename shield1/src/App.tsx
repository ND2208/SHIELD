/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  UserProfile, 
  Creator, 
  SearchFilters, 
  NotificationItem, 
  CreatorPortfolioItem, 
  ThemeMode, 
  LanguageCode, 
  ProjectCollaboration, 
  CreatorNiche,
  ProposalItem 
} from './types';
import { 
  sampleCreators, 
  sampleNotifications, 
  initialClientUser, 
  initialCreatorUser, 
  sampleProjects,
  sampleProposals 
} from './data/mockData';
import { AuthScreen } from './components/AuthScreen';
import { Navbar } from './components/Navbar';
import { SidebarDrawer } from './components/SidebarDrawer';
import { HeroSection } from './components/HeroSection';
import { PersonalizedFeed } from './components/PersonalizedFeed';
import { SearchResultsView } from './components/SearchResultsView';
import { CreatorProfileModal } from './components/CreatorProfileModal';
import { CreatorDashboard } from './components/CreatorDashboard';
import { PreferencesModal } from './components/PreferencesModal';
import { ConnectModal } from './components/ConnectModal';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { CreateProfileModal } from './components/CreateProfileModal';
import { FileUploadModal } from './components/FileUploadModal';
import { NicheScrollingMarquee } from './components/NicheScrollingMarquee';
import { ProjectManagementModule } from './components/ProjectManagementModule';
import { CheckCircle2, Shield, Sparkles, MessageSquare, Repeat } from 'lucide-react';

export default function App() {
  // Authentication state - starts with Client Rahul for immediate testing
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialClientUser);

  // App Navigation & Views
  const [currentView, setCurrentView] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Theme & Multi-language States
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Dynamic Creators List
  const [creatorsList, setCreatorsList] = useState<Creator[]>(sampleCreators);

  // Search State with specialized niches
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    niches: [],
    experienceLevel: 'All',
    location: 'All Locations',
    sortBy: 'relevance'
  });

  // Creator Selection & Modals
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [connectCreator, setConnectCreator] = useState<Creator | null>(null);
  const [savedCreatorIds, setSavedCreatorIds] = useState<string[]>(['cr_arjun']);

  // Dialog Modals
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);

  // Proposals State (Central proposal lifecycle)
  const [proposals, setProposals] = useState<ProposalItem[]>(sampleProposals);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);

  // Active Project Collaborations (Client & Creator Project Management)
  const [projects, setProjects] = useState<ProjectCollaboration[]>(sampleProjects);

  const handleUpdateProject = (updated: ProjectCollaboration) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleCreateProject = (newProject: ProjectCollaboration) => {
    setProjects(prev => [newProject, ...prev]);
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Collaboration Initiated',
      message: `New project "${newProject.title}" has launched with ${newProject.creatorName}.`,
      time: 'Just now',
      read: false,
      type: 'proposal',
      targetRole: 'all'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('home');
    const badge = user.accountType === 'personal' ? 'Client (Personal Account)' : 'Creator (Business Account)';
    const nicheInfo = user.primaryNiche ? ` • Niche: ${user.primaryNiche}` : '';
    showToast(`Welcome back, ${user.name}! Logged in as ${badge}${nicheInfo}.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCreator(null);
    showToast('You have been logged out.');
  };

  const handleToggleBookmark = (creatorId: string) => {
    if (savedCreatorIds.includes(creatorId)) {
      setSavedCreatorIds(savedCreatorIds.filter(id => id !== creatorId));
      showToast('Removed from saved bookmarks.');
    } else {
      setSavedCreatorIds([...savedCreatorIds, creatorId]);
      showToast('Creator saved to your bookmarks!');
    }
  };

  const handleUpdatePreferences = (newPrefs: string[]) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        preferences: newPrefs,
        targetNiches: newPrefs as any
      });
      showToast('Your personalized creator specifications have been updated!');
    }
  };

  const handleSwitchRole = () => {
    if (!currentUser) return;
    if (currentUser.role === 'client') {
      setCurrentUser(initialCreatorUser);
      showToast('Switched to Creator (Business Account) mode — viewing creator hub and proposals');
    } else {
      setCurrentUser(initialClientUser);
      showToast('Switched to Client (Personal Account) mode — viewing client feeds');
    }
  };

  // USER REQUIREMENT: Handle sending proposals from client
  const handleSendProposal = (data: {
    creatorId: string;
    creatorName: string;
    creatorAvatar?: string;
    title: string;
    budget: string;
    timeline: string;
    scope: string;
    niche?: CreatorNiche;
  }) => {
    const newPropId = `prop_${Date.now()}`;
    const newProposal: ProposalItem = {
      id: newPropId,
      title: data.title,
      creatorId: data.creatorId,
      creatorName: data.creatorName,
      creatorAvatar: data.creatorAvatar,
      clientId: currentUser?.id || 'usr_client_01',
      clientName: currentUser?.name || 'Rahul (Apex Innovations)',
      clientEmail: currentUser?.email || 'rahul@gmail.com',
      clientPhone: currentUser?.phone || '+91 98765 43210',
      clientAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      budget: data.budget,
      timeline: data.timeline,
      scope: data.scope,
      niche: data.niche,
      date: 'Just now',
      status: 'pending'
    };

    setProposals(prev => [newProposal, ...prev]);

    // 1. Notification for the Client
    const clientNotif: NotificationItem = {
      id: `notif_cli_${Date.now()}`,
      title: 'Proposal Dispatched',
      message: `Your project proposal "${data.title}" was successfully submitted to ${data.creatorName}.`,
      time: 'Just now',
      read: false,
      type: 'proposal',
      targetRole: 'client',
      proposalId: newPropId,
      avatar: data.creatorAvatar
    };

    // 2. Notification for the Creator
    const creatorNotif: NotificationItem = {
      id: `notif_cr_${Date.now()}`,
      title: 'New Proposal Received',
      message: `${currentUser?.name || 'Client'} sent you a proposal for "${data.title}" (${data.budget}).`,
      time: 'Just now',
      read: false,
      type: 'proposal',
      targetRole: 'creator',
      proposalId: newPropId,
      avatar: currentUser?.avatar
    };

    setNotifications(prev => [creatorNotif, clientNotif, ...prev]);
    showToast(`Proposal for "${data.title}" sent to ${data.creatorName}! Notification dispatched to creator.`);
  };

  // USER REQUIREMENT: Handle accepting proposal by creator
  const handleAcceptProposal = (proposalId: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'accepted' } : p));

    // Automatically create new active Project Collaboration in the system!
    const newProj: ProjectCollaboration = {
      id: `proj_prop_${Date.now()}`,
      title: prop.title,
      description: prop.scope,
      clientId: prop.clientId,
      clientName: prop.clientName,
      clientAvatar: prop.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      clientEmail: prop.clientEmail,
      clientPhone: prop.clientPhone,
      creatorId: prop.creatorId,
      creatorName: prop.creatorName,
      creatorAvatar: prop.creatorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      creatorRole: 'Verified Creative Specialist',
      creatorPhone: '+91 98450 12345',
      creatorWhatsapp: '+91 98450 12345',
      niche: prop.niche || 'Brand Promotion',
      budget: prop.budget,
      status: 'in_progress',
      progressPercentage: 20,
      startDate: 'Today',
      deadline: `In ${prop.timeline}`,
      priority: 'high',
      currentStage: 'brief',
      milestones: [
        {
          id: `ms_1_${Date.now()}`,
          title: 'Creative Brief & Direction',
          description: 'Scope signoff, sound cues, moodboards, format markers.',
          stage: 'brief',
          status: 'in_progress',
          dueDate: 'In 3 days'
        },
        {
          id: `ms_2_${Date.now()}`,
          title: 'Assembly & Storyboard Cut',
          description: 'Timing draft, rough cut assembly, pacing audio sync.',
          stage: 'concept',
          status: 'pending',
          dueDate: 'In 1 week'
        },
        {
          id: `ms_3_${Date.now()}`,
          title: 'Production & VFX Grading',
          description: 'Kinetic typography, motion graphics, audio mastering.',
          stage: 'production',
          status: 'pending',
          dueDate: 'In 2 weeks'
        },
        {
          id: `ms_4_${Date.now()}`,
          title: 'Client Review & Revisions',
          description: 'Collaborative feedback round and subtitle polish.',
          stage: 'review',
          status: 'pending',
          dueDate: 'In 2.5 weeks'
        },
        {
          id: `ms_5_${Date.now()}`,
          title: 'Final 4K Master Handover',
          description: 'Uncompressed master exports, ProRes files and stems.',
          stage: 'delivery',
          status: 'pending',
          dueDate: `In ${prop.timeline}`
        }
      ],
      deliverables: [
        {
          id: `del_1_${Date.now()}`,
          title: 'Creative Scope & Alignment Deck',
          type: 'document',
          status: 'submitted',
          fileName: `${prop.title.replace(/\s+/g, '_').slice(0, 20)}_Brief.pdf`,
          fileSize: '3.4 MB',
          submittedAt: 'Just now',
          version: 'v1.0',
          feedback: 'Awaiting client review.'
        }
      ],
      activityLog: [
        {
          id: `act_accept_${Date.now()}`,
          authorName: prop.creatorName,
          authorAvatar: prop.creatorAvatar || '',
          authorRole: 'creator',
          action: 'accepted project proposal',
          timestamp: 'Just now',
          comment: `Proposal accepted! Active project collaboration initialized.`
        }
      ],
      attachments: []
    };

    setProjects(prev => [newProj, ...prev]);

    // USER REQUIREMENT: "if any option chosen it should notify the client in the notifications"
    const clientAcceptNotif: NotificationItem = {
      id: `notif_acc_${Date.now()}`,
      title: 'Proposal Accepted 🎉',
      message: `${prop.creatorName} accepted your project proposal for "${prop.title}". Collaboration workspace is now active!`,
      time: 'Just now',
      read: false,
      type: 'proposal',
      targetRole: 'client',
      proposalId: prop.id,
      projectId: newProj.id,
      avatar: prop.creatorAvatar
    };

    setNotifications(prev => [clientAcceptNotif, ...prev]);
    showToast(`Accepted proposal "${prop.title}"! Client notified and collaboration project launched.`);
  };

  // USER REQUIREMENT: Handle rejecting proposal by creator
  const handleDeclineProposal = (proposalId: string, reason?: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'declined', rejectionReason: reason } : p));

    // USER REQUIREMENT: "if any option chosen it should notify the client in the notifications"
    const reasonText = reason ? `: ${reason}` : '.';
    const clientDeclineNotif: NotificationItem = {
      id: `notif_dec_${Date.now()}`,
      title: 'Proposal Declined',
      message: `${prop.creatorName} was unable to accept your proposal for "${prop.title}"${reasonText}`,
      time: 'Just now',
      read: false,
      type: 'proposal',
      targetRole: 'client',
      proposalId: prop.id,
      avatar: prop.creatorAvatar
    };

    setNotifications(prev => [clientDeclineNotif, ...prev]);
    showToast(`Proposal declined. Notification sent to client.`);
  };

  const handleAddPortfolioItem = (creatorId: string, item: CreatorPortfolioItem) => {
    setCreatorsList(prev => prev.map(c => {
      if (c.id === creatorId) {
        return {
          ...c,
          portfolio: [item, ...c.portfolio],
          projectsCount: c.projectsCount + 1
        };
      }
      return c;
    }));
    setSelectedCreator(prev => prev && prev.id === creatorId ? {
      ...prev,
      portfolio: [item, ...prev.portfolio],
      projectsCount: prev.projectsCount + 1
    } : prev);
    showToast(`New work "${item.title}" (${item.category}) published to portfolio!`);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const handleQuickBrandPromo = () => {
    setSearchFilters({
      query: '',
      categories: [],
      niches: ['Brand Promotion'],
      experienceLevel: 'All',
      location: 'All Locations',
      sortBy: 'recommendation'
    });
    setCurrentView('search');
    showToast('Filtered for Brand Promotion specialists & commercial directors!');
  };

  const handleProfileCreated = (newCreator?: Creator, newClient?: UserProfile) => {
    if (newCreator) {
      setCreatorsList(prev => [newCreator, ...prev]);
      setSelectedCreator(newCreator);
      showToast(`New Creator profile "${newCreator.name}" (${newCreator.primaryNiche}) registered in database!`);
    } else if (newClient) {
      setCurrentUser(newClient);
      showToast(`New Client profile "${newClient.name}" created and logged in!`);
    }
  };

  const handleNicheClick = (niche: CreatorNiche) => {
    setSearchFilters(prev => ({
      ...prev,
      niches: [niche],
      query: ''
    }));
    setCurrentView('search');
    showToast(`Redirected to top verified ${niche} creators & portfolios!`);
  };

  // If user is not logged in, show the comprehensive Login Screen
  if (!currentUser) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#060b13]' : 'bg-slate-50'}`}>
        <AuthScreen 
          onLoginSuccess={handleLoginSuccess} 
          onExploreNiche={(niche) => {
            const clientWithNiche: UserProfile = {
              ...initialClientUser,
              targetNiches: [niche],
              preferences: [niche, 'Video Editing']
            };
            handleLoginSuccess(clientWithNiche);
            handleNicheClick(niche);
          }}
        />
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0c1626] border border-blue-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Saved creators list for bookmarks
  const savedCreators = creatorsList.filter(c => savedCreatorIds.includes(c.id));

  // Role-filtered notifications for realistic client vs creator experience
  const visibleNotifications = notifications.filter(n => {
    if (!n.targetRole || n.targetRole === 'all') return true;
    return n.targetRole === currentUser.role;
  });
  const unreadCount = visibleNotifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#060b13] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1626] border border-blue-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Role Switcher Floating Quick Test Helper Bar */}
      <div className="bg-[#080f1d] border-b border-slate-800/80 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Logged in as:</span>
          <span className={`font-semibold px-2 py-0.5 rounded text-[11px] font-mono ${
            currentUser.role === 'client' 
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {currentUser.name} ({currentUser.role === 'client' ? 'Client' : 'Creator'})
          </span>
        </div>

        <button
          onClick={handleSwitchRole}
          className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
        >
          <Repeat className="w-3 h-3 text-sky-400" />
          <span>Switch to {currentUser.role === 'client' ? 'Creator Mode (Arjun)' : 'Client Mode (Rahul)'}</span>
        </button>
      </div>

      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        searchQuery={searchFilters.query}
        onSearchChange={(q) => {
          setSearchFilters(prev => ({ ...prev, query: q }));
          if (q.trim() && currentView !== 'search') {
            setCurrentView('search');
          }
        }}
        onSearchSubmit={() => setCurrentView('search')}
        onNavigate={(v) => setCurrentView(v)}
        onToggleSidebar={() => setIsSidebarOpen(true)}
        notifications={visibleNotifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onSelectNotification={(item) => {
          setNotifications(notifications.map(n => n.id === item.id ? { ...n, read: true } : n));
          if (item.proposalId) {
            if (currentUser.role === 'creator') {
              setCurrentView('home');
              showToast('Opened proposal in Creator Dashboard');
            } else {
              setCurrentView('projects');
              showToast('Opened project collaborations');
            }
          } else if (item.projectId) {
            setCurrentView('projects');
          } else {
            showToast(item.title);
          }
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        language={language}
        onLanguageChange={setLanguage}
        onQuickBrandPromoClick={handleQuickBrandPromo}
        onOpenCreateProfile={() => setIsCreateProfileOpen(true)}
        onOpenUploadFile={() => setIsUploadModalOpen(true)}
      />

      {/* Slide-out Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={(v) => setCurrentView(v)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={handleLogout}
        unreadNotificationsCount={unreadCount}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {/* VIEW 1: CREATOR DASHBOARD (if user is creator / business account) */}
        {currentUser.role === 'creator' && currentView === 'home' && (
          <CreatorDashboard
            user={currentUser}
            creatorData={creatorsList[0]}
            proposals={proposals}
            onAcceptProposal={handleAcceptProposal}
            onDeclineProposal={handleDeclineProposal}
            onViewClientFeed={() => setCurrentView('creators')}
            onOpenProfile={() => setIsProfileOpen(true)}
            onAddPortfolioItem={handleAddPortfolioItem}
            onNavigateToProjects={() => setCurrentView('projects')}
          />
        )}

        {/* VIEW 2: CLIENT DASHBOARD / MAIN HOME PAGE */}
        {currentUser.role === 'client' && currentView === 'home' && (
          <>
            <HeroSection
              onExploreClick={() => setCurrentView('creators')}
              onLearnMoreClick={() => setCurrentView('about')}
            />

            {/* Scrolling animation on main page with 9 creator niches */}
            <NicheScrollingMarquee
              onSelectNiche={handleNicheClick}
              theme={theme}
              title="Featured Creator Specializations"
              subtitle="Click any category to view verified specialists & video portfolios"
              variant="main"
            />

            <PersonalizedFeed
              currentUser={currentUser}
              creators={creatorsList}
              onSelectCreator={(c) => setSelectedCreator(c)}
              onOpenPreferencesModal={() => setIsPreferencesOpen(true)}
              savedCreatorIds={savedCreatorIds}
              onToggleBookmark={handleToggleBookmark}
              theme={theme}
              language={language}
              onNavigateToProjects={() => setCurrentView('projects')}
            />
          </>
        )}

        {/* VIEW 3: CREATORS DIRECTORY */}
        {currentView === 'creators' && (
          <PersonalizedFeed
            currentUser={currentUser}
            creators={creatorsList}
            onSelectCreator={(c) => setSelectedCreator(c)}
            onOpenPreferencesModal={() => setIsPreferencesOpen(true)}
            savedCreatorIds={savedCreatorIds}
            onToggleBookmark={handleToggleBookmark}
            theme={theme}
            language={language}
            onNavigateToProjects={() => setCurrentView('projects')}
          />
        )}

        {/* VIEW 4: SEARCH RESULTS */}
        {currentView === 'search' && (
          <SearchResultsView
            creators={creatorsList}
            filters={searchFilters}
            onFilterChange={setSearchFilters}
            onSelectCreator={(c) => setSelectedCreator(c)}
            savedCreatorIds={savedCreatorIds}
            onToggleBookmark={handleToggleBookmark}
            onClearFilters={() => setSearchFilters({
              query: '',
              categories: [],
              niches: [],
              experienceLevel: 'All',
              location: 'All Locations',
              sortBy: 'relevance'
            })}
          />
        )}

        {/* VIEW: PROJECT MANAGEMENT & TIMELINES (EXISTING PROJECT HISTORY WORKSPACE) */}
        {currentView === 'projects' && (
          <ProjectManagementModule
            currentUser={currentUser}
            projects={projects}
            creators={creatorsList}
            theme={theme}
            onUpdateProject={handleUpdateProject}
            onCreateProject={handleCreateProject}
            onShowToast={showToast}
            onSelectCreatorProfile={(c) => setSelectedCreator(c)}
          />
        )}

        {/* VIEW 5: MESSAGES */}
        {currentView === 'messages' && (
          <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Direct Client & Creator Messages</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              You are currently active. Direct inquiries and proposals connect via verified email and phone.
            </p>
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Back to Home Feed
            </button>
          </div>
        )}

        {/* VIEW 6: NOTIFICATIONS */}
        {currentView === 'notifications' && (
          <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">All Notifications</h2>
                <span className="text-xs px-2 py-0.5 rounded font-mono bg-blue-500/20 text-blue-300">
                  {currentUser.role === 'client' ? 'Client Alerts' : 'Creator Alerts'}
                </span>
              </div>
              <button
                onClick={handleMarkAllNotificationsRead}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-3">
              {visibleNotifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-[#09111e] rounded-xl border border-slate-800">
                  No notifications for this account yet.
                </div>
              ) : (
                visibleNotifications.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.proposalId && currentUser.role === 'creator') {
                        setCurrentView('home');
                        showToast('Opened proposal queue on Creator Dashboard');
                      } else if (item.projectId || (item.proposalId && currentUser.role === 'client')) {
                        setCurrentView('projects');
                      }
                    }}
                    className={`p-4 rounded-xl border border-slate-800 bg-[#09111e] flex gap-4 cursor-pointer hover:border-slate-700 transition-colors ${
                      !item.read ? 'border-blue-500/40 bg-blue-950/15' : ''
                    }`}
                  >
                    {item.avatar && (
                      <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-700" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                        <span className="text-xs text-slate-500">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{item.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW 7: ABOUT & CONTACT */}
        {(currentView === 'about' || currentView === 'contact') && (
          <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold text-white">About Shield Marketplace</h1>
            <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Shield is the premier creator marketplace built for serious brands and high-craft creative talent across gaming, 3D animations, wedding films, thumbnails, and brand promotions.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => setCurrentView('creators')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Browse Creators
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060b13] py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm">Shield</span>
            <span className="text-slate-600 ml-2">© 2026 Shield Technologies Inc.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('home')} className="hover:text-slate-300 transition-colors cursor-pointer">Home</button>
            <button onClick={() => setCurrentView('creators')} className="hover:text-slate-300 transition-colors cursor-pointer">Creators</button>
            <button onClick={() => setCurrentView('projects')} className="hover:text-slate-300 transition-colors cursor-pointer text-blue-400">Projects</button>
            <button onClick={() => setCurrentView('about')} className="hover:text-slate-300 transition-colors cursor-pointer">About</button>
            <button onClick={() => setIsSettingsOpen(true)} className="hover:text-slate-300 transition-colors cursor-pointer">Settings</button>
          </div>
        </div>
      </footer>

      {/* MODAL 1: CREATOR PROFILE MODAL */}
      <CreatorProfileModal
        creator={selectedCreator}
        onClose={() => setSelectedCreator(null)}
        isSaved={selectedCreator ? savedCreatorIds.includes(selectedCreator.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onConnect={(c) => {
          setSelectedCreator(null);
          setConnectCreator(c);
        }}
        currentUser={currentUser}
        projects={projects}
        onNavigateToProjects={(projId) => {
          setCurrentView('projects');
          if (projId) {
            showToast('Opened project collaboration workspace!');
          }
        }}
        onAddPortfolioItem={handleAddPortfolioItem}
      />

      {/* MODAL 2: CONNECT / HIRE PROPOSAL MODAL (Sends proposal to creator) */}
      <ConnectModal
        creator={connectCreator}
        isOpen={Boolean(connectCreator)}
        onClose={() => setConnectCreator(null)}
        onSendProposal={handleSendProposal}
      />

      {/* MODAL 3: PREFERENCES MODAL */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        currentPreferences={currentUser.targetNiches || currentUser.preferences}
        onSavePreferences={handleUpdatePreferences}
      />

      {/* MODAL 4: PROFILE MODAL */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onUpdateUser={(updated) => {
          setCurrentUser(updated);
          showToast('Profile & specifications updated!');
        }}
        onSwitchRole={handleSwitchRole}
        savedCreators={savedCreators}
        onSelectCreator={(c) => {
          setIsProfileOpen(false);
          setSelectedCreator(c);
        }}
      />

      {/* MODAL 5: SETTINGS MODAL */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={currentUser}
        theme={theme}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* MODAL 6: CREATE NEW PROFILE IN DATABASE MODAL */}
      <CreateProfileModal
        isOpen={isCreateProfileOpen}
        onClose={() => setIsCreateProfileOpen(false)}
        onProfileCreated={handleProfileCreated}
        theme={theme}
      />

      {/* MODAL 7: UNIVERSAL DIRECT DEVICE FILE UPLOAD MODAL */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        creators={creatorsList}
        currentCreatorId={currentUser.role === 'creator' ? creatorsList[0]?.id : undefined}
        onUploadSuccess={handleAddPortfolioItem}
        theme={theme}
      />
    </div>
  );
}
