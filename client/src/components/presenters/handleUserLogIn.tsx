import React, { useState } from "react";
import UserLogIn from "../views/userLogIn";
import usePromise from "../../hooks/usePromise";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions/user";
import { switchCurrentBar } from "../../redux/actions/menu";

const HandleUserLogIn = ({ user, logIn, switchCurrentBar }) => {
  const [logInError, setLogInError] = useState(false);
  const [logInErrorMessage, setLogInErrorMessage] = useState(undefined);

  let history = useHistory();

  const checkUserAuth = (username: string, password: string) => {
    if (username && password) loginFunc(username, password);
    else {
      setLogInError(true);
      setLogInErrorMessage("You must provide a username and password");
    }
  };

  const loginFunc = async (username, password) => {
    await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((data) => {
        if (data.ok) return data.json();
        else {
          throw new Error("There is no user with these credentials");
        }
      })
      .then((user) => {
        logIn({
          _id: user.id,
          username: user.name,
          isAdmin: user.credential === "admin",
        });
        switchCurrentBar(user.credential === "admin" ? user.name : "dkm");
        if (user.credential === "user") {
          history.push("/menu");
        }
        if (user.credential === "admin") history.push("/customizeMenu");
      })
      .catch((err) => {
        setLogInError(true);
        setLogInErrorMessage(`${err.message}`);
      });
  };

  return (
    <UserLogIn
      logIn={checkUserAuth}
      logInError={logInError}
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
    logIn: (user) => dispatch(logIn(user)),
    switchCurrentBar: (bar) => dispatch(switchCurrentBar(bar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleUserLogIn);
