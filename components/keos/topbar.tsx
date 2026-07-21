"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  MessageSquareText,
  Search,
} from "lucide-react";

type TopbarProps = {
  onMenuOpen: () => void;
  onSearchOpen: () => void;
};

export default function Topbar({
  onMenuOpen,
  onSearchOpen,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuOpen}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onSearchOpen}
        className="group flex h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left transition hover:border-slate-300 hover:bg-white sm:max-w-xl"
      >
        <Search className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#d02b3f]" />

        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-400">
          Search KEOS...
        </span>

        <kbd className="hidden rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-black text-slate-400 sm:block">
          CTRL K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="hidden h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-[#10233b] sm:flex"
        >
          <MessageSquareText className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-[#10233b]"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#d02b3f] ring-2 ring-white" />
        </button>

        <button
          type="button"
          className="flex h-11 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-2 pr-3 transition hover:bg-slate-50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#10233b] text-xs font-black text-white">
            BK
          </div>

          <div className="hidden text-left md:block">
            <p className="text-xs font-black text-[#10233b]">
              Badal Kumar
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Founder
            </p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
        </button>
      </div>
    </header>
  );
}