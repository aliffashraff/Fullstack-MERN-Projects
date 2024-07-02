import { useEffect, useState } from 'react';
// import assets
import { assets } from '../../assets/assets';
// import css
import './Navbar.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = ({ setShowLogin }) => {
  // state to set the class for menu
  const [menu, setMenu] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // make the header shadow visible when scrolled
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    //cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      id="navbar"
    >
      {/* assets object that contains all the image */}
      <HashLink to={'/#header'} onClick={(e) => setMenu('home')}>
        <img src={assets.logo} alt="" className="logo" />
      </HashLink>
      <ul className="navbar-menu">
        {/* link the to the home page path */}
        <HashLink
          to={'/#header'}
          // change the state class to 'active when clicked
          onClick={(e) => setMenu('home')}
          className={menu === 'home' ? 'active' : ''}
        >
          Home
        </HashLink>
        <a
          href="#explore-menu"
          onClick={(e) => setMenu('menu')}
          className={menu === 'menu' ? 'active' : ''}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={(e) => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={(e) => setMenu('contact-us')}
          className={menu === 'contact-us' ? 'active' : ''}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-basket-icon">
          <Link to={'/cart'}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          {/* if there are items in cart, the class 'dot' will be visible */}
          <div className="dot"></div>
        </div>
        {/* chsnge state value to show popup */}
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
