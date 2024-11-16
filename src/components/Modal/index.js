import React from "react";
import "./modal.css";
import "./AddUserModal";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal";
import EditUserModal from "./EditUserModal";
import DeleteAccountUserModal from "./DeleteAccountUserModal";
import RedirectionModal from "./RedirectionModal";
import BookLoadModal from "./BookLoadModal";
import BookingSuccessModal from "./BookingSuccessModal";

const Modal = () => {
  const { isOpen, modalType, modalData } = useSelector((state) => state.modal);
  const dispatcher = useDispatch();
  const closeModal = () => {
    dispatcher(modalActions.close());
  };
  return (
    <div className={"modal " + (isOpen ? "" : "nodisplay")}>
      {modalType === "addUser" && (
        <AddUserModal modalData={modalData} closeModal={closeModal} />
      )}
      {modalType === "deleteUser" && (
        <DeleteUserModal modalData={modalData} closeModal={closeModal} />
      )}
      {modalType === "editUser" && (
        <EditUserModal modalData={modalData} closeModal={closeModal} />
      )}
      {modalType === "deleteAccountUser" && (
        <DeleteAccountUserModal modalData={modalData} closeModal={closeModal} />
      )}
      {modalType === "redirectUser" && (
        <RedirectionModal modalData={modalData} closeModal={closeModal} />
      )}
      {modalType === "bookShipment" && (
        <BookLoadModal modalData={modalData} closeModal={closeModal} />
      )}
      {modalType === "bookingSuccess" && (
        <BookingSuccessModal ModalData={modalData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Modal;
