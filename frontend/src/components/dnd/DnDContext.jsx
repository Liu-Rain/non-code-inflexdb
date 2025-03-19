import { createContext, useContext, useState } from 'react';
 
const DnDContext = createContext(["null", (_) => {}]);
 
export const DnDProvider = ({ children }) => {
  const [data, setData] = useState({type:"", label: "", name: "", param: "", flow: "", result: ""});
  //const [flow, setFlow] = useState({ flow: "" }); //need to use [] to wrap a dynamic name

  return (
    <DnDContext.Provider value={[data, setData]}>
      {children}
    </DnDContext.Provider>
  );
}
 
export default DnDContext;
 
export const useDnD = () => {
  return useContext(DnDContext);
}