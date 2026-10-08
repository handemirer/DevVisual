export interface CSharpTopic { id: string; title: string; explanation: string; }
export interface CSharpLesson {
  id: string; level: number; title: string; topics: CSharpTopic[];
  scenario: string; tips: string[]; code: string; walkthrough: string;
  exercise: string; acceptance: string[]; sources: { title: string; url: string }[];
}
export interface CSharpLevel {
  number: number; title: string; goal: string; model: string[];
  project: { title: string; scenario: string; tasks: string[]; acceptance: string[] };
}
