import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-hxarb0xt7x5x3b2h.us.auth0.com"
    clientId="VJp9wz7nqPVQ3Zyni5ooLhsTDv0bYKqd"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </Auth0Provider>,
)
