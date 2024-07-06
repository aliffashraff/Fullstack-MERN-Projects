import { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState('Sign Up');

  return (
    <div className="login-popup">
      <form className="login-popup-container">
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
          />
          <input
            type="pasword"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button>
          {/* choose to sign in or login */}
          {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="checkbox" id="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {/* change text depending on the state */}
        {currentState === 'Sign Up' ? (
          <p className='login-popup-question'>
            Already have an account?{' '}
            <span onClick={() => setCurrentState('Login')}>Login here</span>
          </p>
        ) : (
          <p className='login-popup-question'>
            Does not have an account?{' '}
            <span onClick={() => setCurrentState('Sign Up')}>Register here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
