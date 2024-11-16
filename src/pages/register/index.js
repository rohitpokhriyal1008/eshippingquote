import React, { useRef, useEffect } from "react";
import { useState } from "react";
import "../../components/Register/register.css";
import PitchImg1 from "../../assets/images/pitchImg1.svg";
import PitchImg2 from "../../assets/images/pitchImg2.svg";
import PitchImg3 from "../../assets/images/pitchImg3.svg";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import shippingQuoteApiClient from "../../adapters/restClient";
import qs from "qs";
import { authenticationActions } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = (props) => {
  //once i will finalize and refactor the code, we can use dynamic refs
  const [spinner, setSpinner] = useState(false);
  const [errorField, setErrorField] = useState("");
  const auth = useSelector((state) => state.auth);
  const navigator = useNavigate();
  const nameRef = useRef(null);
  const companyNameRef = useRef(null);
  const phoneNumeberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispacher = useDispatch();
  const confirmPasswordRef = useRef(null);
  const [message, setMessage] = useState(" ");

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
      else if (data.incompleteAccountDetails) navigator("/account");
      else navigator("/get-quote/ltl");
    } catch (err) {
      console.error(err);
      // alert("Failed to get user details");
    }
  };

  const submitRegisterForm = async (e) => {
    // window.scrollTo({ top: 100, behavior: "smooth" });
    //validations
    const refs = [
      nameRef,
      companyNameRef,
      phoneNumeberRef,
      emailRef,
      passwordRef,
      confirmPasswordRef,
    ];
    const nullRefs = refs.filter(
      (ref) => ref.current.value.trim() === "" || ref.current.value === null
    );
    if (nullRefs.length !== 0) {
      window.scrollTo({ top: 300, behavior: "smooth" });
      setErrorField("all");
      setMessage("All fields are mandatory. Please fill all the details.");
      return;
    }
    //check for email
    if (!validator.isEmail(emailRef.current.value)) {
      window.scrollTo({ top: 300, behavior: "smooth" });
      setErrorField("email");
      setMessage("Please provide a valid E-mail.");
      return;
    }
    if (!validator.isMobilePhone(phoneNumeberRef.current.value, "en-US")) {
      window.scrollTo({ top: 300, behavior: "smooth" });
      setErrorField("phone");
      setMessage("Please Provide a valid phone number. It should be a 10 digit phone number.");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      // alert("Password's do not match");
      setErrorField("password");
      setMessage("Passwords do not match.");
      return;
    }
    const registerationData = {
      fullName: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      companyName: companyNameRef.current.value,
      phoneNumber: phoneNumeberRef.current.value,
    };

    try {
      setSpinner(true);
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/users/registration",
        data: registerationData,
      });
      if (!data.registrationSuccessfull) {
        throw new Error(data.message);

      }
      setSpinner(false);
      setErrorField("email");
      // alert("Registration Successfull!");
      setMessage("Registration Successfull!");

      const loginData = qs.stringify({
        username: emailRef.current.value,
        password: passwordRef.current.value,
        grant_type: "password",
      });

      try {
        const { data } = await shippingQuoteApiClient({
          method: "post",
          url: "/oauth/token",
          data: loginData,
          headers: {
            Authorization: "Basic U2hpcHBpbmdRdW90ZTpFLVNoaXBwaW5nLVF1b3Rl",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        dispacher(authenticationActions.login({ token: data.access_token }));
        validateToken(data.access_token);
      } catch (err) {
        // the figma designs miss the actions on errors and corresponding UI so alerting as of now
        console.error(err);
        // alert("Failed to Login, " + err.message);

        setMessage("Failed to Login, " + err.message);

      }

      // navigator("/login");
    } catch (err) {
      // the figma designs miss the actions on errors and corresponding UI so alerting as of now
      console.error(err);

      // alert("Failed to register, " + err.message);

      setMessage("Failed to register. " + err.message);
      window.scrollTo({ top: 300, behavior: "smooth" });
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) navigator("/");
  }, []);
  
  return (
    <div className="register-container">
      <div className="registration-pitch">
        <div>
          <img src={PitchImg1} alt="rpi" />
          <p>Unlimited Quotes</p>
        </div>
        <div>
          <img src={PitchImg2} alt="rpi" />
          <p>Always Competitive Rates</p>
        </div>
        <div>
          <img src={PitchImg3} alt="rpi" />
          <p>High Quality Service</p>
        </div>
      </div>
      <div className="login-prompt">
        <p>
          Already have an account?{" "}
          <span onClick={() => navigator("/login")}>Login Now</span>
        </p>
      </div>
      <div className="register-form">
        <h2>Create your free account</h2>
        {message && <p className="validation-message">{message}</p>}

        <div className="form-field">
          <span>First Name + Last Name</span>
          <input className={`li-i ${errorField === "all" && !nameRef.current.value ? "field--invalid" : ""}`} ref={nameRef} type="text" />
        </div>
        <div className="form-field">
          <span>Company Name</span>
          <input className={`li-i ${errorField === "all" && !companyNameRef.current.value ? "field--invalid" : ""}`} ref={companyNameRef} type="text" />
        </div>
        <div className="form-field">
          <span>Phone Number (10 digits)</span>
          <input className={`li-i ${["all", "phone"].includes(errorField) ? "field--invalid" : ""}`} ref={phoneNumeberRef} type="tel" />
        </div>
        <div className="form-field">
          <span>Email</span>
          <input className={`li-i ${["all", "email"].includes(errorField) ? "field--invalid" : ""}`} ref={emailRef} type="email" />
        </div>
        <div className="form-field">
          <span>Password</span>
          <input className={`li-i ${["all", "password"].includes(errorField) && !passwordRef.current.value ? "field--invalid" : ""}`} ref={passwordRef} type="password" />
        </div>
        <div className="form-field">
          <span>Confirm Password</span>
          <input className={`li-i ${["all", "password"].includes(errorField) && !confirmPasswordRef.current.value ? "field--invalid" : ""}`} ref={confirmPasswordRef} type="password" />
        </div>
        <div className="form-field">
          <button className="primary-theme-btn" onClick={submitRegisterForm}>
            {spinner && (
              <FontAwesomeIcon className="login-spinner" icon={faSpinner} />
            )}
            Sign Up
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

export default RegisterPage;
