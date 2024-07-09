import './EmptyCart.css';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="empty-cart-container">
      <h2>Your Cart is Empty</h2>
      <p>Please add foods to your cart to continue.</p>
      <Link to={'/'}>
        <button>Browse Menu</button>
      </Link>
    </div>
  );
};

export default EmptyCart;
