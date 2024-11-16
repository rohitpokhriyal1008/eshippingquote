import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/ForgotPassword/forgotPassword.css";
import ThumbsUp from "../../assets/icons/thumbs-up.svg";
import shippingQuoteApiClient from "../../adapters/restClient";

const ForgotPasswordPage = (props) => {
  const navigator = useNavigate();
  const emailRef = useRef();
  const [errorField, setErrorField] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const sumbitForgotPaaword = async () => {
    const emailValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRef.current.value || !emailRef.current.value.match(emailValidator)) {
      setErrorField(true);
      setMessage("Please enter a valid email address.");
      return;
    }
    try {
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/users/forgotPassword",
        data: {
          "email": emailRef.current.value
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        setSuccess(true);
      } else {
        setErrorField(true);
        setMessage(data.message);
      }

    } catch (err) {
      console.error(err);
    }
  };

  if (success) {
    return (<div className="forgot-password-container">
      <div className="register-prompt">
        <p>
          Don't have an account yet?{" "}
          <span onClick={() => navigator("/register")}>Register Now</span>
        </p>
      </div>
      <div className="forgot-password-success">
        <img src={ThumbsUp} alt="thumbs-up" />
        <div className="success_msg">
          <div>Perfect!</div>
          <div>Check your email to reset your password.</div>
        </div>
      </div>
    </div>)
  }

  return (
    <div className="forgot-password-container">
      <div className="register-prompt">
        <p>
          Don't have an account yet?{" "}
          <span onClick={() => navigator("/register")}>Register Now</span>
        </p>
      </div>
      <div className="forgot-password-form">
        {message && <p className="validation-message">{message}</p>}
        <h2>Forgot your Password?</h2>
        <p>
          It's alright! Enter your email and we'll send you a link to reset it
        </p>
        <div className="form-field">
          <input className={`li-i ${errorField ? "field--invalid" : ""}`} ref={emailRef} placeholder="Email" type="email" />
          <button onClick={sumbitForgotPaaword} className="primary-theme-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
