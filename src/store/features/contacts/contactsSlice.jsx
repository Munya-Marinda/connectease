import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    value: { contacts: [], contact_id: -1 },
  },
  reducers: {
    contactsReducer: (state = [], action) => {
      switch (action.payload.type) {
        case "UPDATE_CONTACTS":
          state.value.contacts = action.payload?.contacts;
        case "VIEW_CONTACT":
          if (
            action.payload?.contact_id !== undefined &&
            action.payload?.contact_id !== null
          ) {
            state.value.contact_id = action.payload?.contact_id;
          }

        default:
          return state;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { contactsReducer } = contactsSlice.actions;

export default contactsSlice.reducer;
