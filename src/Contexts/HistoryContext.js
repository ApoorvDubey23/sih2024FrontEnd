import React, { createContext, useContext, useState } from 'react';

// Create the context
const HistoryContext = createContext();

// Create the provider component
function HistoryProvider({ children }) {
  // Store two variables in state
  const [History,setHistory]=useState([])

  // Pass both variables and their setters in an object
  

  return (
    <HistoryContext.Provider value={{History,setHistory}}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => {
    return useContext(HistoryContext);
  };
export { HistoryProvider };