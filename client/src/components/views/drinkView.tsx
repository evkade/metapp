import React, { useEffect } from "react";
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
      <div className="drink-list__column drink-list__column--flexed">
        {item.name}
      </div>
      <div className="drink-list__column drink-list__column--flexed">
        {item.price} SEK{" "}
        {menuDisplay && (
          <>
            <br />
            {item.alcoholPercentage} %
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
            <span> {count} </span>
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
