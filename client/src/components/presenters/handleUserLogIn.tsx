import React, { useState } from "react";
import UserLogIn from "../views/userLogIn";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import UserModel from "../../model/userModel";

const userModel = new UserModel();

const HandleUserLogIn = ({ user, login }) => {
  const [logInError, setLogInError] = useState(false);
  const [logInErrorMessage, setLogInErrorMessage] = useState(undefined);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  let history = useHistory();

  const checkUserAuth = (username: string, password: string) => {
    if (username && password)
      login(username, password, history, setLogInError, setLogInErrorMessage);
    else {
      setLogInError(true);
      setLogInErrorMessage("You must provide a username and password");
    }
  };

  return (
    <UserLogIn
      logIn={checkUserAuth}
      logInError={logInError}
      username={username}
      setUsername={setUsername}
      pwd={pwd}
      setPwd={setPwd}
      logInErrorMessage={logInErrorMessage}
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
    login: (username, password, history, setLogInError, setLogInErrorMessage) =>
      dispatch(
        userModel.loginFunc(
          username,
          password,
          history,
          setLogInError,
          setLogInErrorMessage
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleUserLogIn);
