import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type ToolkitTabId = 'kalkulator-sampel' | 'cek-validitas' | 'cek-reliabilitas';

export interface QualityBenefitList {
  title: string;
  items: string[];
}

export interface QualitySection {
  id: string;
  letterLabel: string;
  paragraphs: string[];
  highlightFirstParagraph?: boolean;
  benefitsList?: QualityBenefitList;
}

export interface InstrumentQualityData {
  id: ToolkitTabId;
  title: string;
  breadcrumb: string;
  sections: QualitySection[];
  emptyPlaceholder?: {
    message: string;
  };
  navigation: {
    previous?: {
      title: string;
      tab: ToolkitTabId;
    };
    next?: {
      title: string;
      tab: ToolkitTabId;
    };
  };
}

/**
 * Data store for Instrument Quality information pages.
 * Data-driven typed configuration for easy modification.
 */
export const INSTRUMENT_QUALITY_DATA: Record<string, InstrumentQualityData> = {
  'cek-validitas': {
    id: 'cek-validitas',
    title: 'Cek validitas',
    breadcrumb: 'Toolkit / Kualitas instrumen',
    sections: [
      {
        id: 'pengertian-validitas',
        letterLabel: 'A. Pengertian Validitas',
        highlightFirstParagraph: true,
        paragraphs: [
          'Validitas (Validity) merupakan pengujian yang digunakan untuk mengetahui seberapa baik suatu instrumen penelitian dalam mengukur konsep atau variabel yang memang ingin diukur.',
          'Validitas berfokus pada ketepatan hasil pengukuran. Artinya, suatu instrumen dikatakan valid apabila pertanyaan-pertanyaan di dalamnya benar-benar mampu merepresentasikan konsep yang sedang diteliti.',
          'Dengan kata lain, validitas membantu memastikan bahwa peneliti mengukur hal yang tepat, bukan konsep lain yang tidak menjadi tujuan penelitian.',
        ],
      },
      {
        id: 'mengapa-validitas-penting',
        letterLabel: 'B. Mengapa Validitas Penting?',
        paragraphs: [
          'Validitas penting untuk memastikan bahwa instrumen penelitian mampu mengukur variabel sesuai dengan tujuan penelitian.',
          'Tanpa validitas yang baik, peneliti berisiko memperoleh hasil pengukuran yang tidak sesuai dengan konsep yang sebenarnya ingin diteliti.',
        ],
        benefitsList: {
          title: 'Manfaat validitas',
          items: [
            'Memastikan instrumen mengukur konsep yang tepat.',
            'Memastikan pertanyaan sesuai dengan variabel penelitian.',
            'Menghindari kesalahan dalam merepresentasikan konsep penelitian.',
            'Meningkatkan ketepatan interpretasi hasil penelitian.',
          ],
        },
      },
    ],
    navigation: {
      previous: {
        title: 'Kalkulator sampel',
        tab: 'kalkulator-sampel',
      },
      next: {
        title: 'Cek reliabilitas',
        tab: 'cek-reliabilitas',
      },
    },
  },
  'cek-reliabilitas': {
    id: 'cek-reliabilitas',
    title: 'Cek reliabilitas',
    breadcrumb: 'Toolkit / Kualitas instrumen',
    sections: [
      {
        id: 'pengertian-reliabilitas',
        letterLabel: 'A. Pengertian Reliabilitas',
        highlightFirstParagraph: true,
        paragraphs: [
          'Reliabilitas (Reliability) merupakan pengujian yang digunakan untuk mengetahui tingkat konsistensi dan stabilitas suatu instrumen pengukuran dalam menghasilkan jawaban.',
          'Dalam penelitian kuesioner, reliabilitas digunakan untuk mengetahui apakah responden memberikan jawaban yang konsisten terhadap pertanyaan yang mengukur konsep yang sama.',
          'Dengan kata lain, suatu instrumen dikatakan memiliki reliabilitas yang baik apabila mampu menghasilkan pengukuran yang konsisten.',
        ],
      },
      {
        id: 'mengapa-reliabilitas-penting',
        letterLabel: 'B. Mengapa Reliabilitas Penting?',
        paragraphs: [
          'Reliabilitas penting karena membantu memastikan bahwa instrumen penelitian dapat menghasilkan pengukuran yang konsisten dan dapat dipercaya.',
          'Apabila suatu instrumen tidak reliabel, hasil penelitian menjadi sulit dipercaya karena peneliti tidak dapat memastikan apakah perbedaan skor berasal dari karakteristik yang sedang diteliti atau justru disebabkan oleh kesalahan pengukuran (measurement error).',
        ],
        benefitsList: {
          title: 'Manfaat reliabilitas',
          items: [
            'Memastikan konsistensi hasil pengukuran.',
            'Mengurangi kemungkinan kesalahan pengukuran.',
            'Meningkatkan kepercayaan terhadap hasil penelitian.',
            'Memastikan setiap item dalam instrumen bekerja secara konsisten.',
          ],
        },
      },
    ],
    navigation: {
      previous: {
        title: 'Cek validitas',
        tab: 'cek-validitas',
      },
    },
  },
};

interface InstrumentQualityPageProps {
  data: InstrumentQualityData;
  onNavigateTab: (tab: ToolkitTabId) => void;
}

