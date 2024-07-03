import React from 'react';
import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // get context
  const { cartItems, removeFromCart, food_list, getTotalCartAmount } =
    useContext(StoreContext);

  // use useNavigate to navigate when clicking buttons, not use Link bcs its not a link, but a button
  const navigate = useNavigate();

  return (
    <div className="cart" id="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {/* use index number as the key */}
        {food_list.map((item) => {
          // check if the cart has item with the item id
          if (cartItems[item._id] > 0) {
            const itemPrice = item.price;
            let itemQuantity = cartItems[item._id];
            const itemTotalPrice = itemPrice * itemQuantity;

            return (
              <React.Fragment key={item._id}>
                {/* display cart items */}
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${itemPrice}</p>
                  <p>{itemQuantity}</p>
                  <p>${itemTotalPrice}</p>
                  {/* remove item */}
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                {/* horizontal line after each item */}
                <hr />
              </React.Fragment>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
            <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
          </div>
          {/* navigate to order page */}
          <button onClick={() => navigate('/order')}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have promo code, please insert it here</p>
            <div className="cart-promo-code-input">
              <input
                type="text"
                name="promo-code"
                id="promo-code"
                placeholder="promo code"
              />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
