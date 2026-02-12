import { createContext } from "react";
import { food_list } from "../assets/assets";

// Create Context
export const StoreContext = createContext(null);

// Create Provider Component
const StoreContextProvider = ({ children }) => {

  const contextValue = {
    food_list
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
