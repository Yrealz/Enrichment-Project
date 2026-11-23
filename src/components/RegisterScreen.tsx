import React, { useState } from 'react';
import { ScreenType, TransitionType } from '../types';

interface RegisterScreenProps {
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  setUser: (u: { isLoggedIn: boolean; name: string; email: string }) => void;
  onAuthSuccess?: (u: { isLoggedIn: boolean; name: string; email: string }) => void;
  authNotice?: string | null;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigate,
  setUser,
  onAuthSuccess,
  authNotice,
}) => {
  const [fullName, setFullName] = useState('Budi Pratama');
  const [email, setEmail] = useState('budi.pratama@kampus.ac.id');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [helpNotice, setHelpNotice] = useState<string | null>(null);

  const completeRegister = (userData: { isLoggedIn: boolean; name: string; email: string }) => {
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
    setHelpNotice(null);

    if (password !== confirmPassword) {
      setErrorMessage('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const cleanName = fullName.trim() || 'Budi Pratama';
      const cleanEmail = email.trim() || 'budi.pratama@kampus.ac.id';

      try {
        const raw = localStorage.getItem('surveikit_accounts');
        const accounts: Array<{ name: string; email: string; password: string }> = raw
          ? JSON.parse(raw)
          : [];
        const filtered = accounts.filter(
          (acc) => acc.email.toLowerCase() !== cleanEmail.toLowerCase()
        );
        filtered.push({ name: cleanName, email: cleanEmail, password });
        localStorage.setItem('surveikit_accounts', JSON.stringify(filtered));
      } catch {
        // Ignore storage errors
      }

      setIsSubmitting(false);
      completeRegister({
        isLoggedIn: true,
        name: cleanName,
        email: cleanEmail,
      });
    }, 280);
  };

  return (
    <div className="w-full bg-[#f6f9ff] text-[#0f1d28] min-h-screen flex flex-col justify-between">
      <main className="w-full pt-16 flex-1 flex flex-col justify-center items-center px-4 md:px-8 py-10">
        <div className="flex flex-col w-full items-center justify-center my-auto py-2 relative">
          <div className="relative w-full max-w-[440px] mx-auto">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#a0f1ea]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-[#dbeaf9]/60 rounded-full blur-2xl pointer-events-none"></div>

            {/* Main Registration Card */}
            <div className="relative w-full bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(15,29,40,0.06),0_1px_4px_rgba(15,29,40,0.03)] border border-[#DDE3E8] p-8">
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

              {/* Trust Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4e3e2]/60 text-[#005450] font-label-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[13px]">school</span>
                  Portal Peneliti &amp; Mahasiswa
                </span>
                <span className="font-code-sm text-xs text-[#536161] tracking-tight">v2.4.0</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-headline-md text-xl sm:text-2xl text-[#0f1d28] tracking-tight font-extrabold mt-1">
                Selamat datang di SurveiKit
              </h1>
              <p className="font-body-md text-xs sm:text-sm text-[#536161] mt-1 mb-6">
                Masuk atau buat akun untuk mengakses Toolkit survei.
              </p>

              {/* Segmented Control Tab Switcher */}
              <div aria-label="Opsi autentikasi" className="w-full bg-[#ecf4ff] p-1 rounded-xl flex items-center gap-1 select-none border border-[#DDE3E8]/50" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected="false"
                  id="tab-masuk"
                  onClick={() => navigate('login', 'none')}
                  className="flex-1 h-9 rounded-lg flex items-center justify-center font-label-md text-xs sm:text-sm text-[#536161] hover:text-[#0f1d28] transition-all duration-150 cursor-pointer font-medium"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected="true"
                  id="tab-daftar"
                  className="flex-1 h-9 rounded-lg bg-white text-[#005450] font-label-md text-xs sm:text-sm font-bold shadow-[0_1px_3px_rgba(15,29,40,0.08)] flex items-center justify-center transition-all duration-150 cursor-default"
                >
                  Daftar
                </button>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="mt-4 p-3 rounded-xl bg-[#FCEBE3] border border-[#8A3B12]/25 text-xs text-[#8A3B12] flex items-start gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form className="mt-6 flex flex-col gap-4" id="signup-form" onSubmit={handleSubmit}>
                {/* Field: Nama Lengkap */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-label-md text-xs sm:text-sm text-[#0f1d28] font-bold flex items-center justify-between" htmlFor="full-name">
                    <span>Nama lengkap</span>
                    <span className="font-code-sm text-xs text-[#536161]">Wajib</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#536161] material-symbols-outlined text-[18px] pointer-events-none">
                      person
                    </span>
                    <input
                      id="full-name"
                      name="fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Budi Pratama"
                      className="w-full h-11 pl-10 pr-3.5 bg-white text-[#0f1d28] font-body-md text-sm placeholder:text-[#6e7978] rounded-[10px] border border-[#DDE3E8] focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Field: Email */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-label-md text-xs sm:text-sm text-[#0f1d28] font-bold flex items-center justify-between" htmlFor="email">
                    <span>Email</span>
                    <span className="font-code-sm text-xs text-[#536161]">Institusi / Pribadi</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#536161] material-symbols-outlined text-[18px] pointer-events-none">
                      mail
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full h-11 pl-10 pr-3.5 bg-white text-[#0f1d28] font-body-md text-sm placeholder:text-[#6e7978] rounded-[10px] border border-[#DDE3E8] focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Field: Kata Sandi */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-label-md text-xs sm:text-sm text-[#0f1d28] font-bold flex items-center justify-between" htmlFor="password">
                    <span>Kata sandi</span>
                    <span className="font-code-sm text-xs text-[#536161]">≥ 8 karakter</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#536161] material-symbols-outlined text-[18px] pointer-events-none">
                      lock
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      minLength={8}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      className="w-full h-11 pl-10 pr-10 bg-white text-[#0f1d28] font-body-md text-sm placeholder:text-[#6e7978] rounded-[10px] border border-[#DDE3E8] focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15 outline-none transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      aria-label="Tampilkan kata sandi"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-[#536161] hover:text-[#0f1d28] focus:outline-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Field: Ulangi Kata Sandi */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-label-md text-xs sm:text-sm text-[#0f1d28] font-bold" htmlFor="confirm-password">
                    Ulangi kata sandi
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#536161] material-symbols-outlined text-[18px] pointer-events-none">
                      lock_reset
                    </span>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      minLength={8}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi"
                      className="w-full h-11 pl-10 pr-10 bg-white text-[#0f1d28] font-body-md text-sm placeholder:text-[#6e7978] rounded-[10px] border border-[#DDE3E8] focus:border-[#005450] focus:ring-2 focus:ring-[#005450]/15 outline-none transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      aria-label="Tampilkan ulangi kata sandi"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 text-[#536161] hover:text-[#0f1d28] focus:outline-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                <div className="flex items-center gap-2 px-1 pt-0.5">
                  <div className="h-1 flex-1 rounded-full bg-[#dbeaf9] overflow-hidden">
                    <div className="h-full bg-[#005450] w-3/4 transition-all duration-300"></div>
                  </div>
                  <span className="font-code-sm text-xs text-[#536161]">Kekuatan standar</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 mt-2 bg-[#0b6e69] hover:bg-[#005450] text-white font-headline-sm text-sm tracking-wide rounded-[10px] flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(11,110,105,0.25)] hover:shadow-[0_4px_12px_rgba(11,110,105,0.3)] active:scale-[0.99] transition-all cursor-pointer font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                      <span>Mendaftarkan...</span>
                    </>
                  ) : (
                    <>
                      <span>Buat akun</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Visual Divider */}
              <div className="relative my-5 flex items-center justify-center">
                <div className="w-full h-[1px] bg-[#DDE3E8]"></div>
                <span className="absolute px-3 bg-white font-body-sm text-xs text-[#536161]">
                  atau
                </span>
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={() => {
                  completeRegister({
                    isLoggedIn: true,
                    name: 'Peneliti Baru',
                    email: 'peneliti.baru@gmail.com',
                  });
                }}
                className="w-full h-11 bg-white hover:bg-[#ecf4ff] text-[#0f1d28] font-label-md text-xs sm:text-sm font-medium rounded-[10px] border border-[#DDE3E8] shadow-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] cursor-pointer"
              >
                <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4" />
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853" />
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.98 0 12s.45 3.83 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                </svg>
                <span>Lanjutkan dengan Google</span>
              </button>

              {/* Terms note */}
              <p className="font-body-sm text-xs text-[#536161] text-center mt-5 select-none opacity-80 leading-relaxed">
                [Teks persetujuan syarat dan ketentuan menyusul]
              </p>

              {/* Methodology Assistance Notice */}
              <div className="mt-5 bg-[#ecf4ff] border border-[#DDE3E8]/60 rounded-xl px-3.5 py-2.5 flex items-start gap-2.5 text-left">
                <span className="material-symbols-outlined text-[#005450] text-[18px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs text-[#0f1d28] font-bold">Data Riset Terlindungi</span>
                  <span className="font-body-sm text-xs text-[#536161] leading-tight">
                    Privasi sampling dan instrumen kuesioner Anda dienkripsi untuk kepatuhan etika riset.
                  </span>
                </div>
              </div>
            </div>

            {/* Supplementary Links */}
            <div className="mt-4 flex flex-col items-center gap-2 text-center">
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setHelpNotice(
                      'Layanan panduan metodologi riset SurveiKit siap mendampingi penyusunan skripsi & tesis.'
                    )
                  }
                  className="font-body-sm text-xs text-[#536161] hover:text-[#005450] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">help</span>
                  <span>Bantuan Metodologi</span>
                </button>
                <span className="text-[#bec9c7] text-[10px]">•</span>
                <button
                  type="button"
                  onClick={() => navigate('beranda', 'push_back')}
                  className="font-body-sm text-xs text-[#536161] hover:text-[#005450] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">home</span>
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
              {helpNotice && (
                <p className="text-xs text-[#005450] bg-[#E3F2F1] px-3 py-1.5 rounded-lg border border-[#0B6E69]/20">
                  {helpNotice}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
