import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenType, TransitionType } from '../types';

export interface CollectionMethod {
  id: string;
  title: string;
  icon: string;
  summary: string;
  keunggulan: string[];
  kelemahan: string[];
}

export const COLLECTION_METHODS: CollectionMethod[] = [
  {
    id: 'telephone-interviews',
    title: 'Telephone interviews',
    icon: 'call',
    summary: 'Wawancara dengan responden melalui telepon.',
    keunggulan: [
      'Menjangkau banyak orang di berbagai wilayah geografis dengan cepat (mencakup sebagian besar populasi)',
      'Didukung teknologi modern seperti CATI dan IVR',
    ],
    kelemahan: [
      'Biaya cukup tinggi',
      'Durasi wawancara terbatas',
      'Berisiko mengganggu waktu responden',
      'Mengurangi anonimitas',
      'Rentan terhadap bias pewawancara',
      'Sulit menggunakan pertanyaan terbuka atau alat bantu visual',
    ],
  },
  {
    id: 'personal-interviews',
    title: 'Personal interviews',
    icon: 'forum',
    summary: 'Wawancara langsung secara tatap muka.',
    keunggulan: [
      'Memiliki tingkat respons tertinggi',
      'Memungkinkan penggunaan kuesioner yang paling panjang dan kompleks',
      'Didukung oleh pewawancara terlatih yang dapat mengajukan pertanyaan mendalam',
    ],
    kelemahan: [
      'Membutuhkan biaya yang sangat tinggi untuk pelatihan, perjalanan, pengawasan, dan tenaga personalia',
    ],
  },
  {
    id: 'mail-interviews',
    title: 'Mail interviews',
    icon: 'mail',
    summary: 'Kuesioner dikirim dan dikembalikan melalui surat.',
    keunggulan: [
      'Biaya relatif rendah',
      'Dapat mencakup wilayah geografis yang luas',
      'Efektif jika responden memiliki tingkat pendidikan tinggi dan minat yang kuat terhadap topik',
    ],
    kelemahan: [
      'Tingkat respons (response rate) cenderung rendah karena banyak kuesioner tidak dikembalikan',
      'Pengiriman surat pengingat untuk mengatasinya memerlukan tambahan waktu dan biaya',
    ],
  },
  {
    id: 'electronic-surveys',
    title: 'Electronic surveys',
    icon: 'language',
    summary: 'Kuesioner diisi secara elektronik, misalnya lewat internet.',
    keunggulan: [
      'Proses cepat',
      'Biaya rendah',
      'Desain fleksibel yang mendukung elemen multimedia (audio/video)',
      'Interaktif (dapat menyesuaikan alur pertanyaan berdasarkan jawaban sebelumnya)',
    ],
    kelemahan: [
      'Rentan terhadap penurunan kualitas jawaban (respon asal-asalan)',
      'Menghadapi tantangan terkait masalah cakupan, privasi, verifikasi, dan desain',
    ],
  },
];

