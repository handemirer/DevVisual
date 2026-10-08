import { useEffect, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, GitBranch, Search, Trophy } from 'lucide-react';
import { useLab } from '../../../stores/useLab';
import { lessons } from '../lessons/lessons';
import { levels } from '../lessons/curriculum';
import { tr } from '../../../app/tr';
export function Sidebar({ close, finish }: { close: () => void; finish: () => void }) {
  const { completed, lessonIndex, select } = useLab();
  const [level, setLevel] = useState<string>(lessons[lessonIndex].difficulty);
  const [query, setQuery] = useState('');
  useEffect(() => { setLevel(lessons[lessonIndex].difficulty); }, [lessonIndex]);
  const progress = Math.round(completed.length / lessons.length * 100);
  const normalized = query.trim().toLocaleLowerCase('tr');
  const filtered = lessons.map((lesson, index) => ({ lesson, index })).filter(({ lesson }) => normalized
    ? [lesson.title, lesson.description, ...lesson.steps.flatMap(step => [step.title, ...step.action.map(a => a.command ?? a.note ?? a.file?.path ?? '')])].join(' ').toLocaleLowerCase('tr').includes(normalized)
    : lesson.difficulty === level);
  return <aside className="sidebar curriculum-sidebar"><a className="back-link" href="#/courses"><ArrowLeft size={14}/> Tüm öğrenme yolları</a><div className="course-heading"><div className="course-icon"><GitBranch size={24}/></div><h2>Git’i görerek öğren<small>{lessons.length} ders · {levels.length} seviye</small></h2></div><div className="sidebar-progress"><div><span>Yolculuğun</span><strong>%{progress}</strong></div><div className="progress-track"><div style={{ width: `${progress}%` }}/></div><small>{completed.length}/{lessons.length} ders tamamlandı</small>{completed.length === lessons.length && <button className="text-button sidebar-finish" onClick={finish}><Trophy size={14}/>Bitirme ekranını aç</button>}</div><label className="lesson-search"><Search size={14}/><input type="search" aria-label="Ders veya komut ara" placeholder="Ders veya komut ara…" value={query} onChange={e => setQuery(e.target.value)}/></label><label className="level-select">Seviye<select aria-label="Ders seviyesi" value={level} onChange={e => { setLevel(e.target.value); setQuery(''); }}>{levels.map((l, i) => <option value={l} key={l}>{i + 1}. {l} · {lessons.filter(lesson => lesson.difficulty === l).length} ders</option>)}</select></label><div className="lesson-list-heading">{normalized ? `${filtered.length} arama sonucu` : level}<span>{normalized ? 'Tüm seviyeler' : '12 ders'}</span></div><nav className="lesson-navigation curriculum-navigation" aria-label="Git dersleri">{filtered.map(({ lesson, index }) => <button key={lesson.id} className={`lesson-link ${lessonIndex === index ? 'selected' : ''}`} onClick={() => { if (lessonIndex !== index) select(index); close(); }}><span className={`lesson-number ${completed.includes(lesson.id) ? 'done' : ''}`}>{completed.includes(lesson.id) ? <Check size={13}/> : String(index + 1).padStart(2, '0')}</span><span>{lesson.title}<small>{normalized ? `${lesson.difficulty} · ` : ''}{lesson.steps.length} adım</small></span>{lessonIndex === index && <ChevronRight size={14}/>}</button>)}{!filtered.length && <p className="no-lessons">Eşleşen ders yok. Başka bir konu veya komut ara.</p>}</nav><div className="sidebar-bottom"><span className="live-dot"/> {tr.saved}</div></aside>;
}
