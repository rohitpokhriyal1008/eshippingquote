import React from "react";
// import Logo from "../../assets/icons/logo-blue.svg";
import Logo from "../../assets/icons/new-logo.svg";
import { useNavigate } from "react-router-dom";

const HeaderIcon = (props) => {
  const navigate = useNavigate();
  return (
    <div className="header-icon">
      <img
        onClick={() => {
          navigate("/");
        }}
        src={Logo}
        alt="icon"
      />
    </div>
  );
};

export default HeaderIcon;
