import React from 'react';
import { 
  X, 
  Home, 
  Users, 
  Search, 
  Mail, 
  Bell, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Shield,
  FolderGit2
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  unreadNotificationsCount: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentView,
  onNavigate,
  onOpenProfile,
  onOpenSettings,
  onLogout,
  unreadNotificationsCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#09111e] border-l border-slate-800/80 h-full flex flex-col justify-between p-6 z-10 shadow-2xl text-slate-100 overflow-y-auto">
        {/* Header with close */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">Shield</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User profile card */}
          <div 
            onClick={() => {
              onOpenProfile();
              onClose();
            }}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#0c1626] border border-slate-800/80 hover:border-blue-500/50 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
              />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-sm text-white">{currentUser.name}</p>
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-mono">
                    {currentUser.accountType === 'personal' ? 'Client' : 'Creator'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate max-w-[140px]">{currentUser.email}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </div>

          {/* Primary Navigation List */}
          <nav className="space-y-1 pt-2">
            <button
              onClick={() => { onNavigate('home'); onClose(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'home' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => { onNavigate('creators'); onClose(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'creators' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Creators</span>
            </button>

            <button
              onClick={() => { onNavigate('projects'); onClose(); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'projects' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <FolderGit2 className="w-4 h-4 text-sky-400" />
                <span>Project Management</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              onClick={() => { onNavigate('search'); onClose(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'search' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => { onNavigate('messages'); onClose(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'messages' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Messages</span>
            </button>

            <button
              onClick={() => { onNavigate('notifications'); onClose(); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'notifications' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-blue-600 text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-slate-800/80 pt-4 space-y-1">
          <button
            onClick={() => { onOpenProfile(); onClose(); }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Profile & Preferences</span>
          </button>

          <button
            onClick={() => { onOpenSettings(); onClose(); }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => { onNavigate('about'); onClose(); }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Support</span>
          </button>

          <button
            onClick={() => { onLogout(); onClose(); }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors pt-3 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
