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
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"bucket", label: "", name: "Bucket", param: 'param1', flow: {Cookies: "", Bucket: "param1"}})} draggable >
        Bucket 
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"meansurement", label: "", name: "Meansurement", param: 'param12', flow: {Meansurement: "param1"}})} draggable >
        Meansurement 
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"field", label: "", name: "Field", param: 'param2',  flow: {Field: "param2"}})} draggable>
        Fileds
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"tag", label: "", name: "Tag", param: 'param3',  flow: {Tag: "param3"}})} draggable>
        Tags
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, {type:"output", label: "", name: "Time", param: 'param4',  flow: {Time: "param4"}})} draggable>
        Time
      </div>
    </aside>
  );
};