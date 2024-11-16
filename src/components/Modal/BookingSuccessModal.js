import React from "react";
import "./modal.css";
import CancelIcon from "../../assets/icons/cancel.svg";

const AddUserModal = (props) => {
    return (
        <div className="modal-content add-account-modal">
            <span className="close" onClick={props.closeModal}>
                <img
                    style={{ height: "20px", width: "20px" }}
                    src={CancelIcon}
                    alt="ci"
                />
            </span>
            <h4>Booking Successfull</h4>
            <p>{props.ModalData.successMsg}</p>            
            <div className="btn-tray">
                <button className="primary-theme-btn" onClick={() => props.ModalData.closeBookingModal()}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddUserModal;
