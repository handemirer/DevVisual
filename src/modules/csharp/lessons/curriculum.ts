import content from './curriculum.json';
import type { CSharpLesson, CSharpLevel } from './types';

export const csharpLevels: CSharpLevel[] = content.levels;
export const csharpLessons: CSharpLesson[] = content.lessons;
export const csharpTopics = csharpLessons.flatMap(lesson => lesson.topics);
export function normalizeSearch(text: string) {
  return text.toLocaleLowerCase('tr').replaceAll('ı', 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
