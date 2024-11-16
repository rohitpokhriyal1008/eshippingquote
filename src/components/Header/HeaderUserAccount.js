import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AccountBanner from "./AccountBanner";

const HeaderUserAccount = (props) => {
  const auth = useSelector((state) => state.auth);
  const [navigationMap, setNavigationMap] = useState([
    {
      slug: "login",
      className: "secondary-theme-btn",
      text: "SIGN IN",
      href: "/login",
    },
    {
      slug: "register",
      className: "primary-theme-btn",
      text: "SIGN UP",
      href: "/register",
    },
  ]);
  const navigator = useNavigate();
  const location = useLocation();
  const getParsedPath = (text) => text.replace(/\//g, "");
  return (
    <div className="header-user-account">
      {!auth.isAuthenticated ? (
        navigationMap.map((link) => {
          return (
            <button
              key={link.slug}
              className={
                link.className +
                (link.slug === getParsedPath(location.pathname)
                  ? " btn-selected"
                  : "")
              }
              onClick={() => navigator(link.href)}
            >
              {link.text}
            </button>
          );
        })
      ) : (
        <AccountBanner />
      )}
    </div>
  );
};

export default HeaderUserAccount;
