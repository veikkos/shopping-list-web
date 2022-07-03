import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './pages/App'
import 'bootstrap-icons/font/bootstrap-icons.css'

ReactDOMClient.createRoot(
  document.getElementById('root')
)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
