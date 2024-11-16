import React from 'react';
import pwc from "../../assets/images/pwc.svg";

const index = () => {
  return (
    <div className="password-confirm-container">
      <h2>Password Updated</h2>
      <img src={pwc} alt="pwc"></img>
      <p>Your password has been updated!</p>
    </div>
  )
}

export default index