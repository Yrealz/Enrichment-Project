import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';
import { ToolkitLayout } from './ToolkitLayout';

interface KalkulatorDiketahuiScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  topic: string;
}

export const KalkulatorDiketahuiScreen: React.FC<KalkulatorDiketahuiScreenProps> = ({
  navigate,
  topic,
}) => {
  const currentTopic = topic || 'Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta';

  const [populasiN, setPopulasiN] = useState<number>(12000);
  const [confidence, setConfidence] = useState<'90' | '95' | '99'>('95');
  const [moe, setMoe] = useState<number>(5);
  const [proporsi, setProporsi] = useState<number>(50);
  const [nonrespons, setNonrespons] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  const zMap: Record<string, number> = {
    '90': 1.645,
    '95': 1.96,
    '99': 2.576,
  };

  const Z = zMap[confidence];
  const e = Math.max(0.001, moe / 100);
  const p = Math.max(0.001, Math.min(0.999, proporsi / 100));
  const r = Math.max(0, Math.min(0.9, nonrespons / 100));

  // Infinite population Cochran
  const n0 = (Math.pow(Z, 2) * p * (1 - p)) / Math.pow(e, 2);
  const roundedN0 = Math.ceil(n0);

  // Finite correction
  const rawCorrected = populasiN > 0 ? n0 / (1 + (n0 - 1) / populasiN) : n0;
  const finalN = Math.ceil(rawCorrected);

  // With buffer
  const withBuffer = r < 1 && r >= 0 ? Math.ceil(finalN / (1 - r)) : finalN;

  // Slovin comparison: N / (1 + N * e^2)
  const slovinVal = populasiN > 0 ? Math.ceil(populasiN / (1 + populasiN * Math.pow(e, 2))) : 0;

  const handleReset = () => {
    setPopulasiN(12000);
    setConfidence('95');
    setMoe(5);
    setProporsi(50);
    setNonrespons(10);
  };

  const handleCopyCitation = () => {
    const textToCopy = `Berdasarkan rumus Cochran dengan koreksi populasi berhingga (N = ${populasiN}, tingkat kepercayaan ${confidence}%, margin of error ${moe}%), sampel minimum yang dibutuhkan adalah sejumlah ${finalN} responden. Rujukan: Cochran, W. G. (1977). Sampling Techniques (3rd ed.).`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <ToolkitLayout initialTab="kalkulator-sampel">
      {(onSelectTab) => (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Navigasi Jejak" className="flex items-center gap-1.5 mb-2 text-xs md:text-sm">
            <span className="font-label-md text-[#536161]">Toolkit</span>
            <span className="material-symbols-outlined text-[#536161] text-[16px]">chevron_right</span>
            <span className="font-label-md text-[#536161]">Perencanaan</span>
            <span className="material-symbols-outlined text-[#536161] text-[16px]">chevron_right</span>
            <span className="font-label-md text-[#005450] font-bold">Kalkulator Sampel</span>
          </nav>

          {/* Title & Subtitle Section */}
          <div className="mb-6">
            <h1 className="font-headline-xl text-3xl md:text-4xl text-[#0f1d28] tracking-tight mb-2 font-extrabold">
              Kalkulator ukuran sampel
            </h1>
            <p className="font-body-lg text-sm md:text-base text-[#536161] max-w-3xl leading-relaxed">
              Hitung jumlah responden minimum agar hasil surveimu cukup mewakili populasi. Pilih tipe sesuai pengetahuanmu tentang jumlah populasi target penelitian.
            </p>
          </div>

          {/* Active Project Strip */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#DDE3E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#e1f0ff] flex items-center justify-center shrink-0 text-[#005450]">
                <span className="material-symbols-outlined text-[20px]">folder_open</span>
              </div>
              <div className="min-w-0">
                <span className="font-label-sm text-xs text-[#536161] uppercase tracking-wider block font-bold">
                  Proyek Aktif
                </span>
                <p className="font-label-md text-sm text-[#0f1d28] font-bold truncate">
                  {currentTopic}
                </p>
              </div>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('beranda', 'push_back');
              }}
              className="font-label-md text-sm text-[#005450] hover:text-[#0b6e69] font-bold flex items-center gap-1 self-start sm:self-center shrink-0 transition-colors cursor-pointer"
            >
              <span>Ganti topik</span>
              <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
            </a>
          </div>

          {/* Segmented Control Selector */}
          <div className="inline-flex p-1.5 rounded-xl bg-[#dbeaf9] w-fit mb-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected="true"
              id="tab-diketahui"
              className="px-5 py-2.5 rounded-lg font-label-md text-xs sm:text-sm font-bold bg-white text-[#005450] shadow-xs flex items-center gap-2 transition-all cursor-default"
            >
              <span className="material-symbols-outlined text-[18px]">domain_verification</span>
              <span>Populasi diketahui</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              id="tab-tidak-diketahui"
              onClick={() => navigate('kalkulator-tidak-diketahui', 'none')}
              className="px-5 py-2.5 rounded-lg font-label-md text-xs sm:text-sm font-medium text-[#536161] hover:text-[#0f1d28] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">help_outline</span>
              <span>Populasi tidak diketahui</span>
            </button>
          </div>
          <p className="font-body-md text-xs sm:text-sm text-[#536161] mb-8">
            Pakai tipe ini bila jumlah anggota populasi diketahui, misalnya jumlah mahasiswa terdaftar di universitas atau data agregat BPS. Rumus Cochran dikoreksi dengan ukuran populasi (Finite Population Correction).
          </p>

          {/* Interactive Workbench Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
            {/* Left Column: Calculation Parameters Form */}
            <div className="lg:col-span-6 bg-white rounded-xl p-6 md:p-7 shadow-xs border border-[#DDE3E8] flex flex-col gap-5">
              <div className="flex items-center justify-between pb-1 border-b border-[#DDE3E8]/50">
                <h2 className="font-headline-sm text-base md:text-lg font-bold text-[#0f1d28]">
                  Parameter Penelitian
                </h2>
                <span className="font-code-sm text-xs text-[#536161] bg-[#e1f0ff] px-2.5 py-1 rounded-md font-semibold">
                  Metode Cochran
                </span>
              </div>

              {/* Field 1: Populasi (N) */}
              <div className="flex flex-col gap-1.5" id="group-populasi">
                <label
                  className="font-label-md text-sm text-[#0f1d28] font-semibold flex items-center justify-between"
                  htmlFor="input-populasi"
                >
                  <span>
                    Ukuran populasi (<code className="font-code-sm text-xs text-[#005450] font-bold">N</code>)
                  </span>
                  <span className="font-label-sm text-xs text-[#ba1a1a] font-normal">Wajib diisi</span>
                </label>
                <div className="relative">
                  <input
                    id="input-populasi"
                    type="number"
                    min={1}
                    value={populasiN}
                    onChange={(e) => setPopulasiN(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full h-11 px-4 bg-[#f6f9ff] text-[#0f1d28] font-headline-sm text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005450] border border-[#DDE3E8]"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#536161]">
                    <span className="font-label-sm text-xs uppercase font-bold tracking-wider">Subjek</span>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-[#536161]">
                  Jumlah total anggota populasi yang menjadi target, misalnya jumlah mahasiswa terdaftar.
                </p>
              </div>

              {/* Field 2: Tingkat Kepercayaan (Z) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-sm text-[#0f1d28] font-semibold">
                    Tingkat kepercayaan (<code className="font-code-sm text-xs text-[#005450] font-bold">Z</code>)
                  </label>
                  <span className="font-label-sm text-xs text-[#536161]">Umum: 95%</span>
                </div>
                <div className="grid grid-cols-3 gap-3" role="radiogroup">
                  {(['90', '95', '99'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setConfidence(lvl)}
                      className={`h-11 rounded-lg font-label-md text-sm font-semibold transition-all border ${
                        confidence === lvl
                          ? 'bg-[#0b6e69] text-white border-[#0b6e69] shadow-xs font-bold'
                          : 'bg-[#f6f9ff] text-[#536161] hover:bg-[#e1f0ff] border-[#DDE3E8]'
                      }`}
                    >
                      {lvl}%
                    </button>
                  ))}
                </div>
                <p className="font-body-sm text-xs text-[#536161]">
                  Standar baku penelitian sosial strata 1 (S1) mayoritas menggunakan 95% (Z = 1,96).
                </p>
              </div>

              {/* Field 3 & 4: Margin of Error & Proporsi Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Margin of Error */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-sm text-[#0f1d28] font-semibold" htmlFor="input-moe">
                    Margin of error (<code className="font-code-sm text-xs text-[#005450] font-bold">e</code>)
                  </label>
                  <div className="relative">
                    <input
                      id="input-moe"
                      type="number"
                      min={0.1}
                      max={20}
                      step={0.5}
                      value={moe}
                      onChange={(e) => setMoe(parseFloat(e.target.value) || 5)}
                      className="w-full h-11 px-4 bg-[#f6f9ff] text-[#0f1d28] font-headline-sm text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005450] border border-[#DDE3E8]"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#536161]">
                      <span className="font-code-md text-sm font-bold">%</span>
                    </div>
                  </div>
                </div>

                {/* Proporsi Perkiraan (p) */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-sm text-[#0f1d28] font-semibold" htmlFor="input-proporsi">
                    Proporsi perkiraan (<code className="font-code-sm text-xs text-[#005450] font-bold">p</code>)
                  </label>
                  <div className="relative">
                    <input
                      id="input-proporsi"
                      type="number"
                      min={1}
                      max={99}
                      value={proporsi}
                      onChange={(e) => setProporsi(parseFloat(e.target.value) || 50)}
                      className="w-full h-11 px-4 bg-[#f6f9ff] text-[#0f1d28] font-headline-sm text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005450] border border-[#DDE3E8]"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#536161]">
                      <span className="font-code-md text-sm font-bold">%</span>
                    </div>
                  </div>
                </div>

                <p className="font-body-sm text-xs text-[#536161] sm:col-span-2">
                  Gunakan <strong className="text-[#0f1d28] font-semibold">p = 50%</strong> jika belum ada data rujukan survei sebelumnya. Nilai ini memberikan varians maksimal untuk sampel paling konservatif dan aman.
                </p>
              </div>

              {/* Field 5: Cadangan Non-respons */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label
                  className="font-label-md text-sm text-[#0f1d28] font-semibold flex items-center justify-between"
                  htmlFor="input-nonrespons"
                >
                  <span>
                    Cadangan non-respons (<code className="font-code-sm text-xs text-[#005450] font-bold">r</code>)
                  </span>
                  <span className="font-label-sm text-xs text-[#536161] font-medium">Opsional</span>
                </label>
                <div className="relative">
                  <input
                    id="input-nonrespons"
                    type="number"
                    min={0}
                    max={90}
                    value={nonrespons}
                    onChange={(e) => setNonrespons(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 px-4 bg-[#f6f9ff] text-[#0f1d28] font-headline-sm text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005450] border border-[#DDE3E8]"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#536161]">
                    <span className="font-code-md text-sm font-bold">%</span>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-[#536161]">
                  Tambahan kuota target responden untuk mengantisipasi kuesioner tidak lengkap atau responden mangkir (drop-out).
                </p>
              </div>

              {/* Reset Action */}
              <div className="pt-2 flex justify-start">
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-11 px-4 bg-[#f6f9ff] hover:bg-[#e1f0ff] text-[#536161] hover:text-[#0f1d28] font-label-md text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors border border-[#DDE3E8] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  <span>Setel ulang ke default</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live Computation & Formula Analysis */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              {/* Primary Result Highlight Card */}
              <div className="bg-white rounded-xl p-6 md:p-7 shadow-xs border border-[#DDE3E8] relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-[#536161]">
                    HASIL ESTIMASI KEBUTUHAN SAMPEL
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-sm text-xs text-[#005450] bg-[#d4e3e2] px-2.5 py-1 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#005450] animate-pulse"></span>
                    Siap Dikutip
                  </span>
                </div>

                <div className="flex items-baseline gap-2 my-2">
                  <div className="font-headline-xl text-5xl sm:text-6xl md:text-[76px] leading-none font-extrabold text-[#005450] tracking-tight">
                    {finalN.toLocaleString('id-ID')}
                  </div>
                  <span className="font-headline-sm text-lg text-[#0f1d28] font-bold">Responden</span>
                </div>

                <p className="font-label-md text-sm font-semibold text-[#0f1d28] mb-6">
                  responden minimum (rumus Cochran dengan koreksi populasi berhingga)
                </p>

                {/* Comparative Breakdown Rows */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#f6f9ff] border border-[#DDE3E8]/50">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#005450] text-[18px]">group_add</span>
                      <span className="font-body-md text-xs sm:text-sm text-[#0f1d28]">
                        Dengan cadangan {nonrespons}% non-respons
                      </span>
                    </div>
                    <span className="font-headline-sm text-sm sm:text-base text-[#0f1d28] font-extrabold">
                      {withBuffer.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#f6f9ff] border border-[#DDE3E8]/50">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#536161] text-[18px]">calculate</span>
                      <span className="font-body-md text-xs sm:text-sm text-[#536161]">
                        Pembanding rumus Slovin (e = {moe}%)
                      </span>
                    </div>
                    <span className="font-code-md text-xs sm:text-sm text-[#536161] font-bold">
                      {slovinVal.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#f6f9ff] border border-[#DDE3E8]/50">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#536161] text-[18px]">public_off</span>
                      <span className="font-body-md text-xs sm:text-sm text-[#536161]">
                        Bila populasi tidak diketahui (N = ∞)
                      </span>
                    </div>
                    <span className="font-code-md text-xs sm:text-sm text-[#536161] font-bold">
                      {roundedN0.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Formula Callout Card */}
                <div className="bg-[#f6f9ff] rounded-xl p-4 mt-6 border border-dashed border-[#DDE3E8]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-[#536161]">
                      Rumus &amp; Notasi Statistik
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCitation}
                      className="text-[#005450] hover:text-[#0b6e69] font-label-sm text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">content_copy</span>
                      <span>{copied ? 'Berhasil Disalin!' : 'Salin untuk Bab 3 Skripsi'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5 font-code-md text-xs sm:text-sm text-[#0f1d28]">
                    <div className="bg-white p-2 rounded-lg border border-[#DDE3E8]/50">
                      n₀ = Z² · p · (1 − p) / e² = {n0.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#DDE3E8]/50">
                      n = n₀ / (1 + (n₀ − 1) / N) = {rawCorrected.toFixed(2).replace('.', ',')} →{' '}
                      <strong>{finalN}</strong>
                    </div>
                  </div>

                  <p className="font-body-sm text-xs text-[#536161] italic mt-2">
                    Z = {Z.toString().replace('.', ',')} untuk tingkat kepercayaan {confidence}%. p = {proporsi}%, margin of error e = {moe}%.
                  </p>
                </div>
              </div>

              {/* Quick Guidance Tip */}
              <div className="bg-[#d4e3e2] text-[#111e1e] rounded-xl p-5 flex gap-3 items-start border border-[#bec9c7]/50">
                <span className="material-symbols-outlined text-[#005450] text-[22px] shrink-0 mt-0.5">
                  tips_and_updates
                </span>
                <div>
                  <h3 className="font-label-md text-sm font-bold mb-0.5 text-[#111e1e]">
                    Tips Metodologi untuk Mahasiswa
                  </h3>
                  <p className="font-body-sm text-xs text-[#3c4949] leading-relaxed">
                    Dosen penguji sering memvalidasi darimana angka sampel diperoleh. Jangan lupa cantumkan rujukan buku:{' '}
                    <em>Cochran, W. G. (1977). Sampling Techniques (3rd ed.)</em> pada daftar pustakamu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-headline-md text-xl md:text-2xl text-[#0f1d28] font-bold tracking-tight">
                  Langkah berikutnya
                </h2>
                <p className="font-body-md text-xs sm:text-sm text-[#536161]">
                  Setelah target sampel ditentukan, pastikan kuesionermu siap disebarkan ke responden.
                </p>
              </div>
              <span className="font-label-sm text-xs text-[#536161] uppercase tracking-wider font-semibold">
                Alur Instrumen
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Cek validitas */}
              <div
                onClick={() => onSelectTab('cek-validitas')}
                className="bg-white p-5 rounded-xl shadow-xs border border-[#DDE3E8] hover:border-[#0B6E69] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#e1f0ff] flex items-center justify-center text-[#005450] mb-4 group-hover:bg-[#005450] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[22px]">check_circle</span>
                  </div>
                  <h3 className="font-headline-sm text-base font-bold text-[#0f1d28] group-hover:text-[#005450] transition-colors mb-2">
                    Langkah 2 · Cek validitas
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-[#536161]">
                    Uji apakah tiap butir pertanyaan benar-benar mengukur variabel atau konstruk yang hendak diteliti (Product Moment Pearson).
                  </p>
                </div>
                <div className="flex items-center gap-1 font-label-md text-xs text-[#005450] font-semibold mt-4">
                  <span>Buka panduan &amp; alat uji</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Card 2: Cek reliabilitas */}
              <div
                onClick={() => onSelectTab('cek-reliabilitas')}
                className="bg-white p-5 rounded-xl shadow-xs border border-[#DDE3E8] hover:border-[#0B6E69] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#e1f0ff] flex items-center justify-center text-[#005450] mb-4 group-hover:bg-[#005450] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[22px]">sync</span>
                  </div>
                  <h3 className="font-headline-sm text-base font-bold text-[#0f1d28] group-hover:text-[#005450] transition-colors mb-2">
                    Langkah 3 · Cek reliabilitas
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-[#536161]">
                    Hitung koefisien Cronbach's Alpha guna memverifikasi konsistensi internal jawaban responden saat kuisioner diujicobakan.
                  </p>
                </div>
                <div className="flex items-center gap-1 font-label-md text-xs text-[#005450] font-semibold mt-4">
                  <span>Buka panduan &amp; alat uji</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Card 3: Cek kalimat pertanyaan */}
              <div
                onClick={() => alert('Fitur Cek Kalimat Pertanyaan (Deteksi Bias & Double-Barreled) siap dipakai.')}
                className="bg-white p-5 rounded-xl shadow-xs border border-[#DDE3E8] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#e1f0ff] flex items-center justify-center text-[#005450] mb-4 group-hover:bg-[#005450] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[22px]">forum</span>
                  </div>
                  <h3 className="font-headline-sm text-base font-bold text-[#0f1d28] group-hover:text-[#005450] transition-colors mb-2">
                    Langkah 4 · Cek kalimat pertanyaan
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-[#536161]">
                    Deteksi otomatis kalimat ambigu, bias konfirmasi, atau pertanyaan ganda (double-barreled) sebelum survei diterjunkan ke lapangan.
                  </p>
                </div>
                <div className="flex items-center gap-1 font-label-md text-xs text-[#005450] font-semibold mt-4">
                  <span>Buka analisis teks</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>

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
