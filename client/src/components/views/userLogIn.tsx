import React, { useState } from "react";
import Fingerprint from "../images/fingerprint.png";

const UserLogIn = ({
  logIn,
  logInError,
  logInErrorMessage,
  username,
  setUsername,
  pwd,
  setPwd,
}) => {
  return (
    <div
      className="container--general user-form"
      onKeyDown={(e) => {
        if (e.key === "Enter") logIn(username, pwd);
      }}
    >
      <div className="user-form__card">
        <div className="user-form__flex-row">
          <div className="user-form__logo">
            <img src={Fingerprint} />
          </div>
          <div className="user-form__title">Log in</div>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input-container__element"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-container__element"
            value={pwd}
            onChange={(event) => setPwd(event.target.value)}
          ></input>
          <button
            className="input-container__element input-container__button"
            onClick={() => {
              logIn(username, pwd);
            }}
          >
            Log in
          </button>
        </div>
      </div>
      <div className="user-form__errElement">
        {logInError && <>🚫 {logInErrorMessage}</>}
      </div>
    </div>
  );
};

export default UserLogIn;
