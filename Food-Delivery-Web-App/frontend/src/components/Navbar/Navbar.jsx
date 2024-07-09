import { useContext, useEffect, useState } from 'react';
// import assets
import { assets } from '../../assets/assets';
// import css
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
// install react-router-hash-link first
import { HashLink } from 'react-router-hash-link';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  // state to set the class for menu - move to context
  // const [menu, setMenu] = useState(localStorage.getItem('menu') || 'home');
  const [isScrolled, setIsScrolled] = useState(false);

  // get context
  const { getTotalCartAmount, token, setToken, menu, setMenu } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    // remove token from local storage
    localStorage.removeItem('token');
    setToken('');
    // navigate to home
    navigate('/');
  };

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

  useEffect(() => {
    // save menu state in localstorage
    localStorage.setItem('menu', menu);
  }, [menu]);

  return (
    <div
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      id="navbar"
    >
      {/* assets object that contains all the image */}
      <HashLink to={'/#home-page'} onClick={(e) => setMenu('home')}>
        <img src={assets.logo} alt="" className="logo" />
      </HashLink>
      <ul className="navbar-menu">
        {/* link the to the home page path */}
        <HashLink
          to={'/#home-page'}
          // change the state class to 'active when clicked
          onClick={(e) => setMenu('home')}
          className={menu === 'home' ? 'active' : ''}
        >
          Home
        </HashLink>
        <HashLink
          to="/#explore-menu"
          onClick={(e) => setMenu('menu')}
          className={menu === 'menu' ? 'active' : ''}
        >
          Menu
        </HashLink>
        <HashLink
          to="/#app-download"
          onClick={(e) => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          Mobile-App
        </HashLink>
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
          <HashLink
            to={'/cart#cart'}
            onClick={() => setMenu('cart')}
            className={menu === 'cart' ? 'active' : ''}
          >
            <img src={assets.basket_icon} alt="" />
          </HashLink>
          {/* if there are items in cart, the class 'dot' will be visible */}
          {getTotalCartAmount() > 0 ? <div className="dot"></div> : <></>}
        </div>
        {/* if token exist change to profile image */}
        {token ? (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={(e) => navigate('myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => logout()}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
        {/* change state value to show popup */}
      </div>
    </div>
  );
};

export default Navbar;
