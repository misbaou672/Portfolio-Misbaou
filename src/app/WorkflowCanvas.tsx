import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';
import type { Connection, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Hub } from '@/components/hub/Hub';
import { Projects } from '@/components/projects/Projects';
import { Experience } from '@/components/experience/Experience';
import { About } from '@/components/about/About';
import { Contact } from '@/components/contact/Contact';
import styles from './WorkflowCanvas.module.css';

function NodeWrapper({ title, children, sourcePos, targetPos }: any) {
  return (
    <div className={styles.nodeWrapper}>
      {targetPos && <Handle type="target" position={targetPos} className={styles.handle} />}
      <header className={styles.nodeHeader}>
        <span>{title}</span>
        <span className={styles.status}>Status: OK</span>
      </header>
      <div className={styles.nodeContent}>{children}</div>
      {sourcePos && <Handle type="source" position={sourcePos} className={styles.handle} />}
    </div>
  );
}

const nodeTypes = {
  hubNode: () => (
    <NodeWrapper title="EXEC: Hub.Init()" sourcePos={Position.Right}>
      <Hub />
    </NodeWrapper>
  ),
  projectsNode: () => (
    <NodeWrapper title="LOAD: Projects.Data()" targetPos={Position.Top} sourcePos={Position.Bottom}>
      <Projects />
    </NodeWrapper>
  ),
  experienceNode: () => (
    <NodeWrapper title="FETCH: Experience()" targetPos={Position.Left} sourcePos={Position.Right}>
      <Experience />
    </NodeWrapper>
  ),
  aboutNode: () => (
    <NodeWrapper title="RENDER: About_Me()" targetPos={Position.Left} sourcePos={Position.Bottom}>
      <About />
    </NodeWrapper>
  ),
  contactNode: () => (
    <NodeWrapper title="AWAIT: Contact()" targetPos={Position.Top}>
      <Contact />
    </NodeWrapper>
  ),
};

const initialNodes = [
  { id: 'hub', type: 'hubNode', position: { x: 0, y: 0 }, data: { label: 'Hub' } },
  { id: 'experience', type: 'experienceNode', position: { x: 1500, y: 0 }, data: { label: 'Experience' } },
  { id: 'projects', type: 'projectsNode', position: { x: 1500, y: 1000 }, data: { label: 'Projects' } },
  { id: 'about', type: 'aboutNode', position: { x: 3000, y: 0 }, data: { label: 'About' } },
  { id: 'contact', type: 'contactNode', position: { x: 3000, y: 1000 }, data: { label: 'Contact' } },
];

const initialEdges: Edge[] = [
  { id: 'e-hub-experience', source: 'hub', target: 'experience', animated: true, style: { stroke: '#a855f7', strokeWidth: 3 } },
  { id: 'e-experience-projects', source: 'experience', target: 'projects', animated: true, style: { stroke: '#a855f7', strokeWidth: 3 } },
  { id: 'e-experience-about', source: 'experience', target: 'about', animated: true, style: { stroke: '#ec4899', strokeWidth: 3 } },
  { id: 'e-about-contact', source: 'about', target: 'contact', animated: true, style: { stroke: '#ec4899', strokeWidth: 3 } },
];

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg)' }}>
      {/* Notre fond combo ultime peut être en dessous du ReactFlow */}
      <div className={styles.ultimateBg} aria-hidden="true">
        <div className={styles.noise}></div>
        <div className={styles.halos}></div>
        <div className={styles.typography}>SYSTEM.CORE // MD_</div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
      >
        <Background gap={40} size={1} color="rgba(0,0,0,0.1)" />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
}
