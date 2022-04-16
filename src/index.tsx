import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/Main';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Toast from './components/Toast';
import Menu from './components/Menu';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toast />
      <Menu />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);