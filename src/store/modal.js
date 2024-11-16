import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalType: "None",
    modalData: null,
  },
  reducers: {
    open(state, { payload }) {
      state.isOpen = true;
      state.modalType = payload.modalType;
      state.modalData = payload.modalData;
    },
    close(state) {
      state.isOpen = false;
      state.modalType = "none";
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;