import { ArrowRight, Code2 } from 'lucide-react';
import { csharpLessons, csharpLevels, csharpTopics } from '../lessons/curriculum';
import { useCSharp } from '../../../stores/useCSharp';

export default function CSharpCourseCard() {
  const read = useCSharp(state => state.read);
  return <a className="course-card csharp-course" href="#/csharp">
    <div className="card-top"><span className="course-icon"><Code2 size={25}/></span><span className="pill green">ÖĞRENMEYE AÇIK</span></div>
    <h2>C# · Derinlemesine uzmanlık</h2><p>Dil, bellek ve runtime’dan mimariye.<br/>API, veri ve dağıtık sistemlerle üretime.</p>
    <div className="csharp-course-label">C# → runtime → mimari → üretim</div>
    <div className="course-meta"><span>{csharpLessons.length} ders · {csharpTopics.length} konu</span><span>{csharpLevels.length} seviye</span></div>
    <div className="progress-track"><div style={{ width: `${read.length / csharpTopics.length * 100}%` }}/></div>
    <div className="card-bottom"><span>{read.length}/{csharpTopics.length} konu okundu</span><ArrowRight size={19}/></div>
  </a>;
}
