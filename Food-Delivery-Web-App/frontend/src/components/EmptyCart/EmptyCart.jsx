import { useContext } from 'react';
import './EmptyCart.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const EmptyCart = ({ setShowLogin }) => {
  const { token, setMenu } = useContext(StoreContext);

  return token ? (
    <div className="empty-cart-container">
      <h2>Your Cart is Empty</h2>
      <p>Please add foods to your cart to continue.</p>
      <Link to={'/'}>
        <button onClick={()=>setMenu('home')}>View Menu</button>
      </Link>
    </div>
  ) : (
    <div className="please-login-container">
      <h2>Your Cart is Empty</h2>
      <p>Please sign in to view your cart.</p>
      <button onClick={() => setShowLogin(true)}>Sign In</button>
    </div>
  );
};

export default EmptyCart;
