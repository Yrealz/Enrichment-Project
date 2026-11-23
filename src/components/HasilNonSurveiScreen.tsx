import React from 'react';
import { ScreenType, TransitionType } from '../types';

interface HasilNonSurveiScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  topic: string;
  setTopic: (t: string) => void;
  objectives?: string[];
}

export const HasilNonSurveiScreen: React.FC<HasilNonSurveiScreenProps> = ({
  navigate,
  topic,
  setTopic,
  objectives: _objectives,
}) => {
  const currentTopic = topic || 'Efektivitas aplikasi belajar baru terhadap pemahaman konsep statistika mahasiswa semester 3';

  return (
    <div className="w-full bg-[#f4f6f8] text-[#0f1d28] min-h-[calc(100vh-145px)]">
      <main className="w-full pt-[72px] pb-16">
        <div className="w-full max-w-[1040px] mx-auto px-4 md:px-8 py-8 space-y-6">
          {/* Top Navigation & Heading Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('beranda', 'push_back');
                }}
                className="inline-flex items-center gap-1.5 text-[#536161] hover:text-[#005450] transition-colors font-label-md text-sm cursor-pointer group"
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
            <h1 className="font-headline-xl text-3xl md:text-4xl text-[#0f1d28] font-extrabold tracking-tight">
              Metode yang cocok untuk proyekmu
            </h1>
          </div>

          {/* Topik Kamu Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#DDE3E8] space-y-4">
            <div className="flex items-center gap-2 text-[#536161]">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
              <span className="font-label-sm text-xs uppercase tracking-wider font-bold">TOPIK KAMU</span>
            </div>
            <p className="font-headline-sm text-lg md:text-xl text-[#0f1d28] font-bold">
              “{currentTopic}”
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#ecf4ff] text-[#536161] font-label-sm text-xs">
                <span className="font-semibold text-[#0f1d28] mr-1">Perlakuan:</span> penggunaan aplikasi belajar
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#ecf4ff] text-[#536161] font-label-sm text-xs">
                <span className="font-semibold text-[#0f1d28] mr-1">Hasil:</span> pemahaman konsep
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#ecf4ff] text-[#536161] font-label-sm text-xs">
                <span className="font-semibold text-[#0f1d28] mr-1">Populasi:</span> mahasiswa semester 3
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#ecf4ff] text-[#536161] font-label-sm text-xs">
                <span className="font-semibold text-[#0f1d28] mr-1">Pendekatan:</span> kuantitatif, sebab-akibat
              </span>
            </div>
          </div>

          {/* Main Recommendation Card */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-[#DDE3E8] space-y-6">
            {/* Header row: Tag & Match score */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#0f1d28] text-white font-label-sm text-xs font-semibold">
                Rekomendasi utama · Bukan metode survei
              </div>
              <div className="flex items-center gap-2 bg-[#ecf4ff] px-3 py-1 rounded-lg">
                <span className="font-label-md text-xs sm:text-sm text-[#536161]">
                  Tingkat kecocokan: <strong className="text-[#0f1d28]">Tinggi</strong>
                </span>
                <div aria-label="Kecocokan 3 dari 3 bar" className="flex items-center gap-1">
                  <span className="w-2 h-4 rounded-full bg-[#0f1d28] inline-block"></span>
                  <span className="w-2 h-4 rounded-full bg-[#0f1d28] inline-block"></span>
                  <span className="w-2 h-4 rounded-full bg-[#0f1d28] inline-block"></span>
                </div>
              </div>
            </div>

            {/* Main Method Title */}
            <div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0f1d28] font-extrabold">
                Kuasi-eksperimen dengan kelompok kontrol
              </h2>
            </div>

            {/* Mengapa Cocok Container */}
            <div className="bg-[#ecf4ff] border border-[#DDE3E8]/50 rounded-xl p-5 space-y-2">
              <span className="font-label-sm text-xs uppercase tracking-wider text-[#005450] font-bold">
                MENGAPA COCOK
              </span>
              <p className="font-body-md text-sm sm:text-base text-[#0f1d28] leading-relaxed">
                Topikmu menanyakan efek dari suatu perlakuan. Untuk menilai efek, perlakuan diberikan ke satu kelompok lalu dibandingkan dengan kelompok lain. Hal ini tidak bisa dijawab hanya dengan menanyakan pendapat responden.
              </p>
            </div>

            {/* Kelebihan & Kekurangan Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Kelebihan Box */}
              <div className="bg-[#ecf4ff]/70 border border-[#DDE3E8]/60 rounded-xl p-5 space-y-3.5">
                <div className="flex items-center gap-2 text-[#005450] font-headline-sm text-base font-bold">
                  <span className="material-symbols-outlined text-[22px]">check_circle</span>
                  <span>Kelebihan</span>
                </div>
                <ul className="space-y-2.5 font-body-md text-xs sm:text-sm text-[#0f1d28]">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#005450] text-[18px] shrink-0 mt-0.5">check</span>
                    <span>Paling kuat untuk menguji hubungan sebab-akibat</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#005450] text-[18px] shrink-0 mt-0.5">check</span>
                    <span>Hasil diukur lewat tes, bukan hanya pengakuan responden</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#005450] text-[18px] shrink-0 mt-0.5">check</span>
                    <span>Kelompok kontrol membantu menyingkirkan penjelasan lain</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#005450] text-[18px] shrink-0 mt-0.5">check</span>
                    <span>Desain bisa dijelaskan dan diulang peneliti lain</span>
                  </li>
                </ul>
              </div>

              {/* Kekurangan Box */}
              <div className="bg-[#ffdad6]/40 border border-[#ba1a1a]/20 rounded-xl p-5 space-y-3.5">
                <div className="flex items-center gap-2 text-[#ba1a1a] font-headline-sm text-base font-bold">
                  <span className="material-symbols-outlined text-[22px]">cancel</span>
                  <span>Kekurangan</span>
                </div>
                <ul className="space-y-2.5 font-body-md text-xs sm:text-sm text-[#0f1d28]">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                    <span>Butuh izin dan kerja sama dosen atau pengelola kelas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                    <span>Kelompok tidak diacak penuh, sehingga bias seleksi bisa muncul</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                    <span>Memakan waktu lebih lama dibanding survei</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                    <span>Perlu instrumen tes yang sudah teruji</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Metode Lain yang Dipertimbangkan Card */}
          <div className="bg-white rounded-[20px] p-6 md:p-7 shadow-sm border border-[#DDE3E8] space-y-4">
            <div className="flex items-center gap-2 text-[#0f1d28] pb-1">
              <span className="material-symbols-outlined text-[#536161] text-[22px]">alt_route</span>
              <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#0f1d28]">
                Metode lain yang dipertimbangkan
              </h3>
            </div>
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#ecf4ff] border border-[#DDE3E8]/50">
                <div className="space-y-1">
                  <h4 className="font-label-md text-sm font-bold text-[#0f1d28]">Eksperimen murni</h4>
                  <p className="font-body-md text-xs sm:text-sm text-[#536161]">
                    Paling kuat, tetapi pengacakan mahasiswa antar kelas jarang memungkinkan.
                  </p>
                </div>
                <div className="shrink-0 self-start sm:self-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#d4e3e2] text-[#576565] font-label-sm text-xs font-semibold">
                    Alternatif
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#ecf4ff] border border-[#DDE3E8]/50">
                <div className="space-y-1">
                  <h4 className="font-label-md text-sm font-bold text-[#0f1d28]">Survei persepsi</h4>
                  <p className="font-body-md text-xs sm:text-sm text-[#536161]">
                    Hanya menangkap anggapan mahasiswa, bukan efek yang benar-benar terukur.
                  </p>
                </div>
                <div className="shrink-0 self-start sm:self-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] font-label-sm text-xs font-semibold">
                    Kurang cocok
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Toolkit survei tidak ditampilkan Card */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-[#DDE3E8] space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#dbeaf9] flex items-center justify-center shrink-0 text-[#005450]">
                <span className="material-symbols-outlined text-[24px]">info</span>
              </div>
              <div className="space-y-2">
                <h2 className="font-headline-md text-xl md:text-2xl font-bold text-[#0f1d28]">
                  Toolkit survei tidak ditampilkan
                </h2>
                <p className="font-body-md text-sm sm:text-base text-[#536161] leading-relaxed max-w-3xl">
                  SurveiKit hanya menyediakan alat bantu untuk metode survei, seperti kalkulator sampel, uji validitas, dan uji reliabilitas. Karena rekomendasi untuk topik ini bukan survei, kamu bisa melanjutkan dengan metode di atas atau membingkai ulang topikmu.
                </p>
              </div>
            </div>

            {/* Suggestion Reframing Box */}
            <div className="bg-[#ecf4ff] border border-[#DDE3E8]/60 rounded-xl p-5 space-y-1.5">
              <p className="font-label-sm text-xs uppercase tracking-wider text-[#536161] font-bold">
                INGIN TETAP MEMAKAI SURVEI? COBA BINGKAI ULANG TOPIKMU, MISALNYA:
              </p>
              <p className="font-body-lg text-sm sm:text-base text-[#0f1d28] italic font-semibold">
                “Persepsi mahasiswa semester 3 tentang manfaat aplikasi belajar untuk memahami statistika”
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 flex-wrap pt-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('beranda', 'push_back');
                }}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#0b6e69] hover:bg-[#005450] text-white font-label-md text-sm font-bold transition-colors shadow-sm cursor-pointer"
              >
                <span>Coba topik lain</span>
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setTopic('Persepsi mahasiswa semester 3 tentang manfaat aplikasi belajar untuk memahami statistika');
                  navigate('hasil-survei', 'push');
                }}
                className="inline-flex items-center gap-1.5 text-[#005450] hover:underline font-label-md text-sm font-bold transition-colors cursor-pointer"
              >
                <span>Lihat contoh topik yang cocok untuk survei</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
