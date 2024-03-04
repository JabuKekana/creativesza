import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';
import { ToastContainer } from "react-toastify";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";


Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer
          theme="light"
          position="top-right"
          autoClose={2000}
          closeOnClick
          pauseOnHover={false}
        />
    <App />
  </React.StrictMode>
);


reportWebVitals();







