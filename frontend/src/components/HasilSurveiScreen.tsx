import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { GoalItem, ScreenType, TransitionType, Variable } from '../types';

export const DEFAULT_BINARY_OPTIONS = ['Ya', 'Tidak'] as const;

export const LIKERT_5_POINT_LABELS = [
  { value: 1, label: 'Sangat tidak setuju' },
  { value: 2, label: 'Tidak setuju' },
  { value: 3, label: 'Netral' },
  { value: 4, label: 'Setuju' },
  { value: 5, label: 'Sangat setuju' },
] as const;

export const createEmptyVariable = (idSuffix?: string): Variable => ({
  id: `var-${Date.now()}-${idSuffix ?? Math.random().toString(36).slice(2, 7)}`,
  name: '',
  isDirect: null,
  directQuestions: [''],
  definition: '',
  answerType: null,
  binaryOptions: [DEFAULT_BINARY_OPTIONS[0], DEFAULT_BINARY_OPTIONS[1]],
  likertEndLabels: [LIKERT_5_POINT_LABELS[0].label, LIKERT_5_POINT_LABELS[4].label],
  indirectQuestions: ['', '', ''],
});

interface HasilSurveiScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  topic: string;
  goals: GoalItem[];
  setGoals: React.Dispatch<React.SetStateAction<GoalItem[]>>;
  isLoggedIn?: boolean;
}

