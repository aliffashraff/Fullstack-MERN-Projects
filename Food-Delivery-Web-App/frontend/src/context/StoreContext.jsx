import { createContext, useEffect, useState } from 'react';
import { food_list } from '../assets/assets';

// create context with null as default value
export const StoreContext = createContext(null);

// create context provider component
const StoreContextProvider = (props) => {
  // cart item state
  const [cartItems, setCartItems] = useState({});

  // add to cart function
  const addTocart = (itemId) => {
    // use [] bcs itemId is a variable
    if (!cartItems[itemId]) {
      // if user first time adding item in the cart, it will create new entry in the cartItems
      setCartItems((current) => ({ ...current, [itemId]: 1 }));
    } else {
      // add item amount if the item already in the cart
      setCartItems((current) => ({
        ...current,
        [itemId]: current[itemId] + 1,
      }));
    }
  };

  // remove from cart function
  const removeFromCart = (itemId) => {
    setCartItems((current) => ({ ...current, [itemId]: current[itemId] - 1 }));
  };

  // useEffect
  useEffect(
    () => {
      console.log(cartItems);
    },
    // run this function everytime cartItem state updated
    [cartItems]
  );

  // anything in the context value can be accesed by any component if it is within the provider
  const contextValue = {
    // set up food_list array
    food_list,
    // pass the cart state and functions
    cartItems,
    setCartItems,
    addTocart,
    removeFromCart,
  };

  return (
    // set StoreContext as the provider
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
