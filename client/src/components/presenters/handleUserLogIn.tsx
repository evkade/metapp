import React, { useState } from "react";
import UserLogIn from "../views/userLogIn";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import UserModel from "../../model/userModel";

const userModel = new UserModel();

const HandleUserLogIn = ({ user, login }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [logInError, setLogInError] = useState(false);

  let history = useHistory();

  const handleUserAuthDisplay = (param: boolean) => {
    setUserAuth(param);
  };

  const checkUserAuth = (username: string, password: string) => {
    if (username && password) login(username, password, history, setLogInError);
    else setLogInError(true);
  };

  return (
    <UserLogIn
      userAuth={userAuth}
      logIn={checkUserAuth}
      logInError={logInError}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password, history, setLogInError) =>
      dispatch(userModel.loginFunc(username, password, history, setLogInError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleUserLogIn);
