
export interface Exercise {
  id: string;
  name: string;
  subtitle?: string;
  category: 'Neck' | 'Back' | 'Wrists/Eyes' | 'Breath' | 'Mindset';
  description: string;
  why: string;
  steps: string[];
  duration?: string;
  reps?: string;
  imagePrompt?: string;
  imagePlaceholder?: string;
  videoUrl?: string; // Placeholder for future video integration
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  totalTime: string;
  imagePrompt?: string;
  steps: {
    exerciseId: string;
    durationOverride?: string;
    note?: string;
  }[];
}

export interface DayProgress {
  mornFlow: boolean;
  neckBack: boolean;
  wristsEyes: boolean;
  lunchReset: boolean;
  focusSigh: boolean;
  shutDown: boolean;
  painLevel: number; // 0-10
  energyLevel: number; // 0-10
}

export interface UserProgress {
  [day: number]: DayProgress;
}
