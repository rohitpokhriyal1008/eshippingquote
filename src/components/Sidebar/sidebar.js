import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import shippingQuoteApiClient from "../../adapters/restClient";
import auth, { authenticationActions } from "../../store/auth";

import "./sidebar.css";
import close from "../../assets/icons/close.svg";
import ltl from "../../assets/images/side-ltl.svg";
import ftl from "../../assets/images/side-ftl.svg";
import fc from "../../assets/images/side-fc.svg";
import fbq from "../../assets/images/side-fbq.svg";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const dispacher = useDispatch();
  const { isOpen, toggleSidebar } = props;
  const auth = useSelector((state) => state.auth);
  const sideNavRef = useRef(null);
  const sideNavContainerRef = useRef(null);

  const [accountDetails, setAccountDetails] = useState({
    incompleteAccountDetails: false,
    name: "",
    phoneNumber: "",
    email: "",
    companyName: "",
  });

  const fetchAccountDetails = async () => {
    try {
      const { data: accountData } = await shippingQuoteApiClient({
        method: "get",
        url: "/api/users/myAccount",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setAccountDetails(accountData);
    } catch (err) {
      console.error(err);
    }
  };

  const accountMenuCallback = (cb) => {
    toggleSidebar(false);
    cb();
  };

  const handleClickOutside = (event) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target) && event.target.className !== "toggle-icon" && sideNavContainerRef.current.className === "sidebar open") {
      toggleSidebar(false);
    }
  }

  useEffect(() => {
    if (auth.isAuthenticated) fetchAccountDetails();
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (isOpen) document.body.style.position = 'fixed';
    else document.body.style.position = 'relative';
  }, [isOpen]);

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`} ref={sideNavContainerRef}>
        <div className="sidebar-cont" ref={sideNavRef}>
          {auth.isAuthenticated && (
            <>
              <div className="cont--1">
                <p>
                  Hello,
                  <br />
                  {accountDetails.name === null ? "User" : accountDetails.name}
                </p>
              </div>
              <div className="user-details-cont">
                <h2 className="cont--2-head">Your Account</h2>
                <div className="user-details">
                  <Link onClick={() => toggleSidebar(false)} to="/account" className="link">
                    Account Details
                  </Link>
                  <Link onClick={() => toggleSidebar(false)} to="/user-management" className="link">
                    User Management
                  </Link>
                  <Link
                    onClick={() => toggleSidebar(false)}
                    to="/new-password"
                    className="link"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            </>
          )}

          {!auth.isAuthenticated && (
            <div className="user-actions">
              <Link
                onClick={() => toggleSidebar(false)}
                to="/login"
                className="sign-btn btn"
              >
                Sign in
              </Link>
              <Link
                onClick={() => toggleSidebar(false)}
                to="/register"
                className="register-btn btn"
              >
                Register
              </Link>
            </div>
          )}

          <div className="cont--2">
            <h2 className="cont--2-head">Get Shipping Quote</h2>
            <div
              className={
                auth.isAuthenticated
                  ? "shipping-quotes-cont"
                  : "shipping-quotes-cont shipping-quotes-cont--unauth"
              }
            >
              <div className="quote-cont--1">
                <div
                  onClick={() => {
                    toggleSidebar(false);
                    navigate("/get-quote/ltl");
                  }}
                  className="img-cont"
                >
                  <img src={ltl}></img>
                </div>
                <p>Less than Truckload</p>
              </div>
              {/* {auth.isAuthenticated && (
                <div className="quote-cont--2">
                  <div
                    onClick={() => {
                      toggleSidebar(false);
                      navigate("/get-quote/ftl");
                    }}
                    className="img-cont"
                  >
                    <img src={ftl}></img>
                  </div>
                  <p>Full Truckload</p>
                </div>
              )} */}

              <div className="quote-cont--3">
                <div
                  onClick={() => {
                    toggleSidebar(false);
                    navigate("/get-quote/container");
                  }}
                  className="img-cont"
                >
                  <img src={fc}></img>
                </div>
                <p>Full Container</p>
              </div>
              {auth.isAuthenticated && (
                <div className="quote-cont--4">
                  <div
                    onClick={() => {
                      toggleSidebar(false);
                      navigate("/get-batch-quote");
                    }}
                    className="img-cont"
                  >
                    <img src={fbq}></img>
                  </div>
                  <p>Batch Quote</p>
                </div>
              )}
            </div>
          </div>
          {auth.isAuthenticated && (
            <>
              <div className="user-details-cont">
                <h2 className="cont--2-head">Your Shipping History</h2>
                <div className="user-details">
                  <Link
                    onClick={() => toggleSidebar(false)}
                    to="/shipments"
                    className="link"
                  >
                    List Shipments
                  </Link>
                </div>
              </div>
              <Link
                onClick={() =>
                  accountMenuCallback(() => {
                    dispacher(authenticationActions.logout());
                  })
                }
                to="/login"
                className="sign-out-btn"
              >
                Sign Out
              </Link>
            </>
          )}
          {!auth.isAuthenticated && (
            <div className="cont--3">
              <Link
                onClick={() => toggleSidebar(false)}
                to="/contact-us"
                className="contact-link"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
        <div className="workaround-cont">
          <div className="close-sidebar-cont">
            <img src={close}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
