import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  InstrumentQualityPage,
  INSTRUMENT_QUALITY_DATA,
  ToolkitTabId,
} from './InstrumentQualityPage';

export interface ToolkitLayoutProps {
  children: (onSelectTab: (tab: ToolkitTabId) => void) => React.ReactNode;
  initialTab?: ToolkitTabId;
}

interface SidebarItemDef {
  id: string;
  tabKey?: ToolkitTabId;
  label: string;
  isFunctional: boolean;
}

interface SidebarGroupDef {
  title: string;
  items: SidebarItemDef[];
}

const SIDEBAR_GROUPS: SidebarGroupDef[] = [
  {
    title: 'PERANCANGAN & UJI INSTRUMEN',
    items: [
      {
        id: 'kalkulator-sampel',
        tabKey: 'kalkulator-sampel',
        label: 'Kalkulator sampel',
        isFunctional: true,
      },
      {
        id: 'cek-validitas',
        tabKey: 'cek-validitas',
        label: 'Cek validitas',
        isFunctional: true,
      },
      {
        id: 'cek-reliabilitas',
        tabKey: 'cek-reliabilitas',
        label: 'Cek reliabilitas',
        isFunctional: true,
      },
    ],
  },
];

export const ToolkitLayout: React.FC<ToolkitLayoutProps> = ({
  children,
  initialTab = 'kalkulator-sampel',
}) => {
  const getTabFromHash = useCallback((): ToolkitTabId | null => {
    if (typeof window === 'undefined') return null;
    const cleanHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (cleanHash === 'cek-validitas') return 'cek-validitas';
    if (cleanHash === 'cek-reliabilitas') return 'cek-reliabilitas';
    if (cleanHash === 'kalkulator-sampel') return 'kalkulator-sampel';
    return null;
  }, []);

  const [activeTab, setActiveTab] = useState<ToolkitTabId>(() => {
    if (typeof window !== 'undefined') {
      const cleanHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (cleanHash === 'cek-validitas') return 'cek-validitas';
      if (cleanHash === 'cek-reliabilitas') return 'cek-reliabilitas';
      if (cleanHash === 'kalkulator-sampel') return 'kalkulator-sampel';
    }
    return initialTab;
  });
  const shouldReduceMotion = useReducedMotion();

  // Sync state from hash on mount and hash change
  useEffect(() => {
    const handleHashSync = () => {
      const tabFromHash = getTabFromHash();
      if (tabFromHash && tabFromHash !== activeTab) {
        setActiveTab(tabFromHash);
      }
    };

    // Check initial hash
    const initialFromHash = getTabFromHash();
    if (initialFromHash) {
      setActiveTab(initialFromHash);
    } else {
      // Set hash if none
      window.location.hash = `#/${activeTab}`;
    }

    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);

    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, [getTabFromHash, activeTab]);

  const handleSelectTab = (tab: ToolkitTabId) => {
    setActiveTab(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <div className="w-full bg-[#F4F6F8] text-[#12202B] min-h-screen flex flex-col font-sans">
      {/* Container below header */}
      <div className="pt-16 flex-1 flex flex-col min-[900px]:flex-row">
        {/* Mobile Horizontal Pill Bar (< 900px) */}
        <nav
          aria-label="Pilihan Alat Toolkit"
          className="min-[900px]:hidden w-full bg-white border-b border-[#DDE3E8] px-4 py-2.5 overflow-x-auto flex items-center gap-2 scrollbar-none sticky top-16 z-30 shadow-xs"
        >
          {SIDEBAR_GROUPS.flatMap((group) => group.items).map((item) => {
            const isActive = item.tabKey && activeTab === item.tabKey;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.isFunctional && item.tabKey) {
                    handleSelectTab(item.tabKey);
                  }
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:ring-offset-1 ${
                  isActive
                    ? 'bg-[#E3F2F1] text-[#0B6E69] font-bold border border-[#0B6E69]/30 shadow-xs'
                    : item.isFunctional
                    ? 'bg-[#F4F6F8] text-[#5B6B78] hover:text-[#12202B] hover:bg-[#E3F2F1]/50 border border-[#DDE3E8] cursor-pointer'
                    : 'bg-[#F4F6F8]/60 text-[#5B6B78]/70 border border-[#DDE3E8]/60 cursor-default'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Left Sidebar (>= 900px, 280px wide) */}
        <aside
          aria-label="Navigasi Menu Toolkit"
          className="w-[280px] shrink-0 bg-white border-r border-[#DDE3E8] py-6 px-4 hidden min-[900px]:block min-h-[calc(100vh-4rem)] sticky top-16 self-start"
        >
          {SIDEBAR_GROUPS.map((group) => (
            <div key={group.title} className="mb-7 last:mb-2">
              <div className="px-3 mb-2 text-xs font-bold text-[#5B6B78] uppercase tracking-wider">
                {group.title}
              </div>
              <nav className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = item.tabKey && activeTab === item.tabKey;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (item.isFunctional && item.tabKey) {
                          handleSelectTab(item.tabKey);
                        }
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full min-h-[44px] px-3.5 rounded-lg flex items-center text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0B6E69] focus:ring-offset-2 ${
                        isActive
                          ? 'bg-[#E3F2F1] text-[#0B6E69] font-bold shadow-xs'
                          : item.isFunctional
                          ? 'text-[#12202B] font-medium hover:bg-[#F4F6F8] hover:text-[#0B6E69] cursor-pointer'
                          : 'text-[#5B6B78]/70 font-medium cursor-default hover:bg-transparent'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        {/* Main Content Area (Swaps ONLY this area) */}
        <main className="flex-1 bg-[#F4F6F8] p-4 md:p-8 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'cek-validitas' && (
              <InstrumentQualityPage
                key="cek-validitas"
                data={INSTRUMENT_QUALITY_DATA['cek-validitas']}
                onNavigateTab={handleSelectTab}
              />
            )}

            {activeTab === 'cek-reliabilitas' && (
              <InstrumentQualityPage
                key="cek-reliabilitas"
                data={INSTRUMENT_QUALITY_DATA['cek-reliabilitas']}
                onNavigateTab={handleSelectTab}
              />
            )}

            {activeTab === 'kalkulator-sampel' && (
              <motion.div
                key="kalkulator-sampel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.001 : 0.18 }}
                className="w-full"
              >
                {children(handleSelectTab)}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
