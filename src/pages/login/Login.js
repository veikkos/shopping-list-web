import '../App.css'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Header from '../../components/header'
import LoginButton from '../../components/login_button'
import Footer from '../../components/footer'
import Progress from '../../components/progress'

function Main() {
  const { isLoading } = useAuth0()

  return (
    <div className="App">
      <Header />
      <div className="View">
        <div className="Center"
          style={{ margin: '0 20px' }}>
          {isLoading ?
            <Progress /> :
            <LoginButton />
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Main
