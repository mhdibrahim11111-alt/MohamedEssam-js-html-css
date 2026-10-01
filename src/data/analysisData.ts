export interface AnalysisItem {
  title: string;
  description: string;
  codeExample?: string;
  suggestedFix?: string;
  severity?: 'critical' | 'warning' | 'excellence' | 'info';
}

export interface AnalysisSection {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  summary: string;
  items: AnalysisItem[];
}

export interface CurriculumAnalysisData {
  overview: {
    title: string;
    subtitle: string;
    authorTarget: string;
    pedagogicalRating: string;
    technicalReadiness: string;
    totalParts: number;
    totalChapters: number;
    keyMetrics: { label: string; value: string }[];
  };
  sections: AnalysisSection[];
}

export const curriculumAnalysis: CurriculumAnalysisData = {
  overview: {
    title: 'تقرير التحليل الشامل والتدقيق الفني والتربوي',
    subtitle: 'مخطوطة كورس/كتاب البرمجة للمبتدئين بالعامية المصرية (الأجزاء من 1 إلى 6)',
    authorTarget: 'المبتدئين والناشئين في العالم العربي (مصر والعالم العربي)',
    pedagogicalRating: '9.6 / 10',
    technicalReadiness: '8.8 / 10',
    totalParts: 6,
    totalChapters: 25,
    keyMetrics: [
      { label: 'عدد الفصول', value: '25 فصلاً' },
      { label: 'التمارين التطبيقية', value: '75+ تمريناً' },
      { label: 'تحديات "وريني شطارتك"', value: '25 تحدياً برمجياً' },
      { label: 'ألغاز "اكتشف الخطأ"', value: '6 اختبارات تشخيصية' },
      { label: 'الأخطاء التحريرية المرصودة', value: '5 ملاحظات دقيقة' },
    ],
  },
  sections: [
    {
      id: 'pedagogy',
      title: 'نقاط القوة التربوية والتعليمية (Pedagogical Excellence)',
      badge: 'إشادة تربوية',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      summary:
        'يمتاز المنهج بحس بيداغوجي رفيع واستثنائي يكسر الحواجز النفسية المعتادة أمام المتعلم العربي في عالم البرمجة.',
      items: [
        {
          title: 'النماذج الذهنية الحسية (Mental Models)',
          description:
            'استخدام تشبيهات عبقرية من الحياة اليومية لتقريب المفاهيم المجردة: الصندوق الكرتون والخزنة الحديدية (let vs const)، خلاط العصير (الدوال والـ return)، سير المصنع (الحلقات)، بطاقة التعريف (الـ Objects)، ورف الأواني المرقّم من الصفر (المصفوفات). هذا التشبيه يجعل المفهوم محفوراً في الذاكرة.',
          severity: 'excellence',
        },
        {
          title: 'الأمان النفسي عبر فقرة "ماتتخضش! 👻"',
          description:
            'معالجة متلازمة المحتال ورعب شاشة الخطأ الحمراء في الـ Console مبكراً وبشكل متكرر، مع ترسيخ فكرة أن الخطأ ليس عقاباً بل هو محادثة بين المبرمج والكمبيوتر.',
          severity: 'excellence',
        },
        {
          title: 'التعزيز الفوري للدوبامين عبر "بااااام! 💥"',
          description:
            'خلق محطات إنجاز واحتفال شعوري بعد كل خطوة تطبيقية ناجحة (كتابة أول سطر، إنشاء دالة كاملة، ربط HTML مع JavaScript).',
          severity: 'excellence',
        },
        {
          title: 'العامية المصرية كجسر إدراكي منخفض المقاومة',
          description:
            'الصياغة بالعامية المصرية الودودة الخفيفة تجعل تركيز عقل المتعلم منصباً 100% على المنطق البرمجي المجرد بدلاً من استهلاك طاقة ذهنية في فك طلاسم لغوية متكلفة.',
          severity: 'excellence',
        },
      ],
    },
    {
      id: 'technical-bugs',
      title: 'الأخطاء الفنية والتحريرية المرصودة في مسودة المنهج (Bugs & Fixes)',
      badge: 'تنبيهات تدقيق',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      summary:
        'خلال الفحص الآلي والدقيق لجميع الأكواد الواردة في المخطوطة، تم رصد عدة أخطاء تحريرية وتقنية تستوجب التصحيح قبل الطباعة أو النشر النهائي:',
      items: [
        {
          title: 'خطأ نسخ ولصق في تمارين الفصل الثاني (تكرار التمرين 3 و4)',
          description:
            'في الفصل الثاني (الحسابات والنصوص)، تم تكرار أسطر (console.log(17 % 5); console.log(20 % 5);) بالحرف في التمرين 2، والتمرين 3، والتمرين 4 مع نسيان تغيير محتوى التمرينين 3 و4 لدمج النصوص أو الجمع الحقيقي!',
          codeExample: `// النص الأصلي في مسودة الفصل 2:
// التمرين 2:
console.log(17 % 5);
console.log(20 % 5);

// التمرين 3 (مكرر بالخطأ!):
console.log(17 % 5);
console.log(20 % 5);

// التمرين 4 (مكرر في السطرين الأخيرين):
console.log("Good" + "Morning");
console.log(17 % 5);
console.log(20 % 5);`,
          suggestedFix: `// التصحيح المقترح للتمرين 3:
console.log("Java" + "Script");
console.log("3" + "5");

// والتصحيح للتمرين 4:
console.log("Good" + " " + "Morning");
console.log(2026 - 15);`,
          severity: 'critical',
        },
        {
          title: 'تناقض في الفصل السادس: استخدام == بدلاً من ===',
          description:
            'في كود مثال فحص الرخصة بالفصل السادس، كُتب السطر: if (hasLicense == true). هذا يخالف القاعدة الذهبية الصارمة التي كررها الكتاب في الفصل 4 و6: "احنا في الكتاب ده هنستخدم === بس في كل مكان وننسى == خالص".',
          codeExample: `// الموجود في المسودة:
if (hasLicense == true)

// التصحيح الموصى به:
if (hasLicense === true)
// أو الأفضل برمجياً:
if (hasLicense)`,
          suggestedFix: 'if (hasLicense === true)',
          severity: 'warning',
        },
        {
          title: 'تحليل لغز "اكتشف الخطأ 2" في جملة switch',
          description:
            'في اختبار الجزء الثاني، الكود يحتوي على: case total >= 500: حيث تم استخدام شرط علائقي داخل switch(total). بما أن total رقم (300)، والشرط total >= 500 يرجع boolean (false)، فإن المقارنة 300 === false لا تتحقق أبداً! بالإضافة لغياب break. يجب شرح هذا الفرق الدقيق للطلاب.',
          codeExample: `const total = 300;
switch (total) {
  case total >= 500: // ينتج false، و 300 !== false
    console.log("خصم 20%");
  case total >= 200: // ينتج true، و 300 !== true
    console.log("خصم 10%");
    break;
}`,
          suggestedFix: `// التصحيح الأنسب لمبتدئ هو استخدام if / else if:
if (total >= 500) {
  console.log("خصم 20%");
} else if (total >= 200) {
  console.log("خصم 10%");
} else {
  console.log("مفيش خصم");
}`,
          severity: 'info',
        },
        {
          title: 'غياب ملحق الحلول المشار إليه في التمارين',
          description:
            'في كل فصل كُتبت عبارة: "(الحلول في ملحق آخر الكتاب.)"، لكن المسودة تنتهي دون وجود ملحق الحلول. في هذه المنصة التفاعلية قمنا بحل جميع التمارين وتوفير فاحص آلي لاختبار حلول الطالب لحظياً.',
          suggestedFix: 'تم تضمين جميع الحلول التفاعلية تلقائياً داخل هذه المنصة التفاعلية.',
          severity: 'warning',
        },
        {
          title: 'مشاكل اتجاه النصوص والرموز غير المرئية (Unicode BiDi Issues)',
          description:
            'خلط النصوص العربية والإنجليزية في المسودة أنتج في عدة مواضع رموزاً معكوسة مثل: "()number" بدلاً من "Number()"، و "(Math.floor(7.9" بدلاً من "Math.floor(7.9)". يجب عزل الأكواد دائماً داخل كتل برمجية متجهة LTR تماماً.',
          severity: 'warning',
        },
      ],
    },
    {
      id: 'modernization',
      title: 'مقترحات التحديث البرمجي المعاصر (Modern JS Evolution)',
      badge: 'تطوير معاصر',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      summary:
        'إضافات مقترحة تعزز الكتاب وتجعله متوافقاً مع أفضل ممارسات ECMAScript الحديثة:',
      items: [
        {
          title: 'إضافة Template Literals (القوالب النصية بالمائلة العكسية)',
          description:
            'الاعتماد فقط على دمج النصوص بعلامة الزائد (+) مثل: "اسمي " + name + " وعندي " + age تصبح مرهقة وعرضة للأخطاء عند دمج عدة متغيرات. إدخال Backticks: `اسمي ${name} وعندي ${age}` في فصل متقدم يمنح المتعلم راحة كبيرة.',
          codeExample: 'console.log(`اسمي ${name} وعندي ${age} سنة`);',
          severity: 'info',
        },
        {
          title: 'تنبيه حول قيود prompt() في المتصفحات وتطبيقات الويب الحديثة',
          description:
            'دالة prompt() مفيدة جداً للشرح المبدئي لكنها محجوبة أو محظورة في تطبيقات iframe ومتصفحات الهواتف الحديثة. لذا قمنا في هذه المنصة بمحاكاة ذكية للمدخلات (Input Simulator) لتجربة الألعاب بسلاسة دون نوافذ منبثقة مزعجة.',
          severity: 'info',
        },
        {
          title: 'الفرق الدقيق بين Math.floor و Math.trunc في الأرقام السالبة',
          description:
            'دالة Math.floor(-3.2) ترجع -4 (تقريب للأسفل نحو اللانهاية السالبة) بينما Math.trunc(-3.2) تقطع الكسر وترجع -3. تنبيه الطلاب بأن هذا ينطبق على الأرقام الموجبة يمنع اللبس مستقبلاً.',
          severity: 'info',
        },
      ],
    },
  ],
};
