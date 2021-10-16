import React, { useEffect } from "react";
import { useState } from "react";
import "../components.scss";
import Fingerprint from "../images/fingerprint.png";
// import { useTransition, animated } from "react-spring";

const UserSignIn = ({ userAuth, signin, signInError }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <>
      <div className="signInForm entryView">
        {!userAuth && (
          <>
            <div id="form-login" className="signInForm__form">
              <div className="signInForm__form--flexRow">
                <div className="signInForm__logo">
                  <img src={Fingerprint} />
                </div>
                <div className="signInForm__title">Log in</div>
              </div>
              <div className="signInForm__inputContainer">
                <input
                  type="text"
                  id="signInUsr"
                  name="username"
                  className="signInForm__inputContainer--input"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                ></input>
                <input
                  type="password"
                  id="signInPwd"
                  name="password"
                  className="signInForm__form__input"
                  placeholder="Password"
                  value={pwd}
                  onChange={(event) => setPwd(event.target.value)}
                ></input>
                <button
                  id="signInForm__form__submit"
                  className="signInForm__form__submit"
                  onClick={() => {
                    signin(username, pwd);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            {signInError && (
              <div className="signInForm__errElements">
                <div id="usr-pwdError" className="signInForm__errElement">
                  🚫 There is no user with these credentials.
                </div>
              </div>
            )}
          </>
        )}
        {userAuth && (
          <div className="signInForm--success">
            <div
              id="signInForm__successElement"
              className="signInForm__successElement"
            >
              You're successfully logged in!
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserSignIn;
