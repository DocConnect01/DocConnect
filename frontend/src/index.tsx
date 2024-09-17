import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './store/store'; // Import your Redux store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the Redux store */}
      <Router> {/* Enable routing */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);


