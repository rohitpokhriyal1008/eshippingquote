import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/new-logo.svg";

import "./footerLoggedIn.css";

const Footer = (props) => {
  return (
    <div className="footer--logged-in">
      <div className="footer-content">
        <span>
          © {new Date().getFullYear} E-Shipping Quote, Inc. All Rights Reserved.
        </span>
        <ul className="foot-list">
          <li>
            <Link to="/terms-and-conditions" className="link">
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="link">
              Privacy Rights
            </Link>
          </li>
          <li>
            <Link to="/sitemap" className="link">
              Sitemap
            </Link>
          </li>
          <li>
            <Link to="/cookie-preferences" className="link">
              Cookie Preferences
            </Link>
          </li>
        </ul>
      </div>
      <div className="img-cont">
        <img src={logo} alt="visa" />
      </div>
    </div>
  );
};

export default Footer;
