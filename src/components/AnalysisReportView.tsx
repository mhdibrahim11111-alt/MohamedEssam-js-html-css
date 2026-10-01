import React, { useState } from 'react';
import { curriculumAnalysis } from '../data/analysisData';
import { CodeBlock } from './CodeBlock';
import {
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  FileCheck,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const AnalysisReportView: React.FC = () => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string>('all');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Executive Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-6 sm:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              تدقيق أكاديمي وفني شامل للمسودة
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              تقييم تربوي: {curriculumAnalysis.overview.pedagogicalRating}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              الجاهزية الفنية: {curriculumAnalysis.overview.technicalReadiness}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {curriculumAnalysis.overview.title}
            </h1>
            <p className="text-sm sm:text-base text-indigo-200/80 mt-1 font-medium">
              {curriculumAnalysis.overview.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            يقدم هذا التقرير تحليلاً نقدياً وبيداغوجياً وتقنياً دقيقاً لمسودة كتاب البرمجة المقدمة. تم فحص كل سطر كود، وتدقيق التمارين، واختبار مدى اتساق المفاهيم من منظور علم تعليم علوم الحاسوب (CS Pedagogy) للمبتدئين.
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-indigo-900/50">
            {curriculumAnalysis.overview.keyMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 p-3 rounded-xl border border-indigo-500/20 text-center"
              >
                <div className="text-lg font-black text-white">{metric.value}</div>
                <div className="text-[11px] text-indigo-300/80 mt-0.5">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-8">
        {curriculumAnalysis.sections.map((section) => (
          <section
            key={section.id}
            className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-lg"
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border inline-block mb-1.5 ${section.badgeColor}`}
                >
                  {section.badge}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-xs text-slate-400 max-w-md">{section.summary}</p>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {section.items.map((item, idx) => {
                const itemKey = `${section.id}-${idx}`;

                return (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-xl border transition ${
                      item.severity === 'critical'
                        ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                        : item.severity === 'warning'
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        : item.severity === 'excellence'
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                          {item.severity === 'critical' ? (
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          ) : item.severity === 'excellence' ? (
                            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : item.severity === 'warning' ? (
                            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <FileCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                          )}
                          <span>{item.title}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Code Example Comparison */}
                    {item.codeExample && (
                      <div className="mt-3.5 space-y-2">
                        <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                          <span>الكود المرصود في المسودة:</span>
                          <button
                            onClick={() => handleCopy(item.codeExample!, itemKey + '-code')}
                            className="text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedCodeIndex === itemKey + '-code' ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>نسخ</span>
                          </button>
                        </div>
                        <div className="rounded-lg border border-slate-800 overflow-hidden">
                          <CodeBlock code={item.codeExample} />
                        </div>
                      </div>
                    )}

                    {/* Suggested Fix */}
                    {item.suggestedFix && (
                      <div className="mt-2.5 space-y-2">
                        <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-between">
                          <span>التصحيح الموصى به الجاهز للطباعة:</span>
                          <button
                            onClick={() => handleCopy(item.suggestedFix!, itemKey + '-fix')}
                            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                          >
                            {copiedCodeIndex === itemKey + '-fix' ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>نسخ التصحيح</span>
                          </button>
                        </div>
                        <div className="rounded-lg border border-emerald-900/50 overflow-hidden">
                          <CodeBlock code={item.suggestedFix} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Summary Conclusion Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3 text-center sm:text-right">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          الخلاصة والتوصية النهائية للنشر:
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          هذه المخطوطة تمثل عملاً تعليمياً مبدعاً وفريداً من نوعه في العالم العربي؛ حيث نجحت في كسر حاجز الرهبة أمام البرمجة بذكاء بيداغوجي رفيع وأسلوب سردي شيق. بتطبيق التصحيحات الطفيفة المحددة في هذا التقرير وتضمين التمارين التفاعلية وحلولها، يصبح الكتاب جاهزاً للطبع كمرجع متميز أو كمنهاج تفاعلي متكامل لتدريب الناشئة والشباب.
        </p>
      </div>
    </div>
  );
};
