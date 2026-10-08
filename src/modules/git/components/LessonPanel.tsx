import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, Code2, Lightbulb } from 'lucide-react';
import { useLab } from '../../../stores/useLab';
import { lessons } from '../lessons/lessons';
import { lessonTips } from '../lessons/tips';
import type { Lesson, LessonAction } from '../../../core/lesson-engine/types';
import type { GitState } from '../engine/git';

function Pager({ index, count, label, change }: { index: number; count: number; label: string; change: (index: number) => void }) {
  return <div className="detail-pager"><button className="icon-button" aria-label={`Önceki ${label}`} disabled={index === 0} onClick={() => change(index - 1)}><ArrowLeft size={15}/></button><span>{label} {index + 1} / {count}</span><button className="icon-button" aria-label={`Sonraki ${label}`} disabled={index === count - 1} onClick={() => change(index + 1)}><ArrowRight size={15}/></button></div>;
}
function ActionContent({ action }: { action: LessonAction }) {
  return action.command ? <><span className="detail-eyebrow">GIT KOMUTU</span><pre className="lesson-code"><code>{action.command}</code></pre></> : action.file ? <><span className="detail-eyebrow">EDİTÖRDE DOSYA DEĞİŞİKLİĞİ</span><strong className="action-file">{action.file.path}</strong><pre className="lesson-code"><code>{action.file.content}</code></pre></> : action.note ? <><span className="detail-eyebrow">İŞ AKIŞI ADIMI</span><p className="action-note">{action.note}</p></> : null;
}
function CommandHistory({ lesson, stepIndex }: { lesson: Lesson<GitState>; stepIndex: number }) {
  const [group, setGroup] = useState(stepIndex);
  const [actionIndex, setActionIndex] = useState(0);
  const actions = group === -1 ? lesson.preparation! : lesson.steps[group].action;
  function select(index: number) { setGroup(index); setActionIndex(0); }
  return <div className="lesson-detail command-history"><div className="command-stages" aria-label="Bu ana kadar uygulanan adımlar">{lesson.preparation && <button aria-pressed={group === -1} onClick={() => select(-1)}>Hazırlık</button>}{lesson.steps.slice(0, stepIndex + 1).map((step, index) => <button title={step.title} aria-label={`Adım ${index + 1} komutları`} aria-pressed={group === index} key={step.title} onClick={() => select(index)}>{index + 1}</button>)}</div><h4>{group === -1 ? 'Dersin başlangıcı nasıl hazırlandı?' : `${group + 1}. adım · ${lesson.steps[group].title}`}</h4><p className="detail-note">{group === -1 ? 'README.md başlangıçta mevcut. Aşağıdaki işlemler ilk görselden önce uygulandı.' : group === stepIndex ? 'Bu adımın işlemleri, sırayla.' : `Önceki adımın işlemleri. Grafikte ${stepIndex + 1}. adımın sonucu gösteriliyor.`}</p><div className="action-content" key={`${group}-${actionIndex}`}><ActionContent action={actions[actionIndex]}/></div><Pager index={actionIndex} count={actions.length} label="İşlem" change={setActionIndex}/></div>;
}
function Tips({ lessonId, stepIndex }: { lessonId: string; stepIndex: number }) {
  const [index, setIndex] = useState(0);
  const lesson = lessons.find(l => l.id === lessonId)!;
  const tips = lesson.steps[stepIndex].tips ?? lessonTips[lessonId][stepIndex], tip = tips[index];
  return <div className="lesson-detail tip-detail"><span className="detail-eyebrow"><Lightbulb size={14}/> GERÇEK PROJEDE İPUCU</span><h4>{tip.title}</h4><p className="tip-explanation">{tip.text}</p>{tip.code && <pre className="lesson-code"><code>{tip.code}</code></pre>}<a className="tip-source" href={tip.source} target="_blank" rel="noreferrer">Kaynak belgelerde oku ↗</a><Pager index={index} count={tips.length} label="İpucu" change={setIndex}/></div>;
}
export function LessonPanel() {
  const { lessonIndex, stepIndex, completed } = useLab();
  const [tab, setTab] = useState<'story' | 'commands' | 'tips'>('story');
  const lesson = lessons[lessonIndex], step = lesson.steps[stepIndex];
  const tabs = [{ id: 'story', text: 'Anlatım', icon: BookOpen }, { id: 'commands', text: 'Komutlar', icon: Code2 }, { id: 'tips', text: 'İpuçları', icon: Lightbulb }] as const;
  return <section className="lesson-panel" aria-label="Ders rehberi"><div className="panel-heading"><span><BookOpen size={15}/> Ders rehberi</span><span className="muted">{completed.includes(lesson.id) && <Check size={13}/>} {stepIndex + 1}/{lesson.steps.length}</span></div><div className="lesson-intro"><div className="lesson-kicker">DERS {String(lessonIndex + 1).padStart(2, '0')} · {lesson.difficulty}</div><h2>{lesson.title}</h2>{lesson.ecosystem && <span className="ecosystem-tag">Git ekosistemi</span>}<div className="step-dots">{lesson.steps.map((s, i) => <span title={s.title} className={`${i < stepIndex ? 'done' : ''} ${i === stepIndex ? 'active' : ''}`} key={s.title}/>)}</div></div><div className="lesson-tabs" role="tablist" aria-label="Ders içeriği">{tabs.map((t, index) => <button id={`lesson-tab-${t.id}`} key={t.id} role="tab" aria-selected={tab === t.id} aria-controls={`lesson-content-${t.id}`} tabIndex={tab === t.id ? 0 : -1} onClick={() => setTab(t.id)} onKeyDown={e => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return; e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (index + (e.key === 'ArrowRight' ? 1 : 2)) % 3; setTab(tabs[next].id); document.getElementById(`lesson-tab-${tabs[next].id}`)?.focus(); }}><t.icon size={14}/>{t.text}</button>)}</div><div className="lesson-tab-content" role="tabpanel" id={`lesson-content-${tab}`} aria-labelledby={`lesson-tab-${tab}`} key={`${lesson.id}-${stepIndex}-${tab}`}>{tab === 'story' ? <div className="lesson-detail story-detail"><div className="step-title"><span>{String(stepIndex + 1).padStart(2, '0')}</span><h3>{step.title}</h3></div><p className="explanation">{step.explanation}</p><div className="step-command-preview"><span>Bu adımda</span>{step.action.map((action, i) => <code key={i}>{action.command ?? (action.file ? `Dosya: ${action.file.path}` : 'İş akışı adımı')}</code>)}</div></div> : tab === 'commands' ? <CommandHistory lesson={lesson} stepIndex={stepIndex}/> : <Tips lessonId={lesson.id} stepIndex={stepIndex}/>}</div></section>;
}
