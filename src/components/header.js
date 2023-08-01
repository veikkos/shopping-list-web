import React from 'react'
import { isMobile } from 'react-device-detect'

const Header = ({ actions }) => (
  <div className="Header">
    <div className={`HeaderContainer FlexCenter ${isMobile ? '' : 'MaxHeaderWidth'}`}>
      <div className="TitleContainer FlexGrow">
        <span className="White">Shopping List Web</span>
      </div>
      <div className="TitleContainer Right">
        {actions ? actions() : null}
      </div>
    </div>
  </div>
)

export default Header