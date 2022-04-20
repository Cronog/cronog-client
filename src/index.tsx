import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/Main';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from "react-dnd"
import { TouchBackend } from 'react-dnd-touch-backend';

import './index.css';
import Toast from './components/Toast';
import Menu from './components/Menu';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={TouchBackend} options={{
        delayTouchStart : 2000
      }}>
        {/* <DndProvider backend={HTML5Backend}> */}
          <App />
          <Toast />
          <Menu />
        </DndProvider>
      {/* </DndProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);