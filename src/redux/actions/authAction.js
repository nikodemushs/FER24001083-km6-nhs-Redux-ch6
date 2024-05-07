import axios from "axios";
import { setMessage, setUsername, setToken } from "../reducers/authReducer";

export const login = (navigate) => async (dispatch, getState) => {
  try {
    const emailData = getState().auth.emailData;
    const passwordData = getState().auth.passwordData;
    const responseLogin = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
      {
        email: emailData,
        password: passwordData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("login :>> ", responseLogin);
    console.log("token :>> ", responseLogin.data.data.token);
    dispatch(setToken(responseLogin.data.data.token));
    if (responseLogin?.status === 200) {
      navigate("/");
      dispatch(setMessage("Login successful"));
    }
    return responseLogin;
  } catch (error) {
    dispatch(setMessage("Login failed because " + error.response.data.message));
    console.error("An error occurred:", error);
  }
};

export const register = (navigate) => async (dispatch, getState) => {
  try {
    const emailData = getState().auth.emailData;
    const passwordData = getState().auth.passwordData;
    const nameData = getState().auth.nameData;
    const responseRegister = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
      {
        email: `${emailData}`,
        password: `${passwordData}`,
        name: `${nameData}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("register :>> ", responseRegister);
    console.log("token :>> ", responseRegister.data.data.token);
    dispatch(setToken(responseRegister.data.data.token));
    if (responseRegister?.status === 201) {
      navigate("/");
      dispatch(setMessage("Register successful"));
    }
    return responseRegister;
  } catch (error) {
    dispatch(
      setMessage("Register failed because " + error.response.data.message)
    );
    console.error("An error occurred:", error);
  }
};

export const getUserData = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = response.data;
    dispatch(setUsername(responseData.data.name));
    if (response.status === 401) {
      // Token expired
      return;
    }
    console.log("Username", responseData.data.name);
  } catch (error) {
    // Handle error
    console.log("Error", error);
  }
};
