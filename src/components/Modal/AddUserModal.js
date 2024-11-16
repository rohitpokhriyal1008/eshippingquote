import React, { useRef, useState } from "react";
import "./modal.css";
import CancelIcon from "../../assets/icons/cancel.svg";
import shippingQuoteApiClient from "../../adapters/restClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddUserModal = (props) => {
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const userTypeRef = useRef(null);
  const auth = useSelector((state) => state.auth);
  const navigator = useNavigate();
  const addNewUser = async () => {
    try {
      const emailValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!userTypeRef.current.value || !emailRef.current.value) {
        setError("Provide all fields");
        return;
      }
      if (!emailRef.current.value.match(emailValidator)) {
        setError("Please enter valid email");
        return;
      }
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/users/addAccount",
        data: {
          email: emailRef.current.value,
          userType: userTypeRef.current.value,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!data.accountAdded) {
        setError(data.message);
        return;
      }

      navigator(0);
    } catch (err) {
      setError(err.response.data.error_description);
      console.error(err);
    }
  };

  return (
    <div className="modal-content add-account-modal">
      <span className="close" onClick={props.closeModal}>
        <img
          style={{ height: "20px", width: "20px" }}
          src={CancelIcon}
          alt="ci"
        />
      </span>
      <h4>Add an extra user?</h4>
      <p>Enter new user details</p>
      {error && <span className="error-msg">{error}</span>}
      <div className="form-field">
        <span>Email</span>
        <input ref={emailRef} type="email" />
      </div>
      <div className="form-field">
        <span>User Type</span>
        <select ref={userTypeRef}>
          <option value="">Select</option>
          <option value="Analyst">Analyst</option>
          <option value="Manager">Manager</option>
          <option value="Super Manager">Super Manager</option>
          {/* <option value="owner">Owner</option> */}
        </select>
      </div>
      <div className="btn-tray">
        <button className="primary-theme-btn" onClick={addNewUser}>
          CONFIRM
        </button>
        <button
          className="secondary-theme-btn"
          style={{ color: "black" }}
          onClick={props.closeModal}
        >
          CANCEL
        </button>
      </div>
      <div className="form-field"><p><strong>Analyst:</strong> Ability to book and manage/view their shipments.</p>
        <p><strong>Manager:</strong> Ability to book and manage/view all company shipments.</p>
        <p><strong>Super-Manager:</strong> Ability to book, manage/view all company shipments and add new users.</p>
      </div>
    </div>
  );
};

export default AddUserModal;
