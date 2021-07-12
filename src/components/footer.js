import React from 'react'

const Footer = () => (
  <div className="Footer Flex">
    <div className="FlexGrow TextAlignCenter">
      <a target="_blank"
        rel="noreferrer"
        href={process.env.REACT_APP_SOURCE_CODE_URL}>Source Code @ GitHub</a>
    </div>
  </div>
)

export default Footer