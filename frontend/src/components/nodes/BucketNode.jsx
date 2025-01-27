import { useEffect } from 'react';
import { useParams } from "react-router-dom";

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';



   
function BucketNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  

  console.log(data)
  return (
    <div
      className="dndnode"
    >
      <div>Bucket {data.flows}</div>
      <Handle type="source" position={Position.Bottom} id="output" />
    </div>
  );
}
  
export default BucketNode;