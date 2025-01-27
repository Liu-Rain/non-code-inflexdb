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
      data.flow = {Bucket: {cookies}}
    }
    setInfo(data);

  };


  /*const{id, type, data} = nodesData[0]? nodesData[0]: "0";*/

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"bucket", label: "Bucket", name: "bucket", param: 'param1', flow: {Bucket: "param1"}})} draggable >
        Bucket 
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"default", label: "Fields", name: "field", param: 'param2',  flow: {Fields: "param2"}})} draggable>
        Fileds
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"default", label: "Tags", name: "tag", param: 'param3',  flow: {Tags: "param3"}})} draggable>
        Tags
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, {type:"output", label: "Time", name: "time", param: 'param4',  flow: {Time: "param4"}})} draggable>
        Time
      </div>
    </aside>
  );
};