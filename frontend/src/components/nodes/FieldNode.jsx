import { useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import query from '../query/FieldQuery';

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
  useNodeConnections
} from '@xyflow/react';



function CustomHandle({ id, onChange }) {
  const connections = useNodeConnections({
    handleType: 'target',
    handleId: id,
  });
  const nodeData = useNodesData(connections?.[0]?.source || "");
 
  useEffect(() => {
    onChange("");
  }, [nodeData]);
 
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        id={id}
        className="handle"
      />
    </div>
  );
}



/* use to create the bucket node */
function FieldNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const Field_array = query(data.flow);
  console.log(Field_array)

  useEffect(() => {
    updateNodeData(id, (node) => {
      return { ...node.data, param: Field_array  };
    });
    
  }, [Field_array]);

  const node = useNodesData(id)
  const label = node.data.label
  console.log(node)

  return (
    <div
      className="dndnode" 
    >
      <div>
      Field
        <br />
        {label}
      </div>
      <Handle type="source" position={Position.Bottom} id="output"  />
      
      <CustomHandle
        id="input"
        onChange={(label) => {
          updateNodeData(id, (node) => {
            return { label: label };
          });
        }}
      />

    </div>
  );
}
  
export default FieldNode;