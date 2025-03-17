import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Query from '../components/query/query';
//<Query cookies={`${cookies}`} />
import DND from "./dnd";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DataVisualizationPanel from '../components/grafana/Grafana';


export default function Dashboard() {
  return (
      <Routes>
        <Route path="" element={<Parent />}>
          <Route path="" element={<DND />} />
        </Route>
      </Routes>
  );
}

function Parent() {
  const { cookies } = useParams();

  console.log(cookies)
  return (
    <div id="contact">
        <h1>Hello! Welcome to Dashboard. Your cookies is : {`${cookies}`}</h1>
        <Outlet context={{cookies}}/>
        <DataVisualizationPanel/>
    </div>
    
  );
}
