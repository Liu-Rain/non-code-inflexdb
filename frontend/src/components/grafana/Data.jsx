import React, { createContext, useState, useContext } from "react";

const DataContext = createContext([[], (_) => {}]);

export function DataProvider({ children }) {
    const [data, setData] = useState([]);

    // Simulate data update after 3 seconds

    return (
        <DataContext.Provider value={[ data, setData ]}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}