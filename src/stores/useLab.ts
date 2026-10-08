import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { lessons, snapshot } from '../modules/git/lessons/lessons';
import type { GitState } from '../modules/git/engine/git';
import type { Difficulty } from '../core/lesson-engine/types';
export type ResetScope = 'lesson' | 'level' | 'all';
interface SavedLab { lessonId?: string; lessonIndex?: number; stepIndex?: number; completed?: string[]; }
interface Lab {
  lessonIndex: number; stepIndex: number; state: GitState; completed: string[];
  select: (index: number) => void; move: (direction: number) => void;
  reset: () => void; resetProgress: (scope?: ResetScope, level?: Difficulty) => void;
}
function view(lessonIndex: number, stepIndex: number, completed: string[]) {
  const lesson = lessons[lessonIndex];
  return { lessonIndex, stepIndex, state: snapshot(lesson, stepIndex),
    completed: stepIndex === lesson.steps.length - 1 ? [...new Set([...completed, lesson.id])] : completed };
}
const start = () => view(0, 0, []);
export const useLab = create<Lab>()(persist((set, get) => ({
  ...start(),
  select: index => { if (lessons[index]) set(view(index, 0, get().completed)); },
  move: direction => {
    const l = get();
    const next = Math.max(0, Math.min(lessons[l.lessonIndex].steps.length - 1, l.stepIndex + direction));
    set(view(l.lessonIndex, next, l.completed));
  },
  reset: () => { const l = get(); set(view(l.lessonIndex, 0, l.completed)); },
  resetProgress: (scope = 'all', level) => {
    if (scope === 'all') { set(start()); return; }
    const current = get(), lesson = lessons[current.lessonIndex];
    const selectedLevel = level ?? lesson.difficulty;
    const targets = lessons.filter(l => scope === 'lesson' ? l.id === lesson.id : l.difficulty === selectedLevel);
    const targetIds = new Set(targets.map(l => l.id));
    const index = scope === 'lesson' ? current.lessonIndex : lessons.findIndex(l => targetIds.has(l.id));
    if (index >= 0) set(view(index, 0, current.completed.filter(id => !targetIds.has(id))));
  },
}), {
  name: 'devvisual-lab-v1', version: 3, storage: createJSONStorage(() => localStorage),
  partialize: ({ lessonIndex, stepIndex, completed }) => ({ lessonId: lessons[lessonIndex].id, lessonIndex, stepIndex, completed }),
  migrate: (persisted, version) => {
    const saved = persisted as SavedLab;
    const legacyIds = ['git-nedir', 'ilk-commit', 'branchler', 'commitler', 'merge'];
    return version < 3 ? { ...saved, lessonId: legacyIds[saved.lessonIndex ?? 0] ?? 'git-nedir' } : saved;
  },
  merge: (persisted, current) => {
    const saved = persisted as SavedLab | undefined;
    const byId = lessons.findIndex(lesson => lesson.id === saved?.lessonId);
    const lessonIndex = byId >= 0 ? byId : Number.isInteger(saved?.lessonIndex) && lessons[saved!.lessonIndex!] ? saved!.lessonIndex! : 0;
    const stepIndex = Number.isInteger(saved?.stepIndex) ? Math.max(0, Math.min(lessons[lessonIndex].steps.length - 1, saved!.stepIndex!)) : 0;
    const completed = Array.isArray(saved?.completed) ? [...new Set(saved.completed.filter(id => lessons.some(l => l.id === id)))] : [];
    return { ...current, ...view(lessonIndex, stepIndex, completed) };
  },
}));
