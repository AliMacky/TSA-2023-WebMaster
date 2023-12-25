import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { SnackbarProvider } from 'notistack';

window.globalVar = 0;

ReactDOM.createRoot(document.getElementById('root')).render(

  <SnackbarProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>

)