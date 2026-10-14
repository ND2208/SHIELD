import React from 'react';
import { 
  Flame, 
  Video, 
  Gamepad2, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  Compass, 
  FileText, 
  Image as ImageIcon,
  ArrowRight,
  Star
} from 'lucide-react';
import { CreatorNiche, ThemeMode } from '../types';

export interface MarqueeItem {
  id: string;
  niche: CreatorNiche;
  title: string;
  tagline: string;
  stat: string;
  creatorName: string;
  creatorAvatar: string;
  previewImage: string;
  gradient: string;
  glowColor: string;
  badgeBg: string;
  icon: React.ReactNode;
}

export const marqueeCreatorItems: MarqueeItem[] = [
  {
    id: 'm_brand',
    niche: 'Brand Promotion',
    title: 'Brand Promoters & Ads',
    tagline: '50M+ Views & Television-Grade Commercials',
    stat: '4.9 • 52 Campaigns',
    creatorName: 'Devanshi Shah & Arjun Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    glowColor: 'hover:shadow-orange-500/30 hover:border-orange-400',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    icon: <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
  },
  {
    id: 'm_personal',
    niche: 'Personal Video Editors',
    title: 'Personal Video Editors',
    tagline: 'Viral Reels, Shorts & Pacing Retention',
    stat: '4.9 • 99% Retention',
    creatorName: 'Ryan Patel & Kunal Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-violet-600 via-purple-500 to-indigo-500',
    glowColor: 'hover:shadow-purple-500/30 hover:border-purple-400',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    icon: <Video className="w-4 h-4 text-purple-400" />
  },
  {
    id: 'm_animations',
    niche: 'Animations',
    title: '3D Animations & Motion',
    tagline: 'Unreal Engine 5 & Blender 3D CGI',
    stat: '5.0 • Photoreal 4K',
    creatorName: 'Alisha Menon & MetaRealm',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-cyan-500 via-blue-500 to-sky-600',
    glowColor: 'hover:shadow-cyan-500/30 hover:border-cyan-400',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    icon: <Sparkles className="w-4 h-4 text-cyan-400" />
  },
  {
    id: 'm_gaming',
    niche: 'Gaming',
    title: 'Gaming Creators & Montages',
    tagline: 'Esports Frags, 3D Tracking & Kill Sync',
    stat: '4.9 • 8.4k Community',
    creatorName: 'Samir Joshi (Esports Editor)',
    creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-fuchsia-500 via-rose-500 to-indigo-600',
    glowColor: 'hover:shadow-fuchsia-500/30 hover:border-fuchsia-400',
    badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    icon: <Gamepad2 className="w-4 h-4 text-fuchsia-400" />
  },
  {
    id: 'm_wedding',
    niche: 'Wedding',
    title: 'Wedding Film Editors',
    tagline: 'Royal Palace Destination Films & Color Grading',
    stat: '5.0 • 78 Weddings',
    creatorName: 'Kabir Varma & Tanya Films',
    creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-amber-400 via-yellow-500 to-orange-400',
    glowColor: 'hover:shadow-yellow-500/30 hover:border-yellow-400',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    icon: <Heart className="w-4 h-4 text-yellow-400" />
  },
  {
    id: 'm_product',
    niche: 'Product Promotions',
    title: 'Product Promoters',
    tagline: 'Hardware Commercials & Apple-Style Unboxings',
    stat: '5.0 • 45 Product Drops',
    creatorName: 'Marcus Vance',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    glowColor: 'hover:shadow-emerald-500/30 hover:border-emerald-400',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: <ShoppingBag className="w-4 h-4 text-emerald-400" />
  },
  {
    id: 'm_travel',
    niche: 'Travel',
    title: 'Vloggers & Travel Films',
    tagline: 'Cinematic 4K Drone Passes & Expeditions',
    stat: '4.9 • 18 Countries',
    creatorName: 'Kabir Varma',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-rose-500 via-pink-500 to-orange-400',
    glowColor: 'hover:shadow-rose-500/30 hover:border-rose-400',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    icon: <Compass className="w-4 h-4 text-rose-400" />
  },
  {
    id: 'm_blog',
    niche: 'Blog Writing',
    title: 'Blog Writers & SEO',
    tagline: 'Google Page 1 Ranking Articles & Copywriting',
    stat: '4.8 • High-Intent Leads',
    creatorName: 'Pooja Sharma',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-teal-400 via-emerald-500 to-green-600',
    glowColor: 'hover:shadow-teal-500/30 hover:border-teal-400',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    icon: <FileText className="w-4 h-4 text-teal-400" />
  },
  {
    id: 'm_thumb',
    niche: 'Thumbnail',
    title: 'YouTube Thumbnail Designers',
    tagline: 'High-CTR YouTube Graphics & 3D Lighting',
    stat: '4.9 • 15%+ CTR Mastery',
    creatorName: 'Vikas Sharma',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80',
    gradient: 'from-red-500 via-amber-500 to-yellow-400',
    glowColor: 'hover:shadow-amber-500/30 hover:border-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: <ImageIcon className="w-4 h-4 text-amber-400" />
  }
];

