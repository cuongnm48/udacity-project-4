import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'
import { config } from './config'

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
    audience={`https://${config.domain}/api/v2/`}
    scope="read:todo write:todo delete:todo"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)
