import { useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import query from '../query/MeansurementQuery';

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';



/* use to create the bucket node */
function MeansurementNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const Meansurement_array = query(data.flow);
  console.log(Meansurement_array)

  useEffect(() => {
    updateNodeData(id, (node) => {
      return { ...node.data, param: Meansurement_array  };
    });
    
  }, [Meansurement_array]);

  const node = useNodesData(id)
  const label = node.data.label
  console.log(node)

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
      <Handle type="target" position={Position.Top} id="input" />
    </div>
  );
}
  
export default MeansurementNode;