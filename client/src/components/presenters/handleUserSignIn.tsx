import React, { useEffect, useState } from "react";
import DrinkModel from "../../model/drinkModel";
import UserSignIn from "../views/userSignIn";
import usePromise from "../../hooks/usePromise";

export const HandleUserSignIn = () => {
  const [userAuth, setUserAuth] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const handleUserAuthDisplay = (param: boolean) => {
    setUserAuth(param);
    console.log(userAuth);
  };

  const checkUserAuth = (username: string, password: string) => {
    if (username == "username" && password == "password") {
      setUserAuth(true);
    } else if (username != "username" || password != "password") {
      setSignInError(true);
    }
  };

  return (
    <UserSignIn
      userAuth={userAuth}
      checkUserAuth={(username, password) => checkUserAuth(username, password)}
      signInError={signInError}
    />
  );
};
