import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="admin-panel-home">
      <h1>Admin Panel</h1>
      <div className="admin-panel-links">
        <Link to="/add" className="admin-link">
          Add Item
        </Link>
        <Link to="/list" className="admin-link">
          List Item
        </Link>
        <Link to="orders" className="admin-link">
          Orders
        </Link>
      </div>
    </div>
  );
};

export default Home;
