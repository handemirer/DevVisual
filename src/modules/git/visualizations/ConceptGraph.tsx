import { useState } from 'react';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import { useLab } from '../../../stores/useLab';
import { lessons } from '../lessons/lessons';
export function ConceptGraph() {
  const { lessonIndex, stepIndex } = useLab();
  const step = lessons[lessonIndex].steps[stepIndex];
  const [actionIndex, setActionIndex] = useState(0);
  const action = step.action[actionIndex];
  return <div className="graph concept-graph"><div className="graph-caption"><span className="live-dot"/> ADIM {stepIndex + 1} · KAVRAM ŞEMASI <span className="graph-count">Örnek senaryo · komut çalıştırılmaz</span></div><div className="concept-operation"><Code2 size={16}/><code>{action.command ?? (action.file ? `Dosya düzenleme: ${action.file.path}` : action.note)}</code><div className="concept-action-pager"><button className="icon-button" aria-label="Grafikte önceki işlem" disabled={actionIndex === 0} onClick={() => setActionIndex(actionIndex - 1)}><ArrowLeft size={13}/></button><span>{actionIndex + 1}/{step.action.length}</span><button className="icon-button" aria-label="Grafikte sonraki işlem" disabled={actionIndex === step.action.length - 1} onClick={() => setActionIndex(actionIndex + 1)}><ArrowRight size={13}/></button></div></div><div className="concept-canvas"><div className="concept-cards">{step.scene!.nodes.map((node, i) => <article className={`concept-card concept-card-${i}`} key={node.id}><span className="concept-node-number">{String(i + 1).padStart(2, '0')}</span><h3>{node.title}</h3><p>{node.detail}</p></article>)}</div><p className="concept-caption">{step.title} · Kartlar bu adımın ilişkilerini ve sonucunu özetler.</p></div></div>;
}
