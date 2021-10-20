import React from "react";
import "../components.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const GeneralFavoriteCard = ({
  favoriteObject,
  title,
  removeFromFavorites,
}) => {
  return (
    <div className="profileContainer__block">
      <div className="profileContainer__block__title">{title}</div>
      <div className="profileContainer__block__scrollContainer">
        {favoriteObject.length > 0 ? (
          favoriteObject.map((favorite, index) => {
            const favoriteName = favorite;
            return (
              <div className="profileContainer__block--row" key={index}>
                <div className="profileContainer__block--column--flex">
                  <FontAwesomeIcon
                    id={`starIcon${index}`}
                    icon={faStar}
                    className="menuView__drinkCard__star--active"
                    onClick={() => removeFromFavorites(favoriteName)}
                  />
                </div>
                <div className="profileContainer__block--column">
                  {favorite}
                </div>
              </div>
            );
          })
        ) : (
          <div className="profileContainer__block--row">
            <div className="profileContainer__block--column--flex">
              You haven't added any favorites
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralFavoriteCard;
