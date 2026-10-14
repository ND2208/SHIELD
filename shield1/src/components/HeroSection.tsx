import React from 'react';
import { ShieldCheck, Lock, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onLearnMoreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onLearnMoreClick
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:py-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Split grid: Content on left, Hero Visual on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-4">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Talented Creators.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400">
                  Real Opportunities.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Shield connects businesses with skilled creators and helps talent turn their skills into success.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Creators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onLearnMoreClick}
                className="py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-300 bg-[#0c1626] hover:bg-[#111f36] border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Verified Creators</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Trusted & authentic profiles</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Secure Payments</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Safe & seamless transactions</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Grow Together</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">For a better creative future</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl min-h-[340px] sm:min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=900&auto=format&fit=crop&q=80" 
              alt="Creative editing workstation"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            {/* Overlay scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b13]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#060b13]/70 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-slate-200">
              Create • Build • Grow
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
