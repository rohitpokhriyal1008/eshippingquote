import React from 'react'
import CancelIcon from "../../assets/icons/cancel.svg";

const RedirectionModal = (props) => {
    const closeFunc = () => {
        props.closeModal();
        props.modalData.redirect();
    }

  return (
      <div className="modal-content add-account-modal">
          <span className="close" onClick={closeFunc}>
              <img
                  style={{ height: "20px", width: "20px" }}
                  src={CancelIcon}
                  alt="ci"
              />
          </span>
          <h4>Account Data Incomplete</h4>
          <p>Please fill all the account details to start using this site.</p>
          <div className="btn-tray" onClick={closeFunc}>
              <button className="secondary-theme-btn">
                  Close
              </button>
          </div>
      </div>
  )
}

export default RedirectionModal