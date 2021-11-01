import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const GeneralFavoriteCard = ({
  favoriteObject,
  title,
  removeFromFavorites,
  dkmlogo,
  mkmlogo,
}) => {
  return (
    <div className="info-card-beverage">
      <div className="info-card-beverage__title">{title}</div>
      <div className="info-card-beverage__container--scroll">
        {favoriteObject && favoriteObject.length > 0 ? (
          favoriteObject.map((favorite, index) => {
            const favoriteName = favorite.beverage.name;
            return (
              <div className="info-card-beverage__row" key={index}>
                <div className="info-card-beverage__column--flex">
                  {favorite.bar === "dkm" ? (
                    <img src={dkmlogo} width="20px" />
                  ) : (
                    <img src={mkmlogo} width="20px" />
                  )}
                </div>
                <div className="info-card-beverage__column">
                  {favorite.beverage.name}
                </div>

                <div className="info-card-beverage__column--flex">
                  <FontAwesomeIcon
                    id={`starIcon${index}`}
                    icon={faStar}
                    className="beverage-list__star--active"
                    onClick={() => removeFromFavorites(favoriteName)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="info-card-beverage__row">
            <div className="info-card-beverage__column--flex">
              You haven't added any favorites
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralFavoriteCard;
