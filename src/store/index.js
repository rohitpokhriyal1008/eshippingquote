import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modalReducer from "./modal";
import quoteReducer from "./quote";
import platforViewsReducer from "./platfromViews";
const store = configureStore({
  reducer: {
    auth: authReducer,
    quote: quoteReducer,
    modal: modalReducer,
    platformView: platforViewsReducer,
  },
});

export default store;
