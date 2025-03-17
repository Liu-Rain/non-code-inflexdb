import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import BucketMenu from './BucketMenu';
import MeansurementMenu from './MeansurementMenu';
import FieldMenu from './FieldMenu';
export default function ContextMenu({
...props
}) {
  const reactFlowFunction = useReactFlow();

  function getMenuComponent(id) {
    if (reactFlowFunction.getNode(id)?.type === "bucket") {
      return <BucketMenu  reactflowfunction={reactFlowFunction} {...props}/>;
    } else if (reactFlowFunction.getNode(id).type === "meansurement") {
      return <MeansurementMenu reactflowfunction={reactFlowFunction} {...props}/>;
    } else if (reactFlowFunction.getNode(id).type === "field") {
      return <FieldMenu reactflowfunction={reactFlowFunction} {...props}/>;
    }
    return null; // If no match, render nothing
  }  

 
  return (
    <div>
      {getMenuComponent(props.id)}
    </div>
  );
}