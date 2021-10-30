import React, { useState, useEffect } from "react";
import Drink from "../views/drinkView";

const DrinkPresenter = ({
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
    <Drink
      item={item}
      shortName={shortName}
      index={index}
      itemType={itemType}
      addToOrder={addToOrder}
      removeFromOrder={removeFromOrder}
      count={count}
      menuDisplay={menuDisplay}
      activateStar={activateStar}
    />
  );
};

export default DrinkPresenter;
