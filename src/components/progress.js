import React from 'react'
import Loader from 'react-loader-spinner'
import logo from '../media/logo192.png'

const Progress = ({ show }) => (
  <div className='ProgressContainer'>
    <img
      className='Logo'
      src={logo}
      alt="Logo"
    />
    <Loader
      visible={show}
      type="ThreeDots"
      color="#CC3F0C"
      height={100}
      width={100}
    />
  </div>
)

export default Progress