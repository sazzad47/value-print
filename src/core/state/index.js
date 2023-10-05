import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  access_token: null,
  fileLoading: false,
  notification: {show: false, message: null},
  alert: {show: false, title: null, text: null, icon: null, showConfirmButton: true, confirmButtonText: null, onConfirmClick: null},
  category: {isDeleted: false, isEdited: false, isCreated: false},
  features: {},
  model: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserToken: (state, action) => {
      state.access_token = action.payload.access_token
    },
    unSetUserToken: (state, action) => {
      state.access_token = action.payload.access_token
    },
    handleNotification: (state, action) => {
      state.notification = action.payload
    },
    handleAlert: (state, action) => {
      state.alert = action.payload
    },
    handleFileLoading: (state, action) => {
      state.fileLoading = action.payload
    },
    setCategory: (state, action) => {
      state.category = {
        ...state.category,
        ...action.payload
      };
    },
    setModel: (state, action) => {
      state.model = action.payload
    },    
  },
});

export const { setMode, setUserToken, unSetUserToken, handleNotification, handleAlert, setCategory, handleFileLoading, setModel } = globalSlice.actions;

export default globalSlice.reducer;
