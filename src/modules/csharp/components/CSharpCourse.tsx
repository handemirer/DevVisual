import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, Code2, Lightbulb, Menu, RotateCcw, Search, Target, Trophy, X } from 'lucide-react';
import { csharpLessons, csharpLevels, csharpTopics, normalizeSearch } from '../lessons/curriculum';
import { useCSharp } from '../../../stores/useCSharp';
import './csharp.css';

const tabs = [
  { id: 'story', title: 'Anlatım', icon: BookOpen },
  { id: 'code', title: 'Kod örneği', icon: Code2 },
  { id: 'tips', title: 'Önemli ipuçları', icon: Lightbulb },
  { id: 'practice', title: 'Uygulama', icon: Target },
] as const;
type Tab = typeof tabs[number]['id'];

export default function CSharpCourse() {
  const progress = useCSharp();
  const lesson = csharpLessons.find(item => item.id === progress.lessonId)!;
  const level = csharpLevels.find(item => item.number === lesson.level)!;
  const topicIndex = lesson.topics.findIndex(item => item.id === progress.topicId);
  const topic = lesson.topics[topicIndex];
  const lessonIndex = csharpLessons.indexOf(lesson);
  const [filter, setFilter] = useState(lesson.level);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('story');
  const [menu, setMenu] = useState(false);
  const [resetScope, setResetScope] = useState<'lesson' | 'level' | 'all' | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const contentRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const read = new Set(progress.read);
  const completed = csharpLessons.filter(item => item.topics.every(t => read.has(t.id)));
  const allComplete = completed.length === csharpLessons.length;
  const normalized = normalizeSearch(query.trim());
  const filtered = csharpLessons.filter(item => normalized
    ? normalizeSearch([item.title, ...item.topics.flatMap(t => [t.title, t.explanation]), item.scenario, ...item.tips, item.code].join(' ')).includes(normalized)
    : item.level === filter);
  useEffect(() => { setFilter(lesson.level); }, [lesson.level]);
  useEffect(() => { contentRef.current?.scrollTo(0, 0); }, [topic.id, tab, showCompletion]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (resetScope && dialog && !dialog.open) dialog.showModal();
    if (!resetScope && dialog?.open) dialog.close();
  }, [resetScope]);

  function select(lessonId: string, topicId?: string) {
    progress.select(lessonId, topicId); setMenu(false); setShowCompletion(false);
    headingRef.current?.focus();
  }
  function next() {
    progress.markRead(topic.id);
    if (topicIndex < lesson.topics.length - 1) select(lesson.id, lesson.topics[topicIndex + 1].id);
    else if (lessonIndex < csharpLessons.length - 1) select(csharpLessons[lessonIndex + 1].id);
    else setShowCompletion(true);
  }
  const resetTargets = csharpLessons.filter(item => resetScope === 'all' || (resetScope === 'lesson' ? item.id === lesson.id : item.level === lesson.level));
  const resetReadCount = resetTargets.flatMap(item => item.topics).filter(item => read.has(item.id)).length;

  return <div className="csharp-shell">
    {menu && <button className="csharp-menu-backdrop" aria-label="Ders menüsünü kapat" onClick={() => setMenu(false)}/>}
    <aside className={`csharp-sidebar ${menu ? 'is-open' : ''}`} aria-label="C# ders menüsü">
      <a className="back-link" href="#/courses"><ArrowLeft size={14}/>Tüm öğrenme yolları</a>
      <button className="icon-button csharp-close-menu" aria-label="Ders menüsünü kapat" onClick={() => setMenu(false)}><X size={18}/></button>
      <div className="course-heading"><div className="course-icon"><Code2 size={24}/></div><h2>C#’ı derinlemesine öğren<small>{csharpLevels.length} seviye · {csharpLessons.length} ders · {csharpTopics.length} konu</small></h2></div>
      <div className="sidebar-progress"><div><span>Okuma ilerlemen</span><strong>%{Math.round(read.size / csharpTopics.length * 100)}</strong></div><div className="progress-track"><div style={{ width: `${read.size / csharpTopics.length * 100}%` }}/></div><small>{read.size}/{csharpTopics.length} konu · {completed.length}/{csharpLessons.length} ders</small><button className="text-button sidebar-finish" onClick={() => { setShowCompletion(true); setMenu(false); }}><Trophy size={14}/>Seviye ve uygulama özeti</button></div>
      <label className="lesson-search"><Search size={14}/><input type="search" aria-label="C# konusu veya kod ara" placeholder="GC, Span, async, Roslyn…" value={query} onChange={e => setQuery(e.target.value)}/></label>
      <label className="level-select">Seviye<select aria-label="C# seviyesi" value={filter} onChange={e => { setFilter(Number(e.target.value)); setQuery(''); }}>{csharpLevels.map(item => <option key={item.number} value={item.number}>{item.number}. {item.title}</option>)}</select></label>
      <div className="lesson-list-heading">{normalized ? 'Tüm seviyelerde arama' : `Seviye ${filter}`}<span>{filtered.length} ders</span></div>
      <nav className="csharp-navigation" aria-label="C# dersleri">{filtered.map(item => {
        const done = item.topics.every(t => read.has(t.id));
        const matched = normalized ? item.topics.find(t => normalizeSearch(`${t.title} ${t.explanation}`).includes(normalized)) : undefined;
        return <div key={item.id}><button className={`lesson-link ${item.id === lesson.id ? 'selected' : ''}`} aria-current={item.id === lesson.id ? 'page' : undefined} onClick={() => select(item.id, matched?.id)}><span className={`lesson-number ${done ? 'done' : ''}`}>{done ? <Check size={13}/> : csharpLessons.indexOf(item) + 1}</span><span>{item.title}<small>Seviye {item.level} · {item.topics.length} konu</small>{matched && <small className="csharp-match">{matched.title}</small>}</span><ChevronRight size={13}/></button>{item.id === lesson.id && <div className="csharp-topic-nav">{item.topics.map((t, i) => <button key={t.id} className={topic.id === t.id ? 'selected' : ''} aria-current={topic.id === t.id ? 'step' : undefined} onClick={() => select(item.id, t.id)}><span>{read.has(t.id) ? <Check size={12}/> : String(i + 1).padStart(2, '0')}</span>{t.title}</button>)}</div>}</div>;
      })}{!filtered.length && <p className="no-lessons">Eşleşen ders yok. Başka bir konu veya kod ara.</p>}</nav>
      <div className="sidebar-bottom"><span className="live-dot"/>İlerleme bu tarayıcıda saklanır</div>
    </aside>
    <div className="csharp-workspace">
      <div className="workspace-bar"><div className="breadcrumb"><button className="icon-button csharp-menu-button" aria-label="C# ders menüsünü aç" aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu size={18}/></button><Code2 size={16}/><span>C#</span><ChevronRight size={13}/><strong>{lesson.title}</strong></div><button className="text-button" onClick={() => setResetScope('lesson')}><RotateCcw size={14}/>İlerlemeyi sıfırla</button></div>
      <main className="csharp-content" ref={contentRef}>
        {showCompletion ? <section className="csharp-overview">
          <Trophy className="csharp-trophy" size={34}/><span className="eyebrow">ÖĞRENME YOLU ÖZETİ</span><h1 tabIndex={-1} ref={headingRef}>{allComplete ? 'Tüm C# konularını okudun!' : 'Okumadan uygulamaya.'}</h1><p>{read.size}/{csharpTopics.length} konu okundu. Okuma ilerlemesi uygulamalı yeterlilik belgesi değildir; her seviyenin projesi ve kontrol ölçütleriyle öğrendiklerini doğrula.</p>
          <div className="csharp-level-grid">{csharpLevels.map(item => {
            const topics = csharpLessons.filter(l => l.level === item.number).flatMap(l => l.topics);
            const count = topics.filter(t => read.has(t.id)).length;
            return <article key={item.number}><span className="eyebrow">SEVİYE {item.number} · {count}/{topics.length} KONU</span><h2>{item.title}</h2><p>{item.goal}</p><div className="progress-track"><div style={{ width: `${count / topics.length * 100}%` }}/></div><h3>{item.project.title}</h3><p>{item.project.scenario}</p><ul>{item.project.tasks.map(task => <li key={task}>{task}</li>)}</ul><h4>Kontrol ölçütleri</h4><ul>{item.project.acceptance.map(task => <li key={task}>{task}</li>)}</ul><button className="button" onClick={() => { const target = csharpLessons.find(l => l.level === item.number && !l.topics.every(t => read.has(t.id))) ?? csharpLessons.find(l => l.level === item.number)!; select(target.id, target.topics.find(t => !read.has(t.id))?.id); }}>Seviyeye git<ArrowRight size={14}/></button></article>;
          })}</div><button className="button primary" onClick={() => setShowCompletion(false)}>Mevcut konuya dön</button>
        </section> : <>
          <div className="csharp-lesson-heading"><span className="eyebrow">SEVİYE {level.number} · {level.title.toLocaleUpperCase('tr')}</span><h1 tabIndex={-1} ref={headingRef}>{lesson.title}</h1><p>{level.goal}</p><div className="csharp-lesson-meta"><span>Ders {lessonIndex + 1}/{csharpLessons.length}</span><span>{lesson.topics.filter(t => read.has(t.id)).length}/{lesson.topics.length} konu okundu</span><span>Başlangıç → Uzmanlık</span></div></div>
          <section className="csharp-scenario"><span className="detail-eyebrow"><Target size={14}/>GERÇEK HAYAT SENARYOSU</span><p>{lesson.scenario}</p></section>
          <div className="csharp-model" aria-label="Seviyenin kavramsal akışı">{level.model.map((node, index) => <div key={node}><span>{index + 1}</span><strong>{node}</strong>{index < level.model.length - 1 && <ArrowRight size={16}/>}</div>)}</div>
          <div className="csharp-tabs" aria-label="Ders görünümü">{tabs.map(t => <button key={t.id} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}><t.icon size={15}/>{t.title}</button>)}</div>
          <article className="csharp-article" aria-label={tabs.find(t => t.id === tab)!.title}>
            {tab === 'story' && <><div className="csharp-topic-heading"><span className="lesson-number">{topicIndex + 1}</span><h2>{topic.title}</h2>{read.has(topic.id) && <Check aria-label="Okundu" size={18}/>}</div><p className="csharp-explanation">{topic.explanation}</p><div className="csharp-context"><h3>Bu dersin konuları</h3><p>Konuları sırayla okuyabilir veya doğrudan seçebilirsin. Kod örneği, ipuçları ve uygulama bu dersin konularını birlikte ele alır.</p><div>{lesson.topics.map(t => <button key={t.id} aria-pressed={topic.id === t.id} onClick={() => select(lesson.id, t.id)}>{read.has(t.id) && <Check size={12}/>} {t.title}</button>)}</div></div></>}
            {tab === 'code' && <><span className="detail-eyebrow">DERSİN KOD ÖRNEĞİ</span><h2>{lesson.title}</h2><p className="csharp-code-note">Örnekler inceleme içindir. Yerel çalıştırma için .NET SDK gerekir; paket ve unsafe gereksinimleri örnek içinde belirtilir. Dil sürümüne bağlı özellikler için kaynak belgelerine bak.</p><pre className="csharp-code"><code>{lesson.code}</code></pre><h3>Ne oluyor?</h3><p className="csharp-explanation">{lesson.walkthrough}</p></>}
            {tab === 'tips' && <><span className="detail-eyebrow"><Lightbulb size={15}/>DİKKAT EDİLMESİ GEREKENLER</span><h2>Gerçek projede önemli ipuçları</h2><ol className="csharp-tips">{lesson.tips.map(tip => <li key={tip}>{tip}</li>)}</ol></>}
            {tab === 'practice' && <><span className="detail-eyebrow">ÖĞRENDİKLERİNİ UYGULA</span><h2>Ders alıştırması</h2><p className="csharp-explanation">{lesson.exercise}</p><h3>Kontrol ölçütleri</h3><ul className="csharp-checklist">{lesson.acceptance.map(item => <li key={item}>{item}</li>)}</ul><section className="csharp-project"><span className="eyebrow">SEVİYE {level.number} PROJESİ</span><h3>{level.project.title}</h3><p>{level.project.scenario}</p><ul>{level.project.tasks.map(task => <li key={task}>{task}</li>)}</ul><h4>Proje kontrol ölçütleri</h4><ul>{level.project.acceptance.map(task => <li key={task}>{task}</li>)}</ul></section></>}
          </article>
          <footer className="csharp-sources"><h3>Kaynak belgeler</h3>{lesson.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</footer>
        </>}
      </main>
      {!showCompletion && <div className="csharp-controls"><button className="button" disabled={lessonIndex === 0 && topicIndex === 0} onClick={() => topicIndex > 0 ? select(lesson.id, lesson.topics[topicIndex - 1].id) : select(csharpLessons[lessonIndex - 1].id, csharpLessons[lessonIndex - 1].topics.at(-1)!.id)}><ArrowLeft size={14}/>Önceki</button><span className="csharp-position" aria-live="polite">Konu {topicIndex + 1}/{lesson.topics.length}</span><button className="button" disabled={read.has(topic.id)} onClick={() => progress.markRead(topic.id)}><Check size={14}/>{read.has(topic.id) ? 'Okundu' : 'Okundu işaretle'}</button><button className="button primary" onClick={next}>{topicIndex < lesson.topics.length - 1 ? 'Oku ve ilerle' : lessonIndex < csharpLessons.length - 1 ? 'Oku ve sonraki derse geç' : 'Oku ve özeti gör'}<ArrowRight size={14}/></button></div>}
    </div>
    <dialog ref={dialogRef} className="csharp-reset-dialog" aria-labelledby="csharp-reset-title" onCancel={() => setResetScope(null)} onClick={e => { if (e.target === e.currentTarget) setResetScope(null); }}><div><h2 id="csharp-reset-title">C# okuma ilerlemesini sıfırla</h2><p>{resetTargets.length} ders içindeki {resetReadCount} okundu işareti kaldırılacak.</p><fieldset><legend>Kapsam</legend>{([{ id: 'lesson', title: `Mevcut ders: ${lesson.title}` }, { id: 'level', title: `Mevcut seviye: ${level.number}` }, { id: 'all', title: 'Tüm C# öğrenme yolu' }] as const).map(scope => <label key={scope.id}><input type="radio" name="csharp-reset-scope" checked={resetScope === scope.id} onChange={() => setResetScope(scope.id)}/>{scope.title}</label>)}</fieldset><p>Git ilerlemesi ayrı saklanır. Sıfırlama sonrasında seçilen kapsamın ilk konusuna dönülür.</p><div className="reset-actions"><button className="button" onClick={() => setResetScope(null)}>Vazgeç</button><button className="button primary" onClick={() => { if (resetScope) progress.reset(resetScope); setResetScope(null); setShowCompletion(false); setQuery(''); }}>İlerlemeyi sıfırla</button></div></div></dialog>
  </div>;
}
