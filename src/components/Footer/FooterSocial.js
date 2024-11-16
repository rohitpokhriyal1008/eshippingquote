import React from "react";
import ContactUs from "./ContactUs";
import "./footer.css";
import SocialIconTray from "./SocialIconTray";
const FooterSocial = (props) => {
  return (
    <div className="footer-social">
      <p>CONTACT US</p>
      <ContactUs />
      <SocialIconTray />
    </div>
  );
};
export default FooterSocial;
