import React from "react";
import { useHistory } from "react-router-dom";
import "../components.scss";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

const EntryView = () => {
  let history = useHistory();

  return (
    <div className="entryView">
      <div className="entryView__logos">
        <img src={mkmlogo} />
        <img src={dkmlogo} />
      </div>
      <div className="entryView__neonText">METAPP</div>
      <div>
        <button
          onClick={() => history.push("/signIn")}
          className="entryView__buttons entryView__buttons--yellow"
        >
          log in
        </button>
        <button className="entryView__buttons entryView__buttons--green">
          sign up
        </button>
      </div>
    </div>
  );
};

export default EntryView;
