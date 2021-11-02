import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PlaceholderImage from "../images/stockphoto_placeholder.jpg";
import { beverageTypes } from "../../constants/searchTypes";

const BeverageView = ({
  item,
  index,
  itemType,
  isfavorite,
  addToOrder,
  removeFromOrder,
  count,
  addFavorite,
  removeFavorite,
  menuDisplay,
}) => {
  return (
    <div
      key={index}
      className="beverage-list__row beverage-list__row--constrained"
    >
      {menuDisplay && (
        <>
          <div className="beverage-list__star">
            <FontAwesomeIcon
              id={`starIcon${item.name}`}
              icon={faStar}
              className={`fa-2x ${
                isfavorite ? "beverage-list__star--active" : ""
              }`}
              onClick={() =>
                isfavorite ? removeFavorite(item.name) : addFavorite(item.name)
              }
            />
          </div>
          <img src={PlaceholderImage} className="beverage-list__image" />
        </>
      )}
      <div className="beverage-list__column beverage-list__column--flexed beverage-list__column--small">
        {item.name}
      </div>
      <div className="beverage-list__column beverage-list__column--flexed">
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
      <div className="beverage-list__buttons">
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
                  ? "beverage-list__count beverage-list__count--chosen"
                  : "beverage-list__count"
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

export default BeverageView;
