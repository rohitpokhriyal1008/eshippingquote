import React from "react";
import "./footer.css";
// import LogoWhite from "../../assets/icons/logo-white.svg";
import logo from "../../assets/icons/new-logo.svg";
const FooterIcon = (props) => {
  return (
    <div className="footer-icon">
      <img src={logo} alt="lw" />
    </div>
  );
};

export default FooterIcon;
