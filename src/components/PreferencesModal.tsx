import React, { useState } from 'react';
import { X, Sparkles, Check, Briefcase } from 'lucide-react';
import { allCreatorNiches, allSkillTags } from '../data/mockData';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences: string[];
  onSavePreferences: (prefs: string[]) => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  currentPreferences,
  onSavePreferences
}) => {
  const [selected, setSelected] = useState<string[]>(currentPreferences);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(t => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  };

  const handleSave = () => {
    onSavePreferences(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#0b1322] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-100 space-y-6 max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Client Feed & Creator Preferences</h3>
              <p className="text-xs text-slate-400">Tune your personalized feed by selecting specific creator niches & skills</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Creator Categories / Niches */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Specialized Creator Niches</span>
            </label>
            <span className="text-[10px] text-blue-300 font-mono">Prioritizes matching creators</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allCreatorNiches.map((niche) => {
              const isSelected = selected.includes(niche);
              return (
                <button
                  key={niche}
                  type="button"
                  onClick={() => toggleTag(niche)}
                  className={`p-2 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
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

        {/* Section 2: Technical Skills */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Technical Creative Skills
          </label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
            {allSkillTags.map((tag) => {
              const isSelected = selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-[#070d18] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
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
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold rounded-xl text-white shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            Apply to My Feed
          </button>
        </div>
      </div>
    </div>
  );
};
