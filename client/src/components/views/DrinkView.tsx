import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../components.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Drink = ({
  item,
  index,
  addToOrder,
  removeFromOrder,
  count,
  addFavorite,
  removeFavorite,
  favoriteList,
}) => {
  useEffect(() => {
    if (favoriteList.includes(item.name)) {
      activateStar(item.name, true);
    }
  }, [favoriteList]);

  const activateStar = (name, isAlreadyInList) => {
    const star = document.getElementById(`starIcon${index}`);
    const isStarActive = star.classList.contains(
      "menuView__drinkCard__star--active"
    );
    if (!isStarActive && !isAlreadyInList) {
      star.classList.add("menuView__drinkCard__star--active");
      addFavorite(name);
    } else if (!isStarActive && isAlreadyInList) {
      star.classList.add("menuView__drinkCard__star--active");
    } else {
      star.classList.remove("menuView__drinkCard__star--active");
      removeFavorite(name);
    }
  };

  return (
    <div key={index} className="menuView__drinkCard">
      <FontAwesomeIcon
        id={`starIcon${index}`}
        icon={faStar}
        className="menuView__drinkCard__star fa-2x"
        onClick={() => activateStar(item.name, false)}
      />
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
