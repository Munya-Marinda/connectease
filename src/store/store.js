import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./features/contacts/contactsSlice";

export default configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
