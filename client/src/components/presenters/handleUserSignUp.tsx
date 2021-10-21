import React, { useState } from "react";
import UserSignUp from "../views/userSignUp";

import UserSignIn from "../views/userSignIn";
import usePromise from "../../hooks/usePromise";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../redux/actions/user";

export const HandleUserSignUp = (signUp) => {
  const [userAuth, setUserAuth] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const history = useHistory();

  const checkUserAuth = (username: string, password: string) => {
    //todo: add user to database
    signUpFunc(username, password);
    setUserAuth(true);
    // todo: error handling for user sign up (like database is down and stuff)
    // else if (username != "username" || password != "password") {
    //   setSignUpError(true);
    // }
  };

  const signUpFunc = async (username, password) => {
    await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((data) => {
        if (data.ok) {
          history.push("/signIn");
          return data.json();
        } else throw new Error("You couldn't sign up");
      })
      .catch((err) => {
        console.log(err);
        setSignUpError(true);
      });
  };

  return (
    <UserSignUp
      userAuth={userAuth}
      checkUserAuth={(username, password) => checkUserAuth(username, password)}
      signUpError={signUpError}
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
    signUp: (user) => dispatch(signUp(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleUserSignUp);
