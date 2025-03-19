import React from 'react';
import { useDnD } from './DnDContext';
import {
  useNodesData,
} from '@xyflow/react';
import { useParams } from "react-router-dom";

export default () => {
  const [_, setInfo] = useDnD();

  const { cookies } = useParams();

  const onDragStart = (event, data) => {
    event.dataTransfer.effectAllowed = 'move';
    if (data.type =="bucket"){
      data.flow = {Cookies: cookies}
    } 
    setInfo(data);

  };


  /*const{id, type, data} = nodesData[0]? nodesData[0]: "0";*/

  return (
    <aside className='sidebar'>
      <div className="description">🌟 Drag the nodes to the pane.</div>
      <div className="side-dndnode" onDragStart={(event) => onDragStart(event, {type:"bucket", label: "", name: "Bucket", param: 'param1', flow: {Cookies: "", Bucket: "param1"}})} draggable >
        Bucket 
      </div>
      <div className="side-dndnode" onDragStart={(event) => onDragStart(event, {type:"meansurement", label: "", name: "Meansurement", param: [], flow: {Meansurement: "param1"}})} draggable >
        Meansurement 
      </div>
      <div className="side-dndnode" onDragStart={(event) => onDragStart(event, {type:"field", label: "", name: "Field", param: [],  flow: {Field: "param2"}})} draggable>
        Fileds
      </div>
    </aside>
  );
};