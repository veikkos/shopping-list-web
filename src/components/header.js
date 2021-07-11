const Header = ({ actions }) => (
  <div className="Header Flex">
    <div className="TitleContainer FlexGrow">
      <span className="Title">Shopping List Web</span>
    </div>
    <div className="TitleContainer Right">
      {actions ? actions() : null}
    </div>
  </div>
);

export default Header;