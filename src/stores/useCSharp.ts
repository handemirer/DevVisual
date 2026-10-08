import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { csharpLessons, csharpTopics } from '../modules/csharp/lessons/curriculum';

interface CSharpProgress {
  lessonId: string; topicId: string; read: string[];
  select: (lessonId: string, topicId?: string) => void;
  markRead: (topicId: string) => void;
  reset: (scope: 'lesson' | 'level' | 'all') => void;
}
const first = csharpLessons[0];
const topicIds = new Set(csharpTopics.map(topic => topic.id));
export const useCSharp = create<CSharpProgress>()(persist((set, get) => ({
  lessonId: first.id, topicId: first.topics[0].id, read: [],
  select: (lessonId, topicId) => {
    const lesson = csharpLessons.find(item => item.id === lessonId);
    if (lesson) set({ lessonId, topicId: lesson.topics.find(item => item.id === topicId)?.id ?? lesson.topics[0].id });
  },
  markRead: topicId => {
    if (topicIds.has(topicId)) set({ read: [...new Set([...get().read, topicId])] });
  },
  reset: scope => {
    const current = csharpLessons.find(item => item.id === get().lessonId)!;
    const targets = csharpLessons.filter(item => scope === 'all' || (scope === 'lesson' ? item.id === current.id : item.level === current.level));
    const ids = new Set(targets.flatMap(item => item.topics.map(topic => topic.id)));
    set({ lessonId: targets[0].id, topicId: targets[0].topics[0].id, read: get().read.filter(id => !ids.has(id)) });
  },
}), {
  name: 'devvisual-csharp-v1', storage: createJSONStorage(() => localStorage),
  partialize: ({ lessonId, topicId, read }) => ({ lessonId, topicId, read }),
  merge: (saved, current) => {
    const value = saved as Partial<CSharpProgress> | undefined;
    const lesson = csharpLessons.find(item => item.id === value?.lessonId) ?? first;
    return { ...current, lessonId: lesson.id,
      topicId: lesson.topics.find(item => item.id === value?.topicId)?.id ?? lesson.topics[0].id,
      read: Array.isArray(value?.read) ? [...new Set(value.read.filter(id => topicIds.has(id)))] : [],
    };
  },
}));
