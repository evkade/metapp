import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../components.scss";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

const Drink = ({ item, index, addToOrder, removeFromOrder, count }) => {
  return (
    <div key={index} className="menuView__drinkCard">
      <img src="" className="menuView__drinkCard__image" />
      <div className="menuView__drinkCard__name">{item.name}</div>
      <div className="menuView__drinkCard__pricealc">
        {item.price} SEK | {item.alc} %
      </div>
      <div className="menuView__drinkCard__addToCart">
        <button onClick={() => addToOrder(item.name)}>+</button>
        <span> {count} </span>
        <button onClick={() => removeFromOrder(item.name)}>-</button>
      </div>
    </div>
  );
};

export default Drink;
