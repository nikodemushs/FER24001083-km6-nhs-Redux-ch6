import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailData: "",
  passwordData: "",
  message: "",
  token: "",
  showPassword: false,
  nameData: "",
  username: "",
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmailData: (state, action) => {
      state.emailData = action.payload;
    },
    setPasswordData: (state, action) => {
      state.passwordData = action.payload;
    },
    setNameData: (state, action) => {
      state.nameData = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.emailData = "";
      state.passwordData = "";
      state.message = "";
      state.token = "";
      state.nameData = "";
      state.username = "";
      window.location.reload();
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    clearState: (state) => {
      state.emailData = "";
      state.passwordData = "";
      state.message = "";
      state.nameData = "";
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const {
  setEmailData,
  setPasswordData,
  setNameData,
  setMessage,
  setToken,
  logout,
  setShowPassword,
  clearState,
  setUsername,
} = authSlicer.actions;

export default authSlicer.reducer;
