import React, { createContext, useState } from 'react';

// Create Context
export const QueryContext = createContext();

// Context Provider Component
/*export const QueryProvider = ({ children }) => {
    const [parameter, setParameter] = useState("default value");

    return (
        <QueryContext.Provider value={{ parameter, setParameter }}>
            {children}
        </QueryContext.Provider>
    );
};*/