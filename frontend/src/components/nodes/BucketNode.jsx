import { useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import query from '../query/BucketQuery';

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';



/* use to create the bucket node */
function BucketNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const Bucket_list = query(data.flow.Cookies);
  const Bucket_array = Object.keys(Bucket_list);
  useEffect(() => {
    updateNodeData(id, (node) => {
      return { ...node.data, param: Bucket_array  };
    });
    
  }, [Bucket_list]);
  const node = useNodesData(id)
  const label = node.data.label

  return (
    <div
      className="dndnode"
    >
      <div>
        Bucket 
        <br />
        {label}
      </div>
      <Handle type="source" position={Position.Bottom} id="output" />
    </div>
  );
}
  
export default BucketNode;