export const InstrumentQualityPage: React.FC<InstrumentQualityPageProps> = ({
  data,
  onNavigateTab,
}) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Move focus to the page H1 after switching for accessibility
  useEffect(() => {
    const timer = setTimeout(() => {
      h1Ref.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [data.id]);

  return (
    <motion.article
      key={data.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.001 : 0.18 }}
      className="w-full"
    >
      <div className="w-full max-w-[760px] mx-auto pb-16">
        {/* Breadcrumb: "Toolkit / Kualitas instrumen" */}
        <nav
          aria-label="Navigasi Jejak"
          className="flex items-center gap-1.5 mb-3 text-xs md:text-sm text-[#5B6B78] font-medium"
        >
          <span>Toolkit</span>
          <span className="material-symbols-outlined text-[16px] text-[#5B6B78]/70">
            chevron_right
          </span>
          <span className="text-[#0B6E69] font-bold">Kualitas instrumen</span>
        </nav>

        {/* H1 Heading (34px, extra-bold) with focus management */}
        <h1
          ref={h1Ref}
          tabIndex={-1}
          className="text-[34px] font-extrabold text-[#12202B] leading-tight mb-8 outline-none focus:ring-2 focus:ring-[#0B6E69] focus:ring-offset-2 rounded-md"
        >
          {data.title}
        </h1>

        {/* Main Content Area */}
        {data.sections.length === 0 && data.emptyPlaceholder ? (
          /* Empty Placeholder Muted Card */
          <div className="bg-[#F4F6F8] border border-[#DDE3E8] rounded-2xl p-6 sm:p-8 flex items-start sm:items-center gap-4 text-[#5B6B78] mb-12 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#E3F2F1] text-[#0B6E69] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">info</span>
            </div>
            <p className="text-[16px] md:text-[17px] text-[#12202B] font-medium leading-[1.7]">
              {data.emptyPlaceholder.message}
            </p>
          </div>
        ) : (
          /* Sections List */
          <div className="space-y-10">
            {data.sections.map((section) => (
              <section key={section.id} className="space-y-4">
                {/* H2 heading with letter label (e.g. "A. Pengertian Validitas") */}
                <h2 className="text-[22px] md:text-[24px] font-bold text-[#12202B] tracking-tight">
                  {section.letterLabel}
                </h2>

                {/* Section Paragraphs */}
                <div className="space-y-4">
                  {section.paragraphs.map((para, index) => {
                    if (index === 0 && section.highlightFirstParagraph) {
                      /* Highlighted Card for 1st paragraph (light teal #E3F2F1, 16px radius, 24px padding) */
                      return (
                        <div
                          key={index}
                          className="bg-[#E3F2F1] border border-[#0B6E69]/15 rounded-[16px] p-6 shadow-xs"
                        >
                          <p className="text-[16px] md:text-[17px] text-[#12202B] leading-[1.7] font-medium">
                            {para}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <p
                        key={index}
                        className="text-[16px] md:text-[17px] text-[#12202B] leading-[1.7]"
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Benefits List (if present): Green card (#E6F4EA, text #1B5E34) */}
                {section.benefitsList && (
                  <div className="bg-[#E6F4EA] border border-[#1B5E34]/15 rounded-[16px] p-6 mt-6 shadow-xs">
                    <h3 className="text-[17px] font-bold text-[#1B5E34] mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">
                        verified
                      </span>
                      <span>{section.benefitsList.title}</span>
                    </h3>
                    <ul className="space-y-3">
                      {section.benefitsList.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-3 text-[16px] md:text-[17px] text-[#1B5E34] leading-[1.6]"
                        >
                          <span className="material-symbols-outlined text-[20px] text-[#1B5E34] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Bottom Navigation Cards ("Sebelumnya" / "Berikutnya") */}
        <div className="mt-14 pt-8 border-t border-[#DDE3E8]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sebelumnya Card */}
            {data.navigation.previous ? (
              <button
                type="button"
                onClick={() => onNavigateTab(data.navigation.previous!.tab)}
                className="group p-5 rounded-xl bg-white border border-[#DDE3E8] hover:border-[#0B6E69] hover:bg-[#E3F2F1]/30 transition-all text-left flex items-center gap-4 shadow-xs hover:shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:ring-offset-2"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F8] group-hover:bg-[#E3F2F1] text-[#0B6E69] flex items-center justify-center shrink-0 transition-colors">
                  <span className="material-symbols-outlined text-[22px] group-hover:-translate-x-0.5 transition-transform">
                    arrow_back
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-[#5B6B78] font-bold mb-0.5">
                    Sebelumnya
                  </span>
                  <span className="block text-base font-bold text-[#12202B] group-hover:text-[#0B6E69] transition-colors truncate">
                    {data.navigation.previous.title}
                  </span>
                </div>
              </button>
            ) : (
              <div />
            )}

            {/* Berikutnya Card */}
            {data.navigation.next ? (
              <button
                type="button"
                onClick={() => onNavigateTab(data.navigation.next!.tab)}
                className="group p-5 rounded-xl bg-white border border-[#DDE3E8] hover:border-[#0B6E69] hover:bg-[#E3F2F1]/30 transition-all text-right flex items-center justify-end gap-4 shadow-xs hover:shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:ring-offset-2 ml-auto w-full"
              >
                <div className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-[#5B6B78] font-bold mb-0.5">
                    Berikutnya
                  </span>
                  <span className="block text-base font-bold text-[#12202B] group-hover:text-[#0B6E69] transition-colors truncate">
                    {data.navigation.next.title}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F8] group-hover:bg-[#E3F2F1] text-[#0B6E69] flex items-center justify-center shrink-0 transition-colors">
                  <span className="material-symbols-outlined text-[22px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
