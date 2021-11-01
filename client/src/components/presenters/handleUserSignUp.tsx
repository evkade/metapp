import React, { useState } from "react";
import UserSignUp from "../views/userSignUp";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import UserModel from "../../model/userModel";

const userModel = new UserModel();

const HandleUserSignUp = (signUp) => {
  const [userAuth, setUserAuth] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpButton, setSignUpButton] = useState("Create Account");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [signUpErrMessage, setSignUpErrMessage] = useState(undefined);

  const history = useHistory();

  const checkUserAuth = (username: string, password: string) => {
    if (username && (username.length < 3 || username.length > 20)) {
      showError("Your username has to be 3-20 characters long");
    } else if (
      username &&
      password &&
      (password.length < 3 || password.length > 20)
    ) {
      showError("Your password has to be 3-20 characters long");
    } else if (username && password) {
      userModel.signUpFunc(
        username,
        password,
        setSignUpButton,
        setSignUpError,
        history,
        setSignUpErrMessage
      );
    } else {
      showError("You must provide a username and password");
    }
  };

  const showError = (msg) => {
    setSignUpError(true);
    setSignUpErrMessage(msg);
    setTimeout(() => {
      setSignUpError(false);
    }, 3000);
  };

  return (
    <UserSignUp
      userAuth={userAuth}
      checkUserAuth={(username, password) => checkUserAuth(username, password)}
      signUpError={signUpError}
      signUpButton={signUpButton}
      username={username}
      setUsername={setUsername}
      pwd={pwd}
      setPwd={setPwd}
      signUpErrMessage={signUpErrMessage}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleUserSignUp);
