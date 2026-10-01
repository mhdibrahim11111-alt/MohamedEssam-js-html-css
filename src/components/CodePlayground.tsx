import React, { useState } from 'react';
import { runJavaScript } from '../utils/codeRunner';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Code2,
  Trash2,
  Sparkles,
  FileCode,
  Layout,
} from 'lucide-react';

interface CodePlaygroundProps {
  initialCode?: string;
}

const presets = [
  {
    name: 'أول كود وطباعة نصوص',
    code: `console.log("أهلاً بيك في عالم البرمجة!");
console.log("النتيجة هي:", 2026);
console.log(7 * 6);`,
  },
  {
    name: 'حسابات وباقي القسمة %',
    code: `const price = 50;
const quantity = 3;
const total = price * quantity;
console.log("الإجمالي: " + total);

// فحص الزوجي والفردي
const num = 17;
console.log("باقي قسمة 17 على 2:", num % 2);`,
  },
  {
    name: 'الشروط والمعاملات المنطقية',
    code: `const age = 19;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("تقدر تسوق العربية بأمان 🚗");
} else {
  console.log("غير مسموح بالقيادة");
}`,
  },
  {
    name: 'حلقة تكرار وفحص الأرقام',
    code: `for (let i = 1; i <= 6; i++) {
  if (i % 2 === 0) {
    console.log(i + " -> رقم زوجي");
  } else {
    console.log(i + " -> رقم فردي");
  }
}`,
  },
  {
    name: 'دالة حساب مساحة المستطيل',
    code: `function calculateArea(width, height) {
  return width * height;
}

const area1 = calculateArea(8, 5);
console.log("مساحة المستطيل الأول: " + area1);

const area2 = calculateArea(10, 3);
console.log("مساحة المستطيل الثاني: " + area2);`,
  },
  {
    name: 'مشروع لعبة تخمين الرقم (محاكاة)',
    code: `function checkGuess(guess, secret) {
  if (guess === secret) return "صح ومبروك الفوز! 🏆";
  if (guess > secret) return "أكبر من اللازم! 📉";
  return "أصغر من اللازم! 📈";
}

const secretNumber = 42;
const myGuesses = [20, 60, 42];

myGuesses.forEach((g, idx) => {
  console.log("محاولة " + (idx + 1) + " بتخمين: " + g);
  console.log("النتيجة: " + checkGuess(g, secretNumber));
  console.log("------------------------");
});`,
  },
  {
    name: 'عمليات المصفوفات الحديثة',
    code: `const cart = ["كتاب جافاسكريبت", "دفتر ملاحظات"];
cart.push("قلم رصاص");
console.log("السلة بعد الإضافة:", cart);

console.log("هل السلة فيها قلم؟", cart.includes("قلم رصاص"));
console.log("عدد عناصر السلة:", cart.length);`,
  },
];

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
}) => {
  const [code, setCode] = useState<string>(
    initialCode || presets[0].code
  );
  const [logs, setLogs] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'js' | 'html'>('js');

  const handleRun = async () => {
    setIsRunning(true);
    const result = await runJavaScript(code);
    setLogs(result.logs);
    setErrors(result.errors);
    setExecTime(result.executionTimeMs);
    setIsRunning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearConsole = () => {
    setLogs([]);
    setErrors([]);
    setExecTime(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            مختبر الأكواد التجريبي التفاعلي
          </h2>
          <p className="text-xs text-slate-400">
            مساحة حرة لتجربة وتعديل أي كود في بيئة محمية وسريعة
          </p>
        </div>

        {/* Presets Selector & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            onChange={(e) => {
              const selected = presets.find((p) => p.name === e.target.value);
              if (selected) {
                setCode(selected.code);
                handleClearConsole();
              }
            }}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">اختر مثالاً جاهزاً من الكورس...</option>
            {presets.map((p, idx) => (
              <option key={idx} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ الكود'}</span>
          </button>

          <button
            onClick={() => setCode('')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>تفريغ</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-5 py-2 rounded-xl text-xs sm:text-sm transition active:scale-95 shadow-lg shadow-amber-500/25"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isRunning ? 'جاري التشغيل...' : 'تشغيل الكود (Ctrl+Enter)'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Console Grid */}
      <div className="grid lg:grid-cols-2 gap-4 h-[650px]">
        {/* Code Editor Panel */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-amber-400" />
              محرر الكود (JavaScript Editor)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">UTF-8 • LTR</span>
          </div>

          <textarea
            dir="ltr"
            style={{ direction: 'ltr', textAlign: 'left', unicodeBidi: 'isolate' }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleRun();
              }
            }}
            placeholder="// اكتب كود جافاسكريبت هنا ودوس تشغيل..."
            className="flex-1 w-full p-4 bg-slate-950 text-amber-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed text-left custom-scrollbar selection:bg-amber-500 selection:text-slate-950"
            spellCheck={false}
          />

          <div className="p-2.5 bg-slate-900/50 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>💡 اختصار التشغيل السريع: <strong>Ctrl + Enter</strong></span>
            <span>عدد الأسطر: {code.split('\n').length}</span>
          </div>
        </div>

        {/* Console / Output Panel */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                شاشة الـ Console
              </span>
              {execTime !== null && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {execTime}ms
                </span>
              )}
            </div>

            <button
              onClick={handleClearConsole}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs"
              title="مسح مخرجات الشاشة"
            >
              <Trash2 className="w-3.5 h-3.5" />
              مسح
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs custom-scrollbar">
            {logs.length === 0 && errors.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 select-none">
                <Terminal className="w-8 h-8 opacity-40" />
                <p className="text-xs">المخرجات ستظهر هنا عند النقر على "تشغيل الكود"</p>
              </div>
            )}

            {logs.map((log, idx) => (
              <div
                key={idx}
                dir="ltr"
                style={{ direction: 'ltr', textAlign: 'left', unicodeBidi: 'isolate' }}
                className="text-emerald-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 text-left whitespace-pre-wrap font-mono"
              >
                <span className="text-slate-600 select-none mr-2 font-mono text-[10px]">
                  ›
                </span>
                {log}
              </div>
            ))}

            {errors.map((err, idx) => (
              <div
                key={idx}
                className="text-rose-400 bg-rose-950/20 p-3 rounded-xl border border-rose-900/50 text-right dir-rtl leading-relaxed animate-fadeIn"
              >
                <div className="flex items-center gap-1.5 font-bold mb-1 text-rose-300">
                  <span>👻 ماتتخضش! الكمبيوتر بيقولك:</span>
                </div>
                <div className="text-xs font-sans text-rose-200/90">{err}</div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-slate-900/50 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>البيئة: JavaScript Sandbox آمن ومحمي ضد الحلقات اللانهائية</span>
            <span className="text-emerald-400 font-bold">جاهز</span>
          </div>
        </div>
      </div>
    </div>
  );
};
