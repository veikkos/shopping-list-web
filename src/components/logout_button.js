import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { strings } from '../localization/localization'
import { urlWithoutParams } from '../util/baseurl'

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <button
      className="btn-sm btn-dark"
      onClick={() => logout({ logoutParams: { returnTo: urlWithoutParams } })}>
      {strings.log_out}
    </button>
  )
}

export default LogoutButton
