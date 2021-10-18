import React, { useEffect, useState } from "react";
import DrinkModel from "../../model/drinkModel";
import UserSignIn from "../views/userSignIn";
import usePromise from "../../hooks/usePromise";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/user";

const HandleUserSignIn = ({ user, signIn }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [signInError, setSignInError] = useState(false);

  let history = useHistory();

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
      .then((data) => {
        if (data.ok) return data.json();
        else throw new Error("No user with these credentials");
      })
      .then((user) => {
        signIn({
          username: user.username,
          isAdmin: user.credentials === "admin",
        });
        if (user.credentials === "user") history.push("/menu");
        if (user.credentials === "admin") history.push("/customizeMenu");
      })
      .catch((err) => {
        console.log(err);
        setSignInError(true);
      });
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
