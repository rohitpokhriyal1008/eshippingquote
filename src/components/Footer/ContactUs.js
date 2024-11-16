import React from "react";
import "./footer.css";
const ContactUs = (props) => {
  return (
    <div className="contact-div">
      <input
        type="email"
        placeholder="Enter your mail address and we will get back to you."
      />
      <button className="secondary-theme-btn">SEND</button>
    </div>
  );
};

export default ContactUs;
