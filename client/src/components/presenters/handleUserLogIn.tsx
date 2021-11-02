import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import UserModel from "../../model/userModel";
import GeneralUserForm from "../views/generalUserForm";

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
    <GeneralUserForm
      handleUserAction={checkUserAuth}
      authError={logInError}
      buttonText="Log In"
      username={username}
      setUsername={setUsername}
      pwd={pwd}
      setPwd={setPwd}
      errMessage={logInErrorMessage}
      title="Log in"
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
