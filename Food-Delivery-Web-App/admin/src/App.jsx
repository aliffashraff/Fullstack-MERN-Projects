import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
// toastify - to add notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';

const App = () => {
  const url = 'https://food-delivery-backend-fza4.onrender.com';

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <Navbar />
      <hr />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
