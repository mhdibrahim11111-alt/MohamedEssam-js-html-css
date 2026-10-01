import React, { useState, useEffect } from 'react';
import { ViewMode, Chapter } from './types';
import { bookParts } from './data/bookData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChapterView } from './components/ChapterView';
import { CodePlayground } from './components/CodePlayground';
import { BugHunter } from './components/BugHunter';
import { AnalysisReportView } from './components/AnalysisReportView';
import { ChallengesList } from './components/ChallengesList';
import { Menu, X, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('reader');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [playgroundCode, setPlaygroundCode] = useState<string>('');
  const [selectedBugHunterPartId, setSelectedBugHunterPartId] = useState<number>(1);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Local storage for progress
  const [completedChapterIds, setCompletedChapterIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('codemasr_completed_chapters');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codemasr_completed_quizzes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('codemasr_completed_chapters', JSON.stringify(completedChapterIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedChapterIds]);

  useEffect(() => {
    try {
      localStorage.setItem('codemasr_completed_quizzes', JSON.stringify(completedQuizIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedQuizIds]);

  const toggleChapterCompleted = (chapterId: number) => {
    setCompletedChapterIds((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const toggleQuizCompleted = (quizId: string) => {
    setCompletedQuizIds((prev) =>
      prev.includes(quizId) ? prev.filter((id) => id !== quizId) : [...prev, quizId]
    );
  };

  // Find currently selected chapter
  const allChapters = bookParts.flatMap((p) => p.chapters);
  const currentChapter =
    allChapters.find((c) => c.id === selectedChapterId) || allChapters[0];

  const currentChapterIndex = allChapters.findIndex((c) => c.id === currentChapter.id);
  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : undefined;
  const nextChapter =
    currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : undefined;

  const handleOpenInPlayground = (snippet: string) => {
    setPlaygroundCode(snippet);
    setCurrentView('playground');
  };

  const handleSelectBugHunterFromPart = (partId: number) => {
    setSelectedBugHunterPartId(partId);
    setCurrentView('bughunter');
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          setIsMobileSidebarOpen(false);
        }}
        completedChaptersCount={completedChapterIds.length}
        totalChaptersCount={allChapters.length}
        completedQuizzesCount={completedQuizIds.length}
        totalQuizzesCount={bookParts.length}
      />

      {/* Mobile Drawer Toggle (Only in Reader Mode) */}
      {currentView === 'reader' && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>فهرس الفصول والأجزاء (25 فصلاً)</span>
          </button>
          <span className="text-xs text-slate-400">
            الفصل الحالي: {currentChapter.id}
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar in Reader Mode */}
        {currentView === 'reader' && (
          <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block shrink-0">
              <Sidebar
                parts={bookParts}
                selectedChapterId={currentChapter.id}
                onSelectChapter={(ch) => {
                  setSelectedChapterId(ch.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectBugHunter={handleSelectBugHunterFromPart}
                completedChapterIds={completedChapterIds}
                onToggleChapterCompleted={toggleChapterCompleted}
                completedQuizIds={completedQuizIds}
              />
            </div>

            {/* Mobile Sidebar Modal/Overlay */}
            {isMobileSidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex">
                <div className="w-80 max-w-[85vw] bg-slate-900 h-full border-l border-slate-800 shadow-2xl flex flex-col">
                  <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">فهرس المحتوى</span>
                    <button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-1 rounded text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <Sidebar
                      parts={bookParts}
                      selectedChapterId={currentChapter.id}
                      onSelectChapter={(ch) => {
                        setSelectedChapterId(ch.id);
                        setIsMobileSidebarOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onSelectBugHunter={handleSelectBugHunterFromPart}
                      completedChapterIds={completedChapterIds}
                      onToggleChapterCompleted={toggleChapterCompleted}
                      completedQuizIds={completedQuizIds}
                    />
                  </div>
                </div>
                <div
                  className="flex-1"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />
              </div>
            )}
          </>
        )}

        {/* View Switcher Container */}
        <main className="flex-1 min-w-0 pb-16">
          {currentView === 'reader' && (
            <ChapterView
              chapter={currentChapter}
              onPrevChapter={
                prevChapter
                  ? () => {
                      setSelectedChapterId(prevChapter.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  : undefined
              }
              onNextChapter={
                nextChapter
                  ? () => {
                      setSelectedChapterId(nextChapter.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  : undefined
              }
              onOpenInPlayground={handleOpenInPlayground}
              isCompleted={completedChapterIds.includes(currentChapter.id)}
              onToggleCompleted={() => toggleChapterCompleted(currentChapter.id)}
            />
          )}

          {currentView === 'playground' && (
            <CodePlayground initialCode={playgroundCode} />
          )}

          {currentView === 'bughunter' && (
            <BugHunter
              parts={bookParts}
              initialPartId={selectedBugHunterPartId}
              completedQuizIds={completedQuizIds}
              onToggleQuizCompleted={toggleQuizCompleted}
            />
          )}

          {currentView === 'challenges' && (
            <ChallengesList
              parts={bookParts}
              onOpenChapter={(chId) => {
                setSelectedChapterId(chId);
                setCurrentView('reader');
              }}
            />
          )}

          {currentView === 'analysis' && <AnalysisReportView />}
        </main>
      </div>
    </div>
  );
}
