import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
 
export default function MeansurementMenu({
  reactflowfunction,
  id,
  top,
  left,
  right,
  bottom,
  list,
  ...props
	
}) {
  const { getNode, setNodes, addNodes, setEdges, updateNodeData, getEdges, setNode } = reactflowfunction;

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };
 
    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);
 
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  function targetChoosed(name) {
    let this_node = getNode(id)
    
    updateNodeData(id, (node) => {
      return { ...node.data, label: name, flow: {...node.data.flow, [this_node.data.name]: name}};
    });
    const followingEdges = getEdges().filter((edge) => edge.source === id);
    const edges = followingEdges.map((edge, i) => {
      updateNodeData(edge.target, (target_node) => {
        return {...target_node.data, flow: {...this_node.data.flow, [this_node.data.name]: name}};
      });
      return 0
    }) // this_node.data seems not update before the edge's node got updated
  
  }

  

 
  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>node: {id}</small>
      </p>
      {list.map((item, index) => (//this list is used to dynamically render the menu content
        <button key={index} onClick={() => targetChoosed(item)} style={{ padding: "5px 10px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
          {item}
        </button>
        ))}      
      <button onClick={duplicateNode}>duplicate</button>
      <button onClick={deleteNode}>delete</button>
    </div>
  );
}