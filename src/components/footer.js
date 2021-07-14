import React from 'react'

const Footer = () => (
  <div className="Footer Flex">
    <div className="FlexGrow TextAlignCenter Center"
      style={{ padding: '2px 0' }}>
      <a target="_blank"
        rel="noreferrer"
        href={process.env.REACT_APP_SOURCE_CODE_URL}>Source Code @ GitHub
        <i className="bi-github White"
          style={{ marginLeft: '5px' }}
          role="img"
          aria-label="GitHub" />
      </a>
    </div>
  </div>
)

export default Footer