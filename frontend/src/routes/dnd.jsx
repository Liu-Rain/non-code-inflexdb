import React, { useRef, useCallback, useState } from 'react';
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

//import ResultNode from '../components/query/ResultNode';
import BucketNode from '../components/nodes/BucketNode';

import ContextMenu from '../components/nodes/Menu';



const initialNodes = [

  { id: '1', type: 'bucket', data: {label: "bucket", name: "bucket", param: 'param1', flow:{ Bucket : "NR7ym05CsCPS505X3tocNfx77EZNjBuxqs7VUfxh7aU3zTXcLy0Cso7y5cxXETBekcodQu_7uJ7iFvrN7eBMBA=="}}, position: { x: 250, y: 5 }, },
  //{ id: 'result', type: 'result', data: {label: "result_lable", name: "result_name", param: 'result_param', flow:{result : "_"}}, position: { x: 300, y: -75 }, },
]; //can only use "data" to store info

const nodeTypes = {  bucket: BucketNode};

//const nodeData = useNodesData(); 

let id = 0;
const getId = () => `dndnode_${id++}`;
 
const DnDFlow = () => {
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [data_dict] = useDnD();
  const [type, label, name, param, flow] = [data_dict.type, data_dict.label, data_dict.name, data_dict.param, data_dict.flow]
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);


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

  const onNodeClick = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
 
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      console.log(ref.current)
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);


  
 
  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" style={{ width: '50vw', height: '50vh' }}>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={onPaneClick}
          onNodeClick={onNodeClick}
          
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
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

        </ReactFlow>
        {/*<ReceiverComponent data={receiverData} />*/}
      </div>
      <Sidebar />
    </div>
  );
};
 

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
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);