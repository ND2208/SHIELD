import React, { useState } from 'react';
import { 
  Star, 
  Bookmark, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ThumbsUp, 
  Award, 
  FolderGit2 
} from 'lucide-react';
import { Creator, UserProfile, CreatorNiche, ThemeMode, LanguageCode } from '../types';
import { allCreatorNiches } from '../data/mockData';
import { translations } from '../i18n/translations';

interface PersonalizedFeedProps {
  currentUser: UserProfile;
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  onOpenPreferencesModal: () => void;
  savedCreatorIds: string[];
  onToggleBookmark: (creatorId: string) => void;
  theme?: ThemeMode;
  language?: LanguageCode;
  onNavigateToProjects?: () => void;
}

export const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({
  currentUser,
  creators,
  onSelectCreator,
  onOpenPreferencesModal,
  savedCreatorIds,
  onToggleBookmark,
  theme = 'dark',
  language = 'en',
  onNavigateToProjects
}) => {
  const [selectedCategory] = useState<string>('All');
  const [selectedNiche, setSelectedNiche] = useState<string>('All');
  const [filterMode, setFilterMode] = useState<'all' | 'personalized'>('all');
  const [sortBy, setSortBy] = useState<'recommendation' | 'rating' | 'reviews'>('recommendation');

  const t = translations[language] || translations.en;
  const isDark = theme === 'dark';

  // Helper to check if creator matches client specifications
  const matchesPreferences = (creator: Creator): boolean => {
    if (currentUser.targetNiches && currentUser.targetNiches.length > 0) {
      if (currentUser.targetNiches.includes(creator.primaryNiche)) return true;
      if (creator.secondaryNiches?.some(n => currentUser.targetNiches?.includes(n))) return true;
    }
    if (!currentUser.preferences || currentUser.preferences.length === 0) return true;
    return (
      currentUser.preferences.some(pref => 
        creator.primaryNiche.toLowerCase().includes(pref.toLowerCase()) ||
        pref.toLowerCase().includes(creator.primaryNiche.toLowerCase()) ||
        creator.skills.some(skill => 
          skill.toLowerCase().includes(pref.toLowerCase()) || 
          pref.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  };

  // Filter creators
  const filteredCreators = creators.filter(creator => {
    const matchesCat = selectedCategory === 'All' || creator.category === selectedCategory;
    const matchesNicheFilter = selectedNiche === 'All' || 
      creator.primaryNiche === selectedNiche || 
      creator.secondaryNiches?.includes(selectedNiche as CreatorNiche);
    
    if (filterMode === 'personalized') {
      return matchesCat && matchesNicheFilter && matchesPreferences(creator);
    }
    return matchesCat && matchesNicheFilter;
  });

  // Sort
  const sortedCreators = [...filteredCreators].sort((a, b) => {
    if (sortBy === 'recommendation') {
      const aMatch = matchesPreferences(a) ? 10 : 0;
      const bMatch = matchesPreferences(b) ? 10 : 0;
      return (b.recommendationScore + bMatch) - (a.recommendationScore + aMatch);
    }
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount;
  });

  return (
    <section className={`py-8 sm:py-12 border-t transition-colors ${
      isDark ? 'border-slate-800/80 bg-[#060b13]' : 'border-slate-200 bg-slate-50/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                Tailored Creator Directory
              </span>
              {currentUser.role === 'client' && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-medium">
                  {t.clientFeed}
                </span>
              )}
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.featuredCreators}
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Find verified creators for brand promotions, gaming montages, 3D animations, wedding films, and thumbnails.
            </p>
          </div>

          {/* Client Personalization Quick Banner / Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            {currentUser.role === 'client' && (
              <>
                <button
                  onClick={() => setFilterMode(filterMode === 'personalized' ? 'all' : 'personalized')}
                  className={`py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    filterMode === 'personalized'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : isDark ? 'bg-[#0b1322] text-slate-300 border border-slate-800 hover:border-slate-700' : 'bg-white text-slate-700 border border-slate-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>{filterMode === 'personalized' ? t.showingMatchesOnly : t.myRecommended}</span>
                </button>

                <button
                  onClick={onOpenPreferencesModal}
                  className={`py-2 px-3.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border ${
                    isDark ? 'bg-[#0b1322] text-slate-300 border-slate-800 hover:border-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.preferences} ({currentUser.targetNiches?.length || currentUser.preferences.length})</span>
                </button>

                {onNavigateToProjects && (
                  <button
                    onClick={onNavigateToProjects}
                    className="py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Project Collaborations</span>
                  </button>
                )}
              </>
            )}

            {/* Recommendation Sort selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`rounded-xl px-2.5 py-2 text-xs border cursor-pointer font-medium ${
                  isDark ? 'bg-[#0b1322] border-slate-800 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                }`}
              >
                <option value="recommendation">Top Recommendation & Satisfaction</option>
                <option value="rating">Highest Star Rating</option>
                <option value="reviews">Most Client Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Specialized Creator Niches Filter Pills */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className={`font-semibold uppercase tracking-wider text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Filter by Creator Specialization:
            </span>
            {selectedNiche !== 'All' && (
              <button 
                onClick={() => setSelectedNiche('All')} 
                className="text-blue-500 hover:text-blue-400 cursor-pointer font-medium"
              >
                Reset Niche
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedNiche('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedNiche === 'All'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : isDark ? 'bg-[#0c1626] text-slate-400 hover:text-slate-200 border border-slate-800' : 'bg-white text-slate-600 border border-slate-300'
              }`}
            >
              {t.allNiches}
            </button>
            {allCreatorNiches.map((niche) => {
              const isActive = selectedNiche === niche;
              return (
                <button
                  key={niche}
                  onClick={() => setSelectedNiche(niche)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : isDark ? 'bg-[#0c1626] text-slate-400 hover:text-slate-200 hover:bg-[#101c30] border border-slate-800/80' : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {niche}
                </button>
              );
            })}
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
          {sortedCreators.map((creator) => {
            const isSaved = savedCreatorIds.includes(creator.id);
            return (
              <div
                key={creator.id}
                onClick={() => onSelectCreator(creator)}
                className={`group relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-lg border ${
                  isDark 
                    ? 'bg-[#09111e] hover:bg-[#0c1626] border-slate-800/80 hover:border-blue-500/50 hover:shadow-blue-500/5' 
                    : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-blue-400 hover:shadow-xl'
                }`}
              >
                {/* Top Badge: Recommendation Badge & Bookmark */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 border border-blue-500/25 px-2 py-0.5 rounded-md">
                      {creator.primaryNiche}
                    </span>
                    {creator.recommendationBadge && (
                      <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Award className="w-2.5 h-2.5" />
                        <span>{creator.recommendationBadge}</span>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(creator.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ml-auto cursor-pointer ${
                      isSaved
                        ? 'text-blue-500 bg-blue-500/15'
                        : isDark ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    aria-label="Bookmark creator"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-500' : ''}`} />
                  </button>
                </div>

                {/* Avatar & Header */}
                <div className="flex flex-col items-center text-center mt-2 space-y-2">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-700/80 group-hover:border-blue-500 transition-colors shadow-md"
                    />
                    {creator.available && (
                      <span 
                        className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#09111e]" 
                        title="Available for projects"
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5">
                      <h3 className={`font-bold text-base group-hover:text-blue-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {creator.name}
                      </h3>
                      {creator.verified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 font-medium line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {creator.role}
                    </p>
                  </div>

                  {/* Rating & Recommendation Score Pill */}
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{creator.rating.toFixed(1)}</span>
                      <span className="opacity-70 text-[11px]">({creator.reviewsCount})</span>
                    </div>
                    <span className="text-slate-500">•</span>
                    <div className="flex items-center gap-1 text-emerald-500 font-semibold text-[11px]">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{creator.recommendationScore}% {t.satisfaction}</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {creator.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className={`text-[11px] px-2 py-0.5 rounded-md border ${
                          isDark ? 'bg-[#050a12] border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Quick Client Reach Toolbar: Call & WhatsApp */}
                  <div className="w-full pt-2 flex items-center justify-center gap-2 text-xs" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`tel:${creator.phone}`}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/15 text-blue-500 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1 font-semibold text-[11px]"
                      title={`Call ${creator.phone}`}
                    >
                      <Phone className="w-3 h-3" />
                      <span>{t.directCall}</span>
                    </a>
                    {creator.whatsapp && (
                      <a
                        href={`https://wa.me/${creator.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/15 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-colors flex items-center gap-1 font-semibold text-[11px]"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{t.directWhatsapp}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom View Profile Button */}
                <div className={`pt-3 mt-3 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-100'}`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCreator(creator);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    {t.viewWorksContact}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {sortedCreators.length === 0 && (
          <div className={`text-center py-16 rounded-2xl border ${isDark ? 'bg-[#09111e] border-slate-800' : 'bg-white border-slate-200'}`}>
            <p className="text-slate-400 text-sm">No creators found matching this niche.</p>
            <button
              onClick={() => { setSelectedNiche('All'); setFilterMode('all'); }}
              className="mt-3 px-4 py-2 bg-blue-600 text-xs font-semibold rounded-lg text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
