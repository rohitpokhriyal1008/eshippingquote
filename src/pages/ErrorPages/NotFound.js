import React from "react";
import { useNavigate } from "react-router-dom";
import "../../components/ErrorPages/errorPages.css";
const NotFoundPage = (props) => {
  const navigator = useNavigate();
  return (
    <div className="error-page-container">
      <h1>404</h1>
      <br /><br />
      <h3>There's nothing here...</h3>
      <button onClick={() => navigator("/")} className="primary-theme-btn">
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
