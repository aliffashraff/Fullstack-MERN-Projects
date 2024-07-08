import { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  // state to store address data from the input fields
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((current) => ({ ...current, [name]: value }));
  };

  // directed to payment gateway
  const placeOrder = async (e) => {
    e.preventDefault();

    // store the ordered items
    let orderItems = [];

    food_list.forEach((item) => {
      // if itemId in cartItems match
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        // add quantity property into itemInfo
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    // structure orders data to be the same as in API
    const orderData = {
      address: data,
      items: orderItems,
      // calculate total price + delivery charge
      amount: getTotalCartAmount() + 2,
    };

    // api call
    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // if success = true, will get session url
        const { session_url } = response.data;

        // send user to url payment gateway
        window.location.href = session_url;
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || 'Please Try Again Later';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    // make the page only available when logged in
    if (!token) {
      navigate('/cart');
    }
    // if cart = 0
    else if (getTotalCartAmount() <= 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form action="" className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />
        </div>
        <input
          name="email"
          type="text"
          placeholder="Email Address"
          onChange={onChangeHandler}
          value={data.email}
          required
        />
        <input
          name="street"
          type="text"
          placeholder="Street"
          onChange={onChangeHandler}
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
            value={data.city}
            required
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            type="text"
            placeholder="Zip code"
            onChange={onChangeHandler}
            value={data.zipcode}
            required
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
        </div>
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <hr />
          <div className="cart-total-details">
            <p>Subtotal</p>
            {/* total items price */}
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          {/* navigate to order page */}
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
