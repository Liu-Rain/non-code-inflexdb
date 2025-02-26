import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
 
export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  list,
  ...props
  
}) {
  console.log(list)
  const { getNode, setNodes, addNodes, setEdges, updateNodeData } = useReactFlow();
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
    const this_node = getNode(id)
    updateNodeData(id, (node) => {
      return { ...node.data, label: name,flow: {...node.data.flow, [this_node.data.name]: name}};
    });
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