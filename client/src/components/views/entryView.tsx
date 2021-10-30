import React from "react";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

const EntryView = ({ history }) => {
  return (
    <div className="container--general entry-view">
      <div className="entry-view__logos">
        <img src={mkmlogo} />
        <img src={dkmlogo} />
      </div>
      <div className="entry-view__neon-text">METAPP</div>
      <div>
        <button
          onClick={() => history.push("/logIn")}
          className="neon-button neon-button--yellow"
        >
          log in
        </button>
        <button
          onClick={() => history.push("/signUp")}
          className="neon-button neon-button--green"
        >
          sign up
        </button>
      </div>
    </div>
  );
};

export default EntryView;
