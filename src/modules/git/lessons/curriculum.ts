import content from './curriculum.json';
import type { Difficulty, Lesson } from '../../../core/lesson-engine/types';
import { emptyState } from '../engine/git';
import type { GitState } from '../engine/git';
export const levels: Difficulty[] = ['Başlangıç', 'Temel kullanım', 'Orta', 'İleri', 'Uzmanlık'];
export const curriculumLessons: { number: number; lesson: Lesson<GitState> }[] = content.map(entry => ({
  number: entry.number,
  lesson: {
    id: entry.id, title: entry.title, description: entry.steps[0].title,
    difficulty: levels[Math.floor((entry.number - 1) / 12)], duration: 6,
    objectives: entry.steps.map(step => step.title), source: entry.source, ecosystem: entry.ecosystem,
    initial: () => ({ ...emptyState(), working: {} }),
    steps: entry.steps.map(step => ({ ...step, validate: () => true })), complete: () => true,
  },
}));
