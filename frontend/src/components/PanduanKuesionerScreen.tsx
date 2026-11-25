import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  ChevronRight,
  ExternalLink,
  FileText,
  Info,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ScreenType, TransitionType } from '../types';
import {
  AccordionStepItem,
  AccordionStepper,
  AvoidCard,
  AvoidCardItem,
  CfaTableGroup,
  ExampleCard,
  FlowStepper,
  ResponsiveTable,
} from './panduan/PanduanReusable';

export type PanduanTopicId = 'proses' | 'aturan' | 'cfa';

interface PanduanSidebarMeta {
  id: PanduanTopicId;
  number: number;
  title: string;
  subtitle: string;
  badge?: string;
}

interface Topic1Data {
  title: string;
  intro: string;
  purposesTitle: string;
  purposes: {
    title: string;
    description: string;
    icon: 'message' | 'sparkles' | 'shield';
  }[];
  stepsTitle: string;
  steps: AccordionStepItem[];
  sourceTitle: string;
  source: string;
}

interface Topic2Data {
  title: string;
  intro: string;
  chips: { id: string; label: string }[];
  sectionA: {
    title: string;
    a1Title: string;
    a1Cards: { title: string; description: string }[];
    a2Title: string;
    a2Text: string;
    a2Example: string;
    a3Title: string;
    a3OpenClosedTitle: string;
    a3OpenClosedCards: { title: string; description: string }[];
    a3PosNegTitle: string;
    a3PosNegText: string;
    a3PosCard: { label: string; text: string };
    a3NegCard: { label: string; text: string };
    a3PosNegNote: string;
    a3AvoidTitle: string;
    a3AvoidCards: AvoidCardItem[];
    a3LengthTip: string;
    a4Title: string;
    a4Text: string;
    a5Title: string;
    a5Cards: { title: string; description: string }[];
  };
  sectionB: {
    title: string;
    intro: string;
    flowTitle: string;
    flowSteps: string[];
    principles: { number: number; title: string; text: string }[];
  };
  sectionC: {
    title: string;
    intro: string;
    chips: string[];
  };
  sourceTitle: string;
  source: string;
}

interface Topic3Data {
  title: string;
  badge: string;
  subtitle: string;
  intro: string;
  paragraph: string;
  diagramTitle: string;
  diagramLatentLabel: string;
  diagramLatentCaption: string;
  diagramIndicators: string[];
  diagramIndicatorsCaption: string;
  diagramNote: string;
  termsTitle: string;
  terms: { title: string; description: string }[];
  tableTitle: string;
  tableGroups: CfaTableGroup[];
  stepsTitle: string;
  steps: AccordionStepItem[];
  sourceTitle: string;
  sources: { text: string; href: string }[];
}

interface PanduanPageData {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  pageTitle: string;
  pageSubtitle: string;
  sidebarHeading: string;
  footerNote: string;
  topics: PanduanSidebarMeta[];
  topic1: Topic1Data;
  topic2: Topic2Data;
  topic3: Topic3Data;
}

