import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PlaceholderImage from "../images/stockphoto_placeholder.jpg";
import { beverageTypes } from "../../constants/searchTypes";

const Drink = ({
  item,
  index,
  itemType,
  addToOrder,
  removeFromOrder,
  count,
  addFavorite,
  removeFavorite,
  favoriteList,
  menuDisplay,
}) => {
  const [shortName, setShortName] = useState("");

  useEffect(() => {
    if (item.name.length > 30) {
      const newShortName = item.name.slice(0, 30) + "...";
      setShortName(newShortName);
    } else {
      setShortName(item.name);
    }
    if (favoriteList.includes(item.name)) {
      activateStar(item.name, true);
    }
  }, [favoriteList]);

  const activateStar = (name, isAlreadyInList) => {
    const star = document.getElementById(`starIcon${index}`);
    const isStarActive = star.classList.contains("drink-list__star--active");
    if (!isStarActive && !isAlreadyInList) {
      star.classList.add("drink-list__star--active");
      addFavorite(name);
    } else if (!isStarActive && isAlreadyInList) {
      star.classList.add("drink-list__star--active");
    } else {
      star.classList.remove("drink-list__star--active");
      removeFavorite(name);
    }
  };

  return (
    <div key={index} className="drink-list__row drink-list__row--constrained">
      {menuDisplay && (
        <>
          <div className="drink-list__star">
            <FontAwesomeIcon
              id={`starIcon${index}`}
              icon={faStar}
              className="fa-2x"
              onClick={() => activateStar(item.name, false)}
            />
          </div>
          <img src={PlaceholderImage} className="drink-list__image" />
        </>
      )}
      <div className="drink-list__column drink-list__column--flexed drink-list__column--small">
        {shortName}
      </div>
      <div className="drink-list__column drink-list__column--flexed">
        {item.price} SEK{" "}
        {menuDisplay && (
          <>
            <br />
            {itemType === beverageTypes.BEER
              ? item.alcoholPercentage + "%"
              : item.alcoholVolume + "cl"}
          </>
        )}
      </div>
      <div className="drink-list__buttons">
        {menuDisplay ? (
          <>
            <button
              className="general-button--bw"
              onClick={() => removeFromOrder(item.name, item.price)}
            >
              -
            </button>
            <span
              className={
                count > 0
                  ? "drink-list__count drink-list__count--chosen"
                  : "drink-list__count"
              }
            >
              {" "}
              {count}{" "}
            </span>
            <button
              className="general-button--bw"
              onClick={() => addToOrder(item.name, item.price, item.id)}
            >
              +
            </button>
          </>
        ) : (
          <span>{count} st</span>
        )}
      </div>
    </div>
  );
};

export default Drink;
