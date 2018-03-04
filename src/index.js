import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Default BASE_NAME suited for Github Pages
const BASE_NAME = process.env.REACT_APP_BASE_NAME || '/potato-store-front';

ReactDOM.render(
  <BrowserRouter basename={BASE_NAME}>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

registerServiceWorker();
