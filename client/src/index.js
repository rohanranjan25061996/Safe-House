import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {MoralisProvider} from "react-moralis"
import {AuthContextProvider} from "./contextAPI/Auth"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <MoralisProvider appId = {process.env.REACT_APP_MORALIS_APP_ID} serverUrl = {process.env.REACT_APP_MORALIS_SERVER_ID}>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </MoralisProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
