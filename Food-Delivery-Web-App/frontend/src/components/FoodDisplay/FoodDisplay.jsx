import { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = () => {
  // get the food_list array from StoreContext
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id='food-display'>
      <h1>Food Display</h1>
    </div>
  );
};

export default FoodDisplay;
