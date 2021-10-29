import {
  fetchRequest,
  logIn,
  signOut,
  addFavorite,
  removeFavorite,
} from "../redux/actions/user";
import { switchCurrentBar } from "../redux/actions/menu";

export default class UserModel {
  checkValidUser() {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/auth/currentuser", {
        credentials: "include",
      })
        .then((data) => data.json())
        .then((user) => {
          dispatch(logIn(user.currentUser));
          dispatch(
            switchCurrentBar(
              user.currentUser.isAdmin ? user.currentUser.username : "dkm"
            )
          );
        })
        .catch((err) => console.log("No signed in user"));
    };
  }

  loginFunc(username, password, history, setLogInError) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/auth/signin", {
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
          dispatch(
            logIn({
              _id: user.id,
              username: user.name,
              isAdmin: user.credential === "admin",
            })
          );
          dispatch(
            switchCurrentBar(user.credential === "admin" ? user.name : "dkm")
          );
          if (user.credential === "user") {
            history.push("/menu");
          }
          if (user.credential === "admin") history.push("/customizeMenu");
        })
        .catch((err) => {
          console.log(err);
          setLogInError(true);
        });
    };
  }

  signUpFunc(username, password, setSignUpButton, setSignUpError, history) {
    fetch("http://localhost:5000/api/auth/signup", {
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
        console.log(err);
        setSignUpError(true);
        setTimeout(() => {
          setSignUpError(false);
        }, 3000);
      });
  }

  logOut(setPathName, history) {
    return (dispatch) => {
      fetch("http://localhost:5000/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // @ts-ignore
      }).then(() => {
        dispatch(signOut());
        setPathName("/");
        history.push("/");
      });
    };
  }
}
