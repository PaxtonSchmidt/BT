import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loginStore } from './Redux/stores/loginStore';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={loginStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
