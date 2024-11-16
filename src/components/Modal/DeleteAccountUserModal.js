import React from "react";
import "./modal.css";
import CancelIcon from "../../assets/icons/cancel.svg";
import CrossIcon from "../../assets/icons/cross.svg";
import shippingQuoteApiClient from "../../adapters/restClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DeleteAccountUserModal = (props) => {
  const { modalData } = props;
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const deleteAccount = async () => {
    try {
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/users/accountAction",
        data: {
          ...modalData,
          actionType: "delete",
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!data.accountAction) {
        throw new Error("Failed to delelte account");
      }
      navigate(0);
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
      <h4>Are you sure you want to delete account?</h4>
      <p>Your account account be restored.</p>

      <div className="btn-tray">
        <button
          className="primary-theme-btn"
          style={{ background: "#E73E3E" }}
          onClick={deleteAccount}
        >
          YES, DELETE
          <img
            style={{ position: "relative", top: "2px", right: "-5px" }}
            src={CrossIcon}
          />
        </button>
        <button
          className="secondary-theme-btn"
          style={{ color: "black" }}
          onClick={props.closeModal}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountUserModal;
