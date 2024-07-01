import { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  // get the food_list array from StoreContext
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          // sort the menu category
          if (category === 'All' || category === item.category) {
            return (
              // pass the props to FoodItem
              // the structure of the food list will be done in FoodItem
              <FoodItem
                key={index}
                id={item._id}
                image={item.image}
                price={item.price}
                description={item.description}
                name={item.name}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
