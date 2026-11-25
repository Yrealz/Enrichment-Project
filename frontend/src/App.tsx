/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GoalItem, ScreenType, TransitionType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BerandaScreen } from './components/BerandaScreen';
import { HasilSurveiScreen, createEmptyVariable } from './components/HasilSurveiScreen';
import { HasilNonSurveiScreen } from './components/HasilNonSurveiScreen';
import { LangkahBerikutnyaScreen } from './components/LangkahBerikutnyaScreen';
import { KalkulatorDiketahuiScreen } from './components/KalkulatorDiketahuiScreen';
import { KalkulatorTidakDiketahuiScreen } from './components/KalkulatorTidakDiketahuiScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { PanduanKuesionerScreen } from './components/PanduanKuesionerScreen';

interface AuthUser {
  isLoggedIn: boolean;
  name: string;
  email: string;
}

const AUTH_STORAGE_KEY = 'surveikit_user';
const TOOLKIT_SCREENS: ScreenType[] = ['kalkulator-diketahui', 'kalkulator-tidak-diketahui'];
const TOOLKIT_HASHES = ['cek-validitas', 'cek-reliabilitas', 'kalkulator-sampel'];
const TOOLKIT_AUTH_NOTICE =
  'Silakan masuk atau buat akun terlebih dahulu untuk mengakses fitur Toolkit survei.';

function readStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (parsed && parsed.isLoggedIn && typeof parsed.email === 'string') {
      return {
        isLoggedIn: true,
        name: typeof parsed.name === 'string' && parsed.name ? parsed.name : 'Peneliti',
        email: parsed.email,
      };
    }
  } catch {
    // Ignore storage read errors
  }
  return null;
}

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const initialHash =
    typeof window !== 'undefined' ? window.location.hash.replace(/^#\/?/, '').trim() : '';
  const initialHashIsToolkit = TOOLKIT_HASHES.includes(initialHash);

  const [pendingToolkitRedirect, setPendingToolkitRedirect] = useState<{
    screen: ScreenType;
    hash?: string;
  } | null>(() =>
    initialHashIsToolkit && !readStoredUser()
      ? { screen: 'kalkulator-diketahui', hash: `#/${initialHash}` }
      : null
  );

  const [authNotice, setAuthNotice] = useState<string | null>(() =>
    initialHashIsToolkit && !readStoredUser() ? TOOLKIT_AUTH_NOTICE : null
  );

  const getInitialScreen = (): ScreenType => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (TOOLKIT_HASHES.includes(hash)) {
        return readStoredUser()?.isLoggedIn ? 'kalkulator-diketahui' : 'login';
      }
      if (hash === 'panduan-kuesioner' || hash.startsWith('panduan-kuesioner/')) {
        return 'panduan-kuesioner';
      }
    }
    return 'beranda';
  };

  const [currentScreen, setCurrentScreen] = useState<ScreenType>(getInitialScreen);
  const [transitionType, setTransitionType] = useState<TransitionType>('none');
  const [topic, setTopic] = useState<string>(
    'Pengaruh penggunaan media sosial terhadap prestasi belajar mahasiswa di Jakarta'
  );
  const [objectives, setObjectives] = useState<string[]>([
    'Mengetahui apakah terdapat hubungan yang signifikan antara intensitas penggunaan media sosial dengan capaian indeks prestasi mahasiswa',
  ]);
  const [goals, setGoals] = useState<GoalItem[]>(() => [
    {
      id: 'goal-0',
      text: 'Mengetahui apakah terdapat hubungan yang signifikan antara intensitas penggunaan media sosial dengan capaian indeks prestasi mahasiswa',
      variables: [createEmptyVariable('0-0')],
    },
  ]);

  useEffect(() => {
    if (initialHashIsToolkit && !user?.isLoggedIn && typeof window !== 'undefined') {
      window.location.hash = '#/login';
    }
  }, []);

  useEffect(() => {
    const valid = objectives.map((o) => o.trim()).filter(Boolean);
    const effective =
      valid.length > 0
        ? valid
        : [
            'Mengetahui apakah terdapat hubungan yang signifikan antara intensitas penggunaan media sosial dengan capaian indeks prestasi mahasiswa',
          ];

    setGoals((prev) =>
      effective.map((text, idx) => {
        const existing = prev[idx];
        if (existing) {
          return { ...existing, text };
        }
        return {
          id: `goal-${idx}`,
          text,
          variables: [createEmptyVariable(`${idx}-0`)],
        };
      })
    );
  }, [objectives]);

  const requireToolkitAuth = (targetScreen: ScreenType, targetHash?: string) => {
    setPendingToolkitRedirect({ screen: targetScreen, hash: targetHash });
    setAuthNotice(TOOLKIT_AUTH_NOTICE);
    setTransitionType('push');
    setCurrentScreen('login');
    if (typeof window !== 'undefined') {
      window.location.hash = '#/login';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const navigate = (to: ScreenType, transition: TransitionType = 'none') => {
    if (TOOLKIT_SCREENS.includes(to) && !user?.isLoggedIn) {
      requireToolkitAuth(to);
      return;
    }

    if (to !== 'login' && to !== 'register') {
      setPendingToolkitRedirect(null);
      setAuthNotice(null);
    }

    setTransitionType(transition);
    setCurrentScreen(to);
    if (to === 'panduan-kuesioner') {
      const currentHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!currentHash.startsWith('panduan-kuesioner')) {
        window.location.hash = '#/panduan-kuesioner/proses';
      }
    } else if (to !== 'kalkulator-diketahui' && to !== 'kalkulator-tidak-diketahui') {
      const currentHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (
        currentHash.startsWith('panduan-kuesioner') ||
        TOOLKIT_HASHES.includes(currentHash) ||
        currentHash === 'login' ||
        currentHash === 'register'
      ) {
        window.location.hash = `#/${to}`;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenToolkitWithHash = (hash: string) => {
    if (!user?.isLoggedIn) {
      requireToolkitAuth('kalkulator-diketahui', hash);
      return;
    }
    window.location.hash = hash;
    navigate('kalkulator-diketahui', 'push');
  };

  const handleAuthSuccess = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
    } catch {
      // Ignore storage write errors
    }

    const destination = pendingToolkitRedirect ?? { screen: 'kalkulator-diketahui' as ScreenType };
    setPendingToolkitRedirect(null);
    setAuthNotice(null);
    setTransitionType('push');
    setCurrentScreen(destination.screen);
    if (typeof window !== 'undefined') {
      window.location.hash = destination.hash || '#/kalkulator-sampel';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPendingToolkitRedirect(null);
    setAuthNotice(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage remove errors
    }
    if (TOOLKIT_SCREENS.includes(currentScreen)) {
      setTransitionType('push_back');
      setCurrentScreen('beranda');
      if (typeof window !== 'undefined') {
        window.location.hash = '#/beranda';
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (TOOLKIT_HASHES.includes(hash)) {
        if (!user?.isLoggedIn) {
          requireToolkitAuth('kalkulator-diketahui', `#/${hash}`);
          return;
        }
        if (currentScreen !== 'kalkulator-diketahui' && currentScreen !== 'kalkulator-tidak-diketahui') {
          setCurrentScreen('kalkulator-diketahui');
        }
      } else if (hash === 'panduan-kuesioner' || hash.startsWith('panduan-kuesioner/')) {
        if (currentScreen !== 'panduan-kuesioner') {
          setCurrentScreen('panduan-kuesioner');
        }
      } else if (hash === 'login') {
        if (currentScreen !== 'login') {
          setCurrentScreen('login');
        }
      } else if (hash === 'register') {
        if (currentScreen !== 'register') {
          setCurrentScreen('register');
        }
      } else if (hash === 'beranda') {
        if (currentScreen !== 'beranda') {
          setCurrentScreen('beranda');
        }
      } else if (hash === '') {
        if (currentScreen === 'panduan-kuesioner' || currentScreen === 'login' || currentScreen === 'register') {
          setCurrentScreen('beranda');
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, [currentScreen, user]);

  const effectiveScreen: ScreenType =
    TOOLKIT_SCREENS.includes(currentScreen) && !user?.isLoggedIn ? 'login' : currentScreen;

  const isMinimalHeader = effectiveScreen === 'login' || effectiveScreen === 'register';

  const variants = {
    enter: (trans: TransitionType) => {
      if (trans === 'none') {
        return { opacity: 1, x: 0 };
      }
      return {
        opacity: 0,
        x: trans === 'push' ? 30 : -30,
      };
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: transitionType === 'none' ? 0.001 : 0.22,
        ease: 'easeOut' as const,
      },
    },
    exit: (trans: TransitionType) => {
      if (trans === 'none') {
        return { opacity: 0, transition: { duration: 0.001 } };
      }
      return {
        opacity: 0,
        x: trans === 'push' ? -30 : 30,
        transition: { duration: 0.16, ease: 'easeIn' as const },
      };
    },
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#0f1d28] flex flex-col font-sans selection:bg-[#0b6e69]/20 selection:text-[#005450]">
      {/* Universal or Minimal Header */}
      <Header
        currentScreen={effectiveScreen}
        navigate={navigate}
        user={user}
        onLogout={handleLogout}
        minimal={isMinimalHeader}
      />

      {/* Screen Container with Transitions */}
      <div className="flex-1 flex flex-col relative w-full overflow-x-hidden">
        <AnimatePresence mode="wait" custom={transitionType}>
          <motion.div
            key={effectiveScreen}
            custom={transitionType}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex-1 flex flex-col w-full"
          >
            {effectiveScreen === 'beranda' && (
              <BerandaScreen
                navigate={navigate}
                topic={topic}
                setTopic={setTopic}
                objectives={objectives}
                setObjectives={setObjectives}
                isLoggedIn={Boolean(user?.isLoggedIn)}
                onOpenToolkit={handleOpenToolkitWithHash}
              />
            )}

            {effectiveScreen === 'hasil-survei' && (
              <HasilSurveiScreen
                navigate={navigate}
                topic={topic}
                goals={goals}
                setGoals={setGoals}
                isLoggedIn={Boolean(user?.isLoggedIn)}
              />
            )}

            {effectiveScreen === 'langkah-berikutnya' && (
              <LangkahBerikutnyaScreen
                navigate={navigate}
                topic={topic}
                goals={goals}
              />
            )}

            {effectiveScreen === 'hasil-non-survei' && (
              <HasilNonSurveiScreen
                navigate={navigate}
                topic={topic}
                setTopic={setTopic}
                objectives={objectives}
              />
            )}

            {effectiveScreen === 'kalkulator-diketahui' && user?.isLoggedIn && (
              <KalkulatorDiketahuiScreen
                navigate={navigate}
                topic={topic}
              />
            )}

            {effectiveScreen === 'kalkulator-tidak-diketahui' && user?.isLoggedIn && (
              <KalkulatorTidakDiketahuiScreen
                navigate={navigate}
                topic={topic}
              />
            )}

            {effectiveScreen === 'panduan-kuesioner' && (
              <PanduanKuesionerScreen navigate={navigate} />
            )}

            {effectiveScreen === 'login' && (
              <LoginScreen
                navigate={navigate}
                setUser={setUser}
                onAuthSuccess={handleAuthSuccess}
                authNotice={authNotice}
              />
            )}

            {effectiveScreen === 'register' && (
              <RegisterScreen
                navigate={navigate}
                setUser={setUser}
                onAuthSuccess={handleAuthSuccess}
                authNotice={authNotice}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
