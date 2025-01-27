import { useEffect } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';
 




function CustomHandle({ id, label, onChange }) {
    const connections = useHandleConnections({
      type: 'target',
      id,
    });
   
    const nodeData = useNodesData(connections?.[0].source);
   
    useEffect(() => {
      onChange(nodeData?.data ? nodeData.data : 0); /*if this handle is changing, put data as the parameter into the onChange function*/
    }, [nodeData]);
   
    return (
      <div>
        <Handle
          type="target"
          position={Position.Top}
          id={id}
          className="handle"
        />
        <label htmlFor="red" className="label">
          {label}
        </label>
      </div>
    );
}
   
function Meansurement({ id, data }) {
  const { updateNodeData } = useReactFlow();
  
  return (
    <div
      className="dndnode"
      style={{
        background: data.value
          ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})`
          : 'rgb(0, 0, 0)',
      }}
    >
      <div>Meansurements {data}</div>
      <CustomHandle
        id="Meansurement"
        label="R"
        onChange={(data) => {
          updateNodeData(id, (node) => {
            /*return { value: { ...node.data.value, r: value } }; #changer this node's data to {...node.data.value(keep the same), r:value(change r's value)}*/
            return { data };
          });
        }}
      />
      <Handle type="source" position="Bottom" id="output" />
    </div>
  );
}
  
export default Meansurement;