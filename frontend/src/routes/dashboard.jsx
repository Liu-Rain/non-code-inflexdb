import React from "react";
import { Form } from "react-router-dom";
//import Query from '../components/query/query';
//<Query cookies={`${cookies}`} />

import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";


export default function Dashboard() {
  const { cookies } = useParams();
  console.log(cookies)

  return (
    <div id="contact">
        <h1>Hello! Welcome to Dashboard. Your cookies is : {`${cookies}`}</h1>
        

        <Outlet />
    </div>
    
  );
}
