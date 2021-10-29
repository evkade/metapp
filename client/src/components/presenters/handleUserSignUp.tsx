import React, { useState } from "react";
import UserSignUp from "../views/userSignUp";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../redux/actions/user";

export const HandleUserSignUp = (signUp) => {
  const [userAuth, setUserAuth] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpButton, setSignUpButton] = useState("Create Account");
  const [signUpErrMessage, setSignUpErrMessage] = useState(undefined);

  const history = useHistory();

  const checkUserAuth = (username: string, password: string) => {
    if (username && password) signUpFunc(username, password);
    else {
      setSignUpError(true);
      setSignUpErrMessage("You must provide a username and password");
      setTimeout(() => {
        setSignUpError(false);
      }, 3000);
    }
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
          return data.json();
        } else throw new Error("You couldn't sign up");
      })
      .then(() => {
        setSignUpButton("Successfully created account: " + username);
        setTimeout(() => {
          setSignUpButton("Create Account");
          history.push("/logIn");
        }, 2000);
      })
      .catch((err) => {
        setSignUpError(true);
        setSignUpErrMessage(err);
        setTimeout(() => {
          setSignUpError(false);
        }, 3000);
      });
  };

  return (
    <UserSignUp
      userAuth={userAuth}
      checkUserAuth={(username, password) => checkUserAuth(username, password)}
      signUpError={signUpError}
      signUpButton={signUpButton}
      signUpErrMessage={signUpErrMessage}
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
