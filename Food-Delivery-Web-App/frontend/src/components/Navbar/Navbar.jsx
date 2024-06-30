import { useState } from 'react';
// import assets
import { assets } from '../../assets/assets';
// import css
import './Navbar.css';

const Navbar = () => {
  // state to set the class for menu
  const [menu, setMenu] = useState('home');

  return (
    <div className="navbar">
      {/* assets object that contains all the assets */}
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        {/* change the state class to 'active when clicked*/}
        <li
          onClick={(e) => setMenu('home')}
          className={menu === 'home' ? 'active' : ''}
        >
          Home
        </li>
        <li
          onClick={(e) => setMenu('menu')}
          className={menu === 'menu' ? 'active' : ''}
        >
          Menu
        </li>
        <li
          onClick={(e) => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          Mobile-App
        </li>
        <li
          onClick={(e) => setMenu('contact-us')}
          className={menu === 'contact-us' ? 'active' : ''}
        >
          Contact Us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          {/* if there are items in cart, the class 'dot' will be visible */}
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
