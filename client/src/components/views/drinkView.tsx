import React from "react";
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
  menuDisplay,
  activateStar,
  shortName,
}) => {
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
