import React from 'react';
import { 
  Search, 
  X, 
  Star, 
  MapPin, 
  Bookmark, 
  CheckCircle2, 
  SlidersHorizontal,
  Phone, 
  Mail 
} from 'lucide-react';
import { Creator, SearchFilters } from '../types';
import { allCreatorNiches } from '../data/mockData';

interface SearchResultsViewProps {
  creators: Creator[];
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSelectCreator: (creator: Creator) => void;
  savedCreatorIds: string[];
  onToggleBookmark: (id: string) => void;
  onClearFilters: () => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  creators,
  filters,
  onFilterChange,
  onSelectCreator,
  savedCreatorIds,
  onToggleBookmark,
  onClearFilters
}) => {
  const allCategories = ['Video Editing', 'Design', 'Development', 'Content Writing', 'Marketing'];
  const experienceLevels = ['All', 'Beginner', 'Intermediate', 'Expert'];
  const locations = ['All Locations', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Goa'];

  // Handle category toggle
  const handleCategoryToggle = (category: string) => {
    const exists = filters.categories.includes(category);
    const updated = exists 
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: updated });
  };

  // Handle niche toggle
  const handleNicheToggle = (niche: string) => {
    const niches = filters.niches || [];
    const exists = niches.includes(niche);
    const updated = exists 
      ? niches.filter(n => n !== niche)
      : [...niches, niche];
    onFilterChange({ ...filters, niches: updated });
  };

  // Filter creators
  const filtered = creators.filter(c => {
    // Keyword match
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      const inName = c.name.toLowerCase().includes(q);
      const inRole = c.role.toLowerCase().includes(q);
      const inSkills = c.skills.some(s => s.toLowerCase().includes(q));
      const inCat = c.category.toLowerCase().includes(q);
      const inNiche = c.primaryNiche.toLowerCase().includes(q);
      if (!inName && !inRole && !inSkills && !inCat && !inNiche) return false;
    }

    // Category filter
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(c.category)) return false;
    }

    // Niche filter
    if (filters.niches && filters.niches.length > 0) {
      const matchesNiche = filters.niches.includes(c.primaryNiche) || 
        c.secondaryNiches?.some(n => filters.niches.includes(n));
      if (!matchesNiche) return false;
    }

    // Experience filter
    if (filters.experienceLevel !== 'All') {
      if (c.experienceLevel !== filters.experienceLevel) return false;
    }

    // Location filter
    if (filters.location !== 'All Locations') {
      if (!c.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    }

    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    if (filters.sortBy === 'projects') return b.projectsCount - a.projectsCount;
    return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Search Input */}
      <div className="relative max-w-2xl">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
            placeholder="Search creators, gaming, wedding, thumbnails, brand promos..."
            className="w-full bg-[#0b1322] border border-blue-500/40 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xl"
          />
          {filters.query && (
            <button
              onClick={() => onFilterChange({ ...filters, query: '' })}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Left Filters + Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filters Sidebar */}
        <aside className="lg:col-span-3 bg-[#09111e] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              <h3 className="font-bold text-sm text-white">Filters</h3>
            </div>
            <button
              onClick={onClearFilters}
              className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Specialized Niches Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase text-slate-300 tracking-wider">Creator Niches</h4>
              {filters.niches && filters.niches.length > 0 && (
                <span className="text-[10px] text-blue-400 font-bold">{filters.niches.length}</span>
              )}
            </div>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {allCreatorNiches.map(niche => (
                <label key={niche} className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={(filters.niches || []).includes(niche)}
                    onChange={() => handleNicheToggle(niche)}
                    className="w-4 h-4 rounded bg-[#070d18] border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span>{niche}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Checkboxes */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Broad Category</h4>
            <div className="space-y-2">
              {allCategories.map(cat => (
                <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="w-4 h-4 rounded bg-[#070d18] border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level Radios */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Experience Level</h4>
            <div className="space-y-2">
              {experienceLevels.map(exp => (
                <label key={exp} className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={exp}
                    checked={filters.experienceLevel === exp}
                    onChange={(e) => onFilterChange({ ...filters, experienceLevel: e.target.value })}
                    className="w-4 h-4 text-blue-600 bg-[#070d18] border-slate-700 focus:ring-0 cursor-pointer"
                  />
                  <span>{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Location</h4>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              className="w-full bg-[#070d18] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Right Search Results */}
        <main className="lg:col-span-9 space-y-6">
          {/* Results Summary & Sort By */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#09111e]/60 p-4 rounded-xl border border-slate-800/80">
            <div>
              <h2 className="text-xl font-bold text-white">Search Results</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Found {sorted.length} {sorted.length === 1 ? 'creator' : 'creators'} 
                {filters.query ? ` for "${filters.query}"` : ''}
                {filters.niches && filters.niches.length > 0 ? ` matching [${filters.niches.join(', ')}]` : ''}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
                className="bg-[#0b1322] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviews</option>
                <option value="projects">Completed Projects</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map(creator => {
                const isSaved = savedCreatorIds.includes(creator.id);
                return (
                  <div
                    key={creator.id}
                    onClick={() => onSelectCreator(creator)}
                    className="group bg-[#09111e] hover:bg-[#0c1626] border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-lg"
                  >
                    {/* Top Niche Badge & Bookmark */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {creator.primaryNiche}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(creator.id);
                        }}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          isSaved ? 'text-blue-400 bg-blue-500/15' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-400' : ''}`} />
                      </button>
                    </div>

                    {/* Avatar & Info */}
                    <div className="flex flex-col items-center text-center mt-3 space-y-2">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-18 h-18 rounded-full object-cover border-2 border-slate-700 group-hover:border-blue-500 transition-colors shadow-md"
                      />
                      <div>
                        <div className="flex items-center justify-center gap-1.5">
                          <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                            {creator.name}
                          </h4>
                          {creator.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{creator.role}</p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-300">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{creator.rating.toFixed(1)}</span>
                          <span className="text-slate-500">({creator.reviewsCount})</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{creator.city}</span>
                        </div>
                      </div>

                      {/* Direct connect badges */}
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Phone className="w-3 h-3 text-blue-400" />
                          Call
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Mail className="w-3 h-3 text-sky-400" />
                          Email
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="pt-4 mt-3 border-t border-slate-800/60">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCreator(creator);
                        }}
                        className="w-full py-2.5 rounded-xl font-medium text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
                      >
                        View Edits & Contact
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#09111e] rounded-2xl border border-slate-800 space-y-3">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No creators found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching with different keywords, relaxing your category or niche filters, or selecting "All Locations".
              </p>
              <button
                onClick={onClearFilters}
                className="mt-2 px-4 py-2 bg-blue-600 text-xs font-semibold rounded-xl text-white hover:bg-blue-500 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