export const PANDUAN_KUESIONER_DATA: PanduanPageData = {
  breadcrumbHome: 'Beranda',
  breadcrumbCurrent: 'Panduan kuesioner',
  pageTitle: 'Panduan kuesioner',
  pageSubtitle:
    'Rangkuman konsep dan aturan merancang kuesioner yang baik, dari menyusun proses sampai menguji kualitas pengukuran.',
  sidebarHeading: 'TOPIK PANDUAN',
  footerNote:
    'Rangkuman ini disusun dari buku dan artikel pada bagian Sumber. Untuk keperluan akademik, rujuk sumber aslinya.',
  topics: [
    {
      id: 'proses',
      number: 1,
      title: 'Proses desain kuesioner',
      subtitle: '10 langkah dari menentukan informasi sampai pretesting',
    },
    {
      id: 'aturan',
      number: 2,
      title: 'Aturan menulis pertanyaan',
      subtitle: 'Prinsip penyusunan kata dan prinsip pengukuran',
    },
    {
      id: 'cfa',
      number: 3,
      title: 'Confirmatory Factor Analysis (CFA)',
      subtitle: 'Menguji model pengukuran konstruk',
      badge: 'Lanjutan',
    },
  ],
  topic1: {
    title: 'Proses desain kuesioner',
    intro:
      'Kuesioner adalah serangkaian pertanyaan yang terstruktur untuk memperoleh informasi dari responden. Desain kuesioner tidak memiliki prinsip ilmiah yang menjamin hasil yang ideal, sehingga ini adalah keterampilan yang diperoleh melalui pengalaman.',
    purposesTitle: 'Tiga tujuan kuesioner',
    purposes: [
      {
        title: 'Menerjemahkan informasi menjadi pertanyaan',
        description:
          'Pertanyaan harus dipahami dengan cara yang sama oleh semua responden dan menghasilkan informasi yang dibutuhkan.',
        icon: 'message',
      },
      {
        title: 'Memotivasi responden',
        description:
          'Kuesioner harus mendorong responden untuk berpartisipasi, bekerja sama, dan menyelesaikan pengisian.',
        icon: 'sparkles',
      },
      {
        title: 'Meminimalkan kesalahan respons',
        description:
          'Response error muncul ketika jawaban responden tidak akurat, atau ketika jawaban dicatat atau dianalisis secara tidak tepat.',
        icon: 'shield',
      },
    ],
    stepsTitle: '10 langkah mendesain kuesioner',
    steps: [
      {
        stepNumber: 1,
        title: 'Tentukan informasi yang dibutuhkan',
        summary: 'Turunkan dari masalah, hipotesis, dan pertanyaan penelitian.',
        bullets: [
          {
            text: 'Cari informasi yang dibutuhkan dari komponen masalah penelitian, hipotesis, dan pertanyaan penelitian.',
          },
          {
            text: 'Buat tabel sementara (dummy table): tabel kosong yang menunjukkan bagaimana analisis akan disusun setelah data terkumpul, untuk memastikan informasi yang diperoleh menjawab masalah penelitian.',
          },
          {
            text: 'Tentukan populasi target, karena karakteristik responden memengaruhi desain kuesioner.',
          },
        ],
      },
      {
        stepNumber: 2,
        title: 'Pilih metode wawancara',
        summary: 'Tatap muka, telepon, surat, berbantuan komputer, atau elektronik.',
        bullets: [
          {
            text: 'Wawancara langsung (personal interviews): responden melihat kuesioner dan berinteraksi langsung dengan pewawancara; pertanyaan yang panjang dan beragam dapat diajukan.',
          },
          {
            text: 'Wawancara telepon (telephone interviews): pewawancara mengajukan pertanyaan lewat telepon.',
          },
          {
            text: 'Kuesioner melalui surat (mail questionnaires): dikirim lewat surat dan diisi sendiri oleh responden (self-administered).',
          },
          {
            text: 'CAPI dan CATI (Computer-Assisted Personal / Telephone Interviewing): pewawancara membaca pertanyaan dan mencatat jawaban, atau membimbing responden melalui kuesioner interaktif.',
          },
          {
            text: 'Kuesioner elektronik/internet: responden membuka kuesioner lewat tautan dari peneliti.',
          },
        ],
      },
      {
        stepNumber: 3,
        title: 'Tentukan isi tiap pertanyaan',
        summary: 'Pastikan setiap pertanyaan diperlukan dan tidak bermakna ganda.',
        bullets: [
          {
            text: 'Apakah pertanyaan ini diperlukan? Setiap pertanyaan harus berkontribusi pada informasi yang dibutuhkan. Pengecualian: pertanyaan netral untuk membangun hubungan dan keterlibatan (terutama pada topik sensitif), atau pertanyaan yang sengaja diduplikasi untuk menilai validitas atau reliabilitas.',
          },
          {
            text: 'Perlukah beberapa pertanyaan, bukan satu? Hindari pertanyaan bermakna ganda (dua pertanyaan digabung menjadi satu).',
          },
        ],
        exampleCard: {
          variant: 'warning',
          label: 'Hindari',
          text: 'Apakah menurut Anda Coca-Cola merupakan minuman yang enak dan menyegarkan?',
          note: 'Dua pertanyaan (enak dan menyegarkan) digabung menjadi satu.',
        },
      },
      {
        stepNumber: 4,
        title: 'Atasi ketidakmampuan dan keengganan menjawab',
        summary: 'Responden bisa tidak mampu atau tidak mau menjawab.',
        subSections: [
          {
            title:
              'Mengatasi ketidakmampuan (peneliti tidak boleh berasumsi responden dapat menjawab dengan akurat):',
            items: [
              'Tidak punya informasi: gunakan filter questions (pertanyaan penyaring) tentang keakraban, penggunaan produk, dan pengalaman sebelumnya, sebelum pertanyaan inti.',
              'Tidak dapat mengingat: ketidakmampuan mengingat menyebabkan tiga kesalahan: error of omission (kejadian tidak disebutkan), telescoping (waktu kejadian bergeser dalam ingatan), dan creation (mengingat kejadian yang sebenarnya tidak terjadi). Solusinya aided recall, yaitu memberi petunjuk yang berkaitan dengan kejadian.',
              'Tidak mampu mengungkapkan jawaban: sediakan alternatif seperti gambar, peta, atau deskripsi.',
            ],
          },
          {
            title: 'Mengatasi keengganan (responden mampu, tetapi tidak bersedia):',
            items: [
              'Usaha terlalu besar: minimalkan usaha responden. Contoh: beri daftar department store dan minta responden menandai toko yang sesuai.',
              'Konteks: pertanyaan bisa terasa pantas atau tidak pantas tergantung konteks; peneliti dapat mengubah konteks agar pertanyaan tampak sesuai.',
              'Tujuan yang sah: jelaskan mengapa data dibutuhkan agar responden bersedia menjawab.',
              'Informasi sensitif: lihat daftar "Cara meningkatkan kesediaan responden" di bawah.',
            ],
          },
        ],
        numberedSubList: {
          title: 'Cara meningkatkan kesediaan responden untuk informasi sensitif',
          items: [
            'Letakkan topik sensitif di bagian akhir kuesioner.',
            'Awali dengan pernyataan bahwa perilaku yang ditanyakan umum terjadi (counterbiasing statement). Contoh: "Studi terbaru menunjukkan bahwa sebagian besar orang Indonesia memiliki utang."',
            'Gunakan teknik orang ketiga: rumuskan pertanyaan seolah-olah merujuk pada orang lain.',
            'Sembunyikan pertanyaan sensitif di antara kelompok pertanyaan lain.',
            'Berikan kategori jawaban, bukan meminta angka tertentu. Contoh pendapatan tahunan rumah tangga: di bawah Rp500.000; Rp500.000 – Rp2.000.000; Rp2.000.000 – Rp5.000.000; Rp5.000.000 – Rp10.000.000; di atas Rp10.000.000.',
            'Gunakan teknik respons acak (randomized response): responden mendapat satu pertanyaan sensitif dan satu pertanyaan netral yang peluang jawaban "ya"-nya diketahui (contoh: "Apakah hari ulang tahun Anda pada bulan Maret?"), memilih salah satu secara acak (misalnya dengan melempar koin), lalu menjawab "ya" atau "tidak" tanpa memberi tahu pertanyaan mana yang dijawab. Dari peluang-peluang tersebut, peneliti dapat menghitung peluang jawaban "ya" untuk pertanyaan sensitif.',
          ],
        },
      },
      {
        stepNumber: 5,
        title: 'Pilih struktur pertanyaan',
        summary: 'Terbuka (tidak terstruktur) atau tertutup (terstruktur).',
        bullets: [
          {
            text: 'Pertanyaan tidak terstruktur (terbuka): dijawab dengan kata-kata sendiri. Cocok sebagai pertanyaan awal dan untuk penelitian eksploratif. Kekurangan: pencatatan jawaban dan analisis data memakan waktu dan biaya, serta kurang cocok untuk kuesioner tertulis karena responden cenderung menulis daripada berbicara. Solusi: pewawancara mencatat dalam format pilihan ganda, atau memakai preceding cue (kategori yang sudah disiapkan). Contoh: "Perusahaan telekomunikasi mana yang Anda gunakan?" dengan kategori Telkomsel, Indosat, lainnya, tidak tahu/tidak menjawab.',
          },
          {
            text: 'Pertanyaan terstruktur: memiliki alternatif jawaban dan format respons yang sudah ditentukan.',
            subBullets: [
              'Pilihan ganda: dua atau lebih alternatif yang mencakup semua kemungkinan jawaban (termasuk "lainnya") dan saling eksklusif. Waspadai bias posisi (responden cenderung memilih alternatif pertama); solusinya urutan alternatif dibuat berbeda-beda. Kelebihan: bias pewawancara berkurang, pertanyaan cepat diajukan, pengkodean dan analisis lebih mudah, pengumpulan data efisien. Kelemahan: perlu usaha besar untuk merancang alternatif jawaban yang efektif.',
              'Dikotomis: hanya dua alternatif (misalnya Ya/Tidak). Kelebihan: mudah dikodekan dan dianalisis. Kelemahan: cara perumusan pertanyaan dapat memengaruhi jawaban; solusinya split ballot technique, yaitu pertanyaan dirumuskan searah pada setengah kuesioner dan berlawanan arah pada setengah lainnya.',
              'Skala: rentang jawaban untuk objek yang diukur.',
            ],
          },
        ],
      },
      {
        stepNumber: 6,
        title: 'Susun kata-kata pertanyaan',
        summary: 'Delapan pedoman agar pertanyaan dipahami dan tidak bias.',
        bullets: [
          { text: 'Tentukan isu yang ditanyakan, gunakan pedoman 5W + 1H.' },
          { text: 'Gunakan kata-kata umum: bahasa sederhana dan familiar, hindari istilah teknis.' },
          { text: 'Gunakan kata-kata yang tidak ambigu: buat kategori jawaban yang dijelaskan secara objektif.' },
          { text: 'Hindari pertanyaan yang mengarahkan atau bias.' },
          { text: 'Hindari alternatif jawaban yang tersirat.' },
          { text: 'Hindari asumsi yang tersirat: rumuskan pertanyaan secara eksplisit.' },
          { text: 'Hindari generalisasi dan perkiraan: pertanyaan dibuat spesifik.' },
          {
            text: 'Gunakan pernyataan positif dan negatif: kuesioner dapat berisi pernyataan positif dan negatif, atau disusun dalam dua versi dengan arah pernyataan dibalik.',
          },
        ],
      },
      {
        stepNumber: 7,
        title: 'Tentukan urutan pertanyaan',
        summary: 'Dari pembuka yang ringan, umum ke spesifik, sulit di akhir.',
        bullets: [
          { text: 'Pertanyaan pembuka: menarik, sederhana, dan tidak membuat responden tertekan.' },
          {
            text: 'Tiga jenis informasi: informasi dasar (terkait masalah penelitian), informasi klasifikasi (karakteristik responden), dan informasi identifikasi (nama, email, nomor telepon, atau verifikasi responden).',
          },
          { text: 'Pertanyaan sulit, sensitif, atau kompleks ditempatkan di bagian akhir.' },
          {
            text: 'Dari umum ke spesifik (pendekatan corong/funnel) agar pertanyaan spesifik tidak memengaruhi jawaban pertanyaan umum.',
          },
          { text: 'Urutan logis: semua pertanyaan satu topik ditanyakan sebelum pindah ke topik baru.' },
          {
            text: 'Pertanyaan bercabang: letakkan pertanyaan sumber percabangan sedekat mungkin dengan pertanyaan yang menyebabkan percabangan, dan tempatkan pertanyaan bercabang sehingga responden tidak dapat menebak informasi tambahan apa yang akan ditanyakan.',
          },
        ],
      },
      {
        stepNumber: 8,
        title: 'Atur format dan tata letak',
        summary: 'Bagi per bagian, beri nomor, dan lakukan precoding.',
        bullets: [
          { text: 'Format, jarak, dan posisi pertanyaan berpengaruh signifikan terhadap hasil.' },
          { text: 'Bagi kuesioner menjadi beberapa bagian sesuai topik.' },
          { text: 'Beri nomor pada pertanyaan, terutama pertanyaan bercabang.' },
          {
            text: 'Lakukan precoding: menetapkan kode pada setiap kemungkinan jawaban sebelum pengumpulan data (menentukan nomor baris dan kolom).',
          },
        ],
      },
      {
        stepNumber: 9,
        title: 'Reproduksi kuesioner',
        summary: 'Penomoran berurutan, tata letak lega, instruksi dekat pertanyaan.',
        bullets: [
          { text: 'Beri nomor secara berurutan untuk mempermudah analisis data dan identifikasi kuesioner.' },
          { text: 'Pada kuesioner cetak, jangan terlalu padat karena terkesan rumit.' },
          { text: 'Tempatkan instruksi sebelum dan dekat dengan pertanyaan yang berkaitan.' },
        ],
      },
      {
        stepNumber: 10,
        title: 'Eliminasi masalah dengan pretesting',
        summary: 'Uji coba menyeluruh pada responden yang mirip target.',
        bullets: [
          {
            text: 'Uji semua aspek: isi pertanyaan, susunan kata, urutan, bentuk dan tata letak, tingkat kesulitan, dan instruksi. Ujikan pada responden dengan karakteristik target (latar belakang, pemahaman topik, sikap, perilaku).',
          },
          {
            text: 'Siapa yang melakukan pretest: semua jenis pewawancara (direktur proyek, peneliti pengembang kuesioner, anggota tim). Pewawancara berpengalaman dapat mengenali ketidakjelasan, kebingungan, dan penolakan responden; yang belum berpengalaman membantu menemukan masalah terkait pewawancara.',
          },
          {
            text: 'Protocol analysis: responden diminta berpikir sambil mengutarakan pikirannya saat mengisi; komentar dicatat dan dianalisis.',
          },
          {
            text: 'Debriefing: responden diberi tahu bahwa ini pretest, lalu diminta menjelaskan arti tiap pertanyaan, alasan jawabannya, dan masalah yang dihadapi.',
          },
          {
            text: 'Editing: perbaiki kuesioner berdasarkan masalah yang ditemukan; setiap revisi di-pretest ulang dengan sampel yang berbeda. Hasil pretest dianalisis dan diberi kode untuk memeriksa kecukupan definisi masalah serta data dan analisis yang diperlukan.',
          },
        ],
      },
    ],
    sourceTitle: 'Sumber',
    source: 'Malhotra, N. K. Marketing Research: An Applied Orientation (7th ed.).',
  },
  topic2: {
    title: 'Aturan menulis pertanyaan',
    intro:
      'Prinsip-prinsip berikut membantu pertanyaan dipahami sesuai maksud peneliti dan mengukur hal yang tepat.',
    chips: [
      { id: 'section-penyusunan-kata', label: 'Prinsip penyusunan kata' },
      { id: 'section-prinsip-pengukuran', label: 'Prinsip pengukuran' },
      { id: 'section-tampilan-kuesioner', label: 'Tampilan kuesioner' },
    ],
    sectionA: {
      title: 'Prinsip penyusunan kata (Principles of Wording)',
      a1Title: 'Konten dan tujuan pertanyaan',
      a1Cards: [
        {
          title: 'Variabel subjektif',
          description:
            'Berkaitan dengan perasaan, persepsi, keyakinan, atau sikap seseorang. Contoh: kepuasan kerja, persepsi lingkungan kerja.',
        },
        {
          title: 'Variabel objektif',
          description:
            'Berupa fakta atau karakteristik yang diketahui secara langsung. Contoh: usia, tingkat pendidikan.',
        },
      ],
      a2Title: 'Kalimat dan bahasa',
      a2Text:
        'Sesuaikan kalimat dengan pemahaman responden, seperti tingkat pendidikan, serta sesuaikan istilah dan idiom dengan budayanya.',
      a2Example:
        'Target responden mahasiswa jurusan akuntansi, maka bahasa dan istilah yang dipakai sesuai dengan mahasiswa akuntansi.',
      a3Title: 'Jenis dan bentuk pertanyaan',
      a3OpenClosedTitle: 'Terbuka vs tertutup',
      a3OpenClosedCards: [
        {
          title: 'Terbuka',
          description:
            'Responden bebas memberi jawaban. Contoh: Apa yang disukai responden dari lingkungan kerja di perusahaan A?',
        },
        {
          title: 'Tertutup',
          description:
            'Responden memilih dari alternatif yang tersedia. Skala nominal, ordinal, atau Likert termasuk pertanyaan tertutup. Contoh: pertanyaan gaji diberi rentang pilihan jawaban.',
        },
      ],
      a3PosNegTitle: 'Positif vs negatif',
      a3PosNegText: 'Tujuannya meminimalkan jawaban responden yang selalu sama.',
      a3PosCard: {
        label: 'Positif',
        text: 'Saya merasa nyaman mengikuti kegiatan pembelajaran di kampus.',
      },
      a3NegCard: {
        label: 'Negatif',
        text: 'Saya tidak nyaman mengikuti kegiatan pembelajaran di kampus.',
      },
      a3PosNegNote: "Perhatikan penggunaan kata 'tidak' dan 'hanya' yang berlebihan.",
      a3AvoidTitle: 'Jenis pertanyaan yang perlu dihindari',
      a3AvoidCards: [
        {
          title: 'Bermuatan ganda (double-barrelled)',
          definition: 'Dua hal atau lebih dalam satu pertanyaan.',
          example: 'Apakah Anda puas dengan makan dan pelayanan di restoran A?',
          whyProblematic: 'makanan dan pelayanan dinilai sekaligus.',
        },
        {
          title: 'Ambigu',
          definition: 'Memiliki makna dan interpretasi berbeda-beda.',
          example: 'Sejauh mana Anda mengatakan bahwa Anda bahagia?',
          whyProblematic:
            'tidak jelas apakah "bahagia" berkaitan dengan keluarga, teman, atau pekerjaan.',
        },
        {
          title: 'Bergantung pada ingatan (recall-dependent)',
          definition: 'Meminta responden mengingat pengalaman masa lalu.',
          example: 'Kapan pertama kali Anda memulai bekerja di perusahaan A?',
          whyProblematic: 'jika responden tidak ingat, jawaban bisa bias atau tidak akurat.',
        },
        {
          title: 'Mengarahkan (leading)',
          definition: 'Mendorong responden menjawab sesuai harapan peneliti.',
          example: 'Apakah Anda setuju kebijakan baru akan meningkatkan kinerja perusahaan?',
          whyProblematic: 'frasa "meningkatkan kinerja" berasumsi kebijakan baru pasti baik.',
        },
        {
          title: 'Bermuatan emosional (loaded)',
          definition: 'Mengandung muatan emosional.',
          example: 'Apakah Anda takut terhadap kelompok yang melakukan tindakan kekerasan tersebut?',
          whyProblematic: 'kata "takut" dan "kekerasan" memberi tekanan emosional.',
        },
        {
          title: 'Keinginan sosial (social desirability)',
          definition: 'Mendorong responden menjawab yang dianggap baik atau diterima secara sosial.',
          example: 'Apakah Anda selalu bersedia membantu teman yang mengalami kesulitan dalam perkuliahan?',
          whyProblematic:
            'responden mungkin menjawab "Ya" karena membantu teman dianggap perilaku yang baik.',
        },
      ],
      a3LengthTip: 'Panjang pertanyaan: buat sederhana dan pendek, tidak lebih dari 20 kata.',
      a4Title: 'Urutan pertanyaan',
      a4Text:
        'Urutkan dari umum ke spesifik (pendekatan corong/funnel approach). Urutan pertanyaan dapat menimbulkan bias yang disebut efek urutan (ordering effects).',
      a5Title: 'Data klasifikasi dan informasi personal',
      a5Cards: [
        {
          title: 'Pertanyaan administratif',
          description: 'Identifikasi responden secara umum, seperti nama, lokasi, atau kondisi.',
        },
        {
          title: 'Pertanyaan klasifikasi',
          description:
            'Informasi untuk mengelompokkan data, seperti perbedaan tingkat pendidikan dan usia.',
        },
      ],
    },
    sectionB: {
      title: 'Prinsip pengukuran (Principles of Measurement)',
      intro: 'Prinsip yang mendasari penelitian empiris.',
      flowTitle: 'Alur prinsip pengukuran',
      flowSteps: [
        'Konsep penelitian',
        'Definisi operasional',
        'Menentukan indikator',
        'Memilih / mengembangkan instrumen',
        'Menentukan skala pengukuran',
        'Pretesting',
        'Menguji validitas dan reliabilitas',
        'Menghasilkan data yang berkualitas',
      ],
      principles: [
        {
          number: 1,
          title: 'Menentukan apa yang ingin diukur',
          text: 'Peneliti menentukan fenomena atau konsep yang diteliti. Contoh: kepuasan mahasiswa terhadap pembelajaran.',
        },
        {
          number: 2,
          title: 'Mendefinisikan variabel secara operasional',
          text: 'Konsep abstrak tidak bisa diukur langsung, sehingga perlu diterjemahkan menjadi indikator yang dapat diamati atau diukur. Contoh: kepuasan mahasiswa dibagi menjadi kepuasan terhadap materi pembelajaran, dosen, metode pembelajaran, dan fasilitas pembelajaran.',
        },
        {
          number: 3,
          title: 'Memilih atau mengembangkan instrumen pengukuran',
          text: 'Tentukan alat ukur yang sesuai. Jika instrumen sudah sesuai, uji validitas dan reliabilitasnya.',
        },
        {
          number: 4,
          title: 'Memikirkan penggunaan analitis',
          text: 'Perhatikan jenis variabel yang sesuai dengan konsep penelitian yang dibuat.',
        },
        {
          number: 5,
          title: 'Menentukan teknik penskalaan (scaling)',
          text: 'Tentukan bagaimana respons responden diukur atau diberi nilai, misalnya skala nominal, interval, rasio, atau Likert.',
        },
        {
          number: 6,
          title: 'Menilai kualitas instrumen',
          text: 'Pastikan instrumen berkualitas baik dengan menguji validitas dan reliabilitas.',
        },
        {
          number: 7,
          title: 'Melakukan pretesting',
          text: 'Sebelum dibagikan ke target responden, uji kuesioner pada sejumlah kecil responden untuk memeriksa kesesuaian pertanyaan, bahasa, dan potensi bias.',
        },
      ],
    },
    sectionC: {
      title: 'Tampilan kuesioner (general appearance)',
      intro: 'Aspek tampilan umum yang perlu diperhatikan:',
      chips: [
        'Penampilan kuesioner',
        'Panjang kuesioner',
        'Pengantar untuk responden',
        'Petunjuk pengisian',
      ],
    },
    sourceTitle: 'Sumber',
    source:
      'Bougie, R., & Sekaran, U. Research Methods for Business: A Skill-Building Approach (8th ed.).',
  },
  topic3: {
    title: 'Confirmatory Factor Analysis (CFA)',
    badge: 'Lanjutan',
    subtitle:
      'Topik ini membahas analisis lanjutan untuk menguji model pengukuran setelah data terkumpul.',
    intro:
      'Confirmatory Factor Analysis (CFA) adalah teknik untuk mengestimasi model pengukuran. Tujuannya memastikan apakah jumlah faktor/konstruk serta muatan faktor (factor loading) dari variabel indikator yang diamati sesuai dengan yang diharapkan berdasarkan teori.',
    paragraph:
      'Dalam CFA konvensional, model yang umum dipakai adalah model pengukuran reflektif, yang mengasumsikan konstruk laten tercermin dalam indikatornya. Konstruk laten dipandang sebagai faktor yang menjelaskan respons pada indikator-indikatornya, sehingga arah hubungan konseptualnya dari konstruk menuju indikator.',
    diagramTitle: 'Contoh model reflektif',
    diagramLatentLabel: 'Kepuasan Pelanggan',
    diagramLatentCaption: 'Konstruk laten',
    diagramIndicators: [
      'KK1: Saya puas dengan layanan.',
      'KK2: Pengalaman saya sesuai harapan.',
      'KK3: Saya merasa pilihan saya tepat.',
    ],
    diagramIndicatorsCaption: 'Indikator (butir kuesioner)',
    diagramNote:
      'Peneliti mengasumsikan kepuasan pelanggan tercermin dalam ketiga indikator tersebut. CFA dipakai untuk mengevaluasi apakah pola data mendukung struktur faktor yang diajukan.',
    termsTitle: 'Istilah penting',
    terms: [
      {
        title: 'Konstruk eksogen',
        description:
          'Konstruk laten yang tidak dijelaskan atau diprediksi oleh konstruk lain dalam model; berperan sebagai variabel independen/prediktor. Contoh: kualitas pelayanan memengaruhi kepuasan dan loyalitas pelanggan, sehingga menjadi konstruk eksogen. Indikatornya misalnya keandalan, daya tanggap, dan jaminan pelayanan.',
      },
      {
        title: 'Konstruk endogen',
        description:
          'Konstruk laten yang dijelaskan atau diprediksi oleh satu atau lebih konstruk lain; berperan sebagai variabel dependen. Contoh: kepuasan pelanggan adalah konstruk endogen jika diprediksi oleh kualitas pelayanan, dan loyalitas pelanggan adalah konstruk endogen jika diprediksi oleh kepuasan pelanggan.',
      },
      {
        title: 'Variabel laten',
        description:
          'Variabel yang tidak bisa diukur secara langsung. Contoh: kepuasan pelanggan atau motivasi kerja, diukur melalui beberapa pertanyaan di kuesioner.',
      },
      {
        title: 'Variabel manifest',
        description:
          'Variabel yang dapat diukur secara langsung, sehingga menjadi representasi variabel laten. Contoh: skor jawaban kuesioner, nilai ujian, atau jumlah kehadiran.',
      },
    ],
    tableTitle: 'Pemeriksaan yang umum dilakukan pada konstruk reflektif',
    tableGroups: [
      {
        examination: 'Kecocokan model pengukuran (goodness of fit)',
        purpose: 'Menilai kecocokan model pengukuran dengan data',
        rows: [
          { measure: 'Chi-square (χ²)', criteria: 'p > 0,05 (sensitif pada sampel besar)' },
          { measure: 'RMSEA', criteria: '≤ 0,08 (cukup), ≤ 0,06 (baik)' },
          { measure: 'SRMR', criteria: '≤ 0,08' },
          { measure: 'CFI, TLI', criteria: '≥ 0,90 (cukup), ≥ 0,95 (baik)' },
          { measure: 'χ²/df', criteria: '< 3 (atau < 5 jika longgar)' },
        ],
      },
      {
        examination: 'Factor loading dan reliabilitas indikator',
        purpose: 'Menilai kekuatan hubungan setiap indikator dengan konstruk',
        rows: [
          {
            measure: 'Standardized factor loading',
            criteria: '≥ 0,50 (idealnya ≥ 0,70) dan signifikan (critical ratio/z > 1,96; p < 0,05)',
          },
        ],
      },
      {
        examination: 'Validitas konvergen',
        purpose: 'Menilai seberapa besar varians indikator dijelaskan oleh konstruk',
        rows: [{ measure: 'Average Variance Extracted (AVE)', criteria: 'AVE ≥ 0,50' }],
      },
      {
        examination: 'Validitas diskriminan',
        purpose: 'Menilai apakah konstruk dapat dibedakan dari konstruk lainnya',
        rows: [
          {
            measure: 'Metode Fornell-Larcker (√AVE); alternatif: HTMT',
            criteria:
              '√AVE suatu konstruk lebih besar daripada korelasinya dengan konstruk lain; atau HTMT < 0,85 atau 0,90',
          },
        ],
      },
      {
        examination: 'Reliabilitas konstruk',
        purpose: 'Menilai konsistensi pengukuran konstruk',
        rows: [{ measure: 'Composite Reliability (CR) atau omega', criteria: 'CR ≥ 0,70' }],
      },
      {
        examination: 'Diagnosis dan respesifikasi model',
        purpose:
          'Memeriksa bagian model yang tidak cocok, interpretabilitas estimasi, dan masalah spesifikasi model',
        rows: [
          {
            measure: 'Loading rendah',
            criteria: 'loading < 0,50, lalu pertimbangkan membuang indikator',
          },
          {
            measure: 'Standardized residual',
            criteria: '|nilai| > 2,58 menandakan pasangan indikator yang tidak terjelaskan model',
          },
          {
            measure: 'Modification indices (MI)',
            criteria: 'MI > 3,84 menandakan potensi perbaikan',
          },
        ],
      },
    ],
    stepsTitle: 'Tujuh tahap proses CFA',
    steps: [
      {
        stepNumber: 1,
        title: 'Menentukan konstruk berdasarkan teori',
        summary: 'Tentukan variabel laten yang akan diteliti berdasarkan teori.',
        paragraph:
          'Tentukan variabel laten yang akan diteliti berdasarkan teori dan penelitian sebelumnya. Contoh: kualitas pelayanan, kepuasan pelanggan, dan loyalitas pelanggan.',
      },
      {
        stepNumber: 2,
        title: 'Menentukan indikator setiap konstruk',
        summary: 'Tentukan butir pertanyaan atau indikator masing-masing konstruk.',
        paragraph:
          'Tentukan butir pertanyaan atau indikator yang secara teori mengukur masing-masing konstruk. Contoh: kualitas pelayanan diukur dengan keandalan, daya tanggap, jaminan, empati, dan bukti fisik.',
      },
      {
        stepNumber: 3,
        title: 'Menyusun model pengukuran',
        summary: 'Buat diagram atau model yang menghubungkan konstruk dengan indikatornya.',
        paragraph:
          'Buat diagram atau model yang menghubungkan konstruk dengan indikatornya. Setiap indikator ditetapkan untuk mengukur konstruk tertentu berdasarkan teori. Contoh: konstruk kualitas pelayanan dihubungkan dengan 5 indikator yang mengukurnya.',
      },
      {
        stepNumber: 4,
        title: 'Mengestimasi model CFA',
        summary: 'Estimasi factor loading, varians kesalahan pengukuran, dan parameter lainnya.',
        paragraph:
          'Gunakan perangkat lunak seperti AMOS untuk mengestimasi factor loading, varians kesalahan pengukuran, dan parameter lainnya.',
      },
      {
        stepNumber: 5,
        title: 'Mengevaluasi kecocokan model (model fit)',
        summary: 'Periksa kesesuaian model dengan data menggunakan indeks kecocokan.',
        paragraph:
          'Periksa apakah model pengukuran secara keseluruhan sesuai dengan data, dengan indeks seperti CFI, TLI, RMSEA, dan SRMR.',
      },
      {
        stepNumber: 6,
        title: 'Menguji validitas dan reliabilitas konstruk',
        summary: 'Evaluasi validitas konvergen, validitas diskriminan, dan reliabilitas konstruk.',
        bullets: [
          { text: 'Validitas konvergen: indikator dalam konstruk yang sama benar-benar mengukur hal yang sama.' },
          { text: 'Validitas diskriminan: suatu konstruk dapat dibedakan dari konstruk lainnya.' },
          { text: 'Reliabilitas konstruk: indikator memberikan pengukuran yang konsisten.' },
        ],
      },
      {
        stepNumber: 7,
        title: 'Memperbaiki dan menetapkan model pengukuran',
        summary: 'Tinjau ulang indikator, residual, atau modification indices bila diperlukan.',
        paragraph:
          'Jika model belum memadai, periksa indikator, factor loading, residual, dan modification indices berdasarkan teori serta alasan metodologis. Jika model direvisi, idealnya divalidasi ulang pada sampel lain (cross-validation).',
      },
    ],
    sourceTitle: 'Sumber',
    sources: [
      {
        text: 'Malhotra, N. K. (2020). Marketing research: An applied orientation (7th ed.). Pearson.',
        href: 'https://scholar.google.com/scholar?q=Malhotra+Marketing+research+An+applied+orientation+7th+ed',
      },
      {
        text: 'Zhang, M. F., Dawson, J. F., & Kline, R. B. (2021). Evaluating the Use of Covariance-Based Structural Equation Modelling with Reflective Measurement in Organizational and Management Research: A Review and Recommendations for Best Practice. British Journal of Management, 32(2), 257–272. https://doi.org/10.1111/1467-8551.12415',
        href: 'https://doi.org/10.1111/1467-8551.12415',
      },
      {
        text: 'Hair, J. F., Hult, G. T. M., Ringle, C. M., Sarstedt, M., Danks, N. P., & Ray, S. (2021). An Introduction to Structural Equation Modeling. In: Partial Least Squares Structural Equation Modeling (PLS-SEM) Using R. Springer. https://doi.org/10.1007/978-3-030-80519-7_1',
        href: 'https://doi.org/10.1007/978-3-030-80519-7_1',
      },
      {
        text: 'Sean. (2025, December 18). Apa itu Confirmatory Factor Analysis (CFA)? Arti dan tujuan. FanRuan. https://www.fanruan.com/id/glossary/analisis-data/confirmatory-factor-analysis',
        href: 'https://www.fanruan.com/id/glossary/analisis-data/confirmatory-factor-analysis',
      },
      {
        text: 'Cheung, G. W., Cooper-Thomas, H. D., Lau, R. S., & Wang, L. C. (2024). Reporting reliability, convergent and discriminant validity with structural equation modeling: A review and best-practice recommendations. Asia Pacific Journal of Management, 41, 745–783. https://doi.org/10.1007/s10490-023-09871-y',
        href: 'https://doi.org/10.1007/s10490-023-09871-y',
      },
    ],
  },
};

