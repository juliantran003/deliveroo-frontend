import logo from "../img/Deliveroo-Logo.png";

const Header = (props) => {
  return (
    <div className={props.headerStyle}>
      <img id="logo" src={logo} alt="logo" />
    </div>
  );
};

export default Header;
