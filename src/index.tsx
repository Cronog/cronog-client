import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/Main';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from "react-dnd"
import { TouchBackend } from 'react-dnd-touch-backend';

import Toast from './components/Toast';
import Menu from './components/Menu';

import "./global.css";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={TouchBackend} options={{ delayTouchStart : 100 }}>
          <App />
          <Toast />
          <Menu />
        </DndProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);