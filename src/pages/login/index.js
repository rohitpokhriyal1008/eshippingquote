import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/Login/login.css";
import validator from "validator";
import qs from "qs";
import shippingQuoteApiClient from "../../adapters/restClient";
import { authenticationActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {modalActions} from "../../store/modal";

const LoginPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState(" ");
  const [errorField, setErrorField] = useState("");
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  // Add a function to handle the Enter key press event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitLogin();
    }
  };

  const showModal = () => {
    dispatcher(
        modalActions.open({
          modalType: "redirectUser",
          modalData: { redirect: () => navigator("/account") },
        })
    )
  }

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

      if (!data.tokenValidity) navigator("/login");
      else if(data.incompleteAccountDetails) {
        navigator("/account")
        showModal();
      } else navigator("/get-quote/ltl");
    } catch (err) {
      console.error(err);
    }
  };

  const submitLogin = async () => {
    // window.scrollTo({ top: 200, behavior: "smooth" });

    const refs = [emailRef, passwordRef];
    const nullRefs = refs.filter(
      (ref) => ref.current.value.trim() === "" || ref.current.value === null
    );
    if (nullRefs.length !== 0) {
      setErrorField("all");
      setMessage("Please fill all the fields.");
      return;
    }
    //check for email
    if (!validator.isEmail(emailRef.current.value)) {
      setErrorField("email");
      setMessage("Provide a valid email.");
      return;
    }
    // refer to registration component for remarks
    const loginData = qs.stringify({
      username: emailRef.current.value,
      password: passwordRef.current.value,
      grant_type: "password",
    });
    try {
      setSpinner(true);
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/oauth/token",
        data: loginData,
        headers: {
          Authorization: "Basic U2hpcHBpbmdRdW90ZTpFLVNoaXBwaW5nLVF1b3Rl",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setSpinner(false);

      // alert("Logged in !!");
      setMessage("");
      dispatcher(authenticationActions.login({ token: data.access_token }));
      validateToken(data.access_token);
    } catch (err) {
      // the figma designs miss the actions on errors and corresponding UI so alerting as of now
      console.error(err);
      setErrorField("all");
      setMessage("Failed to Login. " + "Invalid Username or Password.");
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) navigator("/get-quote/ltl");
  }, []);

  return (
    <div className="login-container">
      <div className="register-prompt">
        <p>
          Don't have an account yet?{" "}
          <a href="/register">
            Register Now
          </a>
        </p>
      </div>
      <div className="login-form">
        <h2>Login</h2>
        {message && <p className="validation-message">{message}</p>}
        <div className="form-field">
          <span>Email</span>
          <input className={`li-i ${["all", "email"].includes(errorField) ? "field--invalid" : ""}`} ref={emailRef} type="email" />
        </div>
        <div className="form-field">
          <span>Password</span>
          <input className={`li-i ${errorField === "all" ? "field--invalid" : ""}`} ref={passwordRef} type="password" onKeyDown={handleKeyDown}/>
        </div>
        <div className="form-options-rmfp">
          <div className="form-options-rm">
            <input defaultChecked type="checkbox" />
            <span className="customcheckbox"></span>
            <span> Remember me</span>
          </div>
          <div className="form-options-fp">
            <a href={"/forgot-password"}>
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="form-field">
          <button onClick={submitLogin} className="primary-theme-btn">
            {spinner && (
              <FontAwesomeIcon className="login-spinner" icon={faSpinner} />
            )}
            Login
          </button>
        </div>
        <div className="disclosure">
          <p>
            Registering means you agree to the <br />
            <a href="/terms-and-conditions">Terms of Use</a>
            &nbsp;and&nbsp;<a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
