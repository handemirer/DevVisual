import { useEffect, useRef, useState } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { useLab, type ResetScope } from '../../../stores/useLab';
import { lessons } from '../lessons/lessons';
import { levels } from '../lessons/curriculum';
import type { Difficulty } from '../../../core/lesson-engine/types';

export function ProgressResetDialog({ close, done }: { close: () => void; done: () => void }) {
  const { lessonIndex, completed, resetProgress } = useLab();
  const lesson = lessons[lessonIndex];
  const [scope, setScope] = useState<ResetScope>('lesson');
  const [level, setLevel] = useState<Difficulty>(lesson.difficulty);
  const dialog = useRef<HTMLElement>(null);
  useEffect(() => { const previous = document.activeElement as HTMLElement | null; dialog.current?.querySelector<HTMLButtonElement>('button')?.focus(); return () => previous?.focus(); }, []);
  const targets = lessons.filter(l => scope === 'all' || (scope === 'lesson' ? l.id === lesson.id : l.difficulty === level));
  const count = targets.filter(l => completed.includes(l.id)).length;
  return <div className="modal-backdrop" onClick={close}><section ref={dialog} className="help-dialog progress-reset-dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title" aria-describedby="reset-description" onClick={e => e.stopPropagation()} onKeyDown={e => {
    if (e.key === 'Escape') close();
    if (e.key !== 'Tab') return;
    const items = Array.from(dialog.current!.querySelectorAll<HTMLElement>('button, input:checked, select'));
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }}>
    <button className="icon-button" aria-label="Sıfırlama penceresini kapat" onClick={close}><X size={18}/></button>
    <div className="course-icon"><RotateCcw size={24}/></div><h2 id="reset-title">İlerlemeyi sıfırla</h2>
    <p id="reset-description">Yeniden başlamak istediğiniz alanı seçin. Seçtiğiniz derslerin tamamlandı işaretleri kaldırılır ve ilk adıma dönülür.</p>
    <fieldset className="reset-scopes"><legend>Sıfırlanacak alan</legend>{([{ value: 'lesson', title: 'Bu ders', detail: lesson.title }, { value: 'level', title: 'Bir seviye', detail: 'Seçtiğiniz seviyedeki dersler' }, { value: 'all', title: 'Tüm Git dersleri', detail: `${lessons.length} dersin tamamı` }] as const).map(option => <label key={option.value}><input type="radio" name="reset-scope" value={option.value} checked={scope === option.value} onChange={() => setScope(option.value)}/><span><strong>{option.title}</strong><small>{option.detail}</small></span></label>)}</fieldset>
    {scope === 'level' && <label className="reset-level">Seviye<select aria-label="Sıfırlanacak seviye" value={level} onChange={e => setLevel(e.target.value as Difficulty)}>{levels.map(l => <option key={l}>{l}</option>)}</select></label>}
    <p className="reset-summary" aria-live="polite">{targets.length} ders seçildi · {count} tamamlandı işareti kaldırılacak.{scope !== 'all' && ' Diğer derslerdeki ilerlemeniz korunur.'}</p>
    <div className="reset-actions"><button className="button" onClick={close}>Vazgeç</button><button className="button primary" onClick={() => { resetProgress(scope, level); done(); }}>Seçili ilerlemeyi sıfırla</button></div>
  </section></div>;
}
