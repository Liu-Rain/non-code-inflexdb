import React, { memo, createContext, useState, useCallback, useEffect } from 'react';
import { QueryContext } from './queryContext';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';
import Query from "./query"
//import { isTextNode, type MyNode } from './initialElements';




function ResultNode() {

  const [parameter, setParameter] = useState("default value");


  const connections = useHandleConnections({
    type: 'target',
    
  });
  
  const nodesData = useNodesData(
    connections.map((connection) => connection.source),
  );

  console.log(nodesData)
  console.log(nodesData[0])
  const{id, type, data} = nodesData[0]? nodesData[0]: "0";
  const onConnect = useCallback(
    () => {
      console.log(data)
      setParameter(data)
    },
    [data] // List of dependencies
  );

  useEffect(() => {
    onConnect();
  }, [data]);


  return (

    <div>
      <QueryContext.Provider value={{ parameter }}>
        <Query />
      </QueryContext.Provider>

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
