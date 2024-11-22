import { memo, useState } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';
//import { isTextNode, type MyNode } from './initialElements';

function ResultNode() {
  const connections = useHandleConnections({
    type: 'target',
  });
  
  const nodesData = useNodesData(
    connections.map((connection) => connection.source),
  );

  
  console.log(nodesData[0])
  const{id, type, data} = nodesData[0]? nodesData[0]: "0";
  console.log(data)


  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div>
        incoming texts:{' '}
        {nodesData.map(({ data }, i) => <div key={i}>{data.param}</div>) ||
          'none'}
      </div>
    </div>
  );
}
 
export default memo(ResultNode);

//Not corrrect, just a template

//log: need to dev to send frontend query to backend, query should include bucket,meansuerment...
//log: backend should collect data and send back to frontend.
