import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create the provider component
function UserProvider({ children }) {
  // Store two variables in state
  const [User,setUser]=useState([])

  // Pass both variables and their setters in an object
  

  return (
    <UserContext.Provider value={{User,setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
    return useContext(UserContext);
  };
export { UserProvider };