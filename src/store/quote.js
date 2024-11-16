import { createSlice } from "@reduxjs/toolkit";
import uuid from "uuidv4";
const quoteSlice = createSlice({
  name: "quoteConfig",
  initialState: {
    quoteType: "singleQuote",
    quoteId: uuid(),
    pagination: {
      pageNumber: 1,
      pageSize: 200,
      sortBy: "date",
    },
  },
  reducers: {
    writeKey: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
      state.quoteId = uuid();
    },
  },
});

export const quoteActions = quoteSlice.actions;

export default quoteSlice.reducer;
