import React, { useRef, useState } from "react";
import validator from "validator";

import shippingQuoteApiClient from "../../adapters/restClient";

import "../../components/ContactUs/contactUs.css";

const ContactUsPage = (props) => {
  const nameRef = useRef(null);
  const companyNameRef = useRef(null);
  const phoneNumeberRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageUserRef = useRef(null);
  const [message, setMessage] = useState(" ");

  const submitForm = async (e) => {
    e.preventDefault();
    // validations
    const refs = [nameRef, companyNameRef, phoneNumeberRef, emailRef];

    const nullRefs = refs.filter(
      (ref) => ref.current.value.trim() === "" || ref.current.value === null
    );

    if (nullRefs.length !== 0) {
      window.scrollTo({top: 0, behavior: "smooth"});
      setMessage("Please fill all the fields.");
      return;
    }

    if (!validator.isEmail(emailRef.current.value)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMessage("Provide a valid email.");
      return;
    }

    if (!validator.isMobilePhone(phoneNumeberRef.current.value)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMessage("Provide a valid phone number.");
      return;
    }

    const contactUsData = {
      name: nameRef.current.value,
      companyName: companyNameRef.current.value,
      phoneNumber: phoneNumeberRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageUserRef.current.value,
    };

    try {
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/contactUs",
        data: contactUsData,
      });
      if (!data.status) {
        throw new Error(data.message);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMessage(data.message);
    } catch (err) {
      // the figma designs miss the actions on errors and corresponding UI so alerting as of now
      console.error(err);

      setMessage("Failed to send, " + err.message);
    }
  };

  return (
    <div className="contact-us-container">
      <h2>CONTACT US</h2>
      <h4>
        Got something to ask? <br />
        Email us and we will get right back to you!
      </h4>
      {message && <p className="validation-message">{message}</p>}

      <div className="contact-us-form">
        <div className="form-field">
          <span>First Name + Last Name*</span>
          <input ref={nameRef} type="text" />
        </div>
        <div className="form-field">
          <span>Company Name*</span>
          <input ref={companyNameRef} type="text" />
        </div>
        <div className="form-field">
          <span>Phone Number (10 digit)*</span>
          <input ref={phoneNumeberRef} type="tel" />
        </div>
        <div className="form-field">
          <span>Email Address*</span>
          <input ref={emailRef} type="email" />
        </div>
        <div className="form-field">
          <span>Subject*</span>
          <input ref={subjectRef} type="text" />
        </div>
        <div className="form-field">
          <span>Message*</span>
          <textarea ref={messageUserRef} />
        </div>
        <div className="form-field">
          <button onClick={submitForm} className="primary-theme-btn">
            Send
          </button>
        </div>
        <div className="disclosure">
          <p>Thank you for choosing for shipping with us.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
