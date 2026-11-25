import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';

interface LoginScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  setUser: (u: { isLoggedIn: boolean; name: string; email: string }) => void;
  onAuthSuccess?: (u: { isLoggedIn: boolean; name: string; email: string }) => void;
  authNotice?: string | null;
}

interface StoredAccount {
  name: string;
  email: string;
  password: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  navigate,
  setUser,
  onAuthSuccess,
  authNotice,
}) => {
  const [email, setEmail] = useState('budi.santoso@ui.ac.id');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const completeLogin = (userData: { isLoggedIn: boolean; name: string; email: string }) => {
    if (onAuthSuccess) {
      onAuthSuccess(userData);
    } else {
      setUser(userData);
      navigate('kalkulator-diketahui', 'push');
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setResetMessage(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password.trim()) {
      setErrorMessage('Mohon isi email dan kata sandi terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const raw = localStorage.getItem('surveikit_accounts');
        const accounts: StoredAccount[] = raw ? JSON.parse(raw) : [];
        const matchedAccount = accounts.find(
          (acc) => acc.email.toLowerCase() === normalizedEmail
        );

        if (matchedAccount) {
          if (matchedAccount.password !== password) {
            setIsSubmitting(false);
            setErrorMessage('Kata sandi tidak sesuai untuk email yang terdaftar.');
            return;
          }
          setIsSubmitting(false);
          completeLogin({
            isLoggedIn: true,
            name: matchedAccount.name,
            email: matchedAccount.email,
          });
          return;
        }
      } catch {
        // Fallback to standard login flow if storage is unavailable
      }

      const derivedName =
        normalizedEmail === 'budi.santoso@ui.ac.id'
          ? 'Budi Santoso'
          : normalizedEmail
              .split('@')[0]
              .replace(/[._-]+/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Peneliti SurveiKit';

      setIsSubmitting(false);
      completeLogin({
        isLoggedIn: true,
        name: derivedName,
        email: email.trim() || 'budi.santoso@ui.ac.id',
      });
    }, 280);
  };

  return (
    <div className="w-full bg-[#f6f9ff] text-[#0f1d28] min-h-screen flex flex-col justify-between">
      <main className="w-full pt-16 flex-1 flex flex-col justify-center items-center px-4 md:px-8 py-10">
        <div className="flex flex-col w-full items-center justify-center my-auto py-2 relative">
          <div className="w-full max-w-[440px] bg-white border border-[#DDE3E8] rounded-[20px] shadow-sm p-8 transition-all duration-300 relative z-10">
            {/* Auth Required Notice */}
            {authNotice && (
              <div
                role="status"
                aria-live="polite"
                className="mb-5 p-3.5 rounded-xl bg-[#E3F2F1] border border-[#0B6E69]/25 flex items-start gap-2.5 text-left"
              >
                <span className="material-symbols-outlined text-[18px] text-[#0B6E69] shrink-0 mt-0.5">
                  lock
                </span>
                <div className="text-xs text-[#005450] leading-relaxed">
                  <span className="font-bold block mb-0.5">Akses Toolkit Terbatas</span>
                  <span>{authNotice}</span>
                </div>
              </div>
            )}

            {/* Header / Badge */}
            <div className="flex flex-col items-start mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4e3e2] text-[#005450] font-label-sm text-xs mb-3 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005450] animate-pulse"></span>
                Portal Mahasiswa &amp; Peneliti
              </div>
              <h1 className="font-headline-lg-mobile text-2xl text-[#0f1d28] tracking-tight font-extrabold text-left">
                Selamat datang di SurveiKit
              </h1>
              <p className="font-body-md text-xs sm:text-sm text-[#536161] mt-1 text-left">
                Masuk atau buat akun untuk mengakses Toolkit survei.
              </p>
            </div>

            {/* Segmented Control Tab Switcher */}
            <div aria-label="Mode Akun" className="w-full p-1 bg-[#ecf4ff] rounded-xl flex items-center justify-between border border-[#DDE3E8]/50" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected="true"
                id="tab-login"
                className="flex-1 py-2 text-center rounded-lg font-label-md text-xs sm:text-sm transition-all duration-200 bg-white text-[#005450] shadow-sm font-bold flex items-center justify-center gap-1.5 cursor-default"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Masuk
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                id="tab-register"
                onClick={() => navigate('register', 'none')}
                className="flex-1 py-2 text-center rounded-lg font-label-md text-xs sm:text-sm transition-all duration-200 text-[#536161] hover:text-[#0f1d28] flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                Daftar
              </button>
            </div>

            {/* Error or Reset Message */}
            {errorMessage && (
              <div
                role="alert"
                className="mt-4 p-3 rounded-xl bg-[#FCEBE3] border border-[#8A3B12]/25 text-xs text-[#8A3B12] flex items-start gap-2"
              >
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {resetMessage && (
              <div
                role="status"
                className="mt-4 p-3 rounded-xl bg-[#E3F2F1] border border-[#0B6E69]/25 text-xs text-[#005450] flex items-start gap-2"
              >
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">mark_email_read</span>
                <span>{resetMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form className="mt-6 flex flex-col gap-4" id="auth-form" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-xs sm:text-sm text-[#0f1d28] font-bold" htmlFor="email">
                    Email
                  </label>
                  <span className="font-code-sm text-xs text-[#536161]">Institusi / Pribadi</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="nama@email.com"
                    className="w-full h-11 px-3.5 bg-white text-[#0f1d28] rounded-[10px] font-body-md text-sm border border-[#DDE3E8] placeholder:text-[#6e7978] shadow-sm transition-all outline-none focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-xs sm:text-sm text-[#0f1d28] font-bold" htmlFor="password">
                  Kata sandi
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Masukkan kata sandi"
                    className="w-full h-11 pl-3.5 pr-10 bg-white text-[#0f1d28] rounded-[10px] font-body-md text-sm border border-[#DDE3E8] placeholder:text-[#6e7978] shadow-sm transition-all outline-none focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15"
                  />
                  <button
                    type="button"
                    aria-label="Lihat kata sandi"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#536161] hover:text-[#0f1d28] flex items-center justify-center p-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Row: Remember me + Forgot password */}
              <div className="flex justify-between items-center text-xs font-body-sm pt-0.5" id="row-remember">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#0f1d28]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0b6e69] focus:ring-[#0b6e69]/30 accent-[#0b6e69] cursor-pointer"
                  />
                  <span className="font-body-md text-xs sm:text-sm text-[#0f1d28]">Ingat saya</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setResetMessage(
                      `Instruksi pengaturan ulang kata sandi telah disiapkan untuk ${email || 'email institusimu'}.`
                    );
                  }}
                  className="text-[#005450] hover:text-[#0b6e69] font-label-md text-xs sm:text-sm transition-colors font-semibold cursor-pointer"
                >
                  Lupa kata sandi?
                </button>
              </div>

              {/* Submit Button */}
              <button
                id="submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 mt-2 bg-[#0b6e69] hover:bg-[#005450] text-white font-label-md text-sm font-bold rounded-[10px] shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Visual Methodology Note */}
            <div className="mt-4 p-3 bg-[#ecf4ff] rounded-xl flex items-center gap-2.5 border border-[#DDE3E8]/50">
              <div className="w-6 h-6 rounded-md bg-[#d4e3e2] flex items-center justify-center shrink-0 text-[#005450]">
                <span className="material-symbols-outlined text-[16px]">school</span>
              </div>
              <p className="font-body-sm text-xs text-[#536161] truncate">
                Tersambung ke kalkulator Slovin &amp; Lemeshow
              </p>
            </div>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full h-[1px] bg-[#DDE3E8]"></div>
              <span className="absolute px-3 bg-white font-body-sm text-xs text-[#536161] uppercase tracking-wider">
                atau
              </span>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={() => {
                completeLogin({
                  isLoggedIn: true,
                  name: 'Mahasiswa Peneliti',
                  email: 'peneliti@gmail.com',
                });
              }}
              className="w-full h-11 bg-white hover:bg-[#ecf4ff] text-[#0f1d28] font-label-md text-xs sm:text-sm font-medium rounded-[10px] border border-[#DDE3E8] shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4" />
                <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853" />
                <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>

            {/* Bottom Footer Note */}
            <span className="font-body-sm text-xs text-[#536161] mt-6 block text-center opacity-80">
              [Teks persetujuan syarat dan ketentuan menyusul]
            </span>
          </div>

          {/* Academic Coordinates */}
          <div className="hidden md:flex items-center gap-6 mt-6 opacity-70">
            <div className="flex items-center gap-1.5 font-code-sm text-xs text-[#536161]">
              <span className="material-symbols-outlined text-[14px] text-[#005450]">calculate</span>
              <span>Formula Validasi Akurasi 95%</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#536161]"></div>
            <div className="flex items-center gap-1.5 font-code-sm text-xs text-[#536161]">
              <span className="material-symbols-outlined text-[14px] text-[#005450]">verified_user</span>
              <span>Enkripsi Riset Terlindungi</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
