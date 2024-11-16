import { createSlice } from "@reduxjs/toolkit";
const platforViews = createSlice({
  name: "platforViews",
  initialState: {
    renderViewType: "desktop",
    renderOffset: 800,
  },
  reducers: {
    setRenderViewType(state, { payload }) {
      state.renderViewType = payload.viewType;
    },
  },
});

export const platformViewsActions = platforViews.actions;

export default platforViews.reducer;
