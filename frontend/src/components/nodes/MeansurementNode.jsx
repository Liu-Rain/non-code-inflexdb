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
function MeansurementNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  //const Bucket_list = query(data.flow.Cookies);
  //const Bucket_array = Object.keys(Bucket_list);

  function flowChanged(name) {
    updateNodeData(id, (node) => {
      return { ...node.data, flow: {...node.data.flow, [this_node.data.name]: name}};
    });
  }

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