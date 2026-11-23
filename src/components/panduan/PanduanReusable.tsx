import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Info,
  XCircle,
} from 'lucide-react';

export interface AccordionBullet {
  text: string;
  subBullets?: string[];
}

export interface AccordionSubSection {
  title: string;
  items: string[];
}

export interface AccordionStepItem {
  stepNumber: number;
  title: string;
  summary: string;
  bullets?: AccordionBullet[];
  paragraph?: string;
  exampleCard?: {
    variant: 'warning' | 'success' | 'teal';
    label: string;
    text: string;
    note?: string;
  };
  subSections?: AccordionSubSection[];
  numberedSubList?: {
    title: string;
    items: string[];
  };
}

interface AccordionStepperProps {
  items: AccordionStepItem[];
  idPrefix: string;
}

export const AccordionStepper: React.FC<AccordionStepperProps> = ({
  items,
  idPrefix,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const openAll = () => {
    setOpenIndices(items.map((_, idx) => idx));
  };

  const closeAll = () => {
    setOpenIndices([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={openAll}
          className="min-h-[44px] px-3 py-2 rounded-[10px] text-xs font-bold text-[#0B6E69] hover:bg-[#E3F2F1] transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
        >
          Buka semua
        </button>
        <span className="text-[#DDE3E8]" aria-hidden="true">
          |
        </span>
        <button
          type="button"
          onClick={closeAll}
          className="min-h-[44px] px-3 py-2 rounded-[10px] text-xs font-bold text-[#5B6B78] hover:text-[#12202B] hover:bg-[#E3F2F1]/60 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
        >
          Tutup semua
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const headerId = `${idPrefix}-header-${idx}`;
          const panelId = `${idPrefix}-panel-${idx}`;

          return (
            <div
              key={item.stepNumber}
              className={`bg-white rounded-[16px] border transition-colors motion-reduce:transition-none ${
                isOpen ? 'border-[#0B6E69]/40 shadow-xs' : 'border-[#DDE3E8]'
              }`}
            >
              <h3>
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleIndex(idx)}
                  className="w-full min-h-[44px] p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 rounded-[16px] cursor-pointer hover:bg-[#F4F6F8]/60 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-[#0B6E69] text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      {item.stepNumber}
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <span className="block text-[15px] sm:text-base font-bold text-[#12202B] leading-snug">
                        {item.title}
                      </span>
                      <span className="block text-xs sm:text-sm text-[#5B6B78] leading-snug">
                        {item.summary}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-5 h-5 text-[#5B6B78] shrink-0 mt-1 sm:mt-0 transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180 text-[#0B6E69]' : ''
                    }`}
                  />
                </button>
              </h3>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="px-4 sm:px-5 pb-5 pt-1 sm:pl-[66px] space-y-4 border-t border-[#DDE3E8]/50"
                >
                  {item.paragraph && (
                    <p className="text-[15px] text-[#12202B] leading-relaxed pt-2">
                      {item.paragraph}
                    </p>
                  )}

                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-2.5 pt-2 text-[15px] text-[#12202B] leading-relaxed list-disc pl-5 marker:text-[#0B6E69]">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="space-y-2">
                          <span>{bullet.text}</span>
                          {bullet.subBullets && bullet.subBullets.length > 0 && (
                            <ul className="space-y-1.5 list-[circle] pl-5 text-sm text-[#12202B] marker:text-[#5B6B78]">
                              {bullet.subBullets.map((sub, sIdx) => (
                                <li key={sIdx}>{sub}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.exampleCard && (
                    <ExampleCard
                      variant={item.exampleCard.variant}
                      label={item.exampleCard.label}
                      text={item.exampleCard.text}
                      note={item.exampleCard.note}
                    />
                  )}

                  {item.subSections && item.subSections.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {item.subSections.map((subSec, sIdx) => (
                        <div
                          key={sIdx}
                          className="rounded-[14px] bg-[#F4F6F8] border border-[#DDE3E8] p-4 space-y-2"
                        >
                          <h4 className="text-sm font-bold text-[#12202B]">
                            {subSec.title}
                          </h4>
                          <ul className="space-y-2 text-sm text-[#12202B] leading-relaxed list-disc pl-5 marker:text-[#0B6E69]">
                            {subSec.items.map((subItem, iIdx) => (
                              <li key={iIdx}>{subItem}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.numberedSubList && (
                    <div className="rounded-[14px] bg-[#E3F2F1]/50 border border-[#0B6E69]/20 p-4 space-y-2.5">
                      <h4 className="text-sm font-bold text-[#0B6E69]">
                        {item.numberedSubList.title}
                      </h4>
                      <ol className="space-y-2 text-sm text-[#12202B] leading-relaxed list-decimal pl-5 marker:font-bold marker:text-[#0B6E69]">
                        {item.numberedSubList.items.map((nItem, nIdx) => (
                          <li key={nIdx}>{nItem}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ExampleCardProps {
  variant: 'warning' | 'success' | 'teal';
  label: string;
  text: string;
  note?: string;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({
  variant,
  label,
  text,
  note,
}) => {
  const styles =
    variant === 'warning'
      ? {
          container: 'bg-[#FCEBE3] border-[#8A3B12]/20 text-[#8A3B12]',
          badge: 'text-[#8A3B12]',
          Icon: AlertTriangle,
        }
      : variant === 'success'
      ? {
          container: 'bg-[#E6F4EA] border-[#1B5E34]/20 text-[#1B5E34]',
          badge: 'text-[#1B5E34]',
          Icon: CheckCircle2,
        }
      : {
          container: 'bg-[#E3F2F1] border-[#0B6E69]/25 text-[#12202B]',
          badge: 'text-[#0B6E69]',
          Icon: Info,
        };

  const Icon = styles.Icon;

  return (
    <div
      className={`rounded-[14px] border p-4 space-y-1.5 ${styles.container}`}
    >
      <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${styles.badge}`}>
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <p className="text-sm sm:text-[15px] font-semibold leading-relaxed">
        {text}
      </p>
      {note && (
        <p className="text-xs sm:text-sm opacity-90 leading-relaxed pt-0.5">
          {note}
        </p>
      )}
    </div>
  );
};

export interface AvoidCardItem {
  title: string;
  definition: string;
  example: string;
  whyProblematic: string;
}

export const AvoidCard: React.FC<AvoidCardItem> = ({
  title,
  definition,
  example,
  whyProblematic,
}) => {
  return (
    <div className="bg-[#FCEBE3] text-[#8A3B12] rounded-[16px] border border-[#8A3B12]/20 p-5 flex flex-col gap-2.5">
      <div className="flex items-start gap-2">
        <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#8A3B12]" aria-hidden="true" />
        <h4 className="text-[15px] font-bold leading-snug">{title}</h4>
      </div>
      <p className="text-sm leading-relaxed">{definition}</p>
      <p className="text-sm leading-relaxed">
        <span className="font-semibold">Contoh: </span>
        <span className="italic">“{example}”</span>
      </p>
      <p className="text-xs sm:text-sm leading-relaxed pt-1 border-t border-[#8A3B12]/15">
        <span className="font-bold">Mengapa bermasalah: </span>
        <span>{whyProblematic}</span>
      </p>
    </div>
  );
};

export interface FlowStepperProps {
  title: string;
  steps: string[];
}

export const FlowStepper: React.FC<FlowStepperProps> = ({ title, steps }) => {
  return (
    <div className="bg-white rounded-[16px] border border-[#DDE3E8] p-5 sm:p-6 space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-[#5B6B78]">
        {title}
      </h3>
      <ol className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <React.Fragment key={idx}>
              <li
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[12px] text-xs sm:text-sm font-semibold border ${
                  isLast
                    ? 'bg-[#E3F2F1] border-[#0B6E69] text-[#0B6E69] font-bold'
                    : 'bg-[#F4F6F8] border-[#DDE3E8] text-[#12202B]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                    isLast
                      ? 'bg-[#0B6E69] text-white'
                      : 'bg-white border border-[#DDE3E8] text-[#5B6B78]'
                  }`}
                >
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
              {!isLast && (
                <li aria-hidden="true" className="text-[#5B6B78] flex items-center">
                  <ArrowRight className="w-4 h-4" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
};

export interface CfaTableSubRow {
  measure: string;
  criteria: string;
}

export interface CfaTableGroup {
  examination: string;
  purpose: string;
  rows: CfaTableSubRow[];
}

interface ResponsiveTableProps {
  groups: CfaTableGroup[];
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ groups }) => {
  return (
    <div className="w-full bg-white rounded-[16px] border border-[#DDE3E8] overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left min-w-[680px]">
          <thead>
            <tr className="bg-[#F4F6F8] border-b border-[#DDE3E8]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-[#F4F6F8] px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#12202B] border-r border-[#DDE3E8] w-[200px]"
              >
                Pemeriksaan
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#12202B] w-[190px]"
              >
                Ukuran
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#12202B] w-[240px]"
              >
                Kriteria baik
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#12202B]"
              >
                Tujuan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE3E8] text-sm text-[#12202B]">
            {groups.map((group, gIdx) =>
              group.rows.map((row, rIdx) => (
                <tr
                  key={`${gIdx}-${rIdx}`}
                  className="hover:bg-[#F4F6F8]/50 transition-colors motion-reduce:transition-none"
                >
                  {rIdx === 0 && (
                    <td
                      rowSpan={group.rows.length}
                      className="sticky left-0 z-10 bg-white px-4 py-3.5 font-bold text-[#12202B] align-top border-r border-[#DDE3E8]"
                    >
                      {group.examination}
                    </td>
                  )}
                  <td className="px-4 py-3.5 align-top font-medium text-[#12202B]">
                    {row.measure}
                  </td>
                  <td className="px-4 py-3.5 align-top font-mono text-[13px] text-[#0B6E69] font-medium">
                    {row.criteria}
                  </td>
                  {rIdx === 0 && (
                    <td
                      rowSpan={group.rows.length}
                      className="px-4 py-3.5 align-top text-[#5B6B78] leading-relaxed"
                    >
                      {group.purpose}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
