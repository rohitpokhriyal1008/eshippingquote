import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import shippingQuoteApiClient from "../../adapters/restClient";
import "../../components/NewPassword/newPassword.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const NewPasswordPage = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const currentPassword = useRef("");
  const newPassword = useRef("");
  const confirmPassword = useRef("");

  const [message, setMessage] = useState(" ");
  const [spinner, setSpinner] = useState(false);

  const validateToken = async (token) => {
    try {
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/validateToken",
        data: { storedToken: token },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (!data.tokenValidity) navigate("/login");
      /*if (data.incompleteAccountDetails) navigate("/account");*/
    } catch (err) {
      console.error(err);
      // alert("Failed to get user details");
    }
  };

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    validateToken(auth.token);
  }, [auth.token]);

  // useEffect(() => {
  //   setSuccessMessage(false);
  // });

  const newPasswordFormHandler = async (e) => {
    e.preventDefault();

    const newPasswordFormData = {
      currentPassword: currentPassword.current.value,
      newPassword: newPassword.current.value,
      newPasswordConfirm: confirmPassword.current.value,
    };

    try {
      setSpinner(true);

      Object.keys(newPasswordFormData).forEach((key) => {
        if (newPasswordFormData[key] === "")
          throw new Error("Please fill all the fields.");
      });

      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/users/changePassword",
        data: newPasswordFormData,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setSpinner(false);

      if (!data.passwordChanged) {
        throw new Error(data.message);
      }
      navigate("/updated-password");
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit, " + err.message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="new-password-container">
      {/* <div className="register-prompt">
        <p>
          Don't have an account yet?{" "}
          <span onClick={() => navigate("/register")}>Register Now</span>
        </p>
      </div> */}

      <div className="new-password-form">
        <h2>New Password</h2>
        {message && <p className="validation-message">{message}</p>}
        <div className="form-field">
          <span>Current Password</span>
          <input required ref={currentPassword} type="password" />
        </div>
        <div className="form-field">
          <span>New Password</span>
          <input required ref={newPassword} type="password" />
        </div>
        <div className="form-field">
          <span>Confirm New Password</span>
          <input required ref={confirmPassword} type="password" />
        </div>
        <div className="form-field">
          <button
            onClick={newPasswordFormHandler}
            className="primary-theme-btn"
          >
            {" "}
            {spinner && (
              <FontAwesomeIcon className="login-spinner" icon={faSpinner} />
            )}
            Submit
          </button>
        </div>
        <div className="disclosure">
          {/*<p>
            Registering means you agree to the <br />
            <span>Terms of Use</span>
            &nbsp;and&nbsp;<span>Privacy Policy</span>
          </p>*/}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NewPasswordPage;
