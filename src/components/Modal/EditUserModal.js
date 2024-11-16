import React, { useRef } from "react";
import "./modal.css";
import CancelIcon from "../../assets/icons/cancel.svg";
import shippingQuoteApiClient from "../../adapters/restClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const EditUserModal = (props) => {
  const emailRef = useRef(null);
  const userTypeRef = useRef(null);
  const auth = useSelector((state) => state.auth);
  const navigator = useNavigate();
  const { modalData } = props;
  const editUser = async () => {
    try {
      if (!userTypeRef.current.value || !emailRef.current.value) {
        throw new Error("Provide all fields");
      }
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/users/accountAction",
        data: {
          email: emailRef.current.value,
          userType: userTypeRef.current.value,
          actionType: "edit",
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!data.accountAction) {
        throw new Error("Failed to edit account, make sure it doesn't exist");
      }
      navigator(0);
    } catch (err) {
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
      <h4>Do you want to edit this user?</h4>
      <p>Enter user details</p>
      <div className="form-field">
        <span>Email</span>
        <input
          value={modalData.email}
          readOnly
          disabled
          ref={emailRef}
          type="email"
        />
      </div>
      <div className="form-field">
        <span>User Type</span>
        <select ref={userTypeRef} defaultValue={modalData.userType}>
          <option value="Analyst">Analyst</option>
          <option value="Manager">Manager</option>
          <option value="Super Manager">Super Manager</option>
        </select>
      </div>
      <div className="btn-tray">
        <button className="primary-theme-btn" onClick={editUser}>
          EDIT
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

export default EditUserModal;
