import React, { useState, useCallback, useRef }  from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Background,
    MiniMap,
    Controls,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../styles/draganddrop.css';
import Sidebar from './sidebar';
import { DnDProvider, useDnD } from './dnd';


const initialNodes = [
    { id: '1', type: 'default', data: { label: 'Bucket', param: 'param' }, position: { x: 250, y: 5 }, },
    { id: '2', type: 'default', data: { label: 'Meansuerment', param: 'param' }, position: { x: 250, y: 10 }, },
    { id: '3', type: 'default', data: { label: 'Field', param: 'param' }, position: { x: 250, y: 15 }, },
    { id: '4', type: 'default', data: { label: 'Tage', param: 'param' }, position: { x: 250, y: 20 }, },
  ];

let id = 0;
const getId = () => `dndnode_${id++}`;
 
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const DragDropArea = () => {
    const reactFlowWrapper = useRef(null);
    const edgeReconnectSuccessful = useRef(true);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);  
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const [receiverData, setReceiverData] = useState(null);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);
     
      const onDrop = useCallback(
        (event) => {
          event.preventDefault();
     
          // check if the dropped element is valid
          if (!type) {
            return;
          }
     
          // project was renamed to screenToFlowPosition
          // and you don't need to subtract the reactFlowBounds.left/top anymore
          // details: https://reactflow.dev/whats-new/2023-11-10
          const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
          const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },
          };
     
          setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

    const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
    );
    
    const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
    }, []);
    
    const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    }, []);
    
    const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    
    edgeReconnectSuccessful.current = true;
    }, []);

  return (
    <div className="dndflow" style={{ width: '50vw', height: '50vh' }}>
        <div className="drag-drop-area" ref={reactFlowWrapper} style={{ width: '50vw', height: '50vh' }}>
            <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            snapToGrid
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            style={{ width: '100%', height: '500px' }}
        >
            <MiniMap />
            <Controls />
            <Background />
        </ReactFlow>
        <ReceiverComponent data={receiverData} />
        </div>
        <Sidebar />
    </div>
  );
};

// ReceiverComponent is now included within the same file
const ReceiverComponent = ({ data }) => {
  return (
    <div className="receiver-component">
      <h2>Received Data:</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data received yet.</p>
      )}
    </div>
  );
};


export default () => (
    <ReactFlowProvider>
      <DnDProvider>
        <DragDropArea />
      </DnDProvider>
    </ReactFlowProvider>
  );