interface BerandaScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  topic: string;
  setTopic: (t: string) => void;
  objectives?: string[];
  setObjectives?: (objs: string[]) => void;
  isLoggedIn?: boolean;
  onOpenToolkit?: (hash: string) => void;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  navigate,
  topic,
  setTopic,
  objectives,
  setObjectives,
  isLoggedIn = false,
  onOpenToolkit,
}) => {
  const defaultObjectives = [
    'Mengetahui apakah terdapat hubungan yang signifikan antara intensitas penggunaan media sosial dengan capaian indeks prestasi mahasiswa',
  ];

  const [localTopic, setLocalTopic] = useState(
    topic || 'Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta'
  );
  const [localObjectives, setLocalObjectives] = useState<string[]>(
    objectives && objectives.length > 0 ? objectives : defaultObjectives
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);

  const handleAddObjective = () => {
    setLocalObjectives((prev) => [...prev, '']);
  };

  const handleObjectiveChange = (index: number, value: string) => {
    setLocalObjectives((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveObjective = (index: number) => {
    setLocalObjectives((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const selectedMethod = COLLECTION_METHODS.find((m) => m.id === selectedMethodId) || null;

  const sampleTopics = [
    {
      title: 'Kepuasan pelanggan kafe kampus',
      text: 'Kepuasan pelanggan kafe kampus terhadap layanan digital ordering',
      objective: 'Mengukur tingkat kepuasan pelanggan terhadap kecepatan dan kemudahan sistem digital ordering',
      icon: 'local_cafe',
      type: 'survei',
    },
    {
      title: 'Minat belanja online Gen Z',
      text: 'Minat belanja online Gen Z pada platform live shopping di Indonesia',
      objective: 'Menganalisis faktor interaktivitas dan promo harga yang memicu pembelian impulsif Gen Z',
      icon: 'shopping_bag',
      type: 'survei',
    },
    {
      title: 'Efektivitas aplikasi belajar baru',
      text: 'Efektivitas aplikasi belajar baru terhadap pemahaman konsep statistika mahasiswa semester 3',
      objective: 'Menguji perbedaan peningkatan pemahaman konsep statistika antara kelompok perlakuan dan kelompok kontrol',
      icon: 'devices',
      type: 'non-survei',
    },
  ];

  const handleAnalyze = () => {
    const textToAnalyze = localTopic.trim() || 'Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta';
    setTopic(textToAnalyze);

    const validObjectives = localObjectives
      .map((o) => o.trim())
      .filter((o) => o.length > 0);
    const finalObjectives = validObjectives.length > 0 ? validObjectives : defaultObjectives;

    if (setObjectives) {
      setObjectives(finalObjectives);
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      const combined = `${textToAnalyze} ${finalObjectives.join(' ')}`.toLowerCase();
      // If the topic or objective indicates an intervention / effectiveness / experiment study, route to Non-Survei recommendation
      if (
        combined.includes('efektivitas') ||
        combined.includes('eksperimen') ||
        combined.includes('perlakuan') ||
        combined.includes('uji coba alat') ||
        combined.includes('kelompok kontrol')
      ) {
        navigate('hasil-non-survei', 'push');
      } else {
        navigate('hasil-survei', 'push');
      }
    }, 350);
  };

  return (
    <div className="w-full bg-[#f6f9ff] text-[#0f1d28]">
      <main className="w-full pt-[72px] bg-[#f6f9ff] min-h-[calc(100vh-145px)]">
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8">
          <div className="flex flex-col w-full">
            {/* INTRO HERO SECTION: PENJELASAN TENTANG SURVEIKIT */}
            <section className="w-full max-w-[1100px] mx-auto pt-8 pb-10">
              <div className="bg-gradient-to-br from-white via-[#f6f9ff] to-[#ecf4ff] rounded-[24px] border border-[#DDE3E8] p-8 md:p-10 shadow-sm relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#a0f1ea]/30 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#dbeaf9]/40 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4e3e2] text-[#005450] font-label-md text-xs font-bold uppercase tracking-wider mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#005450] animate-pulse"></span>
                    Tentang Platform SurveiKit
                  </div>

                  <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-[42px] text-[#0f1d28] tracking-tight font-extrabold mb-4 leading-tight">
                    Bantu kamu membuat survei yang valid dan reliabel.
                  </h1>

                  <p className="font-body-lg text-base sm:text-lg text-[#536161] max-w-3xl leading-relaxed mb-6">
                    <strong className="text-[#005450] font-semibold">SurveiKit</strong> adalah platform akademik interaktif yang membantu mahasiswa, akademisi, dan peneliti pemula merancang metodologi riset secara tepat. Dari mendeteksi kelayakan metode pengumpulan data, menghitung ukuran sampel yang representatif (Cochran &amp; Slovin), hingga memvalidasi instrumen kuesioner sebelum disebar ke lapangan.
                  </p>

                  {/* 3 Core Value Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-[#DDE3E8] shadow-xs">
                      <div className="flex items-center gap-2.5 text-[#005450] mb-1.5">
                        <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
                        <h3 className="font-headline-sm text-sm font-bold text-[#0f1d28]">Rekomendasi Metode</h3>
                      </div>
                      <p className="font-body-sm text-xs text-[#536161] leading-relaxed">
                        Cari tahu apakah topik penelitianmu tepat menggunakan survei kuantitatif atau butuh metode eksperimen.
                      </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-[#DDE3E8] shadow-xs">
                      <div className="flex items-center gap-2.5 text-[#005450] mb-1.5">
                        <span className="material-symbols-outlined text-[20px]">calculate</span>
                        <h3 className="font-headline-sm text-sm font-bold text-[#0f1d28]">Kalkulasi Ukuran Sampel</h3>
                      </div>
                      <p className="font-body-sm text-xs text-[#536161] leading-relaxed">
                        Perhitungan sampel akurat berbasis rumus Cochran &amp; Slovin dengan koreksi populasi dan cadangan non-respons.
                      </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-[#DDE3E8] shadow-xs">
                      <div className="flex items-center gap-2.5 text-[#005450] mb-1.5">
                        <span className="material-symbols-outlined text-[20px]">verified_user</span>
                        <h3 className="font-headline-sm text-sm font-bold text-[#0f1d28]">Cek Validitas dan Reliabiliatas</h3>
                      </div>
                      <p className="font-body-sm text-xs text-[#536161] leading-relaxed">
                        Dilengkapi sitasi baku dan langkah pengujian instrumen (validitas Pearson, reliabilitas Alpha, &amp; bebas bias).
                      </p>
                    </div>
                  </div>

                  {/* Quick CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="#analisis-topik-anchor"
                      onClick={(e) => {
                        e.preventDefault();
                        const elem = document.getElementById('analisis-topik-anchor');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        const txt = document.getElementById('research-topic-input');
                        if (txt) txt.focus();
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b6e69] hover:bg-[#005450] text-white font-label-md text-sm font-bold shadow-sm transition-all"
                    >
                      <span>Cek Topik Penelitianmu</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => navigate('kalkulator-diketahui', 'push')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#e1f0ff] text-[#005450] font-label-md text-sm font-bold border border-[#DDE3E8] shadow-xs transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">calculate</span>
                      <span>Buka Toolkit Sampel</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: INFO SECTION (Mengenal Survey) */}
            <section className="w-full max-w-[1100px] mx-auto pt-2 pb-12" id="tentang-survei-section">
              {/* Category Pill Badge */}
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4e3e2] text-[#005450] font-label-md text-xs tracking-wider uppercase font-semibold">
                  <span className="material-symbols-outlined text-[15px]">school</span>
                  Mengenal survey
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-[40px] text-[#0f1d28] tracking-tight mt-3 mb-4 font-extrabold">
                Apa itu survey?
              </h1>

              {/* Descriptive lead paragraph */}
              <p className="font-body-lg text-base md:text-lg text-[#536161] max-w-4xl mb-10 leading-relaxed">
                Survey adalah metode penelitian ilmiah untuk menyusun deskripsi berbasis data guna menjawab permasalahan yang berkaitan dengan keadaan suatu populasi atau jumlah subjek yang besar.
              </p>

              {/* Side-by-side Cards: Concept & Vector Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Left Card: Explanation & Scholarly Indicators */}
                <div className="bg-white p-7 rounded-[18px] border border-[#DDE3E8] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-[#005450] text-[22px]">account_tree</span>
                      <h2 className="font-headline-sm text-lg text-[#0f1d28] font-bold">Populasi dan sample</h2>
                    </div>
                    <p className="font-body-md text-sm md:text-base text-[#536161] leading-relaxed mb-6">
                      Sample sebagai perwakilan diambil dari populasi, lalu data dari sample tersebut digeneralisasi untuk menggambarkan keadaan seluruh populasi.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 pt-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e1f0ff] text-[#005450] font-label-md text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      Representatif
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dbeaf9] text-[#394955] font-label-md text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px]">psychology</span>
                      Generalisasi Ilmiah
                    </div>
                  </div>
                </div>

                {/* Right Card: Precise SVG Academic Diagram */}
                <div className="bg-white p-6 sm:p-7 rounded-[18px] border border-[#DDE3E8] shadow-sm flex flex-col items-center justify-center">
                  <div className="w-full max-w-[460px] flex items-center justify-center">
                    <svg
                      aria-label="Diagram hubungan populasi dan sampel"
                      className="w-full h-auto"
                      fill="none"
                      viewBox="0 0 460 240"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <marker
                          id="arrow-teal"
                          markerHeight="7"
                          markerWidth="7"
                          orient="auto"
                          refX="6"
                          refY="4"
                          viewBox="0 0 8 8"
                        >
                          <path d="M 0 1 L 7 4 L 0 7 z" fill="#0B6E69" />
                        </marker>
                        <marker
                          id="arrow-gray"
                          markerHeight="7"
                          markerWidth="7"
                          orient="auto"
                          refX="6"
                          refY="4"
                          viewBox="0 0 8 8"
                        >
                          <path d="M 0 1 L 7 4 L 0 7 z" fill="#536161" />
                        </marker>
                      </defs>

                      {/* Population Circle (cx=102, cy=128, r=84 -> x: 18..186) */}
                      <circle cx="102" cy="128" fill="#F1F4F6" r="84" stroke="#DDE3E8" strokeWidth="2" />
                      <text
                        fill="#0F1D28"
                        fontFamily="Plus Jakarta Sans"
                        fontSize="13"
                        fontWeight="700"
                        letterSpacing="0.01em"
                        textAnchor="middle"
                        x="102"
                        y="74"
                      >
                        Populasi (N)
                      </text>
                      <text
                        fill="#536161"
                        fontFamily="IBM Plex Sans"
                        fontSize="10"
                        textAnchor="middle"
                        x="102"
                        y="89"
                      >
                        Entitas Subjek Luas
                      </text>

                      {/* Population dots (cleanly below text, well inside r=84) */}
                      <circle cx="58" cy="112" fill="#94A3B8" r="4" />
                      <circle cx="84" cy="108" fill="#94A3B8" r="4" />
                      <circle cx="136" cy="112" fill="#94A3B8" r="4" />
                      <circle cx="46" cy="140" fill="#94A3B8" r="4" />
                      <circle cx="76" cy="144" fill="#94A3B8" r="4" />
                      <circle cx="148" cy="138" fill="#94A3B8" r="4" />
                      <circle cx="62" cy="170" fill="#94A3B8" r="4" />
                      <circle cx="106" cy="176" fill="#94A3B8" r="4" />
                      <circle cx="138" cy="168" fill="#94A3B8" r="4" />
                      <circle cx="88" cy="190" fill="#94A3B8" r="4" />

                      {/* Selected Representative Dots */}
                      <circle cx="110" cy="120" fill="#0B6E69" r="4.5" />
                      <circle cx="96" cy="150" fill="#0B6E69" r="4.5" />
                      <circle cx="128" cy="148" fill="#0B6E69" r="4.5" />
                      <circle cx="64" cy="126" fill="#0B6E69" r="4.5" />

                      {/* Sample Circle Area (cx=374, cy=128, r=62 -> x: 312..436) */}
                      <circle cx="374" cy="128" fill="#E3F2F1" r="62" stroke="#0B6E69" strokeWidth="2" />
                      <text
                        fill="#005450"
                        fontFamily="Plus Jakarta Sans"
                        fontSize="13"
                        fontWeight="700"
                        textAnchor="middle"
                        x="374"
                        y="100"
                      >
                        Sample (n)
                      </text>
                      <text
                        fill="#0B6E69"
                        fontFamily="IBM Plex Sans"
                        fontSize="10"
                        textAnchor="middle"
                        x="374"
                        y="114"
                      >
                        Representatif
                      </text>

                      {/* Sample Highlighted Dots */}
                      <circle cx="350" cy="138" fill="#0B6E69" r="4.5" />
                      <circle cx="372" cy="133" fill="#0B6E69" r="4.5" />
                      <circle cx="396" cy="142" fill="#0B6E69" r="4.5" />
                      <circle cx="362" cy="160" fill="#0B6E69" r="4.5" />
                      <circle cx="386" cy="162" fill="#0B6E69" r="4.5" />

                      {/* Top Arrow: pengambilan sample (gap x: 186..312) */}
                      <text
                        fill="#005450"
                        fontFamily="Plus Jakarta Sans"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        x="249"
                        y="52"
                      >
                        pengambilan sample
                      </text>
                      <path
                        d="M 192 96 Q 249 72 304 96"
                        fill="none"
                        markerEnd="url(#arrow-teal)"
                        stroke="#0B6E69"
                        strokeWidth="2"
                      />

                      {/* Bottom Arrow: generalisasi */}
                      <path
                        d="M 306 160 Q 249 186 194 160"
                        fill="none"
                        markerEnd="url(#arrow-gray)"
                        stroke="#536161"
                        strokeDasharray="4 3"
                        strokeWidth="1.8"
                      />
                      <text
                        fill="#536161"
                        fontFamily="Plus Jakarta Sans"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        x="249"
                        y="198"
                      >
                        generalisasi
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Sub-section Header */}
              <div className="mt-8 mb-6">
                <h2 className="font-headline-md text-2xl text-[#0f1d28] font-bold mb-1">
                  Metode pengumpulan data survey
                </h2>
                <p className="font-body-md text-sm md:text-base text-[#536161]">
                  Data survey dapat dikumpulkan dengan beberapa metode berikut. Klik salah satu metode untuk melihat keunggulan dan kelemahannya.
                </p>
              </div>

              {/* MOBILE ACCORDION VIEW (< sm) */}
              <div className="flex flex-col gap-3.5 sm:hidden mb-10">
                {COLLECTION_METHODS.map((method) => {
                  const isSelected = selectedMethodId === method.id;
                  return (
                    <div key={method.id} className="flex flex-col">
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedMethodId(isSelected ? null : method.id)}
                        className={`w-full p-5 rounded-[16px] text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                          isSelected
                            ? 'border-2 border-[#0B6E69] bg-[#E3F2F1] shadow-md'
                            : 'border border-[#DDE3E8] bg-white shadow-[0_2px_8px_rgba(15,29,40,0.03)] hover:shadow-md hover:border-[#0B6E69]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3.5">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-[#0B6E69] text-white' : 'bg-[#d4e3e2] text-[#005450]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[24px]">{method.icon}</span>
                          </div>
                          <span
                            className="material-symbols-outlined text-[20px] text-[#005450] transition-transform duration-200"
                            style={{ transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            expand_more
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-base font-bold text-[#0f1d28] mb-1.5">{method.title}</h3>
                        <p className="font-body-sm text-xs leading-relaxed text-[#536161]">
                          {method.summary}
                        </p>
                      </button>

                      {/* Accordion content directly beneath tapped card on mobile */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden mt-3 bg-white rounded-2xl border border-[#DDE3E8] p-5 shadow-sm motion-reduce:transition-none"
                            aria-live="polite"
                          >
                            <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b border-[#DDE3E8]/60">
                              <h4 className="font-headline-sm text-base font-bold text-[#0f1d28]">
                                {method.title}
                              </h4>
                              <span className="text-[11px] font-bold text-[#005450] bg-[#e1f0ff] px-2.5 py-0.5 rounded-full uppercase">
                                Keunggulan &amp; Kelemahan
                              </span>
                            </div>

                            <div className="flex flex-col gap-4">
                              {/* Keunggulan Card */}
                              <div className="bg-[#E6F4EA] text-[#1B5E34] rounded-xl p-4 border border-[#1B5E34]/20">
                                <div className="flex items-center gap-2 mb-2.5">
                                  <span className="material-symbols-outlined text-[20px] text-[#1B5E34]">check_circle</span>
                                  <h5 className="font-headline-sm text-sm font-bold text-[#1B5E34]">Keunggulan</h5>
                                </div>
                                <ul className="space-y-2 font-body-md text-xs text-[#1B5E34]">
                                  {method.keunggulan.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                      <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5 text-[#1B5E34]">check</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Kelemahan Card */}
                              <div className="bg-[#FCEBE3] text-[#8A3B12] rounded-xl p-4 border border-[#8A3B12]/20">
                                <div className="flex items-center gap-2 mb-2.5">
                                  <span className="material-symbols-outlined text-[20px] text-[#8A3B12]">cancel</span>
                                  <h5 className="font-headline-sm text-sm font-bold text-[#8A3B12]">Kelemahan</h5>
                                </div>
                                <ul className="space-y-2 font-body-md text-xs text-[#8A3B12]">
                                  {method.kelemahan.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                      <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5 text-[#8A3B12]">close</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Mobile Hint Box when no method is selected */}
                {selectedMethodId === null && (
                  <div className="p-4 rounded-xl bg-[#ecf4ff] border border-dashed border-[#DDE3E8] text-center text-[#536161] font-body-md text-xs flex items-center justify-center gap-2" aria-live="polite">
                    <span className="material-symbols-outlined text-[18px] text-[#005450] shrink-0">info</span>
                    <span>Pilih salah satu metode di atas untuk melihat keunggulan dan kelemahannya.</span>
                  </div>
                )}
              </div>

              {/* TABLET / DESKTOP VIEW (>= sm) */}
              <div className="hidden sm:block mb-10">
                {/* 4 Interactive Method Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                  {COLLECTION_METHODS.map((method) => {
                    const isSelected = selectedMethodId === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedMethodId(isSelected ? null : method.id)}
                        className={`p-5 rounded-[16px] text-left transition-all duration-200 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                          isSelected
                            ? 'border-2 border-[#0B6E69] bg-[#E3F2F1] shadow-md'
                            : 'border border-[#DDE3E8] bg-white shadow-[0_2px_8px_rgba(15,29,40,0.03)] hover:shadow-md hover:border-[#0B6E69]/40'
                        }`}
                      >
                        <div>
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors mb-4 ${
                              isSelected ? 'bg-[#0B6E69] text-white' : 'bg-[#d4e3e2] text-[#005450]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[24px]">{method.icon}</span>
                          </div>
                          <h3 className="font-headline-sm text-base font-bold text-[#0f1d28] mb-1.5">{method.title}</h3>
                          <p className="font-body-sm text-xs leading-relaxed text-[#536161]">
                            {method.summary}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#DDE3E8]/50 flex items-center justify-between text-xs font-label-md text-[#005450]">
                          <span className="font-semibold">{isSelected ? 'Terpilih' : 'Buka detail'}</span>
                          <span className="material-symbols-outlined text-[16px]">
                            {isSelected ? 'check_circle' : 'arrow_downward'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Detail Panel Below Card Row */}
                <div aria-live="polite">
                  <AnimatePresence mode="wait">
                    {selectedMethod ? (
                      <motion.div
                        key={selectedMethod.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="bg-white rounded-2xl border border-[#DDE3E8] p-6 shadow-sm motion-reduce:transition-none"
                      >
                        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[#DDE3E8]/60">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#005450] text-white flex items-center justify-center shrink-0 shadow-xs">
                              <span className="material-symbols-outlined text-[20px]">{selectedMethod.icon}</span>
                            </div>
                            <div>
                              <span className="text-[11px] font-bold tracking-wider text-[#005450] uppercase block">
                                Detail Karakteristik Metode
                              </span>
                              <h3 className="font-headline-sm text-lg md:text-xl font-bold text-[#0f1d28]">
                                {selectedMethod.title}
                              </h3>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedMethodId(null)}
                            className="text-[#536161] hover:text-[#0f1d28] hover:bg-[#ecf4ff] px-3 py-1.5 rounded-lg text-xs font-label-md flex items-center gap-1.5 transition-colors cursor-pointer border border-[#DDE3E8]/60"
                            aria-label={`Tutup detail ${selectedMethod.title}`}
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                            <span>Tutup Detail</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Keunggulan Card */}
                          <div className="bg-[#E6F4EA] text-[#1B5E34] rounded-2xl p-5 md:p-6 border border-[#1B5E34]/20 shadow-xs">
                            <div className="flex items-center gap-2 mb-3.5">
                              <span className="material-symbols-outlined text-[20px] text-[#1B5E34]">check_circle</span>
                              <h4 className="font-headline-sm text-base font-bold text-[#1B5E34]">Keunggulan</h4>
                            </div>
                            <ul className="space-y-2.5 font-body-md text-xs sm:text-sm text-[#1B5E34]">
                              {selectedMethod.keunggulan.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                  <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5 text-[#1B5E34]">check</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Kelemahan Card */}
                          <div className="bg-[#FCEBE3] text-[#8A3B12] rounded-2xl p-5 md:p-6 border border-[#8A3B12]/20 shadow-xs">
                            <div className="flex items-center gap-2 mb-3.5">
                              <span className="material-symbols-outlined text-[20px] text-[#8A3B12]">cancel</span>
                              <h4 className="font-headline-sm text-base font-bold text-[#8A3B12]">Kelemahan</h4>
                            </div>
                            <ul className="space-y-2.5 font-body-md text-xs sm:text-sm text-[#8A3B12]">
                              {selectedMethod.kelemahan.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                  <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5 text-[#8A3B12]">close</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="desktop-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="w-full p-5 sm:p-6 rounded-2xl bg-[#ecf4ff] border border-dashed border-[#DDE3E8] text-center flex items-center justify-center gap-2.5 text-[#536161] motion-reduce:transition-none"
                      >
                        <span className="material-symbols-outlined text-[20px] text-[#005450] shrink-0">info</span>
                        <p className="font-body-md text-xs sm:text-sm md:text-base">
                          Pilih salah satu metode di atas untuk melihat keunggulan dan kelemahannya.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Full-width Teal Callout Banner */}
              <div className="bg-[#0b6e69] text-white p-7 rounded-[18px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[28px] text-[#a0f1ea]">lightbulb</span>
                  <p className="font-headline-sm text-base md:text-lg text-white font-semibold">
                    Punya topik proyek? Ayo kita buat kuesionernya.
                  </p>
                </div>
                <a
                  className="shrink-0 bg-white text-[#005450] font-label-md text-sm font-bold px-6 py-3 rounded-[10px] min-h-[44px] flex items-center gap-2 hover:bg-[#ecf4ff] shadow-sm transition"
                  href="#analisis-topik-anchor"
                  onClick={(e) => {
                    e.preventDefault();
                    const elem = document.getElementById('analisis-topik-anchor');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    const txt = document.getElementById('research-topic-input');
                    if (txt) txt.focus();
                  }}
                >
                  <span>Mulai analisis topik</span>
                  <span className="material-symbols-outlined text-[18px]">south</span>
                </a>
              </div>
            </section>

            {/* SECTION 2: TOPIC INPUT SECTION (Analisis Topik) */}
            <section className="w-full bg-[#E8F1F0] py-16 px-6 text-center rounded-2xl mb-12" id="analisis-topik-anchor">
              <div className="max-w-[1100px] mx-auto">
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0f1d28] max-w-3xl mx-auto tracking-tight mb-8 font-extrabold">
                  Mulai dari topik proyekmu, kuesionernya kami bantu sampai valid.
                </h2>

                {/* Central Input Card */}
                <div className="max-w-[760px] mx-auto bg-white p-8 rounded-[20px] shadow-[0_8px_24px_rgba(11,110,105,0.06)] border border-[#DDE3E8] text-left">
                  {/* Field 1: Topik Proyek */}
                  <div className="mb-5">
                    <label className="font-label-md text-sm text-[#0f1d28] font-bold mb-2 block" htmlFor="research-topic-input">
                      Topik atau judul proyekmu
                    </label>
                    <textarea
                      id="research-topic-input"
                      className="w-full bg-[#f6f9ff] text-[#0f1d28] text-sm md:text-base rounded-[12px] p-4 font-body-md resize-none outline-none border border-[#DDE3E8] focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15 shadow-sm transition placeholder:text-[#6e7978]"
                      placeholder="Contoh: Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta"
                      rows={2}
                      value={localTopic}
                      onChange={(e) => setLocalTopic(e.target.value)}
                    />
                  </div>

                  {/* Field 2: Tujuan Proyek atau Penelitianmu */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-label-md text-sm text-[#0f1d28] font-bold block">
                        Tujuan proyek atau penelitianmu
                      </label>
                      <span className="font-label-sm text-xs text-[#005450] bg-[#e1f0ff] px-2.5 py-0.5 rounded-full font-semibold">
                        {localObjectives.length > 1 ? `${localObjectives.length} Tujuan` : 'Fokus Penelitian'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {localObjectives.map((obj, idx) => (
                        <div key={idx} className="relative group">
                          {localObjectives.length > 1 && (
                            <div className="flex items-center justify-between mb-1 text-xs">
                              <span className="font-semibold text-[#005450]">
                                Tujuan {idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveObjective(idx)}
                                className="text-[#ba1a1a] hover:text-[#93000a] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer py-0.5 px-2 rounded hover:bg-[#ffdad6]/50"
                                title="Hapus tujuan ini"
                              >
                                <span className="material-symbols-outlined text-[14px]">delete</span>
                                <span>Hapus</span>
                              </button>
                            </div>
                          )}

                          <div className="relative">
                            <textarea
                              id={idx === 0 ? "project-objective-input" : `project-objective-input-${idx}`}
                              className="w-full bg-[#f6f9ff] text-[#0f1d28] text-sm md:text-base rounded-[12px] p-4 pr-14 font-body-md resize-none outline-none border border-[#DDE3E8] focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15 shadow-sm transition placeholder:text-[#6e7978]"
                              placeholder={
                                idx === 0
                                  ? "Contoh: Mengetahui apakah terdapat hubungan yang signifikan antara intensitas media sosial dan capaian prestasi belajar"
                                  : `Tuliskan tujuan ke-${idx + 1} penelitianmu...`
                              }
                              rows={2}
                              value={obj}
                              onChange={(e) => handleObjectiveChange(idx, e.target.value)}
                            />

                            {/* Icon plus pada bagian kanan bawah kotak input */}
                            {idx === localObjectives.length - 1 && (
                              <button
                                type="button"
                                onClick={handleAddObjective}
                                title="Tambah tujuan lainnya"
                                aria-label="Tambah tujuan lainnya"
                                className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#005450] hover:bg-[#0b6e69] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#005450] focus:ring-offset-1 group/btn"
                              >
                                <span className="material-symbols-outlined text-[20px] transition-transform group-hover/btn:rotate-90">
                                  add
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2 text-[#536161] font-body-sm text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-[#005450]">track_changes</span>
                        <span>Sebutkan hal yang ingin dicapai, dibuktikan, atau diukur melalui proyek ini.</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddObjective}
                        className="text-[#005450] hover:text-[#0b6e69] font-bold text-xs inline-flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_circle</span>
                        <span>Tambah tujuan ({localObjectives.length})</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#DDE3E8]/50">
                    <div className="text-xs text-[#536161]">
                      Pilihan analisis: <span className="font-semibold text-[#005450]">{(localTopic + ' ' + localObjectives.join(' ')).toLowerCase().includes('efektivitas') ? 'Mengarahkan ke Rekomendasi Non-Survei' : 'Mengarahkan ke Rekomendasi Survei'}</span>
                    </div>
                    <button
                      id="btn-analisis"
                      type="button"
                      disabled={isAnalyzing}
                      onClick={handleAnalyze}
                      className="w-full sm:w-auto bg-[#0b6e69] hover:bg-[#005450] text-white font-label-md text-sm font-bold px-6 py-3 rounded-[10px] min-h-[44px] inline-flex items-center justify-center gap-2 transition shadow-sm active:scale-[0.99] cursor-pointer"
                    >
                      {isAnalyzing ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                          <span>Menganalisis...</span>
                        </>
                      ) : (
                        <>
                          <span>Analisis topik</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick-pick Suggestions */}
                <div className="mt-8">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-[#536161] font-bold mb-3 block">
                    COBA CONTOH:
                  </span>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {sampleTopics.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        data-topic={item.text}
                        onClick={() => {
                          setLocalTopic(item.text);
                          setLocalObjectives([item.objective]);
                          setTopic(item.text);
                          if (setObjectives) {
                            setObjectives([item.objective]);
                          }
                        }}
                        className={`topic-suggestion-pill bg-white hover:bg-[#e1f0ff] text-[#0f1d28] font-label-md text-xs sm:text-sm px-4 py-2 rounded-full border border-[#DDE3E8] shadow-sm transition flex items-center gap-1.5 cursor-pointer ${
                          localTopic === item.text ? 'ring-2 ring-[#005450] bg-[#e1f0ff]' : ''
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#005450]">
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: CARA KERJA (Three Steps Flow) */}
            <section className="w-full max-w-[1100px] mx-auto py-12 px-4" id="cara-kerja-anchor">
              <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-[#d4e3e2] text-[#005450] font-label-md text-xs uppercase tracking-wider font-semibold mb-2">
                  Alur Sederhana
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0f1d28] tracking-tight font-extrabold">
                  Cara kerja
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-white p-7 rounded-[18px] border border-[#DDE3E8] shadow-sm relative flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-[#0b6e69] text-white font-headline-sm text-lg font-bold flex items-center justify-center mb-4">
                    1
                  </div>
                  <h3 className="font-headline-sm text-lg text-[#0f1d28] font-bold mb-2">
                    Tulis topik proyek
                  </h3>
                  <p className="font-body-md text-sm text-[#536161] leading-relaxed">
                    Cukup satu atau dua kalimat. Sistem membaca variabel, populasi, dan tujuan penelitianmu.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-7 rounded-[18px] border border-[#DDE3E8] shadow-sm relative flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-[#0b6e69] text-white font-headline-sm text-lg font-bold flex items-center justify-center mb-4">
                    2
                  </div>
                  <h3 className="font-headline-sm text-lg text-[#0f1d28] font-bold mb-2">
                    Terima rekomendasi metode
                  </h3>
                  <p className="font-body-md text-sm text-[#536161] leading-relaxed">
                    Kamu mendapat metode yang paling cocok beserta alasan, kelebihan, dan kekurangannya.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-7 rounded-[18px] border border-[#DDE3E8] shadow-sm relative flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-[#0b6e69] text-white font-headline-sm text-lg font-bold flex items-center justify-center mb-4">
                    3
                  </div>
                  <h3 className="font-headline-sm text-lg text-[#0f1d28] font-bold mb-2">
                    Pakai toolkit bila survei
                  </h3>
                  <p className="font-body-md text-sm text-[#536161] leading-relaxed">
                    Jika metodenya survei, alat bantu pembuatan kuesioner langsung terbuka untukmu.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: ISI TOOLKIT SURVEI (White Band) */}
            <section className="w-full bg-white py-16 px-6 rounded-2xl border border-[#DDE3E8] mb-12 shadow-sm">
              <div className="max-w-[1100px] mx-auto">
                <div className="text-center mb-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#d4e3e2] text-[#005450] font-label-md text-xs uppercase tracking-wider font-semibold mb-2">
                    Modul Survei
                  </span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0f1d28] tracking-tight mb-2 font-extrabold">
                    Isi toolkit survei
                  </h2>
                  <p className="font-body-md text-sm md:text-base text-[#536161] max-w-xl mx-auto">
                    Alat ini hanya muncul bila metode yang disarankan untuk topikmu adalah survei.
                  </p>
                  {!isLoggedIn && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E3F2F1] border border-[#0B6E69]/20 text-xs sm:text-sm font-semibold text-[#005450]">
                      <span className="material-symbols-outlined text-[16px] text-[#0B6E69]">lock</span>
                      <span>Masuk ke akun terlebih dahulu untuk mengakses fitur Toolkit survei.</span>
                    </div>
                  )}
                </div>

                {/* Three Toolkit Modules in a Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 1. Kalkulator sampel */}
                  <div
                    onClick={() => {
                      if (onOpenToolkit) {
                        onOpenToolkit('#/kalkulator-sampel');
                      } else {
                        navigate('kalkulator-diketahui', 'push');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (onOpenToolkit) {
                          onOpenToolkit('#/kalkulator-sampel');
                        } else {
                          navigate('kalkulator-diketahui', 'push');
                        }
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Kalkulator sampel pada toolkit"
                    className="relative bg-[#f6f9ff] hover:bg-[#ecf4ff] p-5 rounded-[16px] border border-[#DDE3E8] text-center flex flex-col items-center justify-center transition duration-200 group cursor-pointer shadow-sm hover:shadow-md hover:border-[#005450] focus:outline-none focus:ring-2 focus:ring-[#005450] focus:ring-offset-2"
                  >
                    {!isLoggedIn && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-[#DDE3E8] text-[11px] font-semibold text-[#5B6B78]">
                        <span className="material-symbols-outlined text-[12px]">lock</span>
                        <span>Login</span>
                      </span>
                    )}
                    <div className="w-12 h-12 rounded-full bg-white group-hover:bg-[#d4e3e2] flex items-center justify-center text-[#005450] mb-3 transition shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">calculate</span>
                    </div>
                    <h3 className="font-headline-sm text-sm font-bold text-[#0f1d28] mb-1">
                      Kalkulator sampel
                    </h3>
                    <p className="font-code-sm text-xs text-[#536161]">
                      Rumus Slovin &amp; Lemeshow
                    </p>
                  </div>

                  {/* 2. Cek validitas */}
                  <div
                    onClick={() => {
                      if (onOpenToolkit) {
                        onOpenToolkit('#/cek-validitas');
                      } else {
                        navigate('kalkulator-diketahui', 'push');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (onOpenToolkit) {
                          onOpenToolkit('#/cek-validitas');
                        } else {
                          navigate('kalkulator-diketahui', 'push');
                        }
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Cek validitas pada toolkit"
                    className="relative bg-[#f6f9ff] hover:bg-[#ecf4ff] p-5 rounded-[16px] border border-[#DDE3E8] text-center flex flex-col items-center justify-center transition duration-200 group cursor-pointer shadow-sm hover:shadow-md hover:border-[#005450] focus:outline-none focus:ring-2 focus:ring-[#005450] focus:ring-offset-2"
                  >
                    {!isLoggedIn && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-[#DDE3E8] text-[11px] font-semibold text-[#5B6B78]">
                        <span className="material-symbols-outlined text-[12px]">lock</span>
                        <span>Login</span>
                      </span>
                    )}
                    <div className="w-12 h-12 rounded-full bg-white group-hover:bg-[#d4e3e2] flex items-center justify-center text-[#005450] mb-3 transition shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">verified_user</span>
                    </div>
                    <h3 className="font-headline-sm text-sm font-bold text-[#0f1d28] mb-1">
                      Cek validitas
                    </h3>
                    <p className="font-code-sm text-xs text-[#536161]">
                      Korelasi Pearson / r hitung
                    </p>
                  </div>

                  {/* 3. Cek reliabilitas */}
                  <div
                    onClick={() => {
                      if (onOpenToolkit) {
                        onOpenToolkit('#/cek-reliabilitas');
                      } else {
                        navigate('kalkulator-diketahui', 'push');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (onOpenToolkit) {
                          onOpenToolkit('#/cek-reliabilitas');
                        } else {
                          navigate('kalkulator-diketahui', 'push');
                        }
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Cek reliabilitas pada toolkit"
                    className="relative bg-[#f6f9ff] hover:bg-[#ecf4ff] p-5 rounded-[16px] border border-[#DDE3E8] text-center flex flex-col items-center justify-center transition duration-200 group cursor-pointer shadow-sm hover:shadow-md hover:border-[#005450] focus:outline-none focus:ring-2 focus:ring-[#005450] focus:ring-offset-2"
                  >
                    {!isLoggedIn && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-[#DDE3E8] text-[11px] font-semibold text-[#5B6B78]">
                        <span className="material-symbols-outlined text-[12px]">lock</span>
                        <span>Login</span>
                      </span>
                    )}
                    <div className="w-12 h-12 rounded-full bg-white group-hover:bg-[#d4e3e2] flex items-center justify-center text-[#005450] mb-3 transition shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">sync</span>
                    </div>
                    <h3 className="font-headline-sm text-sm font-bold text-[#0f1d28] mb-1">
                      Cek reliabilitas
                    </h3>
                    <p className="font-code-sm text-xs text-[#536161]">
                      Cronbach's Alpha &gt; 0.60
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
