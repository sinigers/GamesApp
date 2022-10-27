import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GamesContextProvider } from './context/GamesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GamesContextProvider>
      <App />
    </GamesContextProvider>
  </React.StrictMode>
)