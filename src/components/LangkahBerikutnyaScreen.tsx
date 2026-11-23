import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { GoalItem, ScreenType, TransitionType } from '../types';

interface LangkahBerikutnyaScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  topic: string;
  goals: GoalItem[];
}

export const LangkahBerikutnyaScreen: React.FC<LangkahBerikutnyaScreenProps> = ({
  navigate,
  topic,
  goals,
}) => {
  return (
    <div className="w-full bg-[#F4F6F8] text-[#12202B] min-h-[calc(100vh-145px)]">
      <main className="w-full pt-[72px] pb-16">
        <div className="w-full max-w-[1040px] mx-auto px-4 md:px-8 py-8 space-y-6">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => navigate('hasil-survei', 'push_back')}
              className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B6B78] hover:text-[#0B6E69] transition-colors cursor-pointer rounded-lg px-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Kembali</span>
            </button>

            <h1 className="font-headline-xl text-3xl md:text-4xl text-[#12202B] font-extrabold tracking-tight">
              Langkah berikutnya
            </h1>
            <p className="text-sm sm:text-base text-[#5B6B78]">
              Ringkasan tujuan penelitian, variabel, dan pertanyaan yang telah kamu susun.
            </p>
          </div>

          {/* Topic Summary */}
          <div className="bg-white rounded-2xl border border-[#DDE3E8] p-5 sm:p-6 space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
              Topik penelitian
            </span>
            <p className="text-base sm:text-lg font-bold text-[#12202B]">
              {topic || 'Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta'}
            </p>
          </div>

          {/* Collected Goals & Variables */}
          <div className="space-y-5">
            {goals.map((goal, gIdx) => (
              <section
                key={goal.id}
                aria-label={`Tujuan ${gIdx + 1}`}
                className="bg-white rounded-2xl border border-[#DDE3E8] p-5 sm:p-6 space-y-5"
              >
                <div className="flex items-start gap-3 pb-3 border-b border-[#DDE3E8]">
                  <span className="w-7 h-7 rounded-full bg-[#0B6E69] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {gIdx + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                      Tujuan {gIdx + 1}
                    </span>
                    <p className="text-base sm:text-lg font-bold text-[#12202B]">
                      {goal.text}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {goal.variables.map((variable, vIdx) => (
                    <div
                      key={variable.id}
                      className="rounded-2xl bg-[#F4F6F8] border border-[#DDE3E8] p-4 sm:p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className="w-4 h-4 text-[#0B6E69] shrink-0"
                            aria-hidden="true"
                          />
                          <h2 className="text-sm sm:text-base font-bold text-[#12202B]">
                            Variabel {vIdx + 1}: {variable.name}
                          </h2>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E3F2F1] text-[#0B6E69]">
                          {variable.isDirect
                            ? 'Dapat diukur langsung'
                            : 'Tidak dapat diukur langsung'}
                        </span>
                      </div>

                      {variable.isDirect === true && (
                        <div className="space-y-1.5 pt-1">
                          <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                            Pertanyaan untuk variabel ini
                          </span>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-[#12202B]">
                            {variable.directQuestions.map((q, qIdx) => (
                              <li key={qIdx}>
                                {q.trim() ? q : <span className="text-[#5B6B78] italic">(Belum diisi)</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {variable.isDirect === false && (
                        <div className="space-y-3 pt-1 text-sm text-[#12202B]">
                          <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                              Definisi variabel
                            </span>
                            <p className="mt-1">
                              {variable.definition.trim() ? (
                                variable.definition
                              ) : (
                                <span className="text-[#5B6B78] italic">(Belum diisi)</span>
                              )}
                            </p>
                          </div>

                          <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                              Jenis opsi jawaban
                            </span>
                            <p className="mt-1 font-semibold text-[#0B6E69]">
                              {variable.answerType === 'binary'
                                ? `Pilihan biner (${(variable.binaryOptions?.[0] || '').trim() || 'Ya'} / ${(variable.binaryOptions?.[1] || '').trim() || 'Tidak'})`
                                : variable.answerType === 'likert'
                                ? `Skala Likert (1: ${(variable.likertEndLabels?.[0] || '').trim() || 'Sangat tidak setuju'} – 5: ${(variable.likertEndLabels?.[1] || '').trim() || 'Sangat setuju'})`
                                : '(Belum dipilih)'}
                            </p>
                          </div>

                          <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                              3 pertanyaan berdasarkan variabel ini
                            </span>
                            <ol className="list-decimal pl-5 mt-1 space-y-1">
                              {variable.indirectQuestions.map((q, qIdx) => (
                                <li key={qIdx}>
                                  {q.trim() ? q : <span className="text-[#5B6B78] italic">(Belum diisi)</span>}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => navigate('hasil-survei', 'push_back')}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl border border-[#DDE3E8] bg-white hover:bg-[#E3F2F1]/50 text-[#12202B] text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Kembali ke tujuan proyek</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
