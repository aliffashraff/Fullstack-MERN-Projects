import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  // get context
  const { cartItems, addTocart, removeFromCart, food_list } =
    useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
      </div>
    </div>
  );
};

export default Cart;
