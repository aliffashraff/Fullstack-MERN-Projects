import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// create context with null as default value
export const StoreContext = createContext(null);

// create context provider component
const StoreContextProvider = (props) => {
  // cart item state
  const [cartItems, setCartItems] = useState({});
  // url
  const url = 'https://food-delivery-backend-fza4.onrender.com';
  // state to save token
  const [token, setToken] = useState('');
  // state to store food from db
  const [food_list, setFoodList] = useState([]);
  // menu state in for navbar
  const [menu, setMenu] = useState(localStorage.getItem('menu') || 'home');

  // add to cart function
  const addTocart = async (itemId) => {
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

    try {
      // if token exist, update the the cart items to db
      //  provide itemId: in req.body
      // include token for authorization
      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // remove from cart function
  const removeFromCart = async (itemId) => {
    setCartItems((current) => ({ ...current, [itemId]: current[itemId] - 1 }));

    try {
      // if token exist, update the the cart items to db
      if (token) {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // cart total function
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    // use for...in to loop over objects
    for (const itemId in cartItems) {
      // check the item that has quantity in the cart
      if (cartItems[itemId] > 0) {
        // find the item in the food_list that match with that itemId in the cartItems
        let itemInfo = food_list.find((product) => product._id === itemId);

        // price * quantity
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }

    return totalAmount;
  };

  // get food list
  const fetchFoodList = async () => {
    try {
      // get food from db
      const response = await axios.get(`${url}/api/food/list`);

      // set the food list in the state
      setFoodList(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // get the cart to avoid cart reset when refresh
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { token },
      });

      // update cartItems with the data from db
      setCartItems(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // to load data
  async function loadData() {
    // load the food list
    await fetchFoodList();

    const storedToken = localStorage.getItem('token');
    // to avoid logged out when refresh page
    // when local storage with key name token exist
    if (storedToken) {
      // get token from local storage and set token state to the 'token' key
      setToken(storedToken);

      // load cart by passing token from localstorage
      await loadCartData(storedToken);
    }
  }

  // useEffect
  useEffect(() => {
    // console.log(cartItems);

    loadData();
  }, []);

  // anything in the context value can be accesed by any component if it is within the provider
  const contextValue = {
    // set up food_list array
    food_list,
    // pass the cart state and functions
    cartItems,
    setCartItems,
    addTocart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
    menu,
    setMenu,
    loadData,
  };

  return (
    // set StoreContext as the provider
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
