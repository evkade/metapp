import React, { useState } from "react";
import Fingerprint from "../images/fingerprint.png";

const UserSignUp = ({
  userAuth,
  checkUserAuth,
  signUpError,
  signUpButton,
  username,
  setUsername,
  pwd,
  setPwd,
}) => {
  return (
    <>
      <div
        className="user-form container--general"
        onKeyDown={(e) => {
          if (e.key === "Enter") checkUserAuth(username, pwd);
        }}
      >
        {!userAuth && (
          <>
            <div className="user-form__card">
              <div className="user-form__flex-row">
                <div className="user-form__logo">
                  <img src={Fingerprint} />
                </div>
                <div className="user-form__title">Sign up</div>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="username"
                  className="input-container__element"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                ></input>
                <input
                  type="password"
                  name="password"
                  className="input-container__element"
                  placeholder="Password"
                  value={pwd}
                  onChange={(event) => setPwd(event.target.value)}
                ></input>
                <button
                  className="input-container__element input-container__button"
                  onClick={() => {
                    checkUserAuth(username, pwd);
                  }}
                  disabled={signUpButton !== "Create Account"}
                >
                  {signUpButton}
                </button>
              </div>
            </div>
            <div className="user-form__errElement">
              {signUpError && (
                <>
                  🚫 Something went wrong, there's already a user with these
                  credentials
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserSignUp;