interface PanduanKuesionerScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
}

const getTopicFromHash = (): PanduanTopicId => {
  if (typeof window === 'undefined') return 'proses';
  const cleanHash = window.location.hash.replace(/^#\/?/, '').trim();
  if (cleanHash === 'panduan-kuesioner/aturan') return 'aturan';
  if (cleanHash === 'panduan-kuesioner/cfa') return 'cfa';
  return 'proses';
};

export const PanduanKuesionerScreen: React.FC<PanduanKuesionerScreenProps> = ({
  navigate,
}) => {
  const [activeTopic, setActiveTopic] = useState<PanduanTopicId>(getTopicFromHash);
  const shouldReduceMotion = useReducedMotion();
  const topicHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const contentTopRef = useRef<HTMLDivElement | null>(null);
  const isFirstMount = useRef(true);

  // Sync active topic when URL hash changes (direct navigation or browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const cleanHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (cleanHash === 'panduan-kuesioner' || cleanHash === 'panduan-kuesioner/proses') {
        setActiveTopic('proses');
      } else if (cleanHash === 'panduan-kuesioner/aturan') {
        setActiveTopic('aturan');
      } else if (cleanHash === 'panduan-kuesioner/cfa') {
        setActiveTopic('cfa');
      }
    };

    if (
      window.location.hash === '' ||
      window.location.hash === '#/panduan-kuesioner' ||
      window.location.hash === '#panduan-kuesioner'
    ) {
      window.history.replaceState(null, '', '#/panduan-kuesioner/proses');
    }

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Move focus to the topic's H1 and scroll to the top of content after switching topics
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const focusAndScroll = () => {
      if (contentTopRef.current) {
        const yOffset = -88;
        const y =
          contentTopRef.current.getBoundingClientRect().top +
          window.scrollY +
          yOffset;
        window.scrollTo({
          top: Math.max(0, y),
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      }
      setTimeout(() => {
        topicHeadingRef.current?.focus({ preventScroll: true });
      }, shouldReduceMotion ? 0 : 120);
    };

    focusAndScroll();
  }, [activeTopic, shouldReduceMotion]);

  const handleSelectTopic = (topicId: PanduanTopicId) => {
    setActiveTopic(topicId);
    const targetHash = `#/panduan-kuesioner/${topicId}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  const activeIndex = PANDUAN_KUESIONER_DATA.topics.findIndex(
    (t) => t.id === activeTopic
  );
  const prevTopic =
    activeIndex > 0 ? PANDUAN_KUESIONER_DATA.topics[activeIndex - 1] : null;
  const nextTopic =
    activeIndex < PANDUAN_KUESIONER_DATA.topics.length - 1
      ? PANDUAN_KUESIONER_DATA.topics[activeIndex + 1]
      : null;

  const fadeTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.16 };

  return (
    <div className="w-full bg-[#F4F6F8] text-[#12202B] min-h-[calc(100vh-145px)]">
      <main className="w-full pt-[72px] pb-16">
        <div className="w-full max-w-[1220px] mx-auto px-4 md:px-8 py-8 space-y-8">
          {/* Page Header & Breadcrumb */}
          <div className="space-y-3 border-b border-[#DDE3E8] pb-6">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-[#5B6B78]"
            >
              <a
                href="#/beranda"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('beranda', 'push_back');
                }}
                className="min-h-[44px] inline-flex items-center font-medium hover:text-[#0B6E69] transition-colors motion-reduce:transition-none rounded-md px-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
              >
                {PANDUAN_KUESIONER_DATA.breadcrumbHome}
              </a>
              <ChevronRight className="w-4 h-4 text-[#5B6B78]" aria-hidden="true" />
              <span className="font-semibold text-[#12202B]">
                {PANDUAN_KUESIONER_DATA.breadcrumbCurrent}
              </span>
            </nav>

            <h1 className="font-headline-xl text-[30px] sm:text-[36px] text-[#12202B] font-extrabold tracking-tight">
              {PANDUAN_KUESIONER_DATA.pageTitle}
            </h1>
            <p className="text-base sm:text-[17px] text-[#5B6B78] max-w-3xl leading-relaxed">
              {PANDUAN_KUESIONER_DATA.pageSubtitle}
            </p>
          </div>

          {/* Mobile Horizontal Pill Bar (< 900px) */}
          <nav
            aria-label="Topik Panduan Kuesioner"
            className="min-[900px]:hidden -mx-4 px-4 py-1 overflow-x-auto flex items-center gap-2.5"
          >
            {PANDUAN_KUESIONER_DATA.topics.map((topic) => {
              const isActive = activeTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-[44px] px-4 py-2.5 rounded-full text-xs sm:text-sm whitespace-nowrap shrink-0 inline-flex items-center gap-2 border transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-[#E3F2F1] border-[#0B6E69] text-[#0B6E69] font-bold'
                      : 'bg-white border-[#DDE3E8] text-[#12202B] hover:border-[#0B6E69]/50 font-medium'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-[#0B6E69] text-white'
                        : 'bg-[#F4F6F8] text-[#5B6B78]'
                    }`}
                  >
                    {topic.number}
                  </span>
                  <span>{topic.title}</span>
                  {topic.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0B6E69]/15 text-[#0B6E69]">
                      {topic.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Two Columns Layout: Sticky Sidebar (300px) + Main Content Area (max-width 860px) */}
          <div className="flex flex-col min-[900px]:flex-row items-start gap-8">
            {/* Desktop Sticky Sidebar (>= 900px) */}
            <aside
              aria-label="Daftar Topik Panduan"
              className="hidden min-[900px]:block w-[300px] shrink-0 sticky top-24 self-start bg-white rounded-[16px] border border-[#DDE3E8] p-4 space-y-3"
            >
              <div className="px-2 pt-1 text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                {PANDUAN_KUESIONER_DATA.sidebarHeading}
              </div>

              <nav className="flex flex-col gap-2">
                {PANDUAN_KUESIONER_DATA.topics.map((topic) => {
                  const isActive = activeTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleSelectTopic(topic.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full min-h-[44px] p-3.5 rounded-[14px] text-left flex items-start gap-3 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2 ${
                        isActive
                          ? 'bg-[#E3F2F1] border border-[#0B6E69]/25'
                          : 'bg-transparent border border-transparent hover:bg-[#F4F6F8]'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-[#0B6E69] text-white'
                            : 'bg-[#F4F6F8] text-[#5B6B78] border border-[#DDE3E8]'
                        }`}
                      >
                        {topic.number}
                      </span>
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-sm font-bold leading-snug ${
                              isActive ? 'text-[#0B6E69]' : 'text-[#12202B]'
                            }`}
                          >
                            {topic.title}
                          </span>
                          {topic.badge && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#0B6E69]/15 text-[#0B6E69]">
                              {topic.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5B6B78] leading-snug">
                          {topic.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content Column (max-w-[860px]) */}
            <div
              ref={contentTopRef}
              className="flex-1 min-w-0 w-full max-w-[860px] space-y-8"
            >
              <AnimatePresence mode="wait">
                {activeTopic === 'proses' && (
                  <motion.section
                    key="topic-proses"
                    aria-labelledby="topic-heading-proses"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fadeTransition}
                    className="space-y-8"
                  >
                    <header className="space-y-4">
                      <h2
                        id="topic-heading-proses"
                        ref={topicHeadingRef}
                        tabIndex={-1}
                        className="text-[26px] sm:text-[32px] font-extrabold text-[#12202B] tracking-tight leading-tight focus:outline-none"
                      >
                        {PANDUAN_KUESIONER_DATA.topic1.title}
                      </h2>

                      <div className="bg-[#E3F2F1] border border-[#0B6E69]/20 rounded-[16px] p-5 sm:p-6">
                        <p className="text-[15px] sm:text-base text-[#12202B] leading-relaxed font-medium">
                          {PANDUAN_KUESIONER_DATA.topic1.intro}
                        </p>
                      </div>
                    </header>

                    {/* Tiga tujuan kuesioner */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic1.purposesTitle}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {PANDUAN_KUESIONER_DATA.topic1.purposes.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 space-y-2.5 flex flex-col"
                          >
                            <div className="w-10 h-10 rounded-[12px] bg-[#E3F2F1] text-[#0B6E69] flex items-center justify-center shrink-0">
                              {item.icon === 'message' && (
                                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                              )}
                              {item.icon === 'sparkles' && (
                                <Sparkles className="w-5 h-5" aria-hidden="true" />
                              )}
                              {item.icon === 'shield' && (
                                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                              )}
                            </div>
                            <h4 className="text-[15px] font-bold text-[#12202B] leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-sm text-[#5B6B78] leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 10 langkah mendesain kuesioner */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic1.stepsTitle}
                      </h3>
                      <AccordionStepper
                        idPrefix="topic1-step"
                        items={PANDUAN_KUESIONER_DATA.topic1.steps}
                      />
                    </div>

                    {/* Sumber Topic 1 */}
                    <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 space-y-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                        {PANDUAN_KUESIONER_DATA.topic1.sourceTitle}
                      </h3>
                      <p className="text-sm text-[#5B6B78] leading-relaxed">
                        {PANDUAN_KUESIONER_DATA.topic1.source}
                      </p>
                    </div>
                  </motion.section>
                )}

                {activeTopic === 'aturan' && (
                  <motion.section
                    key="topic-aturan"
                    aria-labelledby="topic-heading-aturan"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fadeTransition}
                    className="space-y-8"
                  >
                    <header className="space-y-4">
                      <h2
                        id="topic-heading-aturan"
                        ref={topicHeadingRef}
                        tabIndex={-1}
                        className="text-[26px] sm:text-[32px] font-extrabold text-[#12202B] tracking-tight leading-tight focus:outline-none"
                      >
                        {PANDUAN_KUESIONER_DATA.topic2.title}
                      </h2>

                      <div className="bg-[#E3F2F1] border border-[#0B6E69]/20 rounded-[16px] p-5 sm:p-6">
                        <p className="text-[15px] sm:text-base text-[#12202B] leading-relaxed font-medium">
                          {PANDUAN_KUESIONER_DATA.topic2.intro}
                        </p>
                      </div>

                      {/* In-page section chips */}
                      <div className="flex flex-wrap gap-2">
                        {PANDUAN_KUESIONER_DATA.topic2.chips.map((chip) => (
                          <button
                            key={chip.id}
                            type="button"
                            onClick={() => {
                              const target = document.getElementById(chip.id);
                              if (target) {
                                const y =
                                  target.getBoundingClientRect().top +
                                  window.scrollY -
                                  88;
                                window.scrollTo({
                                  top: Math.max(0, y),
                                  behavior: shouldReduceMotion ? 'auto' : 'smooth',
                                });
                              }
                            }}
                            className="min-h-[44px] px-4 py-2 rounded-full bg-white border border-[#DDE3E8] hover:border-[#0B6E69] hover:bg-[#E3F2F1]/60 text-sm font-semibold text-[#12202B] hover:text-[#0B6E69] transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    </header>

                    {/* SECTION A */}
                    <section
                      id="section-penyusunan-kata"
                      className="space-y-6 pt-2"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic2.sectionA.title}
                      </h3>

                      {/* A1 */}
                      <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-6 space-y-4">
                        <h4 className="text-base sm:text-lg font-bold text-[#12202B]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a1Title}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a1Cards.map(
                            (card, idx) => (
                              <div
                                key={idx}
                                className="rounded-[14px] bg-[#F4F6F8] border border-[#DDE3E8] p-4 space-y-1.5"
                              >
                                <h5 className="text-sm font-bold text-[#0B6E69]">
                                  {card.title}
                                </h5>
                                <p className="text-sm text-[#12202B] leading-relaxed">
                                  {card.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* A2 */}
                      <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-6 space-y-4">
                        <h4 className="text-base sm:text-lg font-bold text-[#12202B]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a2Title}
                        </h4>
                        <p className="text-[15px] text-[#12202B] leading-relaxed">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a2Text}
                        </p>
                        <ExampleCard
                          variant="teal"
                          label="Contoh"
                          text={PANDUAN_KUESIONER_DATA.topic2.sectionA.a2Example}
                        />
                      </div>

                      {/* A3 */}
                      <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-6 space-y-6">
                        <h4 className="text-base sm:text-lg font-bold text-[#12202B]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3Title}
                        </h4>

                        {/* Terbuka vs tertutup */}
                        <div className="space-y-3">
                          <h5 className="text-sm font-bold text-[#12202B]">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3OpenClosedTitle}
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3OpenClosedCards.map(
                              (card, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-[14px] bg-[#F4F6F8] border border-[#DDE3E8] p-4 space-y-1.5"
                                >
                                  <h6 className="text-sm font-bold text-[#0B6E69]">
                                    {card.title}
                                  </h6>
                                  <p className="text-sm text-[#12202B] leading-relaxed">
                                    {card.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Positif vs negatif */}
                        <div className="space-y-3 pt-2 border-t border-[#DDE3E8]/70">
                          <h5 className="text-sm font-bold text-[#12202B]">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3PosNegTitle}
                          </h5>
                          <p className="text-sm text-[#5B6B78] leading-relaxed">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3PosNegText}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ExampleCard
                              variant="success"
                              label={PANDUAN_KUESIONER_DATA.topic2.sectionA.a3PosCard.label}
                              text={PANDUAN_KUESIONER_DATA.topic2.sectionA.a3PosCard.text}
                            />
                            <ExampleCard
                              variant="teal"
                              label={PANDUAN_KUESIONER_DATA.topic2.sectionA.a3NegCard.label}
                              text={PANDUAN_KUESIONER_DATA.topic2.sectionA.a3NegCard.text}
                            />
                          </div>
                          <p className="text-xs sm:text-sm text-[#5B6B78] font-medium">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3PosNegNote}
                          </p>
                        </div>

                        {/* Jenis pertanyaan yang perlu dihindari */}
                        <div className="space-y-3 pt-2 border-t border-[#DDE3E8]/70">
                          <h5 className="text-sm font-bold text-[#12202B]">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3AvoidTitle}
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3AvoidCards.map(
                              (avoid, idx) => (
                                <AvoidCard key={idx} {...avoid} />
                              )
                            )}
                          </div>
                        </div>

                        {/* Tip card */}
                        <div className="bg-[#E3F2F1] border border-[#0B6E69]/25 rounded-[14px] p-4 flex items-start gap-3">
                          <Lightbulb
                            className="w-5 h-5 text-[#0B6E69] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <p className="text-sm font-semibold text-[#12202B] leading-relaxed">
                            {PANDUAN_KUESIONER_DATA.topic2.sectionA.a3LengthTip}
                          </p>
                        </div>
                      </div>

                      {/* A4 */}
                      <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-6 space-y-2">
                        <h4 className="text-base sm:text-lg font-bold text-[#12202B]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a4Title}
                        </h4>
                        <p className="text-[15px] text-[#12202B] leading-relaxed">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a4Text}
                        </p>
                      </div>

                      {/* A5 */}
                      <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-6 space-y-4">
                        <h4 className="text-base sm:text-lg font-bold text-[#12202B]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a5Title}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionA.a5Cards.map(
                            (card, idx) => (
                              <div
                                key={idx}
                                className="rounded-[14px] bg-[#F4F6F8] border border-[#DDE3E8] p-4 space-y-1.5"
                              >
                                <h5 className="text-sm font-bold text-[#0B6E69]">
                                  {card.title}
                                </h5>
                                <p className="text-sm text-[#12202B] leading-relaxed">
                                  {card.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </section>

                    {/* SECTION B */}
                    <section
                      id="section-prinsip-pengukuran"
                      className="space-y-5 pt-2"
                    >
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#12202B]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionB.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#5B6B78]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionB.intro}
                        </p>
                      </div>

                      <FlowStepper
                        title={PANDUAN_KUESIONER_DATA.topic2.sectionB.flowTitle}
                        steps={PANDUAN_KUESIONER_DATA.topic2.sectionB.flowSteps}
                      />

                      <div className="space-y-3">
                        {PANDUAN_KUESIONER_DATA.topic2.sectionB.principles.map(
                          (p) => (
                            <div
                              key={p.number}
                              className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 flex items-start gap-4"
                            >
                              <span className="w-8 h-8 rounded-full bg-[#0B6E69] text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {p.number}
                              </span>
                              <div className="space-y-1">
                                <h4 className="text-[15px] sm:text-base font-bold text-[#12202B]">
                                  {p.title}
                                </h4>
                                <p className="text-sm sm:text-[15px] text-[#5B6B78] leading-relaxed">
                                  {p.text}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </section>

                    {/* SECTION C */}
                    <section
                      id="section-tampilan-kuesioner"
                      className="space-y-4 pt-2"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic2.sectionC.title}
                      </h3>
                      <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-6 space-y-4">
                        <p className="text-sm sm:text-base font-semibold text-[#12202B]">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionC.intro}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {PANDUAN_KUESIONER_DATA.topic2.sectionC.chips.map(
                            (chip, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E3F2F1] text-[#0B6E69] text-sm font-semibold border border-[#0B6E69]/20"
                              >
                                <CheckSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>{chip}</span>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </section>

                    {/* Sumber Topic 2 */}
                    <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 space-y-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                        {PANDUAN_KUESIONER_DATA.topic2.sourceTitle}
                      </h3>
                      <p className="text-sm text-[#5B6B78] leading-relaxed">
                        {PANDUAN_KUESIONER_DATA.topic2.source}
                      </p>
                    </div>
                  </motion.section>
                )}

                {activeTopic === 'cfa' && (
                  <motion.section
                    key="topic-cfa"
                    aria-labelledby="topic-heading-cfa"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fadeTransition}
                    className="space-y-8"
                  >
                    <header className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2
                            id="topic-heading-cfa"
                            ref={topicHeadingRef}
                            tabIndex={-1}
                            className="text-[26px] sm:text-[32px] font-extrabold text-[#12202B] tracking-tight leading-tight focus:outline-none"
                          >
                            {PANDUAN_KUESIONER_DATA.topic3.title}
                          </h2>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E3F2F1] text-[#0B6E69] border border-[#0B6E69]/25">
                            {PANDUAN_KUESIONER_DATA.topic3.badge}
                          </span>
                        </div>
                        <p className="text-sm sm:text-[15px] text-[#5B6B78]">
                          {PANDUAN_KUESIONER_DATA.topic3.subtitle}
                        </p>
                      </div>

                      <div className="bg-[#E3F2F1] border border-[#0B6E69]/20 rounded-[16px] p-5 sm:p-6">
                        <p className="text-[15px] sm:text-base text-[#12202B] leading-relaxed font-medium">
                          {PANDUAN_KUESIONER_DATA.topic3.intro}
                        </p>
                      </div>

                      <p className="text-[15px] sm:text-base text-[#12202B] leading-relaxed">
                        {PANDUAN_KUESIONER_DATA.topic3.paragraph}
                      </p>
                    </header>

                    {/* Contoh model reflektif */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic3.diagramTitle}
                      </h3>
                      <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-7 space-y-5">
                        {/* Responsive Diagram */}
                        <div className="flex flex-col items-center">
                          {/* Latent Construct Oval */}
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                              {PANDUAN_KUESIONER_DATA.topic3.diagramLatentCaption}
                            </span>
                            <div className="px-7 py-4 rounded-full bg-[#E3F2F1] border-2 border-[#0B6E69] text-center">
                              <span className="text-sm sm:text-base font-bold text-[#0B6E69]">
                                {PANDUAN_KUESIONER_DATA.topic3.diagramLatentLabel}
                              </span>
                            </div>
                          </div>

                          {/* SVG Fanning Arrows (Desktop / Tablet) */}
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 600 64"
                            className="hidden sm:block w-full max-w-[600px] h-16"
                          >
                            <defs>
                              <marker
                                id="cfa-arrow"
                                viewBox="0 0 10 10"
                                refX="8"
                                refY="5"
                                markerWidth="7"
                                markerHeight="7"
                                orient="auto-start-reverse"
                              >
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0B6E69" />
                              </marker>
                            </defs>
                            <line
                              x1="260"
                              y1="2"
                              x2="100"
                              y2="58"
                              stroke="#0B6E69"
                              strokeWidth="2"
                              markerEnd="url(#cfa-arrow)"
                            />
                            <line
                              x1="300"
                              y1="2"
                              x2="300"
                              y2="58"
                              stroke="#0B6E69"
                              strokeWidth="2"
                              markerEnd="url(#cfa-arrow)"
                            />
                            <line
                              x1="340"
                              y1="2"
                              x2="500"
                              y2="58"
                              stroke="#0B6E69"
                              strokeWidth="2"
                              markerEnd="url(#cfa-arrow)"
                            />
                          </svg>

                          {/* Mobile Vertical Connector */}
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 36"
                            className="sm:hidden w-6 h-9"
                          >
                            <defs>
                              <marker
                                id="cfa-arrow-mobile"
                                viewBox="0 0 10 10"
                                refX="8"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto"
                              >
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0B6E69" />
                              </marker>
                            </defs>
                            <line
                              x1="12"
                              y1="2"
                              x2="12"
                              y2="30"
                              stroke="#0B6E69"
                              strokeWidth="2"
                              markerEnd="url(#cfa-arrow-mobile)"
                            />
                          </svg>

                          {/* Indicators Row */}
                          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {PANDUAN_KUESIONER_DATA.topic3.diagramIndicators.map(
                              (ind, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-[12px] bg-[#F4F6F8] border border-[#DDE3E8] px-4 py-3 text-center flex items-center justify-center"
                                >
                                  <span className="text-xs sm:text-sm font-semibold text-[#12202B] leading-snug">
                                    {ind}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                          <span className="mt-2.5 text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                            {PANDUAN_KUESIONER_DATA.topic3.diagramIndicatorsCaption}
                          </span>
                        </div>

                        <p className="text-sm text-[#5B6B78] leading-relaxed pt-3 border-t border-[#DDE3E8]">
                          {PANDUAN_KUESIONER_DATA.topic3.diagramNote}
                        </p>
                      </div>
                    </div>

                    {/* Istilah penting */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic3.termsTitle}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PANDUAN_KUESIONER_DATA.topic3.terms.map((term, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <FileText
                                className="w-4 h-4 text-[#0B6E69] shrink-0"
                                aria-hidden="true"
                              />
                              <h4 className="text-[15px] font-bold text-[#12202B]">
                                {term.title}
                              </h4>
                            </div>
                            <p className="text-sm text-[#5B6B78] leading-relaxed">
                              {term.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pemeriksaan yang umum dilakukan pada konstruk reflektif */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic3.tableTitle}
                      </h3>
                      <ResponsiveTable
                        groups={PANDUAN_KUESIONER_DATA.topic3.tableGroups}
                      />
                    </div>

                    {/* Tujuh tahap proses CFA */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#12202B]">
                        {PANDUAN_KUESIONER_DATA.topic3.stepsTitle}
                      </h3>
                      <AccordionStepper
                        idPrefix="topic3-step"
                        items={PANDUAN_KUESIONER_DATA.topic3.steps}
                      />
                    </div>

                    {/* Sumber Topic 3 */}
                    <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 space-y-2.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                        {PANDUAN_KUESIONER_DATA.topic3.sourceTitle}
                      </h3>
                      <ol className="space-y-2 list-decimal pl-5 text-xs sm:text-sm text-[#5B6B78] leading-relaxed">
                        {PANDUAN_KUESIONER_DATA.topic3.sources.map((src, idx) => (
                          <li key={idx}>
                            <a
                              href={src.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline hover:text-[#0B6E69] underline underline-offset-2 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] rounded"
                            >
                              <span>{src.text}</span>
                              <ExternalLink
                                className="w-3.5 h-3.5 inline-block ml-1 -mt-0.5"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Bottom Navigation Cards: Sebelumnya / Berikutnya */}
              <nav
                aria-label="Navigasi Topik"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
              >
                {prevTopic ? (
                  <button
                    type="button"
                    onClick={() => handleSelectTopic(prevTopic.id)}
                    className="min-h-[44px] bg-white rounded-[16px] border border-[#DDE3E8] hover:border-[#0B6E69] p-5 text-left flex items-center gap-3.5 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2 group"
                  >
                    <ArrowLeft
                      className="w-5 h-5 text-[#5B6B78] group-hover:text-[#0B6E69] shrink-0"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                        Sebelumnya
                      </span>
                      <span className="block text-sm sm:text-base font-bold text-[#12202B] group-hover:text-[#0B6E69] truncate">
                        {prevTopic.title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextTopic && (
                  <button
                    type="button"
                    onClick={() => handleSelectTopic(nextTopic.id)}
                    className="min-h-[44px] bg-white rounded-[16px] border border-[#DDE3E8] hover:border-[#0B6E69] p-5 text-right flex items-center justify-end gap-3.5 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2 group"
                  >
                    <div className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#5B6B78]">
                        Berikutnya
                      </span>
                      <span className="block text-sm sm:text-base font-bold text-[#12202B] group-hover:text-[#0B6E69] truncate">
                        {nextTopic.title}
                      </span>
                    </div>
                    <ArrowRight
                      className="w-5 h-5 text-[#5B6B78] group-hover:text-[#0B6E69] shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </nav>

              {/* Page Footer Note */}
              <div className="pt-2 border-t border-[#DDE3E8] flex items-start gap-2 text-xs text-[#5B6B78]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#5B6B78]" aria-hidden="true" />
                <p className="leading-relaxed">{PANDUAN_KUESIONER_DATA.footerNote}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
