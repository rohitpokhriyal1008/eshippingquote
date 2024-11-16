import React from "react";
import "./footer.css";
import FooterIcon from "./FooterIcon";
import FooterList from "./FooterList";
import FooterSocial from "./FooterSocial";

const Footer = (props) => {
  return (
    <div className="footer">
      <FooterIcon />
      <FooterList list={[{ name: "About" }, { name: "Home", link: "/" }]} />
      <FooterList
        list={[
          { name: "Products" },
          { name: "LTL", link: "/get-quote/ltl" },
          // { name: "FCL" },
          { name: "Container", link: "/get-quote/container" },
          { name: "Batch" },
        ]}
      />
      <FooterList
        list={[
          { name: "Account" },
          { name: "Log In", link: "/login" },
          { name: "Sign Up", link: "/register" },
        ]}
      />
      <FooterList
        list={[{ name: "Legal" }, { name: "Privacy" }, { name: "Terms" }]}
      />
      <FooterSocial />
    </div>
  );
};

export default Footer;
