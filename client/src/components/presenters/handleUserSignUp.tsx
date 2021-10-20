import React, { useState } from "react";
import UserSignUp from "../views/userSignUp";

export const HandleUserSignUp = () => {
  const [userAuth, setUserAuth] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const checkUserAuth = (username: string, password: string) => {
    //todo: add user to database
    setUserAuth(true);
    // todo: error handling for user sign up (like database is down and stuff)
    // else if (username != "username" || password != "password") {
    //   setSignUpError(true);
    // }
  };

  return (
    <UserSignUp
      userAuth={userAuth}
      checkUserAuth={(username, password) => checkUserAuth(username, password)}
      // signInError={signInError}
    />
  );
};
