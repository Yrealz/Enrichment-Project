import React, { useState } from 'react';
import { Lock, LogOut, Menu, X } from 'lucide-react';
import { ScreenType, TransitionType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  user: { isLoggedIn: boolean; name: string; email: string } | null;
  onLogout?: () => void;
  minimal?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  navigate,
  user,
  onLogout,
  minimal = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (minimal) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#DDE3E8]/70 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
        <div className="h-16 max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <a
            href="#"
            data-path="beranda"
            onClick={(e) => {
              e.preventDefault();
              navigate('beranda', 'push_back');
            }}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] rounded-lg group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0B6E69] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-white text-[18px]">check</span>
            </div>
            <span className="font-headline-sm text-lg text-[#0F1D28] font-extrabold tracking-tight">
              SurveiKit
            </span>
          </a>

          <nav className="flex items-center">
            <a
              href="#"
              data-path="beranda"
              onClick={(e) => {
                e.preventDefault();
                navigate('beranda', 'push_back');
              }}
              className="font-label-md text-sm text-[#536161] hover:text-[#005450] transition-colors min-h-[44px] inline-flex items-center py-2 px-3 rounded-lg hover:bg-[#ECF4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
            >
              Beranda
            </a>
          </nav>
        </div>
      </header>
    );
  }

  const handleNavClick = (to: ScreenType, transition: TransitionType) => {
    setMobileMenuOpen(false);
    navigate(to, transition);
  };

  // Full Header
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#DDE3E8]">
      <div className="h-[72px] max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavClick('beranda', currentScreen === 'beranda' ? 'none' : 'push_back')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#0B6E69] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-white text-[18px]">check</span>
          </div>
          <span className="font-headline-md text-xl font-extrabold tracking-tight text-[#0F1D28]">
            SurveiKit
          </span>
        </div>

        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-5 lg:gap-6">
          <a
            href="#"
            data-path={
              currentScreen === 'kalkulator-diketahui' || currentScreen === 'kalkulator-tidak-diketahui'
                ? 'tentang-survey'
                : 'tentang-survei'
            }
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('beranda', 'push_back');
            }}
            className={`font-label-md text-sm transition-colors cursor-pointer min-h-[44px] inline-flex items-center px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] ${
              currentScreen === 'beranda'
                ? 'text-[#0B6E69] font-bold'
                : 'text-[#536161] hover:text-[#0B6E69]'
            }`}
          >
            {currentScreen === 'kalkulator-diketahui' || currentScreen === 'kalkulator-tidak-diketahui'
              ? 'Tentang survey'
              : 'Tentang survei'}
          </a>
          <a
            href="#"
            data-path="cara-kerja"
            onClick={(e) => {
              e.preventDefault();
              if (currentScreen !== 'beranda') {
                handleNavClick('beranda', 'push_back');
              } else {
                setMobileMenuOpen(false);
              }
              setTimeout(() => {
                const elem = document.getElementById('cara-kerja-anchor');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="font-label-md text-sm text-[#536161] hover:text-[#0B6E69] transition-colors cursor-pointer min-h-[44px] inline-flex items-center px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
          >
            Cara kerja
          </a>
          <a
            href="#"
            data-path="toolkit-survei"
            title={user?.isLoggedIn ? 'Buka Toolkit survei' : 'Masuk terlebih dahulu untuk mengakses Toolkit survei'}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('kalkulator-diketahui', 'push');
            }}
            className={`font-label-md text-sm transition-colors min-h-[44px] inline-flex items-center gap-1.5 px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] ${
              currentScreen === 'kalkulator-diketahui' || currentScreen === 'kalkulator-tidak-diketahui'
                ? 'text-[#0B6E69] font-bold'
                : 'text-[#536161] hover:text-[#0B6E69]'
            }`}
          >
            <span>Toolkit survei</span>
            {!user?.isLoggedIn && (
              <Lock className="w-3.5 h-3.5 text-[#5B6B78]" aria-hidden="true" />
            )}
          </a>
          <a
            href="#/panduan-kuesioner"
            data-path="panduan-kuesioner"
            aria-current={currentScreen === 'panduan-kuesioner' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('panduan-kuesioner', 'push');
            }}
            className={`font-label-md text-sm transition-colors min-h-[44px] inline-flex items-center px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] ${
              currentScreen === 'panduan-kuesioner'
                ? 'text-[#0B6E69] font-bold'
                : 'text-[#536161] hover:text-[#0B6E69]'
            }`}
          >
            Panduan kuesioner
          </a>
          <a
            href="#"
            data-path="panduan-metode"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hasil-survei', 'push');
            }}
            className={`font-label-md text-sm transition-colors min-h-[44px] inline-flex items-center px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] ${
              currentScreen === 'hasil-survei'
                ? 'text-[#0B6E69] font-bold'
                : 'text-[#536161] hover:text-[#0B6E69]'
            }`}
          >
            Panduan metode
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {user?.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-label-md text-xs text-[#005450] font-semibold bg-[#E3F2F1] px-3 py-1 rounded-full">
                {user.name.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={() => handleNavClick('kalkulator-diketahui', 'push')}
                className="w-10 h-10 rounded-full bg-[#005450] text-white flex items-center justify-center font-bold text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
                title={`Masuk sebagai ${user.name} — Buka Toolkit survei`}
                aria-label={`Profil ${user.name}, buka Toolkit survei`}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg border border-[#DDE3E8] text-xs font-semibold text-[#5B6B78] hover:text-[#12202B] hover:bg-[#F4F6F8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
                  title="Keluar dari akun"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Keluar</span>
                </button>
              )}
            </div>
          ) : (
            <>
              <a
                href="#"
                data-path="login"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('login', 'push');
                }}
                className="inline-flex items-center justify-center min-h-[44px] px-4 sm:px-5 py-2 rounded-lg bg-[#0B6E69] text-white font-label-md text-sm hover:bg-[#005450] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69] focus-visible:ring-offset-2"
              >
                Masuk
              </a>
              <div
                className="hidden sm:flex w-8 h-8 rounded-full bg-[#005450] items-center justify-center cursor-pointer"
                onClick={() => handleNavClick('login', 'push')}
              >
                <span className="material-symbols-outlined text-white text-[18px]">person</span>
              </div>
            </>
          )}

          {/* Mobile Menu Toggle Button (< md) */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-[#DDE3E8] text-[#12202B] hover:bg-[#F4F6F8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E69]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi Mobile"
          className="md:hidden bg-white border-t border-[#DDE3E8] px-4 py-3 flex flex-col gap-1 shadow-md"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('beranda', 'push_back');
            }}
            className={`min-h-[44px] px-3 rounded-lg flex items-center text-sm ${
              currentScreen === 'beranda'
                ? 'bg-[#E3F2F1] text-[#0B6E69] font-bold'
                : 'text-[#12202B] hover:bg-[#F4F6F8]'
            }`}
          >
            Tentang survei
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentScreen !== 'beranda') {
                handleNavClick('beranda', 'push_back');
              } else {
                setMobileMenuOpen(false);
              }
              setTimeout(() => {
                const elem = document.getElementById('cara-kerja-anchor');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="min-h-[44px] px-3 rounded-lg flex items-center text-sm text-[#12202B] hover:bg-[#F4F6F8]"
          >
            Cara kerja
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('kalkulator-diketahui', 'push');
            }}
            className={`min-h-[44px] px-3 rounded-lg flex items-center justify-between text-sm ${
              currentScreen === 'kalkulator-diketahui' || currentScreen === 'kalkulator-tidak-diketahui'
                ? 'bg-[#E3F2F1] text-[#0B6E69] font-bold'
                : 'text-[#12202B] hover:bg-[#F4F6F8]'
            }`}
          >
            <span>Toolkit survei</span>
            {!user?.isLoggedIn && (
              <span className="inline-flex items-center gap-1 text-xs text-[#5B6B78] font-medium">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Perlu login</span>
              </span>
            )}
          </a>
          <a
            href="#/panduan-kuesioner"
            aria-current={currentScreen === 'panduan-kuesioner' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('panduan-kuesioner', 'push');
            }}
            className={`min-h-[44px] px-3 rounded-lg flex items-center text-sm ${
              currentScreen === 'panduan-kuesioner'
                ? 'bg-[#E3F2F1] text-[#0B6E69] font-bold'
                : 'text-[#12202B] hover:bg-[#F4F6F8]'
            }`}
          >
            Panduan kuesioner
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hasil-survei', 'push');
            }}
            className={`min-h-[44px] px-3 rounded-lg flex items-center text-sm ${
              currentScreen === 'hasil-survei'
                ? 'bg-[#E3F2F1] text-[#0B6E69] font-bold'
                : 'text-[#12202B] hover:bg-[#F4F6F8]'
            }`}
          >
            Panduan metode
          </a>
          {user?.isLoggedIn && onLogout && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="mt-1 pt-2 border-t border-[#DDE3E8] min-h-[44px] px-3 rounded-lg flex items-center gap-2 text-sm font-semibold text-[#5B6B78] hover:text-[#12202B] hover:bg-[#F4F6F8] cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Keluar ({user.name.split(' ')[0]})</span>
            </button>
          )}
        </nav>
      )}
    </header>
  );
};
