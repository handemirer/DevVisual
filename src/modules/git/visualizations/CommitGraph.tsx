import { useEffect, useMemo, useRef, useState } from 'react';
import { ReactFlow, Background, Controls, Handle, Position, BackgroundVariant, useReactFlow, ReactFlowProvider, BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import type { NodeProps, Node, Edge, EdgeProps } from '@xyflow/react';
import { GitCommitHorizontal, GitBranch, X, Crosshair } from 'lucide-react';
import { useLab } from '../../../stores/useLab';
import { lessons } from '../lessons/lessons';
import type { Commit } from '../engine/git';
type CommitData = { commit: Commit; refs: string[]; current: boolean; head: string; [key: string]: unknown };
type CommitNodeType = Node<CommitData, 'commit'>;
function CommitNode({ data, selected }: NodeProps<CommitNodeType>) {
  return <div className={`commit-node ${data.current ? 'current' : ''} ${data.commit.branch !== 'main' ? 'alternate' : ''} ${selected ? 'selected' : ''}`}>
    <Handle type="target" position={Position.Left}/>
    <div className="commit-refs">{data.refs.map(ref => <span className={ref === data.head ? 'branch-ref active' : 'branch-ref'} key={ref}><GitBranch size={11}/>{ref}{ref === data.head && <b>HEAD</b>}</span>)}</div>
    <div className="commit-dot"><GitCommitHorizontal size={22}/><code>{data.commit.id.slice(0, 7)}</code></div>
    <div className="commit-message">{data.commit.message}</div><code className="node-command">{data.commit.commands?.at(-1)}</code>{!data.commit.parents.length && <span className="node-preparation">{data.commit.commands?.slice(0, -1).join(' → ')}</span>}
    <Handle type="source" position={Position.Right}/>
  </div>;
}
const nodeTypes = { commit: CommitNode };
function CommandEdge(props: EdgeProps) {
  const [path, x, y] = getSmoothStepPath(props);
  const commands = props.data?.commands as string[] | undefined;
  return <><BaseEdge id={props.id} path={path} style={props.style} markerEnd={props.markerEnd}/>{commands?.length && <EdgeLabelRenderer><div className="graph-edge-commands" style={{ transform: `translate(-50%, -50%) translate(${x}px,${y}px)` }}>{commands.map((command, index) => <code key={index}>{command}</code>)}</div></EdgeLabelRenderer>}</>;
}
const edgeTypes = { commands: CommandEdge };
function GraphInner() {
  const state = useLab(s => s.state);
  const lessonIndex = useLab(s => s.lessonIndex);
  const stepIndex = useLab(s => s.stepIndex);
  const [selected, setSelected] = useState<string | null>(null);
  const { fitView } = useReactFlow();
  useEffect(() => setSelected(null), [lessonIndex, stepIndex]);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let timer = 0;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = window.setTimeout(() => { void fitView({ padding: 0.15, maxZoom: 1.15, duration: 150 }); }, 100);
    });
    const canvas = container.current?.querySelector('.react-flow');
    if (canvas) observer.observe(canvas);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [fitView]);
  const { nodes, edges } = useMemo(() => {
    const lanes = ['main', ...new Set(state.commits.map(c => c.branch).filter(b => b !== 'main'))];
    const depths = new Map<string, number>();
    const nodes: CommitNodeType[] = state.commits.map(commit => {
      const depth = commit.parents.length ? Math.max(...commit.parents.map(p => depths.get(p) ?? 0)) + 1 : 0;
      depths.set(commit.id, depth);
      return { id: commit.id, type: 'commit', position: { x: depth * 410 + 40, y: Math.max(0, lanes.indexOf(commit.branch)) * 225 + 65 }, data: { commit, refs: Object.entries(state.branches).filter(([, id]) => id === commit.id).map(([name]) => name), current: state.branches[state.head] === commit.id, head: state.head } };
    });
    const edges: Edge[] = state.commits.flatMap(c => c.parents.map((parent, index) => ({ id: `${parent}-${c.id}`, source: parent, target: c.id, type: 'commands', data: { commands: index === 0 ? c.commands : undefined }, animated: c.parents.length > 1, style: { stroke: c.branch === 'main' ? '#ed976c' : '#9685e6', strokeWidth: 2 } })));
    return { nodes, edges };
  }, [state]);
  useEffect(() => { const timer = window.setTimeout(() => { void fitView({ padding: 0.15, maxZoom: 1.15, duration: 350 }); }, 100); return () => clearTimeout(timer); }, [nodes.length, fitView]);
  const commit = state.commits.find(c => c.id === selected);
  const actions = lessons[lessonIndex].steps[stepIndex].action;
  return <div ref={container} className="graph">
    <div className="graph-caption"><span className="live-dot"/> ADIMIN GÖRÜNÜMÜ <span className="graph-count">{state.commits.length} commit · {Object.keys(state.branches).length} branch</span></div>
    <div className="graph-current-action"><span>ADIM {stepIndex + 1}</span>{actions.map((action, i) => <code key={i}>{action.command ?? `Dosya: ${action.file!.path}`}</code>)}</div>
    <div className="graph-canvas"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} deleteKeyCode={null} ariaLabelConfig={{ 'controls.ariaLabel': 'Grafik kontrolleri', 'controls.zoomIn.ariaLabel': 'Yakınlaştır', 'controls.zoomOut.ariaLabel': 'Uzaklaştır', 'controls.fitView.ariaLabel': 'Grafiği sığdır', 'node.a11yDescription.default': 'Commit ayrıntılarını görmek için tıklayın.', 'node.a11yDescription.keyboardDisabled': 'Commit ayrıntılarını görmek için tıklayın.', 'edge.a11yDescription.default': 'Commit parent bağlantısı.' }} fitView minZoom={0.25} maxZoom={2} nodesDraggable={false} nodesConnectable={false} onNodeClick={(_, node) => setSelected(node.id)} onPaneClick={() => setSelected(null)} colorMode="dark" attributionPosition="top-right">
      <Background variant={BackgroundVariant.Dots} color="#34363c" gap={22} size={1}/>
    </ReactFlow><Controls showInteractive={false}/>
    {!nodes.length && <div className="graph-empty"><div className="empty-symbol"><GitCommitHorizontal size={36}/></div><h3>Her hikâye bir commit’le başlar.</h3><p>{state.initialized ? 'Depo hazır. İlk commit oluşana kadar dosyaların durumunu aşağıda takip edebilirsin.' : 'Proje dosyaları henüz bir Git deposuna bağlı değil.'}</p></div>}
    <div className="graph-legend"><span><i className="orange-dot"/> main</span><span><i className="purple-dot"/> diğer branch’ler</span><span className="legend-note">Sürükle · Yakınlaştır · Commit’e tıkla</span></div>
    <button className="fit-button icon-button" aria-label="Grafiği ortala" title="Grafiği ortala" onClick={() => { void fitView({ padding: 0.15, maxZoom: 1.15, duration: 350 }); }}><Crosshair size={17}/></button>
    {commit && <div className="commit-detail"><button className="icon-button" aria-label="Commit ayrıntısını kapat" onClick={() => setSelected(null)}><X size={14}/></button><code>{commit.id}</code><strong>{commit.message}</strong><p>Parent: {commit.parents.map(p => p.slice(0, 7)).join(', ') || 'Yok · ilk commit'}</p><div className="commit-detail-commands">{commit.commands?.map(command => <code key={command}>{command}</code>)}</div><p>Anlık görüntü: {Object.keys(commit.tree).join(', ') || 'Boş'}</p></div>}
    </div>
  </div>;
}
export function CommitGraph() { return <ReactFlowProvider><GraphInner/></ReactFlowProvider>; }
