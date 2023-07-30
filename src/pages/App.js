import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Login from './login/Login'
import Main from './main/Main'

export default function App() {
  const { isAuthenticated } = useAuth0()

  return (
    <>
      {isAuthenticated ?
        <Main /> :
        <Login />
      }
    </>
  )
}
