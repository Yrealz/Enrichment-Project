export type ScreenType =
  | 'beranda'
  | 'hasil-survei'
  | 'hasil-non-survei'
  | 'langkah-berikutnya'
  | 'kalkulator-diketahui'
  | 'kalkulator-tidak-diketahui'
  | 'panduan-kuesioner'
  | 'login'
  | 'register';

export type TransitionType = 'push' | 'push_back' | 'none';

export interface Variable {
  id: string;
  name: string;
  isDirect: boolean | null; // true = Ya, false = Tidak, null = not answered
  directQuestions: string[]; // used when isDirect === true
  definition: string; // used when isDirect === false
  answerType: 'binary' | 'likert' | null; // used when isDirect === false
  binaryOptions: [string, string]; // used when isDirect === false && answerType === 'binary'
  likertEndLabels: [string, string]; // used when isDirect === false && answerType === 'likert'
  indirectQuestions: [string, string, string]; // used when isDirect === false
}

export interface GoalItem {
  id: string;
  text: string;
  variables: Variable[];
}

export interface NavigationContextType {
  currentScreen: ScreenType;
  transitionType: TransitionType;
  navigate: (to: ScreenType, transition?: TransitionType) => void;
  topic: string;
  setTopic: (topic: string) => void;
  objectives?: string[];
  setObjectives?: (objectives: string[]) => void;
  goals?: GoalItem[];
  setGoals?: (goals: GoalItem[]) => void;
  user: {
    isLoggedIn: boolean;
    name: string;
    email: string;
  } | null;
  setUser: (user: { isLoggedIn: boolean; name: string; email: string } | null) => void;
}
