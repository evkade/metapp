import React, { useState } from "react";
import Fingerprint from "../images/fingerprint.png";

const GeneralUserForm = ({
  handleUserAction,
  authError,
  buttonText,
  username,
  setUsername,
  pwd,
  setPwd,
  errMessage,
  title,
}) => {
  return (
    <>
      <div
        className="user-form container--general"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleUserAction(username, pwd);
        }}
      >
        <div className="user-form__card">
          <div className="user-form__flex-row">
            <div className="user-form__logo">
              <img src={Fingerprint} />
            </div>
            <div className="user-form__title">{title}</div>
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
                handleUserAction(username, pwd);
              }}
              disabled={
                buttonText !== "Create Account" && buttonText !== "Log In"
              }
            >
              {buttonText}
            </button>
          </div>
        </div>
        <div className="user-form__errElement">
          {authError && <>🚫 {errMessage}</>}
        </div>
      </div>
    </>
  );
};

export default GeneralUserForm;
