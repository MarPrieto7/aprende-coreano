// ============================================================
// Hook de Progreso — Guarda y carga el avance del usuario en localStorage
// ============================================================

import { useState, useCallback } from "react";

export interface LessonProgress {
  completed: boolean;
  score: number;        // 0-100
  attempts: number;
  lastAttempt: number;  // timestamp
}

export interface ModuleProgress {
  lessons: Record<string, LessonProgress>;
  completed: boolean;
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  totalXP: number;
  streak: number;
  lastStudyDay: string; // ISO date string YYYY-MM-DD
}

const STORAGE_KEY = "korean_learn_progress";

const defaultProgress = (): UserProgress => ({
  modules: {},
  totalXP: 0,
  streak: 0,
  lastStudyDay: "",
});

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return JSON.parse(raw) as UserProgress;
  } catch {
    return defaultProgress();
  }
}

function saveProgress(p: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // silently ignore storage errors
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  const updateLessonProgress = useCallback(
    (moduleId: string, lessonId: string, score: number) => {
      setProgress((prev) => {
        const next: UserProgress = {
          ...prev,
          modules: { ...prev.modules },
        };

        // Ensure module entry exists
        if (!next.modules[moduleId]) {
          next.modules[moduleId] = { lessons: {}, completed: false };
        }

        const mod = { ...next.modules[moduleId], lessons: { ...next.modules[moduleId].lessons } };

        const existing = mod.lessons[lessonId];
        const isFirstComplete = !existing?.completed && score >= 60;

        mod.lessons[lessonId] = {
          completed: score >= 60,
          score: Math.max(existing?.score ?? 0, score),
          attempts: (existing?.attempts ?? 0) + 1,
          lastAttempt: Date.now(),
        };

        // Check if all lessons in module are completed
        mod.completed = Object.values(mod.lessons).every((l) => l.completed);
        next.modules[moduleId] = mod;

        // Award XP for first completion
        if (isFirstComplete) {
          next.totalXP = (prev.totalXP ?? 0) + Math.round(score / 10) * 10;
        }

        // Update streak
        const today = new Date().toISOString().slice(0, 10);
        if (prev.lastStudyDay !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          next.streak = prev.lastStudyDay === yesterday ? (prev.streak ?? 0) + 1 : 1;
          next.lastStudyDay = today;
        }

        saveProgress(next);
        return next;
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    const fresh = defaultProgress();
    saveProgress(fresh);
    setProgress(fresh);
  }, []);

  const getLessonProgress = useCallback(
    (moduleId: string, lessonId: string): LessonProgress | undefined => {
      return progress.modules[moduleId]?.lessons[lessonId];
    },
    [progress]
  );

  const getModuleProgress = useCallback(
    (moduleId: string): { completed: number; total: number; percentage: number } => {
      const mod = progress.modules[moduleId];
      if (!mod) return { completed: 0, total: 0, percentage: 0 };
      const lessons = Object.values(mod.lessons);
      const completed = lessons.filter((l) => l.completed).length;
      return {
        completed,
        total: lessons.length,
        percentage: lessons.length === 0 ? 0 : Math.round((completed / lessons.length) * 100),
      };
    },
    [progress]
  );

  const getOverallProgress = useCallback((): number => {
    const { modules } = progress;
    const mods = Object.values(modules);
    if (mods.length === 0) return 0;
    const totalLessons = mods.reduce((sum, m) => sum + Object.keys(m.lessons).length, 0);
    const completedLessons = mods.reduce(
      (sum, m) => sum + Object.values(m.lessons).filter((l) => l.completed).length,
      0
    );
    return totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  }, [progress]);

  return {
    progress,
    updateLessonProgress,
    resetProgress,
    getLessonProgress,
    getModuleProgress,
    getOverallProgress,
  };
}
