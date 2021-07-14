import React from 'react'

const Header = ({ actions }) => (
  <div className="Header Flex">
    <div className="TitleContainer FlexGrow">
      <span className="White">Shopping List Web</span>
    </div>
    <div className="TitleContainer Right">
      {actions ? actions() : null}
    </div>
  </div>
)

export default Header