import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';
import { ToolkitLayout } from './ToolkitLayout';

interface KalkulatorTidakDiketahuiScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  topic: string;
}

export const KalkulatorTidakDiketahuiScreen: React.FC<KalkulatorTidakDiketahuiScreenProps> = ({
  navigate,
  topic,
}) => {
  const currentTopic = topic || 'Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta';

  const [confidence, setConfidence] = useState<'90' | '95' | '99'>('95');
  const [moe, setMoe] = useState<number>(5);
  const [proporsi, setProporsi] = useState<number>(50);
  const [nonrespons, setNonrespons] = useState<number>(10);

  const zMap: Record<string, number> = {
    '90': 1.645,
    '95': 1.96,
    '99': 2.576,
  };

  const Z = zMap[confidence];
  const e = Math.max(0.001, moe / 100);
  const p = Math.max(0.001, Math.min(0.999, proporsi / 100));
  const r = Math.max(0, Math.min(0.9, nonrespons / 100));

  const rawN = (Math.pow(Z, 2) * p * (1 - p)) / Math.pow(e, 2);
  const finalN = Math.ceil(rawN);

  const withBuffer = r < 1 && r >= 0 ? Math.ceil(finalN / (1 - r)) : finalN;

  // Sensitivity at 3% and 10%
  const nAt3 = Math.ceil((Math.pow(Z, 2) * p * (1 - p)) / Math.pow(0.03, 2));
  const nAt10 = Math.ceil((Math.pow(Z, 2) * p * (1 - p)) / Math.pow(0.1, 2));

  const handleReset = () => {
    setConfidence('95');
    setMoe(5);
    setProporsi(50);
    setNonrespons(10);
  };

  return (
    <ToolkitLayout initialTab="kalkulator-sampel">
      {(onSelectTab) => (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-2 text-xs md:text-sm">
            <span className="font-body-sm text-[#536161]">Toolkit</span>
            <span className="material-symbols-outlined text-[#536161] text-[16px]">chevron_right</span>
            <span className="font-body-sm text-[#536161]">Perencanaan</span>
            <span className="material-symbols-outlined text-[#536161] text-[16px]">chevron_right</span>
            <span className="font-label-md text-[#005450] font-bold">Kalkulator Sampel</span>
          </nav>

          {/* Page Title & Guidance */}
          <header className="mb-6">
            <h1 className="font-headline-xl text-3xl md:text-4xl text-[#0f1d28] tracking-tight mb-2 font-extrabold">
              Kalkulator ukuran sampel
            </h1>
            <p className="font-body-lg text-sm md:text-base text-[#536161] max-w-3xl leading-relaxed">
              Hitung jumlah responden minimum agar hasil surveimu cukup mewakili populasi. Pilih tipe sesuai pengetahuanmu tentang jumlah populasi.
            </p>
          </header>

          {/* Active Project Strip with button Ganti topik */}
          <section className="bg-white shadow-xs rounded-xl px-4 py-3 border border-[#DDE3E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#e1f0ff] flex items-center justify-center shrink-0 text-[#005450]">
                <span className="material-symbols-outlined text-[18px]">folder_open</span>
              </div>
              <div className="truncate font-body-md text-sm text-[#0f1d28]">
                <span className="text-[#536161] font-medium">Proyek aktif: </span>
                <strong className="font-semibold text-[#0f1d28]">{currentTopic}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('beranda', 'push_back')}
              className="font-label-md text-sm text-[#005450] hover:text-[#0b6e69] font-bold transition-colors shrink-0 text-left sm:text-right cursor-pointer"
            >
              Ganti topik
            </button>
          </section>

          {/* Segmented Control for Population Type */}
          <div className="inline-flex self-start p-1.5 rounded-xl bg-[#dbeaf9] mb-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected="false"
              onClick={() => navigate('kalkulator-diketahui', 'none')}
              className="px-5 py-2.5 rounded-lg font-label-md text-xs sm:text-sm text-[#536161] hover:text-[#0f1d28] transition-colors cursor-pointer"
            >
              Populasi diketahui
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="true"
              aria-current="true"
              className="px-5 py-2.5 rounded-lg font-label-md text-xs sm:text-sm font-bold bg-white text-[#005450] shadow-xs transition-all cursor-default"
            >
              Populasi tidak diketahui
            </button>
          </div>
          <p className="font-body-md text-xs sm:text-sm text-[#536161] mb-8">
            Pakai tipe ini bila jumlah anggota populasi tidak diketahui atau sangat besar, misalnya pengguna media sosial. Rumus Cochran tanpa koreksi populasi.
          </p>

          {/* Main Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
            {/* Left Column: Input Form (No N population field) */}
            <div className="lg:col-span-6 bg-white shadow-xs border border-[#DDE3E8] rounded-xl p-6 md:p-7 flex flex-col gap-6">
              {/* Confidence Level Selector */}
              <div>
                <label className="block font-label-md text-sm text-[#0f1d28] mb-2 font-bold">
                  Tingkat kepercayaan
                </label>
                <div className="grid grid-cols-3 gap-3" role="radiogroup">
                  {(['90', '95', '99'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setConfidence(lvl)}
                      className={`h-11 rounded-lg font-label-md text-sm font-semibold transition-all border flex items-center justify-center ${
                        confidence === lvl
                          ? 'bg-[#d4e3e2] text-[#005450] border-[#005450] ring-2 ring-[#005450] shadow-xs font-bold'
                          : 'bg-white text-[#0f1d28] hover:bg-[#f6f9ff] border-[#DDE3E8]'
                      }`}
                    >
                      {lvl}%
                    </button>
                  ))}
                </div>
              </div>

              {/* MoE & Expected Proportion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-sm text-[#0f1d28] mb-1.5 font-bold" htmlFor="input-moe">
                    Margin of error (e)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="input-moe"
                      type="number"
                      min={1}
                      max={25}
                      step={0.5}
                      value={moe}
                      onChange={(e) => setMoe(parseFloat(e.target.value) || 5)}
                      className="w-full h-11 bg-white text-[#0f1d28] font-headline-sm text-lg rounded-lg pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#005450] border border-[#DDE3E8] shadow-xs"
                    />
                    <span className="absolute right-3 font-label-md text-sm text-[#536161] select-none font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-sm text-[#0f1d28] mb-1.5 font-bold" htmlFor="input-proportion">
                    Proporsi perkiraan (p)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="input-proportion"
                      type="number"
                      min={1}
                      max={99}
                      step={1}
                      value={proporsi}
                      onChange={(e) => setProporsi(parseFloat(e.target.value) || 50)}
                      className="w-full h-11 bg-white text-[#0f1d28] font-headline-sm text-lg rounded-lg pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#005450] border border-[#DDE3E8] shadow-xs"
                    />
                    <span className="absolute right-3 font-label-md text-sm text-[#536161] select-none font-bold">%</span>
                  </div>
                </div>
                <p className="sm:col-span-2 font-body-sm text-xs text-[#536161]">
                  Pakai p = 50% bila belum tahu; angka ini menghasilkan sampel paling aman.
                </p>
              </div>

              {/* Non-response Buffer */}
              <div>
                <label className="block font-label-md text-sm text-[#0f1d28] mb-1.5 font-bold" htmlFor="input-buffer">
                  Cadangan non-respons
                </label>
                <div className="relative flex items-center max-w-[200px]">
                  <input
                    id="input-buffer"
                    type="number"
                    min={0}
                    max={90}
                    step={1}
                    value={nonrespons}
                    onChange={(e) => setNonrespons(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 bg-white text-[#0f1d28] font-headline-sm text-lg rounded-lg pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#005450] border border-[#DDE3E8] shadow-xs"
                  />
                  <span className="absolute right-3 font-label-md text-sm text-[#536161] select-none font-bold">%</span>
                </div>
                <p className="font-body-sm text-xs text-[#536161] mt-1.5">
                  Tambahan responden untuk mengantisipasi yang tidak mengisi atau jawabannya tidak lengkap.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-11 px-4 rounded-lg bg-[#e1f0ff] hover:bg-[#dbeaf9] text-[#005450] font-label-md text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-[#DDE3E8] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  <span>Setel ulang</span>
                </button>
              </div>
            </div>

            {/* Right Column: Results & Formula Output */}
            <div className="lg:col-span-6 bg-white shadow-xs border border-[#DDE3E8] rounded-xl p-6 md:p-7 flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-[#536161] font-bold mb-1">
                HASIL
              </span>

              {/* Primary KPI Display */}
              <div className="flex items-baseline gap-2 mb-1">
                <div className="font-headline-xl text-5xl sm:text-6xl md:text-[76px] leading-none font-extrabold text-[#005450] tracking-tight">
                  {finalN.toLocaleString('id-ID')}
                </div>
              </div>

              <p className="font-body-md text-sm font-semibold text-[#0f1d28] mb-6">
                responden minimum (rumus Cochran untuk populasi tidak diketahui)
              </p>

              {/* Comparative Sensitivity Matrix */}
              <div className="bg-[#ecf4ff] border border-[#DDE3E8]/60 rounded-xl p-4 flex flex-col gap-2 mb-6">
                <div className="flex items-center justify-between py-1 text-xs sm:text-sm font-body-md">
                  <span className="text-[#536161]">Dengan cadangan {nonrespons}% non-respons</span>
                  <span className="font-headline-sm text-base font-bold text-[#0f1d28]">
                    {withBuffer.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-full h-px bg-[#DDE3E8]/70"></div>
                <div className="flex items-center justify-between py-1 text-xs sm:text-sm font-body-md">
                  <span className="text-[#536161]">Bila margin of error 3%</span>
                  <span className="font-headline-sm text-base font-bold text-[#0f1d28]">
                    {nAt3.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-full h-px bg-[#DDE3E8]/70"></div>
                <div className="flex items-center justify-between py-1 text-xs sm:text-sm font-body-md">
                  <span className="text-[#536161]">Bila margin of error 10%</span>
                  <span className="font-headline-sm text-base font-bold text-[#0f1d28]">
                    {nAt10.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Formula Showcase Box */}
              <div className="bg-[#ecf4ff] border border-[#DDE3E8]/60 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-[#536161] font-bold">
                    RUMUS
                  </span>
                  <span className="font-code-sm text-xs text-[#536161]">Cochran (1977)</span>
                </div>
                <div className="font-code-md text-xs sm:text-sm text-[#0f1d28] space-y-1.5 py-1">
                  <div className="font-bold text-[#005450]">n = Z² · p · (1 − p) / e²</div>
                  <div className="text-[#536161] font-mono">
                    n = ({Z.toString().replace('.', ',')}² × {p.toString().replace('.', ',')} × {(1 - p).toFixed(2).replace('.', ',')}) / {e.toString().replace('.', ',')}² = {rawN.toFixed(1).replace('.', ',')} → {finalN}
                  </div>
                </div>
                <p className="font-body-sm text-xs text-[#536161] italic mt-1">
                  Z = {Z.toString().replace('.', ',')} untuk tingkat kepercayaan {confidence}%.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Next Steps */}
          <section className="mt-4 mb-4">
            <h2 className="font-headline-md text-xl md:text-2xl text-[#0f1d28] font-bold mb-4">
              Langkah berikutnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Cek validitas */}
              <div
                onClick={() => onSelectTab('cek-validitas')}
                className="group bg-white border border-[#DDE3E8] shadow-xs rounded-xl p-5 hover:border-[#0B6E69] hover:bg-[#ecf4ff] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#005450] mb-2">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span className="font-headline-sm text-base text-[#0f1d28] font-bold group-hover:text-[#005450] transition-colors">
                      Langkah 2 · Cek validitas
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-[#536161] leading-relaxed">
                    Uji apakah tiap butir mengukur konsep yang benar.
                  </p>
                </div>
                <div className="mt-4 flex items-center font-label-sm text-xs font-bold text-[#005450] gap-1">
                  <span>Buka panduan &amp; instrumen</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Card 2: Cek reliabilitas */}
              <div
                onClick={() => onSelectTab('cek-reliabilitas')}
                className="group bg-white border border-[#DDE3E8] shadow-xs rounded-xl p-5 hover:border-[#0B6E69] hover:bg-[#ecf4ff] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#005450] mb-2">
                    <span className="material-symbols-outlined text-[20px]">sync</span>
                    <span className="font-headline-sm text-base text-[#0f1d28] font-bold group-hover:text-[#005450] transition-colors">
                      Langkah 3 · Cek reliabilitas
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-[#536161] leading-relaxed">
                    Hitung Cronbach's Alpha untuk melihat konsistensi jawaban.
                  </p>
                </div>
                <div className="mt-4 flex items-center font-label-sm text-xs font-bold text-[#005450] gap-1">
                  <span>Buka panduan &amp; instrumen</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Card 3: Cek kalimat pertanyaan */}
              <div
                onClick={() => alert('Fitur instrumen Cek Kalimat Pertanyaan terbuka.')}
                className="group bg-white border border-[#DDE3E8] shadow-xs rounded-xl p-5 hover:bg-[#ecf4ff] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#005450] mb-2">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span className="font-headline-sm text-base text-[#0f1d28] font-bold group-hover:text-[#005450] transition-colors">
                      Langkah 4 · Cek kalimat pertanyaan
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-[#536161] leading-relaxed">
                    Temukan pertanyaan ganda atau yang menggiring jawaban.
                  </p>
                </div>
                <div className="mt-4 flex items-center font-label-sm text-xs font-bold text-[#005450] gap-1">
                  <span>Buka instrumen</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Navigation Cards */}
          <div className="mt-14 pt-8 border-t border-[#DDE3E8]">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onSelectTab('cek-validitas')}
                className="group p-5 rounded-xl bg-white border border-[#DDE3E8] hover:border-[#0B6E69] hover:bg-[#E3F2F1]/30 transition-all text-right flex items-center justify-end gap-4 shadow-xs hover:shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:ring-offset-2 w-full sm:w-auto min-w-[280px]"
              >
                <div className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-[#5B6B78] font-bold mb-0.5">
                    Berikutnya
                  </span>
                  <span className="block text-base font-bold text-[#12202B] group-hover:text-[#0B6E69] transition-colors truncate">
                    Cek validitas
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F8] group-hover:bg-[#E3F2F1] text-[#0B6E69] flex items-center justify-center shrink-0 transition-colors">
                  <span className="material-symbols-outlined text-[22px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </ToolkitLayout>
  );
};
