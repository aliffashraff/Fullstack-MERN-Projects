import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// global style
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  // create router using BrowserRouter to
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
