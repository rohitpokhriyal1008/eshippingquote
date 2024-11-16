import { useState } from "react";
import "./mobileHeader.css";
import logo from "../../assets/icons/mobile-logo.svg";
import hamburger from "../../assets/icons/hamburger.svg";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileHeader = () => {
  const auth = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = (val) => {
    setIsOpen(val);
  }
  const navigate = useNavigate();

  return (
    <>
      <div className="mobile-header">
        <div onClick={() => toggleSidebar(!isOpen)} className="toggle-icon-cont">
          <img className="toggle-icon" src={hamburger} alt="hamburger"></img>
        </div>

        <div
          onClick={() => {
            navigate("/");
          }}
          className={
            "logo-cont" + auth.isAuthenticated ? " logo-cont-auth" : ""
          }
        >
          <img style={{ marginTop: "2px" }} src={logo} alt="logo" />
        </div>
        {!auth.isAuthenticated && (
          <div className="actions">
            <Link
              to="/login"
              style={{ color: "#122660" }}
              className="login-btn btn"
            >
              Login
            </Link>
            <Link to="/register" className="start-btn btn">
              get started
            </Link>
          </div>
        )}
      </div>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}></Sidebar>
    </>
  );
};

export default MobileHeader;
