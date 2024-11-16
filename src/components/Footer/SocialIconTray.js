import React from "react";
import "./footer.css";
import InstagramLogo from "../../assets/icons/instagramLogo.svg";
import FacebookLogo from "../../assets/icons/facebookLogo.svg";
import LinkedinLogo from "../../assets/icons/linkedinLogo.svg";
const SocialIconTray = (props) => {
  return (
    <div className="social-icons-tray">
      <div>
        <img src={InstagramLogo} alt="il" />
      </div>
      <div>
        <img src={FacebookLogo} alt="fl" />
      </div>
      <div>
        <img src={LinkedinLogo} alt="ll" />
      </div>
    </div>
  );
};

export default SocialIconTray;
