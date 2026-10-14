import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Shield, 
  Check, 
  Globe, 
  Sun, 
  Moon, 
  Palette
} from 'lucide-react';
import { UserProfile, ThemeMode, LanguageCode } from '../types';
import { languagesList, translations } from '../i18n/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  language,
  onLanguageChange
}) => {
  const [proposalUpdates, setProposalUpdates] = useState(true);
  const [smsOtpAuth, setSmsOtpAuth] = useState(true);
  const [currency, setCurrency] = useState('USD ($)');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const t = translations[language] || translations.en;
  const isDark = theme === 'dark';

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-[#09111e] border border-slate-800 text-slate-100' : 'bg-white border border-slate-200 text-slate-800'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">{t.settings}</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Appearance, multi-language, security and preferences
              </p>
            </div>
          </div>
          <button onClick={onClose} className="hover:opacity-75 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="space-y-5">
          {/* Section 1: Theme Switcher (Dark vs Light) */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <Palette className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.theme}</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                    : isDark ? 'bg-[#070d18] border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  <Moon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs">{t.darkMode}</p>
                  <p className="text-[10px] opacity-70">Deep Navy Glow</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onThemeChange('light')}
                className={`p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                  theme === 'light'
                    ? 'bg-blue-500/10 border-blue-500 text-blue-600 font-semibold'
                    : isDark ? 'bg-[#070d18] border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-amber-100 text-amber-600'}`}>
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs">{t.lightMode}</p>
                  <p className="text-[10px] opacity-70">Clean Studio White</p>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Multiple Languages */}
          <div className={`space-y-3 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.language} ({languagesList.length} Supported)</span>
            </h4>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className={`w-full rounded-xl px-3.5 py-3 text-xs focus:outline-none border cursor-pointer font-medium ${
                  isDark ? 'bg-[#070d18] border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500'
                }`}
              >
                {languagesList.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} • {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Changes titles, navigation, creator tags, and proposal buttons across the app.
            </p>
          </div>

          {/* Section 3: Notifications */}
          <div className={`space-y-3 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <Bell className="w-3.5 h-3.5 text-blue-500" />
              <span>Notifications & Proposal Alerts</span>
            </h4>
            
            <div className="space-y-2">
              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                isDark ? 'bg-[#070d18] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <p className="text-xs font-medium">Instant Proposal Alerts</p>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Get notified when creators respond or accept proposals</p>
                </div>
                <input
                  type="checkbox"
                  checked={proposalUpdates}
                  onChange={(e) => setProposalUpdates(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                isDark ? 'bg-[#070d18] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <p className="text-xs font-medium">SMS Mobile OTP Verification</p>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Require phone OTP for payments and contract signing</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsOtpAuth}
                  onChange={(e) => setSmsOtpAuth(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Section 4: Display Currency */}
          <div className={`space-y-2 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Billing Currency
            </h4>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`w-full rounded-xl px-3 py-2.5 text-xs focus:outline-none border cursor-pointer ${
                isDark ? 'bg-[#070d18] border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="USD ($)">USD ($) - US Dollar</option>
              <option value="INR (₹)">INR (₹) - Indian Rupee</option>
              <option value="EUR (€)">EUR (€) - Euro</option>
              <option value="GBP (£)">GBP (£) - British Pound</option>
              <option value="AED (د.إ)">AED (د.إ) - UAE Dirham</option>
            </select>
          </div>
        </div>

        <div className={`flex items-center justify-end gap-3 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:opacity-80 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold rounded-xl text-white shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
