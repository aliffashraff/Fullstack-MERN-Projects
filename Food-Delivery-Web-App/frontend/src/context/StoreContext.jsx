import { createContext } from 'react';
import { food_list } from '../assets/assets';

// create context with null as default value
export const StoreContext = createContext(null);

// create context provider component
const StoreContextProvider = (props) => {
  // set up food_list array as the context value to be accesed by any component
  const contextValue = {
    food_list,
  };

  return (
    // set StoreContext as the provider
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
