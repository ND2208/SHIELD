import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Upload, 
  Video, 
  Check, 
  Briefcase, 
  User, 
  FileCheck 
} from 'lucide-react';
import { Creator, CreatorNiche, UserRole, UserProfile } from '../types';
import { allCreatorNiches } from '../data/mockData';

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: (newCreator?: Creator, newClient?: UserProfile) => void;
  theme: 'dark' | 'light';
}

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileCreated,
  theme
}) => {
  const [role, setRole] = useState<UserRole>('creator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [whatsapp, setWhatsapp] = useState('+91 ');
  const [location, setLocation] = useState('Bangalore, India');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('$50/hr');
  const [primaryNiche, setPrimaryNiche] = useState<CreatorNiche>('Brand Promotion');
  const [experienceLevel, setExperienceLevel] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Expert');

  // File upload state for avatar & portfolio from device
  const [avatarPreview, setAvatarPreview] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80');
  const [avatarFileName, setAvatarFileName] = useState<string>('');
  const [workTitle, setWorkTitle] = useState('Featured Debut Video Reel');
  const [workFilePreview, setWorkFilePreview] = useState<string>('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80');
  const [workFileName, setWorkFileName] = useState<string>('');
  const [workDuration, setWorkDuration] = useState('1:30');

  if (!isOpen) return null;

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFileName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const handleWorkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWorkFileName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setWorkFilePreview(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (role === 'creator') {
      const newCreator: Creator = {
        id: `cr_db_${Date.now()}`,
        name,
        email,
        phone,
        whatsapp: whatsapp || phone,
        verified: true,
        role: `${primaryNiche} Specialist`,
        category: 'Video Editing',
        primaryNiche,
        rating: 5.0,
        reviewsCount: 1,
        followers: '1.2k',
        projectsCount: 1,
        location,
        city: location.split(',')[0].trim(),
        experienceLevel,
        available: true,
        avatar: avatarPreview,
        skills: [primaryNiche, 'Premiere Pro', 'After Effects', 'Color Grading'],
        about: bio || `Specialist in ${primaryNiche} crafting high-impact videos and content.`,
        hourlyRate,
        responseTime: '< 30 mins',
        recommendationScore: 100,
        recommendationBadge: 'Newly Verified Talent',
        completedCampaignsCount: 1,
        portfolio: [
          {
            id: `port_init_${Date.now()}`,
            title: workTitle,
            category: primaryNiche,
            duration: workDuration,
            year: '2026',
            thumbnail: workFilePreview,
            description: 'Showcase work uploaded directly from creator device.',
            clientName: 'Featured Launch',
            isFileUpload: Boolean(workFileName)
          }
        ],
        reviews: [
          {
            id: `rev_init_${Date.now()}`,
            clientName: 'Shield Verified Client',
            clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
            rating: 5.0,
            date: 'Just now',
            projectTitle: workTitle,
            comment: 'Onboarded to the Shield Verified Creator Network with verified credentials.'
          }
        ]
      };
      onProfileCreated(newCreator, undefined);
    } else {
      const newClient: UserProfile = {
        id: `usr_db_${Date.now()}`,
        name,
        email,
        phone,
        whatsapp: whatsapp || phone,
        role: 'client',
        accountType: 'personal',
        avatar: avatarPreview,
        preferences: [primaryNiche, 'Video Editing', 'Design'],
        targetNiches: [primaryNiche],
        location,
        bio: bio || `Brand producer seeking elite ${primaryNiche} creators.`
      };
      onProfileCreated(undefined, newClient);
    }
    onClose();
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-[#09111e] border border-slate-800 text-slate-100' : 'bg-white border border-slate-200 text-slate-800 shadow-xl'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Register New Profile in Database</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Add a new creator or client profile directly to the active Shield marketplace database
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:opacity-75 transition-opacity cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Toggle */}
        <div className={`grid grid-cols-2 p-1 rounded-xl border ${isDark ? 'bg-[#070d18] border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <button
            type="button"
            onClick={() => setRole('creator')}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              role === 'creator'
                ? 'bg-blue-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>I'm a Creator (Business Account)</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              role === 'client'
                ? 'bg-blue-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>I'm a Client (Personal Account)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar device file upload */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#070d18] border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-3`}>
            <label className="text-xs font-bold uppercase tracking-wider block">Profile Photo (Upload from Device)</label>
            <div className="flex items-center gap-4">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md shrink-0"
              />
              <div className="flex-1 space-y-1.5">
                <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    className="hidden"
                  />
                </label>
                {avatarFileName && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <FileCheck className="w-3 h-3" />
                    <span>Selected: {avatarFileName}</span>
                  </p>
                )}
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>PNG, JPG, or WEBP up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Lin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Email Address (To Connect) *</label>
              <input
                type="email"
                required
                placeholder="maya.lin@shield.studio"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Mobile Phone (Direct Call) *</label>
              <input
                type="text"
                required
                placeholder="+91 98450 99881"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">WhatsApp Number</label>
              <input
                type="text"
                placeholder="+91 98450 99881"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Specialization Niche *</label>
              <select
                value={primaryNiche}
                onChange={(e) => setPrimaryNiche(e.target.value as CreatorNiche)}
                className={`w-full rounded-xl px-3 py-2.5 text-xs focus:outline-none border cursor-pointer ${
                  isDark ? 'bg-[#070d18] border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                {allCreatorNiches.map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Location</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, India / London, UK"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          {role === 'creator' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Hourly Rate</label>
                  <input
                    type="text"
                    placeholder="$55/hr"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                      isDark ? 'bg-[#070d18] border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className={`w-full rounded-xl px-3 py-2.5 text-xs focus:outline-none border cursor-pointer ${
                      isDark ? 'bg-[#070d18] border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Beginner">Beginner (1-2 years)</option>
                    <option value="Intermediate">Intermediate (2-4 years)</option>
                    <option value="Expert">Expert (5+ years)</option>
                  </select>
                </div>
              </div>

              {/* Creator Work / Video File Upload from Device */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#070d18] border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-blue-400" />
                    <span>Upload Debut Video / Work File (From Device)</span>
                  </label>
                  <span className="text-[10px] text-blue-400 font-medium">Local Device Access</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">Work Title</span>
                    <input
                      type="text"
                      value={workTitle}
                      onChange={(e) => setWorkTitle(e.target.value)}
                      className={`w-full rounded-lg px-2.5 py-1.5 text-xs border ${
                        isDark ? 'bg-[#09111e] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">Duration</span>
                    <input
                      type="text"
                      value={workDuration}
                      onChange={(e) => setWorkDuration(e.target.value)}
                      className={`w-full rounded-lg px-2.5 py-1.5 text-xs border ${
                        isDark ? 'bg-[#09111e] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-semibold cursor-pointer border border-slate-700">
                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                    <span>Select Video/Thumbnail File</span>
                    <input
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleWorkFileChange}
                      className="hidden"
                    />
                  </label>
                  {workFileName ? (
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{workFileName}</span>
                    </span>
                  ) : (
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>No custom file selected (Default showcase applied)</span>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium">Bio / About Profile</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell clients about your creative passion, clients served, and style..."
              className={`w-full rounded-xl p-3 text-xs focus:outline-none border resize-none ${
                isDark ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
              }`}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:opacity-80 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save & Publish to Database</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
