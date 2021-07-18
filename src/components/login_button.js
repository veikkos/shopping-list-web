import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { strings } from '../localization/localization'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Shopping List Web</h5>
        <p className="card-text">{strings.log_in_description}</p>
        <button
          className="btn btn-dark"
          onClick={() => loginWithRedirect()}>{strings.log_in_auth0}
        </button>
      </div>
    </div>
  )
}

export default LoginButton