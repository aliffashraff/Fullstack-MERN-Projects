import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// global style
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // create router using BrowserRouter
  <BrowserRouter>
    {/* App and its child components can now access the contextValue */}
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
