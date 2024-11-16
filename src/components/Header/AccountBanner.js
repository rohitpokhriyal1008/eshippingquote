import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropDownIcon from "../../assets/icons/drop-down.svg";
import SignOutIcon from "../../assets/icons/sign-out.svg";
import auth, { authenticationActions } from "../../store/auth";

const AccountBanner = (props) => {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const navigator = useNavigate();
  const dispacher = useDispatch();
  const toggleAccountMenu = () => {
    setAccountMenuOpen(true);
  };

  const closeAccountMenu = () => {
    setAccountMenuOpen(false);
  }

  const accountMenuCallback = (cb) => {
    toggleAccountMenu();
    cb();
    //
  };

  return (
    <div
        onMouseLeave={closeAccountMenu}
        className="account-banner">
      <button onMouseOver={toggleAccountMenu} className="primary-theme-btn">
        My Account{" "}
        <img
          className={isAccountMenuOpen ? "flip" : ""}
          src={DropDownIcon}
          alt="^"
        />
      </button>
      <div
        className={"account-menu " + (isAccountMenuOpen ? "" : "no-display")}
      >
        <div
          className="hover-1A6D85"
          onClick={() => accountMenuCallback(() => navigator("/new-password"))}
        >
          <span>Change Password</span>
        </div>
        <div
          className="hover-1A6D85"
          onClick={() => accountMenuCallback(() => navigator("/account"))}
        >
          <span>Account Details</span>
        </div>
        <div
          className="hover-1A6D85"
          onClick={() => accountMenuCallback(() => navigator("/user-management"))}
        >
          <span>User Management</span>
        </div>
        <div
          className="hover-E73E3E color-E73E3E"
          onClick={() =>
            accountMenuCallback(() => {
              dispacher(authenticationActions.logout());
              navigator("/login");
            })
          }
        >
          <span>Sign Out</span>
          <img src={SignOutIcon} alt="so" />
        </div>
      </div>
    </div>
  );
};

export default AccountBanner;
