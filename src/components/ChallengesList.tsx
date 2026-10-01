import React, { useState } from 'react';
import { Part, Challenge } from '../types';
import { runJavaScript } from '../utils/codeRunner';
import { CodeBlock } from './CodeBlock';
import {
  Trophy,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Search,
  Filter,
} from 'lucide-react';

interface ChallengesListProps {
  parts: Part[];
  onOpenChapter: (chapterId: number) => void;
}

export const ChallengesList: React.FC<ChallengesListProps> = ({
  parts,
  onOpenChapter,
}) => {
  // Flatten all challenges across chapters
  const allChallenges = parts.flatMap((part) =>
    part.chapters
      .filter((ch) => !!ch.challenge)
      .map((ch) => ({
        chapter: ch,
        part: part,
        challenge: ch.challenge as Challenge,
      }))
  );

  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    allChallenges[0]?.challenge.id || ''
  );
  const [filterPartId, setFilterPartId] = useState<number | 'all'>('all');
  const [userCode, setUserCode] = useState<string>('');
  const [output, setOutput] = useState<{ logs: string[]; errors: string[] } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>({});

  const currentItem =
    allChallenges.find((item) => item.challenge.id === selectedChallengeId) ||
    allChallenges[0];

  React.useEffect(() => {
    if (currentItem) {
      setUserCode(currentItem.challenge.initialCode);
      setOutput(null);
      setShowHint(false);
      setShowSolution(false);
    }
  }, [selectedChallengeId]);

  const handleRun = async () => {
    if (!currentItem) return;
    setIsRunning(true);
    const res = await runJavaScript(userCode);
    setOutput({ logs: res.logs, errors: res.errors });
    setIsRunning(false);

    if (res.errors.length === 0 && res.logs.length > 0) {
      setSolvedMap((prev) => ({ ...prev, [currentItem.challenge.id]: true }));
    }
  };

  const filteredChallenges = allChallenges.filter((item) => {
    if (filterPartId !== 'all' && item.part.id !== filterPartId) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0 font-bold text-xl">
            🧠
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              تحديات "وريني شطارتك"
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                {Object.keys(solvedMap).length} من {allChallenges.length} منجز
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              مجموعة التحديات البرمجية الـ 25 الموزعة على فصول الكتاب لاختبار قدراتك عملياً
            </p>
          </div>
        </div>

        {/* Filter by Part */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterPartId}
            onChange={(e) =>
              setFilterPartId(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">كل الأجزاء ({allChallenges.length} تحدي)</option>
            {parts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title.split(':')[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Challenges Sidebar + Editor Arena */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Challenges Sidebar List */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-3 h-[600px] overflow-y-auto space-y-1.5 custom-scrollbar">
          {filteredChallenges.map((item) => {
            const isSelected = item.challenge.id === selectedChallengeId;
            const isSolved = solvedMap[item.challenge.id];

            return (
              <button
                key={item.challenge.id}
                onClick={() => setSelectedChallengeId(item.challenge.id)}
                className={`w-full text-right p-3 rounded-xl transition flex items-center justify-between text-xs ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-bold'
                    : 'bg-slate-950/40 text-slate-300 hover:bg-slate-800/60 border border-slate-800/80'
                }`}
              >
                <div className="truncate pl-2">
                  <span className="text-[10px] text-amber-400 block font-mono">
                    {item.chapter.title.split(':')[0]}
                  </span>
                  <span className="truncate block font-semibold">
                    {item.challenge.title}
                  </span>
                </div>

                {isSolved ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Challenge Interactive Workspace */}
        {currentItem && (
          <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  {currentItem.chapter.title}
                </span>
                <button
                  onClick={() => onOpenChapter(currentItem.chapter.id)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  الذهاب لشرح الفصل
                </button>
              </div>

              <h3 className="text-lg font-black text-white">
                {currentItem.challenge.title}
              </h3>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {currentItem.challenge.prompt}
              </div>

              {/* Hints & Solutions toggles */}
              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-amber-400 hover:text-amber-300 font-medium"
                >
                  {showHint ? 'إخفاء التلميح' : 'محتاج تلميح؟ 💡'}
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-slate-400 hover:text-slate-200 font-medium"
                >
                  {showSolution ? 'إخفاء الحل' : 'عرض الحل النموذجي 🔑'}
                </button>
              </div>

              {showHint && (
                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/30 text-xs text-amber-200 animate-fadeIn">
                  <strong>تلميح:</strong> {currentItem.challenge.hint}
                </div>
              )}

              {showSolution && (
                <div className="rounded-xl border border-emerald-900/40 overflow-hidden animate-fadeIn">
                  <CodeBlock code={currentItem.challenge.solutionCode} />
                </div>
              )}

              {/* Code Editor */}
              <div className="space-y-1.5">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={6}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-mono text-amber-200 focus:outline-none focus:border-amber-500 text-left dir-ltr"
                  placeholder="// اكتب كودك هنا..."
                />
              </div>

              {/* Actions & Runner */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setUserCode(currentItem.challenge.initialCode)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  إعادة تعيين الكود
                </button>

                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs sm:text-sm transition active:scale-95 shadow-lg shadow-amber-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'جاري الفحص...' : 'تشغيل واختبار'}</span>
                </button>
              </div>

              {/* Output Result */}
              {output && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-[10px] text-slate-400 flex items-center justify-between mb-1">
                    <span>مخرجات التنفيذ:</span>
                    {solvedMap[currentItem.challenge.id] && (
                      <span className="text-emerald-400 font-bold">تم حل التحدي بنجاح 🎯</span>
                    )}
                  </div>
                  {output.logs.map((l, i) => (
                    <div key={i} className="text-emerald-400 text-left dir-ltr">
                      {l}
                    </div>
                  ))}
                  {output.errors.map((e, i) => (
                    <div key={i} className="text-rose-400 text-right dir-rtl">
                      {e}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
