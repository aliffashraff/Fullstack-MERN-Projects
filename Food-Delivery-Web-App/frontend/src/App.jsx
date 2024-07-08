import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer autoClose={2000} />
      {/* display popup on top of App if state = true */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        {/* ensure Link will link to top of the page */}
        <ScrollToTop />
        {/* pass the the setter function as prop */}
        <Navbar setShowLogin={setShowLogin} />
        {/* use Routes tag to create multiple routes*/}
        <Routes>
          {/* set the route of the page component */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
