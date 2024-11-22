import React, { useRef, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  reconnectEdge,
  useNodesData,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import '../styles/draganddrop.css';

import Sidebar from '../components/dnd/Sidebar';
import { DnDProvider, useDnD } from '../components/dnd/DnDContext';

import ResultNode from '../components/query/ResultNode';

const initialNodes = [

  { id: '1', type: 'input', data: {label: "Meansurements", name: "meansurement", param: 'param1', flow:{ Meansurements : 'param1'}}, position: { x: 250, y: 5 }, },
  { id: 'result', type: 'result', data: {label: "result_lable", name: "result_name", param: 'result_param', flow:{result : "_"}}, position: { x: 300, y: -75 }, },
]; //can only use "data" to store info

const nodeTypes = {  result: ResultNode,}

//const nodeData = useNodesData(); 

let id = 0;
const getId = () => `dndnode_${id++}`;
 
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const edgeReconnectSuccessful = useRef(true);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [data_dict] = useDnD();
  const [type, label, name, param, flow] = [data_dict.type, data_dict.label, data_dict.name, data_dict.param, data_dict.flow]


  const onConnect = useCallback(
    (params) =>{
      const node_data = nodes.find((node) => node.id === params.source);

      setEdges((els) => addEdge(params, els));
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === params.target) {
            // it's important that you create a new node object
            // in order to notify react flow about the change
            return { ...node, data: { ...node.data, flow: {...node_data.data.flow, [node.data.label]: node.data.param},},};}
          return node;
        }),
      );
    },


    //(params) => setData(prevData =>  ({...params.target.data, [flow]: { ...params.target.data[flow], [params.source.data.label]: params.source.data.param, }})),
    [nodes, setEdges, setNodes],
  );
    
  const onReconnectStart = useCallback(() => {
  edgeReconnectSuccessful.current = false;
  }, []);
  
  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    const node_data = nodes.find((node) => node.id === newConnection.source);
    const nodeToRemove = nodes.find((node) => node.id === oldEdge.target);
    const nodeToRemoveLabel = nodeToRemove.data.label;
    const nodeToRemoveParams = nodeToRemove.data.param;


    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));

    const removeflow = (nodeToRemoveLabel, nodeToRemoveParams) => { 
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === oldEdge.target) {
            // it's important that you create a new node object
            // in order to notify react flow about the change
            return { ...node, data: { ...node.data, flow: {[nodeToRemoveLabel] : nodeToRemoveParams},},};}
          return node;
        }),
      );
    };


    removeflow(nodeToRemoveLabel, nodeToRemoveParams)
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === newConnection.target) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return { ...node, data: { ...node.data, flow: {...node_data.data.flow, [node.data.label]: node.data.param},},};}
        return node;
      }),
    );
  
  }, [nodes, setEdges, setNodes]);
  
  const onReconnectEnd = useCallback((_, edge) => {
    const node_data = nodes.find((node) => node.id === edge.source);
    const nodeToRemove = nodes.find((node) => node.id === edge.target);
    const nodeToRemoveLabel = nodeToRemove.data.label;
    const nodeToRemoveParams = nodeToRemove.data.param;
    
    const removeflow = (nodeToRemove, nodeToRemoveParams) => { 
      const { [nodeToRemoveLabel]: _, ...newData } = nodeToRemove.data.flow;
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === edge.target) {
            // it's important that you create a new node object
            // in order to notify react flow about the change
            return { ...node, data: { ...node.data, flow: {[nodeToRemoveLabel] : nodeToRemoveParams},},};}
            
          return node;
        }),
    );};

    if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        removeflow(nodeToRemove, nodeToRemoveParams)
    }
    
    edgeReconnectSuccessful.current = true;
  }, [nodes, setEdges, setNodes]);



  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!name) {
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
        data: data_dict,
        position,
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, data_dict],
  );
 
  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '50vw', height: '50vh' }}>
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

          nodeTypes={nodeTypes}

          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};
 
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);