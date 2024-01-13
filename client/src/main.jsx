import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; // Asegúrate de importar createRoot desde 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
