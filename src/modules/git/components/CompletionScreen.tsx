import { ArrowLeft, ArrowRight, Check, RotateCcw, Trophy } from 'lucide-react';
import { useLab } from '../../../stores/useLab';
import { lessons } from '../lessons/lessons';
import { levels } from '../lessons/curriculum';

export function CompletionScreen({ close, next, reset }: { close: () => void; next: (index: number) => void; reset: () => void }) {
  const { completed, lessonIndex } = useLab();
  const lesson = lessons[lessonIndex];
  const allDone = lessons.every(l => completed.includes(l.id));
  const nextIndex = lessons.findIndex((l, i) => i > lessonIndex && !completed.includes(l.id));
  const remainingIndex = nextIndex >= 0 ? nextIndex : lessons.findIndex(l => !completed.includes(l.id));
  return <section className="completion-screen" aria-labelledby="completion-title">
    <div className="completion-symbol"><Trophy size={30}/></div>
    <span className="eyebrow">{allDone ? 'GİT ÖĞRENME YOLU TAMAMLANDI' : 'BİR DERS DAHA TAMAMLANDI'}</span>
    <h1 id="completion-title" tabIndex={-1} ref={el => { el?.focus(); }}>{allDone ? 'Bu konudaki tüm dersleri tamamladınız!' : 'Dersi tamamladınız!'}</h1>
    <p className="completion-description">{allDone ? 'Git’in temellerinden ileri konulara uzanan yolculuğu bitirdiniz. İstediğiniz dersi tekrar okuyabilir veya ilerlemenizi sıfırlayıp yeniden başlayabilirsiniz.' : `${lesson.title} dersini bitirdiniz. Öğrenme yoluna devam edebilir veya bu dersin adımlarını tekrar inceleyebilirsiniz.`}</p>
    <div className="completion-progress"><strong>{completed.length} / {lessons.length}</strong><span>ders tamamlandı</span><div className="progress-track"><div style={{ width: `${completed.length / lessons.length * 100}%` }}/></div></div>
    {allDone ? <div className="completion-levels">{levels.map(level => <div key={level}><Check size={15}/><span>{level}</span><strong>{lessons.filter(l => l.difficulty === level).length} / {lessons.filter(l => l.difficulty === level).length}</strong></div>)}</div> : <ul className="completion-objectives">{lesson.objectives.map(objective => <li key={objective}><Check size={14}/>{objective}</li>)}</ul>}
    <div className="completion-actions"><button className="button" onClick={close}><ArrowLeft size={15}/>Derse dön</button>{!allDone && remainingIndex >= 0 && <button className="button primary" onClick={() => next(remainingIndex)}>Öğrenmeye devam et<ArrowRight size={15}/></button>}{allDone && <a className="button primary" href="#/courses">Öğrenme yolları<ArrowRight size={15}/></a>}</div>
    <button className="text-button completion-reset" onClick={reset}><RotateCcw size={14}/>İlerlemeyi sıfırla</button>
  </section>;
}
