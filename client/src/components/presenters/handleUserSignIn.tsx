import React, { useEffect,  useState} from "react";
import DrinkModel from "../../model/drinkModel";
import UserSignIn from "../views/userSignIn";
import usePromise from '../../hooks/usePromise';

export const HandleUserSignIn = () => {
  const [userAuth, setUserAuth] = useState(false);

  const handleUserAuthDisplay = (param : boolean) => {
    setUserAuth(param)
  }

  const checkUserAuth = (username : string, password : string) => {
    if(username=="username" && password=="password") {
      handleUserAuthDisplay(true);
    }
    else if(username!="username" || password!="password") {
      handleUserAuthDisplay(false);
    }
  }

  return (
    <UserSignIn
    userAuth={userAuth}
    checkUserAuth={(username, password) => checkUserAuth(username, password)}
    />
  );
};
