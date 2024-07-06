import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

// create the structure of the food items from the props
const FoodItem = ({ id, name, price, description, image }) => {
  // const [itemCount, setItemCount] = useState(0);
  // get values from context to add to cart
  const { cartItems, addTocart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          // get image using the path + image name from db
          src={url + '/images/' + image}
          alt=""
        />
        {/* functions without add to cart */}
        {/* {itemCount ? (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => setItemCount((currentCount) => currentCount - 1)}
            />
            <p>{itemCount}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => setItemCount((currentCount) => currentCount + 1)}
            />
          </div>
        ) : (
          <img
            className="add-food-item"
            src={assets.add_icon_white}
            onClick={() => setItemCount((currentCount) => currentCount + 1)}
          />
        )} */}

        {/* pass id as the itemId */}
        {cartItems[id] ? (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addTocart(id)}
            />
          </div>
        ) : (
          <img
            className="add-food-item"
            src={assets.add_icon_white}
            onClick={() => addTocart(id)}
          />
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {/* rating stars img */}
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
