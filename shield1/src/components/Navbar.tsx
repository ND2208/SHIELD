import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Globe, 
  UserPlus, 
  Flame, 
  Upload, 
  FolderGit2 
} from 'lucide-react';
import { UserProfile, NotificationItem, ThemeMode, LanguageCode } from '../types';
import { NotificationDropdown } from './NotificationDropdown';
import { translations, languagesList } from '../i18n/translations';

interface NavbarProps {
  currentUser: UserProfile;
  currentView: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  onNavigate: (view: string) => void;
  onToggleSidebar: () => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onQuickBrandPromoClick: () => void;
  onOpenCreateProfile: () => void;
  onOpenUploadFile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
  onToggleSidebar,
  notifications,
  onMarkAllNotificationsRead,
  onSelectNotification,
  onOpenProfile,
  onOpenSettings,
  onLogout,
  theme,
  onToggleTheme,
  language,
  onLanguageChange,
  onQuickBrandPromoClick,
  onOpenCreateProfile,
  onOpenUploadFile
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const t = translations[language] || translations.en;
  const isDark = theme === 'dark';
  const unreadCount = notifications.filter(n => !n.read).length;
  const isClient = currentUser.role === 'client';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b px-4 sm:px-8 py-3 transition-colors ${
      isDark 
        ? 'bg-[#060b13]/90 border-slate-800/80 text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-800 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Left Zone: Shield Wordmark + Logo + Nav */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Shield</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors py-1 cursor-pointer ${
                currentView === 'home' 
                  ? 'text-blue-500 font-semibold' 
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => onNavigate('creators')}
              className={`transition-colors py-1 cursor-pointer ${
                currentView === 'creators' 
                  ? 'text-blue-500 font-semibold' 
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.creators}
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className={`transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                currentView === 'projects' 
                  ? 'text-blue-500 font-semibold' 
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{t.projects || 'Projects'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors py-1 cursor-pointer ${
                currentView === 'about' 
                  ? 'text-blue-500 font-semibold' 
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.about}
            </button>
          </nav>
        </div>

        {/* Center Zone: Quick Search Selection Area for Brand Promotions + Search Input */}
        <div className="flex-1 max-w-xl mx-auto hidden md:flex items-center gap-2">
          <button
            onClick={onQuickBrandPromoClick}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 shadow-md shadow-orange-500/25 flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
            title="Quick search area to find brand promotion creators & commercial video editors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-100 animate-pulse" />
            <span>{t.quickBrandPromo}</span>
          </button>

          {/* Search input field */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.searchPlaceholder}
              className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none transition-colors border ${
                isDark 
                  ? 'bg-[#0a1220] border-slate-800 text-slate-200 placeholder-slate-500 focus:border-blue-500' 
                  : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:opacity-80 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Zone: Client Project History or Creator Upload Work + Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* USER REQUIREMENT: In Client account, ensure users can view their existing project history instead of uploading work! */}
          {isClient ? (
            <button
              onClick={() => onNavigate('projects')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 border ${
                currentView === 'projects'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 border-blue-500'
                  : isDark 
                    ? 'bg-[#091220] hover:bg-[#0c1626] border-slate-800 text-blue-400 hover:border-blue-500/40' 
                    : 'bg-white hover:bg-slate-50 border-slate-300 text-blue-600'
              }`}
              title="View your existing project collaborations and delivery history"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Project History</span>
              <span className="sm:hidden">Projects</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>
          ) : (
            <button
              onClick={onOpenUploadFile}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/25 transition-all cursor-pointer whitespace-nowrap active:scale-95"
              title="Upload work video or image directly to portfolio"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Work</span>
              <span className="sm:hidden">Upload</span>
            </button>
          )}

          {/* Create Profile in Database */}
          <button
            onClick={onOpenCreateProfile}
            className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all cursor-pointer whitespace-nowrap"
            title="Register a new creator or client in the database"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t.createProfile}</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark 
                ? 'border-slate-800 bg-[#09111e] text-amber-400 hover:text-amber-300' 
                : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 cursor-pointer ${
                isDark 
                  ? 'border-slate-800 bg-[#09111e] text-slate-300 hover:text-white' 
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
              title="Select Language"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-[11px] font-bold uppercase">{language}</span>
            </button>

            {showLanguageDropdown && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowLanguageDropdown(false)} />
                <div className={`absolute right-0 top-11 w-44 rounded-2xl border shadow-2xl z-40 p-2 text-xs max-h-72 overflow-y-auto ${
                  isDark ? 'bg-[#0b1322] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <p className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 border-b mb-1 border-slate-800/40">
                    Select Language
                  </p>
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-colors ${
                        language === lang.code 
                          ? 'bg-blue-600 text-white font-semibold' 
                          : isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[10px] opacity-70">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-xl transition-colors cursor-pointer border ${
                isDark 
                  ? 'border-slate-800 bg-[#09111e] text-slate-400 hover:text-white' 
                  : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#060b13]" />
              )}
            </button>
            <NotificationDropdown
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              notifications={notifications}
              onMarkAllAsRead={onMarkAllNotificationsRead}
              onSelectNotification={onSelectNotification}
            />
          </div>

          {/* User Profile Avatar / Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className={`flex items-center gap-2 p-1 pl-2 rounded-xl border transition-colors cursor-pointer ${
                isDark ? 'border-slate-800 bg-[#09111e]' : 'border-slate-200 bg-slate-100'
              }`}
            >
              <span className="text-xs font-semibold hidden md:inline truncate max-w-[100px]">
                {currentUser.name}
              </span>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-blue-500/40"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowUserDropdown(false)} 
                />
                <div className={`absolute right-0 top-12 w-56 rounded-xl border shadow-2xl z-40 p-2 text-xs animate-in fade-in duration-150 ${
                  isDark ? 'bg-[#0b1322] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className={`p-2 border-b mb-1 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <p className="font-semibold text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <span className="mt-1 inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                      {currentUser.accountType === 'personal' ? 'Client (Personal)' : 'Creator (Business)'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onOpenProfile();
                      setShowUserDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left cursor-pointer ${
                      isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('projects');
                      setShowUserDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left cursor-pointer ${
                      isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Project History</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </button>

                  <button
                    onClick={() => {
                      onOpenCreateProfile();
                      setShowUserDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left cursor-pointer ${
                      isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5 text-blue-400" />
                    <span>Register Profile in DB</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenSettings();
                      setShowUserDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left cursor-pointer ${
                      isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Settings & Languages</span>
                  </button>

                  <div className={`border-t my-1 ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-950/30 text-rose-400 text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Hamburger Menu button */}
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark 
                ? 'border-slate-800 bg-[#09111e] text-slate-400 hover:text-white' 
                : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="mt-2.5 flex items-center gap-2 md:hidden">
        <button
          onClick={onQuickBrandPromoClick}
          className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 flex items-center gap-1 shrink-0"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Brand Promos</span>
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.searchPlaceholder}
            className={`w-full rounded-xl px-3 py-2 text-xs focus:outline-none border ${
              isDark ? 'bg-[#0a1220] border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
            }`}
          />
        </div>
      </div>
    </header>
  );
};
