import React from 'react'
import Loader from 'react-loader-spinner'

const Progress = ({ show }) => (
  <Loader
    visible={show}
    type="ThreeDots"
    color="#CC3F0C"
    height={100}
    width={100}
  />
)

export default Progress