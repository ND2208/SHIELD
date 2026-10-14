import React from 'react';
import { 
  AlertCircle, 
  Calendar, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { ProjectCollaboration, MilestoneStatus, ThemeMode } from '../types';

interface ProjectTimelineStatusBarProps {
  project: ProjectCollaboration;
  theme?: ThemeMode;
  userRole: 'client' | 'creator';
  onAdvanceMilestone?: (milestoneId: string) => void;
  onRequestRevision?: (milestoneId: string) => void;
  compact?: boolean;
}

export const ProjectTimelineStatusBar: React.FC<ProjectTimelineStatusBarProps> = ({
  project,
  theme = 'dark',
  userRole,
  onAdvanceMilestone,
  compact = false
}) => {
  const isDark = theme === 'dark';
  const { milestones, progressPercentage, status } = project;

  const getStatusColor = (msStatus: MilestoneStatus) => {
    switch (msStatus) {
      case 'completed':
        return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/40';
      case 'in_progress':
        return 'text-blue-400 bg-blue-500/20 border-blue-500 ring-4 ring-blue-500/20 animate-pulse';
      case 'revision':
        return 'text-amber-400 bg-amber-500/20 border-amber-500 ring-4 ring-amber-500/20';
      case 'pending':
      default:
        return isDark 
          ? 'text-slate-500 bg-slate-800/80 border-slate-700' 
          : 'text-slate-400 bg-slate-100 border-slate-300';
    }
  };

  const getStatusIcon = (msStatus: MilestoneStatus, index: number) => {
    switch (msStatus) {
      case 'completed':
        return <Check className="w-3.5 h-3.5 stroke-[3]" />;
      case 'in_progress':
        return <RefreshCw className="w-3.5 h-3.5 animate-spin" />;
      case 'revision':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'pending':
      default:
        return <span className="text-[11px] font-bold">{index + 1}</span>;
    }
  };

  return (
    <div className={`space-y-4 ${compact ? '' : 'p-4 sm:p-5 rounded-2xl border transition-colors ' + (
      isDark ? 'bg-[#091220]/70 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
    )}`}>
      {/* Top Header: Progress percentage & current stage badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Collaboration Timeline
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
            status === 'completed'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : status === 'in_review'
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
          }`}>
            {status === 'completed' ? 'Completed' : status === 'in_review' ? 'Needs Review' : 'In Progress'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-slate-400">
            Progress: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{progressPercentage}%</strong>
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400">
            Target: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{project.deadline}</strong>
          </span>
        </div>
      </div>

      {/* Visual Status Bar (Dynamic gradient fill) */}
      <div className="relative w-full h-3 rounded-full overflow-hidden bg-slate-800/50 border border-slate-700/50 p-0.5">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 transition-all duration-700 ease-out shadow-lg shadow-blue-500/30"
          style={{ width: `${Math.min(100, Math.max(5, progressPercentage))}%` }}
        />
      </div>

      {/* Interactive Horizontal Timeline Stepper */}
      <div className="relative pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
          {milestones.map((ms, idx) => {
            const isCompleted = ms.status === 'completed';
            const isCurrent = ms.status === 'in_progress';
            const isRevision = ms.status === 'revision';
            
            return (
              <div 
                key={ms.id} 
                className={`relative flex flex-col p-3 rounded-xl border transition-all ${
                  isCurrent 
                    ? isDark 
                      ? 'bg-blue-950/30 border-blue-500/60 shadow-lg shadow-blue-500/10' 
                      : 'bg-blue-50 border-blue-300 shadow-sm'
                    : isCompleted
                    ? isDark
                      ? 'bg-emerald-950/15 border-emerald-500/30'
                      : 'bg-emerald-50/60 border-emerald-200'
                    : isRevision
                    ? isDark
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-amber-50 border-amber-200'
                    : isDark
                    ? 'bg-[#0c1626]/40 border-slate-800/70 opacity-70'
                    : 'bg-white border-slate-200 opacity-75'
                }`}
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono shrink-0 transition-transform ${getStatusColor(ms.status)}`}>
                    {getStatusIcon(ms.status, idx)}
                  </div>
                  
                  <span className="text-[10px] font-mono text-slate-400">
                    Step {idx + 1}
                  </span>
                </div>

                {/* Milestone Title */}
                <p className={`text-xs font-semibold leading-tight line-clamp-1 mb-1 ${
                  isCurrent 
                    ? 'text-blue-400' 
                    : isCompleted 
                    ? 'text-emerald-400' 
                    : isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {ms.title}
                </p>

                {/* Due Date & Deliverable summary */}
                <div className="mt-auto pt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">Due {ms.dueDate}</span>
                </div>

                {/* Interactive Status Tag */}
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : isCurrent 
                      ? 'bg-blue-500/20 text-blue-300 font-bold' 
                      : isRevision
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-slate-700/30 text-slate-400'
                  }`}>
                    {isCompleted ? 'Done' : isCurrent ? 'Active' : isRevision ? 'Needs Revision' : 'Pending'}
                  </span>

                  {/* Quick Action button if active */}
                  {isCurrent && onAdvanceMilestone && (
                    <button
                      onClick={() => onAdvanceMilestone(ms.id)}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold underline cursor-pointer"
                    >
                      {userRole === 'creator' ? 'Complete' : 'Approve'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
