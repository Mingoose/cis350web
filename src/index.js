/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import Banner from './components/Banner';
// import Ending from './Ending';
// import Game from './Game';
// import DeleteButton from './DeleteButton';
import reportWebVitals from './components/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Banner />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
