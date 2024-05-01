import React from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { setToken, setUsername } from "./redux/reducers/authReducer";
import { useDispatch } from "react-redux";

function Facebook({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = (response) => {
    console.log("Login Success!", response);
    const { accessToken } = response;
    dispatch(setToken(accessToken));
    navigate("/");
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed!", error);
  };

  const handleProfileSuccess = (response) => {
    console.log("Get Profile Success!", response);

    dispatch(setUsername(response.name));
  };

  return (
    <FacebookLogin
      appId="1178466979811829"
      onSuccess={handleLoginSuccess}
      onFail={handleLoginFailure}
      onProfileSuccess={handleProfileSuccess}
    >
      {" "}
      {buttonText}
    </FacebookLogin>
  );
}

export default Facebook;
