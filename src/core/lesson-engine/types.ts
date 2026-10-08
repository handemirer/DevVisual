export type Difficulty = 'Başlangıç' | 'Temel kullanım' | 'Orta' | 'İleri' | 'Uzmanlık';
export interface LessonAction { command?: string; file?: { path: string; content: string }; note?: string; }
export interface LessonTip { title: string; text: string; code?: string; source: string; }
export interface LessonScene { nodes: { id: string; title: string; detail: string }[]; }
export interface LessonStep<State> {
  title: string; explanation: string; observation: string; action: LessonAction[];
  scene?: LessonScene; tips?: LessonTip[]; validate: (state: State) => boolean;
}
export interface Lesson<State> {
  id: string; title: string; description: string; difficulty: Difficulty; duration: number;
  objectives: string[]; preparation?: LessonAction[]; initial: () => State;
  steps: LessonStep<State>[]; complete: (state: State) => boolean;
  source?: string; ecosystem?: boolean;
}