interface NicheScrollingMarqueeProps {
  onSelectNiche: (niche: CreatorNiche) => void;
  theme?: ThemeMode;
  title?: string;
  subtitle?: string;
  variant?: 'main' | 'login' | 'compact';
}

export const NicheScrollingMarquee: React.FC<NicheScrollingMarqueeProps> = ({
  onSelectNiche,
  theme = 'dark',
  title = 'Featured Creator Specializations',
  subtitle = 'Click any category to instantly explore verified talent',
  variant = 'main'
}) => {
  const isDark = theme === 'dark';
  const loopItems = [...marqueeCreatorItems, ...marqueeCreatorItems];

  return (
    <div className={`w-full overflow-hidden select-none py-6 sm:py-8 ${
      variant === 'login' ? 'py-4' : ''
    }`}>
      {title && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500/20 to-sky-500/20 border border-blue-500/30 text-blue-400 mb-1.5">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Live Creator Niches</span>
            </div>
            <h3 className={`text-lg sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Interactive • Hover to Pause • Click to View</span>
          </div>
        </div>
      )}

      {/* Scrolling Strip Container */}
      <div className="relative w-full overflow-hidden mask-gradient-x">
        {/* Left & Right gradient edge fades */}
        <div className={`absolute top-0 bottom-0 left-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r ${
          isDark ? 'from-[#060b13] to-transparent' : 'from-slate-50 to-transparent'
        }`} />
        <div className={`absolute top-0 bottom-0 right-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l ${
          isDark ? 'from-[#060b13] to-transparent' : 'from-slate-50 to-transparent'
        }`} />

        {/* Marquee Track */}
        <div className="animate-marquee-infinite flex gap-4 sm:gap-6 py-2 px-4">
          {loopItems.map((item, index) => (
            <div
              key={`${item.id}_${index}`}
              onClick={() => onSelectNiche(item.niche)}
              className={`group relative w-64 sm:w-80 shrink-0 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden p-4 sm:p-5 flex flex-col justify-between shadow-lg hover:scale-[1.03] active:scale-95 ${
                item.glowColor
              } ${
                isDark 
                  ? 'bg-gradient-to-b from-[#0b1322]/95 to-[#080d18]/95 border-slate-800' 
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Vibrant Top Color Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient}`} />

              <div className="space-y-3">
                {/* Header Badge & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border backdrop-blur-md ${item.badgeBg}`}>
                    {item.icon}
                    <span>{item.niche}</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.stat.split(' ')[0].trim()}</span>
                  </span>
                </div>

                {/* Thumbnail Preview Banner */}
                <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-slate-900 group-hover:shadow-md transition-shadow">
                  <img
                    src={item.previewImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Creator Info Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.creatorAvatar}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-white/60 shrink-0"
                      />
                      <span className="text-[11px] font-medium text-white truncate max-w-[140px] drop-shadow-md">
                        {item.creatorName}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-300 font-mono bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h4 className={`text-sm font-bold tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${item.gradient} transition-colors`}>
                    {item.title}
                  </h4>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Direct CTA button */}
              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                isDark ? 'border-slate-800/80 text-blue-400' : 'border-slate-100 text-blue-600'
              }`}>
                <span>View Specialist Creators</span>
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
