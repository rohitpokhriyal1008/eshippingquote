import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderNavigation = (props) => {
  const auth = useSelector((state) => state.auth);
  const [navigationMap, setNavigationMap] = useState([
    {
      slugs: [""],
      className: "secondary-theme-btn",
      text: "HOME",
      href: "/",
      // showOn: "all",
      showOn: "no_auth",
    },
    {
      slugs: [
        "get-quote",
        "get-quoteltl",
        "get-quoteftl",
        "get-quotecontainer",
        "get-quote-result",
      ],
      className: "secondary-theme-btn",
      text: "GET QUOTE",
      href: "/get-quote",
      showOn: "all",
    },
    {
      slugs: ["get-batch-quote"],
      className: "secondary-theme-btn",
      text: "BATCH QUOTE",
      href: "/get-batch-quote",
      showOn: "auth",
    },
    {
      slugs: ["blog"],
      className: "secondary-theme-btn",
      text: "BLOG",
      href: "/blog",
      showOn: "no_auth",
    },
    {
      slugs: ["contact-us"],
      className: "secondary-theme-btn",
      text: "CONTACT US",
      href: "/contact-us",
      showOn: "no_auth",
    },
    {
      slugs: ["shipments"],
      className: "secondary-theme-btn",
      text: "SHIPMENTS",
      href: "/shipments",
      showOn: "auth",
    },
  ]);
  const navigator = useNavigate();
  const location = useLocation();
  const getParsedPath = (text) => text.replace(/\//g, "");
  return (
    <div className="header-navigation">
      {(auth.isAuthenticated
        ? navigationMap.filter(
            (link) => link.showOn === "auth" || link.showOn === "all"
          )
        : navigationMap.filter(
            (link) => link.showOn === "no_auth" || link.showOn === "all"
          )
      ).map((link) => {
        return (
          <button
            key={link.slugs.join("")}
            className={
              link.className +
              (link.slugs.includes(getParsedPath(location.pathname))
                ? " btn-selected"
                : "")
            }
            onClick={() => navigator(link.href)}
          >
            {link.text}
          </button>
        );
      })}
    </div>
  );
};

export default HeaderNavigation;
