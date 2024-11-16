import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./header.css";
import HeaderIcon from "./HeaderIcon";
import HeaderNavigation from "./HeaderNavigation";
import HeaderUserAccount from "./HeaderUserAccount";
import MobileHeader from "./MobileHeader";

const Header = (props) => {
  const platformView = useSelector((state) => state.platformView);
  if (platformView.renderViewType === "mobile") {
    return <MobileHeader />;
  }

  return (
    <div className="header">
      <HeaderIcon />
      <HeaderNavigation />
      <HeaderUserAccount />
    </div>
  );
};

export default Header;
