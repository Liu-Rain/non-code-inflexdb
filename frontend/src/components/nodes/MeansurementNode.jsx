import { useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import query from '../query/MeansurementQuery';

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
function MeansurementNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const Meansurement_array = query(data.flow);

  useEffect(() => {
    updateNodeData(id, (node) => {
      return { ...node.data, param: Meansurement_array  };
    });
    
  }, [Meansurement_array]);

  const node = useNodesData(id)
  const label = node.data.label

  return (
    <div
      className="dndnode" 
    >
      <div>
      Meansurement
        <br />
        {label}
      </div>
      <Handle type="source" position={Position.Bottom} id="output" onChange={updateNodeData} />
      
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
  
export default MeansurementNode;