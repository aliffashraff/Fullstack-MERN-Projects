import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = () => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Oure mission
        is to statisf our cravings and elevate your dining experience, one
        delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {/* create list of menu from the array objects */}
        {menu_list.map((item, index) => (
          // key must be provided for children list, therefore, the index is used as the key
          <div className="explore-menu-list-item" key={index}>
            <img src={item.menu_image} alt="" />
            {/* name of the item */}
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      {/* hr tag = line break */}
      <hr />
    </div>
  );
};

export default ExploreMenu;
