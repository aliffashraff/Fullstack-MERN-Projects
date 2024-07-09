import { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState('Login');
  // user input data state
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  // acccess url, token and setToken from context
  const { url, setToken, loadData } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // api call for login and register
  const onLogin = async (e) => {
    e.preventDefault();

    let newUrl = url;
    // whether current state is login or sign up
    if (currentState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        // store token in the state if success = true
        setToken(response.data.token);
        // store the token in localstorage
        localStorage.setItem('token', response.data.token);
        // close popup by changing setshowlogin prop
        setShowLogin(false);
        toast.success(response.data.message);
        loadData();
      }
    } catch (error) {
      alert(
        `Error: ${error.response.data.message || 'Please Try Again Later'}`
      );
    }
  };

  /* useEffect(() => {
    console.log();
  }, []); */

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            // close the popup
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {/* hide name input field in Login state */}
          {currentState === 'Sign Up' ? (
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              required
              value={data.name}
              onChange={onChangeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            required
            value={data.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit">
          {/* choose to sign in or login */}
          {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="checkbox" id="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {/* change text depending on the state */}
        {currentState === 'Sign Up' ? (
          <p className="login-popup-question">
            Already have an account?{' '}
            <span onClick={() => setCurrentState('Login')}>Login here</span>
          </p>
        ) : (
          <p className="login-popup-question">
            Does not have an account?{' '}
            <span onClick={() => setCurrentState('Sign Up')}>
              Register here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
