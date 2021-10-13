import React, { useEffect, useState } from "react";
import UserSignUp from "../views/userSignUp";

export const HandleUserSignUp = () => {
  const [userAuth, setUserAuth] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const handleUserAuthDisplay = (param: boolean) => {
    setUserAuth(param);
    console.log(userAuth);
  };

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
