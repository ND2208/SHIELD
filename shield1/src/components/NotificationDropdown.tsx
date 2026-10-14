import React from 'react';
import { Bell, CheckCheck, Sparkles, MessageSquare, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#0b1322] border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-[#080e1a]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-white">Notifications</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-800/60">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No notifications yet.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectNotification(item);
                  onClose();
                }}
                className={`p-4 flex gap-3 hover:bg-slate-800/40 cursor-pointer transition-colors ${
                  !item.read ? 'bg-blue-950/20' : ''
                }`}
              >
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs truncate ${!item.read ? 'font-semibold text-white' : 'font-medium text-slate-300'}`}>
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-500 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                </div>
                {!item.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 self-center" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#080e1a] border-t border-slate-800/80 text-center">
          <span className="text-[11px] text-slate-400">All updates synced in real-time</span>
        </div>
      </div>
    </>
  );
};
