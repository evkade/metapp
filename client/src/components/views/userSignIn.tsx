import React from "react";
import { useState } from "react";

const UserSignIn = ({ userAuth, checkUserAuth }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <>
      <div className="signInForm">
        {!userAuth ? (
          <>
            <div id="form-login" className="signInForm__form">
              <h1>Login</h1>
              <input
                type="text"
                id="signInUsr"
                name="username"
                className="signInForm__form__input"
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
                className="signInForm__form__submit"
                onClick={() => {
                  checkUserAuth(username, pwd);
                }}
              >
                Submit
              </button>
            </div>
            <div className="signInForm__errElements">
              <div id="usr-pwdError" className="signInForm__errElement">
                There is no user with these credentials.
              </div>
            </div>
          </>
        ) : (
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
