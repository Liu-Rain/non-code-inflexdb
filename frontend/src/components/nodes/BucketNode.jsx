import { useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import query from '../query/query';

import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';



   
function BucketNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const Bucket_list = query(data.flow.Bucket.cookies);
  const Bucket_array = Object.keys(Bucket_list);

  useEffect(() => {
    updateNodeData(id, (node) => {
      return { ...node.data, param: Bucket_array  };
    });
    
  }, [Bucket_list]);


  console.log(Bucket_array)
  console.log(data)
  return (
    <div
      className="dndnode"
    >
      <div>Bucket {Bucket_array}</div>
      <Handle type="source" position={Position.Bottom} id="output" />
    </div>
  );
}
  
export default BucketNode;