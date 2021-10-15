import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DrinkModel from "../../model/drinkModel";
import UserSignIn from "../views/userSignIn";
import usePromise from "../../hooks/usePromise";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/user";

const HandleUserSignIn = ({ user, signIn }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const history = useHistory();

  const handleUserAuthDisplay = (param: boolean) => {
    setUserAuth(param);
    console.log(userAuth);
  };

  const checkUserAuth = (username: string, password: string) => {
    if (username && password) signinFunc(username, password);
    else setSignInError(true);
  };

  const signinFunc = async (username, password) => {
    await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((data) => data.json())
      .then((user) =>
        signIn({
          username: user.username,
          isAdmin: user.credentials === "admin",
        })
      );
    history.push("/vieworders");
  };

  return (
    <UserSignIn
      userAuth={userAuth}
      signin={checkUserAuth}
      signInError={signInError}
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
    signIn: (user) => dispatch(signIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleUserSignIn);
