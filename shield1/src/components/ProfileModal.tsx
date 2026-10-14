import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Sparkles, 
  Check, 
  RefreshCw,
  Star
} from 'lucide-react';
import { UserProfile, Creator, CreatorNiche } from '../types';
import { allCreatorNiches } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onSwitchRole: () => void;
  savedCreators: Creator[];
  onSelectCreator: (creator: Creator) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onSwitchRole,
  savedCreators,
  onSelectCreator
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks'>('profile');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp || user.phone);
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || 'Bangalore, India');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Client Creator Specifications & Niches
  const [targetNiches, setTargetNiches] = useState<CreatorNiche[]>(
    user.targetNiches || ['Brand Promotion', 'Personal Video Editors', 'Thumbnail']
  );

  // Creator Primary Niche
  const [primaryNiche, setPrimaryNiche] = useState<CreatorNiche>(
    user.primaryNiche || 'Brand Promotion'
  );

  if (!isOpen) return null;

  const toggleTargetNiche = (niche: CreatorNiche) => {
    if (targetNiches.includes(niche)) {
      setTargetNiches(targetNiches.filter(n => n !== niche));
    } else {
      setTargetNiches([...targetNiches, niche]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      phone,
      whatsapp,
      bio,
      location,
      targetNiches: user.role === 'client' ? targetNiches : undefined,
      primaryNiche: user.role === 'creator' ? primaryNiche : undefined,
      preferences: user.role === 'client' ? targetNiches : user.preferences
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#09111e] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">{user.name}</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  {user.accountType === 'personal' ? 'Personal Account' : 'Business Account'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Role Switcher Banner */}
        <div className="p-3 bg-[#0c1626] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300">
              Current Mode: <strong className="text-white capitalize">{user.role}</strong> ({user.accountType} account)
            </span>
          </div>
          <button
            onClick={() => {
              onSwitchRole();
              onClose();
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-[11px] transition-colors cursor-pointer"
          >
            Switch to {user.role === 'client' ? 'Creator (Business)' : 'Client (Personal)'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 transition-colors relative cursor-pointer ${
              activeTab === 'profile' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Profile & Specifications
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`pb-2.5 transition-colors relative cursor-pointer ${
              activeTab === 'bookmarks' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved Creators ({savedCreators.length})
            {activeTab === 'bookmarks' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        </div>

        {activeTab === 'profile' ? (
          <form onSubmit={handleSave} className="space-y-5">
            {savedSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Profile specifications updated successfully!</span>
              </div>
            )}

            {/* CLIENT SPECIFIC: CREATOR NICHE SPECIFICATIONS */}
            {user.role === 'client' && (
              <div className="p-4 rounded-2xl bg-[#0c1626] border border-blue-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Target Creator Specifications ({targetNiches.length} active)
                    </h4>
                  </div>
                  <span className="text-[11px] text-blue-300 font-medium">Select desired creators</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Select the exact creator types and video niches you need. Shield will prioritize and curate your personal feed based on these desires:
                </p>
                {/* Niches Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {allCreatorNiches.map((niche) => {
                    const isSelected = targetNiches.includes(niche);
                    return (
                      <button
                        key={niche}
                        type="button"
                        onClick={() => toggleTargetNiche(niche)}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400'
                            : 'bg-[#070d18] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{niche}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CREATOR SPECIFIC: PRIMARY SPECIALIZATION CATEGORY */}
            {user.role === 'creator' && (
              <div className="p-4 rounded-2xl bg-[#0c1626] border border-blue-500/40 space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Primary Creator Category / Specialization</span>
                </label>
                <select
                  value={primaryNiche}
                  onChange={(e) => setPrimaryNiche(e.target.value as CreatorNiche)}
                  className="w-full bg-[#070d18] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {allCreatorNiches.map(niche => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400">
                  Clients searching for {primaryNiche} will discover your portfolio and edits.
                </p>
              </div>
            )}

            {/* Basic Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Email Address (To Connect)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Mobile Number (For Calls & SMS)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">WhatsApp Contact Number</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Bio / Creative Goals</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-xs text-white focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold rounded-xl text-white shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Save Profile & Specifications
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {savedCreators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedCreators.map((creator) => (
                  <div
                    key={creator.id}
                    onClick={() => {
                      onSelectCreator(creator);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-[#070d18] border border-slate-800 hover:border-blue-500/50 flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{creator.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{creator.role}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-semibold">
                          {creator.primaryNiche}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{creator.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 bg-[#070d18] rounded-xl border border-slate-800">
                You haven't bookmarked any creators yet. Click the bookmark icon on any creator card to save them here.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
