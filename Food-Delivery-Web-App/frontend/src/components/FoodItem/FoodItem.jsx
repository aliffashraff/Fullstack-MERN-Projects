import { useState } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';

// create the structure of the food items from the props
const FoodItem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {itemCount ? (
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
