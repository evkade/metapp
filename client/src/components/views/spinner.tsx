import React from "react";
import dkmlogo from "../images/dkm_logo.png";
import mkmlogo from "../images/mkm_logo.png";

export const Spinner = ({ bar }) => {
  return (
    <div className="spinner">
      <img src={bar === "dkm" ? dkmlogo : mkmlogo} className="spinner__img" />
    </div>
  );
};
