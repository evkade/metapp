import React, { useEffect } from "react";
import "../components.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PlaceholderImage from "../images/stockphoto_placeholder.jpg";

const Drink = ({
  item,
  index,
  addToOrder,
  removeFromOrder,
  count,
  addFavorite,
  removeFavorite,
  favoriteList,
  menuDisplay,
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
      {menuDisplay && (
        <>
          <div className="menuView__drinkCard__star">
            <FontAwesomeIcon
              id={`starIcon${index}`}
              icon={faStar}
              className="fa-2x"
              onClick={() => activateStar(item.name, false)}
            />
          </div>
          <img src={PlaceholderImage} className="menuView__drinkCard__image" />
        </>
      )}
      <div className="menuView__drinkCard__name">{item.name}</div>
      <div className="menuView__drinkCard__pricealc">
        {item.price} SEK{" "}
        {menuDisplay && (
          <>
            <br />
            {item.alcoholPercentage} %
          </>
        )}
      </div>
      <div className="menuView__drinkCard__addToCart">
        {menuDisplay ? (
          <>
            {" "}
            <button onClick={() => addToOrder(item.name, item.price)}>+</button>
            <span> {count} </span>
            <button onClick={() => removeFromOrder(item.name)}>-</button>
          </>
        ) : (
          <span>{count} st</span>
        )}
      </div>
    </div>
  );
};

export default Drink;
