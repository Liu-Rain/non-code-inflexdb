import React from 'react';
import { useDnD } from './DnDContext';
 
export default () => {
  const [_, setInfo] = useDnD();
 
  const onDragStart = (event, data) => {
    setInfo(data);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, {type:"default", label: "Meansurements", name: "meansurement", param: 'param1', flow: {Meansurements: "param1"}})} draggable>
        Meansurements
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