import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import HttpsRedirect from 'react-https-redirect'
import './index.css'
import App from './pages/App'
import 'bootstrap-icons/font/bootstrap-icons.css'

ReactDOMClient.createRoot(
  document.getElementById('root')
)
  .render(
    <React.StrictMode>
      <HttpsRedirect>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          authorizationParams={{
            audience: process.env.REACT_APP_BACKEND_URL,
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </HttpsRedirect>
    </React.StrictMode>
  )