export const HasilSurveiScreen: React.FC<HasilSurveiScreenProps> = ({
  navigate,
  topic,
  goals,
  setGoals,
  isLoggedIn = false,
}) => {
  const currentTopic =
    topic || 'Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta';
  const shouldReduceMotion = useReducedMotion();

  const branchTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: 'easeOut' as const };

  const handleAddVariable = (goalIdx: number) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: [...goal.variables, createEmptyVariable(`${goalIdx}-${goal.variables.length}`)],
        };
      })
    );
  };

  const handleRemoveVariable = (goalIdx: number, varIdx: number) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        if (goal.variables.length <= 1) return goal;
        return {
          ...goal,
          variables: goal.variables.filter((_, vIdx) => vIdx !== varIdx),
        };
      })
    );
  };

  const updateVariable = (goalIdx: number, varIdx: number, updates: Partial<Variable>) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: goal.variables.map((v, vIdx) =>
            vIdx === varIdx ? { ...v, ...updates } : v
          ),
        };
      })
    );
  };

  const handleAddDirectQuestion = (goalIdx: number, varIdx: number) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: goal.variables.map((v, vIdx) =>
            vIdx === varIdx
              ? { ...v, directQuestions: [...v.directQuestions, ''] }
              : v
          ),
        };
      })
    );
  };

  const handleRemoveDirectQuestion = (goalIdx: number, varIdx: number, qIdx: number) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: goal.variables.map((v, vIdx) => {
            if (vIdx !== varIdx) return v;
            if (v.directQuestions.length <= 1) return v;
            return {
              ...v,
              directQuestions: v.directQuestions.filter((_, i) => i !== qIdx),
            };
          }),
        };
      })
    );
  };

  const handleDirectQuestionChange = (
    goalIdx: number,
    varIdx: number,
    qIdx: number,
    value: string
  ) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: goal.variables.map((v, vIdx) => {
            if (vIdx !== varIdx) return v;
            const nextQuestions = [...v.directQuestions];
            nextQuestions[qIdx] = value;
            return { ...v, directQuestions: nextQuestions };
          }),
        };
      })
    );
  };

  const handleIndirectQuestionChange = (
    goalIdx: number,
    varIdx: number,
    qIdx: 0 | 1 | 2,
    value: string
  ) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: goal.variables.map((v, vIdx) => {
            if (vIdx !== varIdx) return v;
            const nextIndirect: [string, string, string] = [...v.indirectQuestions] as [
              string,
              string,
              string,
            ];
            nextIndirect[qIdx] = value;
            return { ...v, indirectQuestions: nextIndirect };
          }),
        };
      })
    );
  };

  const handleBinaryOptionChange = (
    goalIdx: number,
    varIdx: number,
    optIdx: 0 | 1,
    value: string
  ) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: goal.variables.map((v, vIdx) => {
            if (vIdx !== varIdx) return v;
            const current = v.binaryOptions ?? [
              DEFAULT_BINARY_OPTIONS[0],
              DEFAULT_BINARY_OPTIONS[1],
            ];
            const nextOpts: [string, string] = [current[0], current[1]];
            nextOpts[optIdx] = value;
            return { ...v, binaryOptions: nextOpts };
          }),
        };
      })
    );
  };

  const handleLikertEndLabelChange = (
    goalIdx: number,
    varIdx: number,
    endIdx: 0 | 1,
    value: string
  ) => {
    setGoals((prev) =>
      prev.map((goal, idx) => {
        if (idx !== goalIdx) return goal;
        return {
          ...goal,
          variables: goal.variables.map((v, vIdx) => {
            if (vIdx !== varIdx) return v;
            const current = v.likertEndLabels ?? [
              LIKERT_5_POINT_LABELS[0].label,
              LIKERT_5_POINT_LABELS[4].label,
            ];
            const nextEnds: [string, string] = [current[0], current[1]];
            nextEnds[endIdx] = value;
            return { ...v, likertEndLabels: nextEnds };
          }),
        };
      })
    );
  };

  const allVariables = goals.flatMap((g) => g.variables);
  const totalCount = allVariables.length;
  const answeredCount = allVariables.filter(
    (v) => v.name.trim().length > 0 && v.isDirect !== null
  ).length;
  const allAnswered = totalCount > 0 && answeredCount === totalCount;

  return (
    <div className="w-full bg-[#f6f9ff] text-[#0f1d28] min-h-[calc(100vh-145px)]">
      <main className="w-full pt-[72px] pb-16">
        <div className="w-full max-w-[1040px] mx-auto px-4 md:px-8 py-8 space-y-8">
          {/* Section 1: Header & Back Link */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('beranda', 'push_back');
                }}
                className="min-h-[44px] inline-flex items-center gap-1.5 font-label-md text-sm text-[#536161] hover:text-[#005450] transition-colors group cursor-pointer rounded-lg px-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
              >
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
                  arrow_back
                </span>
                <span>Ubah topik</span>
              </a>
              <span className="font-code-sm text-xs uppercase tracking-widest text-[#536161] font-semibold">
                HASIL ANALISIS TOPIK
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-[#0f1d28] tracking-tight font-extrabold pt-1">
              Metode yang cocok untuk proyekmu
            </h1>
          </div>

          {/* Section 2: Card Topik Kamu */}
          <div className="bg-white rounded-xl p-6 md:p-7 shadow-sm border border-[#DDE3E8]">
            <div className="flex items-center gap-1.5 text-[#536161] mb-2">
              <span className="material-symbols-outlined text-[18px]">topic</span>
              <span className="font-label-md text-xs uppercase tracking-wider text-[#536161] font-bold">
                Topik kamu
              </span>
            </div>
            <blockquote className="font-headline-sm text-lg md:text-xl text-[#0f1d28] font-bold mb-4 leading-snug">
              “{currentTopic}”
            </blockquote>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dbeaf9] text-[#3e4948] font-label-sm text-xs">
                <span className="font-semibold text-[#536161] mr-1.5">Variabel bebas:</span> penggunaan media sosial
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dbeaf9] text-[#3e4948] font-label-sm text-xs">
                <span className="font-semibold text-[#536161] mr-1.5">Variabel terikat:</span> prestasi belajar
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dbeaf9] text-[#3e4948] font-label-sm text-xs">
                <span className="font-semibold text-[#536161] mr-1.5">Populasi:</span> mahasiswa
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dbeaf9] text-[#3e4948] font-label-sm text-xs">
                <span className="font-semibold text-[#536161] mr-1.5">Lokasi:</span> Jakarta
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dbeaf9] text-[#3e4948] font-label-sm text-xs">
                <span className="font-semibold text-[#536161] mr-1.5">Pendekatan:</span> kuantitatif
              </span>
            </div>
          </div>

          {/* Section 3: Tujuan Proyek Dipisahkan Masing-Masing dengan Pertanyaan Tersendiri */}
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-headline-md text-xl md:text-2xl font-bold text-[#12202B]">
                  Tujuan proyek
                </h2>
                <p className="text-sm text-[#5B6B78] mt-1">
                  {goals.length > 1
                    ? `Berikut adalah ${goals.length} tujuan yang kamu buat. Jawab pertanyaan variabel untuk masing-masing tujuan:`
                    : 'Identifikasi variabel dan karakteristik pengukuran untuk tujuan penelitianmu:'}
                </p>
              </div>
              {goals.length > 1 && (
                <span className="font-label-sm text-xs text-[#0B6E69] bg-[#E3F2F1] px-3 py-1.5 rounded-full font-bold shrink-0">
                  {goals.length} Tujuan
                </span>
              )}
            </div>

            {/* Render card terpisah untuk setiap tujuan */}
            {goals.map((goal, idx) => {
              const variables = goal.variables;
              const tujuanLabel = goals.length > 1 ? `Tujuan ${idx + 1}` : 'Tujuan Proyek';

              return (
                <div
                  key={goal.id}
                  className="bg-white rounded-[16px] p-5 sm:p-6 md:p-8 border-2 border-[#0B6E69] shadow-sm flex flex-col gap-6"
                >
                  {/* Header Sub-Card Tujuan */}
                  <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#DDE3E8]/60">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#0B6E69] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </span>
                      <h3 className="font-headline-sm text-lg md:text-xl font-bold text-[#12202B]">
                        {tujuanLabel}
                      </h3>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('beranda', 'push_back');
                      }}
                      className="min-h-[44px] inline-flex items-center text-xs sm:text-sm font-bold text-[#0B6E69] hover:text-[#005450] transition-colors underline cursor-pointer shrink-0 rounded px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
                    >
                      Ubah tujuan
                    </a>
                  </div>

                  {/* Teks Tujuan yang dituliskan user */}
                  <div className="bg-[#E3F2F1] rounded-[16px] p-5 border border-[#0B6E69]/20 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="block text-xs uppercase tracking-wider text-[#5B6B78] font-bold">
                        Yang kamu tuliskan
                      </span>
                      <p className="text-[17px] md:text-[18px] font-semibold text-[#12202B] leading-snug">
                        {goal.text}
                      </p>
                    </div>
                  </div>

                  {/* Daftar Variabel untuk tujuan ini */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#12202B]">
                        Variabel apa yang ingin kamu ketahui {goals.length > 1 ? `untuk ${tujuanLabel}` : ''}?
                      </span>
                      {variables.length > 1 && (
                        <span className="font-label-sm text-xs text-[#0B6E69] bg-[#E3F2F1] px-2.5 py-0.5 rounded-full font-semibold shrink-0">
                          {variables.length} Variabel
                        </span>
                      )}
                    </div>

                    <div className="space-y-5">
                      {variables.map((varItem, varIdx) => {
                        const isDirect = varItem.isDirect;
                        const lockHintId = `lock-hint-${goal.id}-${varItem.id}`;
                        const isIndirectLocked = varItem.answerType === null;
                        const binaryOpts = varItem.binaryOptions ?? [
                          DEFAULT_BINARY_OPTIONS[0],
                          DEFAULT_BINARY_OPTIONS[1],
                        ];
                        const likertEnds = varItem.likertEndLabels ?? [
                          LIKERT_5_POINT_LABELS[0].label,
                          LIKERT_5_POINT_LABELS[4].label,
                        ];
                        const binaryDisplay0 = binaryOpts[0].trim() || DEFAULT_BINARY_OPTIONS[0];
                        const binaryDisplay1 = binaryOpts[1].trim() || DEFAULT_BINARY_OPTIONS[1];
                        const likertDisplay0 =
                          likertEnds[0].trim() || LIKERT_5_POINT_LABELS[0].label;
                        const likertDisplay1 =
                          likertEnds[1].trim() || LIKERT_5_POINT_LABELS[4].label;

                        return (
                          <div
                            key={varItem.id}
                            className={
                              variables.length > 1
                                ? 'p-4 sm:p-5 rounded-[16px] bg-[#F8FAFC] border border-[#DDE3E8] space-y-4'
                                : 'space-y-5'
                            }
                          >
                            {variables.length > 1 && (
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-[#0B6E69]">
                                  Variabel {varIdx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveVariable(idx, varIdx)}
                                  className="min-h-[44px] px-2.5 text-[#ba1a1a] hover:text-[#93000a] text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer rounded-lg hover:bg-[#ffdad6]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
                                  title="Hapus variabel ini"
                                >
                                  <span className="material-symbols-outlined text-[15px]">delete</span>
                                  <span>Hapus</span>
                                </button>
                              </div>
                            )}

                            {/* Input Nama Variabel (clean, tanpa tombol "+" overlay) */}
                            <div>
                              <input
                                id={`input-variabel-${idx}-${varIdx}`}
                                type="text"
                                aria-label={`Variabel ${varIdx + 1} ${goals.length > 1 ? `untuk ${tujuanLabel}` : ''}`}
                                value={varItem.name}
                                onChange={(e) =>
                                  updateVariable(idx, varIdx, { name: e.target.value })
                                }
                                placeholder={
                                  varIdx === 0
                                    ? idx === 0
                                      ? 'Contoh: prestasi belajar mahasiswa'
                                      : idx === 1
                                      ? 'Contoh: intensitas penggunaan media sosial'
                                      : 'Tuliskan variabel yang ingin kamu teliti...'
                                    : `Tuliskan variabel ke-${varIdx + 1} yang ingin kamu ketahui...`
                                }
                                className="w-full min-h-[48px] h-12 px-4 rounded-xl border border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69] text-sm md:text-base transition-all"
                              />
                            </div>

                            {/* Pertanyaan: Apakah variabel tersebut dapat diukur secara langsung? */}
                            <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
                              <legend className="text-sm font-bold text-[#12202B] mb-2 p-0">
                                Apakah variabel {variables.length > 1 ? `ke-${varIdx + 1}` : 'tersebut'} dapat diukur secara langsung?
                              </legend>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                  { value: true, key: 'ya', label: 'Ya, dapat diukur langsung' },
                                  {
                                    value: false,
                                    key: 'tidak',
                                    label: 'Tidak, tidak dapat diukur langsung',
                                  },
                                ].map((opt) => {
                                  const isSelected = isDirect === opt.value;
                                  return (
                                    <label
                                      key={opt.key}
                                      className={`relative min-h-[44px] flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#0B6E69] focus-within:ring-offset-2 ${
                                        isSelected
                                          ? 'bg-[#E3F2F1] border-2 border-[#0B6E69] text-[#12202B] font-semibold shadow-xs'
                                          : 'bg-white border border-[#C5CED6] text-[#12202B] hover:bg-[#F4F6F8]'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <input
                                          type="radio"
                                          name={`dapat-diukur-langsung-${goal.id}-${varItem.id}`}
                                          value={opt.key}
                                          checked={isSelected}
                                          onChange={() =>
                                            updateVariable(idx, varIdx, { isDirect: opt.value })
                                          }
                                          className="sr-only"
                                        />
                                        <span className="text-sm md:text-base leading-snug">
                                          {opt.label}
                                        </span>
                                      </div>
                                      <div
                                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                          isSelected
                                            ? 'border-[#0B6E69] bg-[#0B6E69] text-white'
                                            : 'border-[#C5CED6] bg-white'
                                        }`}
                                      >
                                        {isSelected && (
                                          <span className="material-symbols-outlined text-[14px]">
                                            check
                                          </span>
                                        )}
                                      </div>
                                    </label>
                                  );
                                })}
                              </div>
                            </fieldset>

                            {/* BRANCHING PER VARIABLE (aria-live="polite") */}
                            <div aria-live="polite">
                              <AnimatePresence initial={false} mode="wait">
                                {/* BRANCH A: Ya, dapat diukur langsung */}
                                {isDirect === true && (
                                  <motion.div
                                    key="branch-ya"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={branchTransition}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-3 border-t border-[#DDE3E8] space-y-3">
                                      <label
                                        htmlFor={`direct-q-${goal.id}-${varItem.id}-0`}
                                        className="block text-sm font-bold text-[#12202B]"
                                      >
                                        Pertanyaan untuk variabel ini
                                      </label>

                                      <div className="space-y-2.5">
                                        {varItem.directQuestions.map((qVal, qIdx) => (
                                          <div
                                            key={qIdx}
                                            className="flex items-center gap-2"
                                          >
                                            <input
                                              id={`direct-q-${goal.id}-${varItem.id}-${qIdx}`}
                                              type="text"
                                              aria-label={`Pertanyaan ${qIdx + 1} untuk variabel ${varIdx + 1}`}
                                              value={qVal}
                                              onChange={(e) =>
                                                handleDirectQuestionChange(
                                                  idx,
                                                  varIdx,
                                                  qIdx,
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Tulis pertanyaanmu di sini"
                                              className="flex-1 min-w-0 min-h-[44px] h-11 px-4 rounded-xl border border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69] text-sm md:text-base transition-all"
                                            />
                                            {varItem.directQuestions.length > 1 && (
                                              <button
                                                type="button"
                                                aria-label="Hapus pertanyaan"
                                                onClick={() =>
                                                  handleRemoveDirectQuestion(idx, varIdx, qIdx)
                                                }
                                                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-[#DDE3E8] bg-white text-[#5B6B78] hover:text-[#ba1a1a] hover:border-[#ba1a1a]/40 hover:bg-[#ffdad6]/30 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
                                              >
                                                <span className="material-symbols-outlined text-[18px]">
                                                  close
                                                </span>
                                              </button>
                                            )}
                                          </div>
                                        ))}
                                      </div>

                                      <div>
                                        <button
                                          type="button"
                                          onClick={() => handleAddDirectQuestion(idx, varIdx)}
                                          className="min-h-[44px] px-2 -ml-2 text-[#0B6E69] hover:text-[#005450] font-bold text-sm inline-flex items-center gap-1.5 cursor-pointer transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
                                        >
                                          <span className="material-symbols-outlined text-[18px]">
                                            add
                                          </span>
                                          <span>Tambah pertanyaan</span>
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {/* BRANCH B: Tidak, tidak dapat diukur langsung */}
                                {isDirect === false && (
                                  <motion.div
                                    key="branch-tidak"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={branchTransition}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-3 border-t border-[#DDE3E8] space-y-5">
                                      {/* Existing teal info note */}
                                      <p className="text-xs text-[#0B6E69] font-medium flex items-center gap-1.5 bg-[#E3F2F1]/70 px-3.5 py-2.5 rounded-lg border border-[#0B6E69]/20">
                                        <span className="material-symbols-outlined text-[16px] shrink-0">
                                          info
                                        </span>
                                        <span>
                                          Variabel tidak langsung (konstruk) memerlukan indikator pertanyaan serta pengujian validitas dan reliabilitas instrumen.
                                        </span>
                                      </p>

                                      {/* Step 1: Definisikan variabel ini */}
                                      <div className="flex flex-col gap-2">
                                        <label
                                          htmlFor={`definition-${goal.id}-${varItem.id}`}
                                          className="text-sm font-bold text-[#12202B]"
                                        >
                                          Definisikan variabel ini
                                        </label>
                                        <textarea
                                          id={`definition-${goal.id}-${varItem.id}`}
                                          rows={3}
                                          value={varItem.definition}
                                          onChange={(e) =>
                                            updateVariable(idx, varIdx, {
                                              definition: e.target.value,
                                            })
                                          }
                                          placeholder="Jelaskan apa yang dimaksud dengan variabel ini dengan kata-katamu sendiri"
                                          className="w-full p-3.5 rounded-xl border border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69] text-sm md:text-base resize-y transition-all"
                                        />
                                      </div>

                                      {/* Step 2: Pilih jenis opsi jawaban */}
                                      <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
                                        <legend className="text-sm font-bold text-[#12202B] mb-2 p-0">
                                          Pilih jenis opsi jawaban
                                        </legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          {[
                                            {
                                              value: 'binary' as const,
                                              title: 'Pilihan biner',
                                              helper: `${binaryDisplay0} / ${binaryDisplay1}`,
                                            },
                                            {
                                              value: 'likert' as const,
                                              title: 'Skala Likert',
                                              helper: `${likertDisplay0} sampai ${likertDisplay1} (1-5)`,
                                            },
                                          ].map((opt) => {
                                            const isSelected = varItem.answerType === opt.value;
                                            return (
                                              <label
                                                key={opt.value}
                                                className={`relative min-h-[44px] flex items-center justify-between gap-3 p-4 rounded-xl cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#0B6E69] focus-within:ring-offset-2 ${
                                                  isSelected
                                                    ? 'bg-[#E3F2F1] border-2 border-[#0B6E69] text-[#12202B] shadow-xs'
                                                    : 'bg-white border border-[#C5CED6] text-[#12202B] hover:bg-[#F4F6F8]'
                                                }`}
                                              >
                                                <div className="space-y-0.5 min-w-0">
                                                  <input
                                                    type="radio"
                                                    name={`answer-type-${goal.id}-${varItem.id}`}
                                                    value={opt.value}
                                                    checked={isSelected}
                                                    onChange={() =>
                                                      updateVariable(idx, varIdx, {
                                                        answerType: opt.value,
                                                      })
                                                    }
                                                    className="sr-only"
                                                  />
                                                  <span className="block text-sm md:text-base font-bold text-[#12202B] leading-snug">
                                                    {opt.title}
                                                  </span>
                                                  <span className="block text-xs text-[#5B6B78] leading-snug break-words">
                                                    {opt.helper}
                                                  </span>
                                                </div>
                                                <div
                                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                                    isSelected
                                                      ? 'border-[#0B6E69] bg-[#0B6E69] text-white'
                                                      : 'border-[#C5CED6] bg-white'
                                                  }`}
                                                >
                                                  {isSelected && (
                                                    <span className="material-symbols-outlined text-[14px]">
                                                      check
                                                    </span>
                                                  )}
                                                </div>
                                              </label>
                                            );
                                          })}
                                        </div>
                                      </fieldset>

                                      {/* Custom option label editors for Binary or Likert */}
                                      {varItem.answerType === 'binary' && (
                                        <div className="rounded-xl border border-[#DDE3E8] bg-[#F4F6F8] p-4 space-y-3">
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="text-xs sm:text-sm font-bold text-[#12202B]">
                                              Sesuaikan tulisan opsi biner
                                            </span>
                                            {(binaryOpts[0] !== DEFAULT_BINARY_OPTIONS[0] ||
                                              binaryOpts[1] !== DEFAULT_BINARY_OPTIONS[1]) && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  updateVariable(idx, varIdx, {
                                                    binaryOptions: [
                                                      DEFAULT_BINARY_OPTIONS[0],
                                                      DEFAULT_BINARY_OPTIONS[1],
                                                    ],
                                                  })
                                                }
                                                className="text-xs font-semibold text-[#0B6E69] hover:text-[#005450] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] rounded px-1.5 py-0.5"
                                              >
                                                Reset default
                                              </button>
                                            )}
                                          </div>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                              <label
                                                htmlFor={`binary-opt-0-${goal.id}-${varItem.id}`}
                                                className="block text-xs font-semibold text-[#5B6B78]"
                                              >
                                                Opsi 1
                                              </label>
                                              <input
                                                id={`binary-opt-0-${goal.id}-${varItem.id}`}
                                                type="text"
                                                value={binaryOpts[0]}
                                                onChange={(e) =>
                                                  handleBinaryOptionChange(
                                                    idx,
                                                    varIdx,
                                                    0,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Contoh: Ya / Tertarik"
                                                className="w-full min-h-[44px] h-11 px-3.5 rounded-xl border border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69] text-sm transition-all"
                                              />
                                            </div>
                                            <div className="space-y-1.5">
                                              <label
                                                htmlFor={`binary-opt-1-${goal.id}-${varItem.id}`}
                                                className="block text-xs font-semibold text-[#5B6B78]"
                                              >
                                                Opsi 2
                                              </label>
                                              <input
                                                id={`binary-opt-1-${goal.id}-${varItem.id}`}
                                                type="text"
                                                value={binaryOpts[1]}
                                                onChange={(e) =>
                                                  handleBinaryOptionChange(
                                                    idx,
                                                    varIdx,
                                                    1,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Contoh: Tidak / Tidak tertarik"
                                                className="w-full min-h-[44px] h-11 px-3.5 rounded-xl border border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69] text-sm transition-all"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {varItem.answerType === 'likert' && (
                                        <div className="rounded-xl border border-[#DDE3E8] bg-[#F4F6F8] p-4 space-y-3">
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="text-xs sm:text-sm font-bold text-[#12202B]">
                                              Sesuaikan tulisan label skala Likert (1–5)
                                            </span>
                                            {(likertEnds[0] !== LIKERT_5_POINT_LABELS[0].label ||
                                              likertEnds[1] !== LIKERT_5_POINT_LABELS[4].label) && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  updateVariable(idx, varIdx, {
                                                    likertEndLabels: [
                                                      LIKERT_5_POINT_LABELS[0].label,
                                                      LIKERT_5_POINT_LABELS[4].label,
                                                    ],
                                                  })
                                                }
                                                className="text-xs font-semibold text-[#0B6E69] hover:text-[#005450] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] rounded px-1.5 py-0.5"
                                              >
                                                Reset default
                                              </button>
                                            )}
                                          </div>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                              <label
                                                htmlFor={`likert-end-0-${goal.id}-${varItem.id}`}
                                                className="block text-xs font-semibold text-[#5B6B78]"
                                              >
                                                Label angka 1 (kiri)
                                              </label>
                                              <input
                                                id={`likert-end-0-${goal.id}-${varItem.id}`}
                                                type="text"
                                                value={likertEnds[0]}
                                                onChange={(e) =>
                                                  handleLikertEndLabelChange(
                                                    idx,
                                                    varIdx,
                                                    0,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Contoh: Tidak tertarik"
                                                className="w-full min-h-[44px] h-11 px-3.5 rounded-xl border border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69] text-sm transition-all"
                                              />
                                            </div>
                                            <div className="space-y-1.5">
                                              <label
                                                htmlFor={`likert-end-1-${goal.id}-${varItem.id}`}
                                                className="block text-xs font-semibold text-[#5B6B78]"
                                              >
                                                Label angka 5 (kanan)
                                              </label>
                                              <input
                                                id={`likert-end-1-${goal.id}-${varItem.id}`}
                                                type="text"
                                                value={likertEnds[1]}
                                                onChange={(e) =>
                                                  handleLikertEndLabelChange(
                                                    idx,
                                                    varIdx,
                                                    1,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Contoh: Tertarik"
                                                className="w-full min-h-[44px] h-11 px-3.5 rounded-xl border border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69] text-sm transition-all"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* Step 3: Buat 3 pertanyaan berdasarkan variabel ini */}
                                      <div className="space-y-3">
                                        <div className="space-y-1">
                                          <span className="block text-sm font-bold text-[#12202B]">
                                            Buat 3 pertanyaan berdasarkan variabel ini
                                          </span>
                                          {isIndirectLocked && (
                                            <p
                                              id={lockHintId}
                                              className="text-xs text-[#5B6B78]"
                                            >
                                              Pilih jenis opsi jawaban terlebih dahulu.
                                            </p>
                                          )}
                                        </div>

                                        <div className="space-y-4">
                                          {([0, 1, 2] as const).map((qIdx) => {
                                            const inputId = `indirect-q-${goal.id}-${varItem.id}-${qIdx}`;
                                            return (
                                              <div
                                                key={qIdx}
                                                className="space-y-2"
                                              >
                                                <label
                                                  htmlFor={inputId}
                                                  className="block text-xs font-bold text-[#12202B]"
                                                >
                                                  Pertanyaan {qIdx + 1}
                                                </label>
                                                <input
                                                  id={inputId}
                                                  type="text"
                                                  disabled={isIndirectLocked}
                                                  aria-describedby={
                                                    isIndirectLocked ? lockHintId : undefined
                                                  }
                                                  value={varItem.indirectQuestions[qIdx]}
                                                  onChange={(e) =>
                                                    handleIndirectQuestionChange(
                                                      idx,
                                                      varIdx,
                                                      qIdx,
                                                      e.target.value
                                                    )
                                                  }
                                                  placeholder="Tulis pertanyaan yang mengukur variabel ini"
                                                  className={`w-full min-h-[44px] h-11 px-4 rounded-xl border text-sm md:text-base transition-all ${
                                                    isIndirectLocked
                                                      ? 'border-[#DDE3E8] bg-[#F4F6F8] text-[#5B6B78] cursor-not-allowed placeholder:text-[#5B6B78]/50'
                                                      : 'border-[#DDE3E8] bg-white text-[#12202B] placeholder:text-[#5B6B78]/60 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:border-[#0B6E69]'
                                                  }`}
                                                />

                                                {/* Read-only preview of answer options */}
                                                {varItem.answerType === 'binary' && (
                                                  <div
                                                    aria-label="Pratinjau opsi jawaban pilihan biner"
                                                    className="flex flex-wrap items-center gap-2 pt-0.5"
                                                  >
                                                    <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#DDE3E8] bg-white text-xs font-semibold text-[#5B6B78]">
                                                      {binaryDisplay0}
                                                    </span>
                                                    <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#DDE3E8] bg-white text-xs font-semibold text-[#5B6B78]">
                                                      {binaryDisplay1}
                                                    </span>
                                                  </div>
                                                )}

                                                {varItem.answerType === 'likert' && (
                                                  <div
                                                    aria-label="Pratinjau opsi jawaban skala Likert 1 sampai 5"
                                                    className="pt-1 space-y-1.5"
                                                  >
                                                    <div className="flex items-center justify-between gap-2 max-w-[360px]">
                                                      {LIKERT_5_POINT_LABELS.map((item) => {
                                                        const tooltipLabel =
                                                          item.value === 1
                                                            ? likertDisplay0
                                                            : item.value === 5
                                                            ? likertDisplay1
                                                            : item.label;
                                                        return (
                                                          <div
                                                            key={item.value}
                                                            className="flex flex-col items-center"
                                                            title={tooltipLabel}
                                                          >
                                                            <span className="w-8 h-8 rounded-full border border-[#DDE3E8] bg-white text-xs font-bold text-[#5B6B78] flex items-center justify-center">
                                                              {item.value}
                                                            </span>
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                                                    <div className="flex items-center justify-between gap-4 max-w-[360px] text-[11px] text-[#5B6B78]">
                                                      <span>{likertDisplay0}</span>
                                                      <span className="text-right">
                                                        {likertDisplay1}
                                                      </span>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => handleAddVariable(idx)}
                        className="min-h-[44px] px-2 text-[#0B6E69] hover:text-[#005450] font-bold text-xs inline-flex items-center gap-1 shrink-0 cursor-pointer transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_circle</span>
                        <span>Tambah variabel ({variables.length})</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 2) "LANJUT" BUTTON ROW */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="text-xs sm:text-sm text-[#5B6B78]">
                {allAnswered ? (
                  <span className="inline-flex items-center gap-1.5 text-[#0B6E69] font-semibold">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Semua variabel sudah terjawab</span>
                  </span>
                ) : (
                  <span>
                    Jawab Ya atau Tidak untuk semua variabel untuk melanjutkan. ({answeredCount} dari{' '}
                    {totalCount} variabel terjawab)
                  </span>
                )}
              </div>

              <button
                type="button"
                aria-disabled={!allAnswered}
                onClick={() => {
                  if (!allAnswered) return;
                  navigate('langkah-berikutnya', 'push');
                }}
                className={`w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2 ${
                  allAnswered
                    ? 'bg-[#0B6E69] hover:bg-[#005450] text-white shadow-sm cursor-pointer'
                    : 'bg-[#DDE3E8] text-[#5B6B78] cursor-not-allowed'
                }`}
              >
                <span>Lanjut</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Section 4: Solid Teal Call to Action Module */}
          <div className="bg-[#005450] text-white rounded-2xl p-7 md:p-9 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Toolkit siap dipakai
                </h2>
                <p className="font-body-md text-sm sm:text-base text-[#9cede6] leading-relaxed">
                  Mulai dari menghitung jumlah responden, lalu lanjut menguji kuesionermu sebelum disebar.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-start lg:items-end gap-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('kalkulator-diketahui', 'push');
                  }}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white text-[#005450] font-headline-sm text-base font-bold shadow hover:bg-[#ecf4ff] transition-all cursor-pointer"
                >
                  {!isLoggedIn && (
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  )}
                  <span>{isLoggedIn ? 'Buka toolkit' : 'Masuk untuk buka toolkit'}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </a>
                {!isLoggedIn && (
                  <span className="text-xs text-[#9cede6]">
                    Login diperlukan untuk mengakses Toolkit survei
                  </span>
                )}
              </div>
            </div>

            {/* Feature Badges */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-label-md text-xs">
                <span className="material-symbols-outlined text-[16px]">calculate</span>
                <span>Kalkulator sampel</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-label-md text-xs">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                <span>Cek validitas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-label-md text-xs">
                <span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>
                <span>Cek reliabilitas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-label-md text-xs">
                <span className="material-symbols-outlined text-[16px]">spellcheck</span>
                <span>Cek kalimat pertanyaan</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-label-md text-xs">
                <span className="material-symbols-outlined text-[16px]">analytics</span>
                <span>Analisis data</span>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
