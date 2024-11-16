import React from "react";
import { useNavigate } from "react-router-dom";
import "../../components/ComingSoon/comingSoon.css";
const ComingSoonPage = (props) => {
  const navigator = useNavigate();
  return (
    <div className="coming-soon-page-container">
      <h1>Coming Soon</h1>
        <br/><br/>
      <h3>We will launch this product soon.</h3>
      <button onClick={() => navigator("/")} className="primary-theme-btn">
        Go Home
      </button>
    </div>
  );
};

export default ComingSoonPage;
