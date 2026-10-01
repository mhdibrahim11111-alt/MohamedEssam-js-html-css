import React from 'react';
import { ViewMode } from '../types';
import { BookOpen, Terminal, Bug, Trophy, FileText, CheckCircle2, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  completedChaptersCount: number;
  totalChaptersCount: number;
  completedQuizzesCount: number;
  totalQuizzesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  completedChaptersCount,
  totalChaptersCount,
  completedQuizzesCount,
  totalQuizzesCount,
}) => {
  const progressPercent = Math.round(
    ((completedChaptersCount + completedQuizzesCount) / (totalChaptersCount + totalQuizzesCount)) * 100
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
            كود
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                كود بالمصري
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  منصة تفاعلية + تدقيق
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              المنهاج التفاعلي الشامل لتعلم جافاسكريبت والويب من الصفر
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 text-xs sm:text-sm font-semibold overflow-x-auto max-w-full">
          <button
            onClick={() => onSelectView('reader')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'reader'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>قراءة المنهج</span>
          </button>

          <button
            onClick={() => onSelectView('playground')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'playground'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>مختبر الأكواد</span>
          </button>

          <button
            onClick={() => onSelectView('bughunter')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap relative ${
              currentView === 'bughunter'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bug className="w-4 h-4" />
            <span>صائد الأخطاء</span>
            {completedQuizzesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1.5 left-1.5"></span>
            )}
          </button>

          <button
            onClick={() => onSelectView('challenges')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'challenges'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>تحديات المبرمج</span>
          </button>

          <button
            onClick={() => onSelectView('analysis')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'analysis'
                ? 'bg-indigo-600 text-white shadow-md font-bold'
                : 'text-indigo-300 hover:text-white hover:bg-indigo-950/40 border border-indigo-500/20'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>تحليل وتدقيق المنهج</span>
          </button>
        </nav>

        {/* Learning Progress Indicator */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-900/60 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
          <div className="flex flex-col items-end">
            <span className="text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              الإنجاز العام: <strong className="text-white">{progressPercent}%</strong>
            </span>
            <span className="text-[11px] text-slate-500">
              {completedChaptersCount} من {totalChaptersCount} فصل
            </span>
          </div>
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};
