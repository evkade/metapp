import React from "react";
import { beverageTypes } from "../../constants/searchTypes";

export const NewBeverageForm = ({
  customizedType,
  newBeverage,
  setNewBeverage,
}) => {
  return (
    <form className="beverage-form">
      <div className="beverage-form__row">
        Name:
        <input
          className="beverage-form__input"
          type="text"
          name="name"
          value={newBeverage.name}
          onChange={(e) =>
            setNewBeverage({ ...newBeverage, name: e.target.value })
          }
        />
      </div>
      <div className="beverage-form__row">
        Price (SEK):
        <input
          className="beverage-form__input"
          type="text"
          name="price"
          value={newBeverage.price}
          onChange={(e) =>
            setNewBeverage({ ...newBeverage, price: e.target.value })
          }
        />
      </div>
      {customizedType === beverageTypes.BEER ? (
        <div>
          <div className="beverage-form__row">
            Type:
            <input
              className="beverage-form__input"
              type="text"
              name="type"
              value={newBeverage.type}
              onChange={(e) =>
                setNewBeverage({ ...newBeverage, type: e.target.value })
              }
            />
          </div>
          <div className="beverage-form__row">
            Volume (ml):
            <input
              className="beverage-form__input"
              type="text"
              name="volume"
              value={newBeverage.volume}
              onChange={(e) =>
                setNewBeverage({ ...newBeverage, volume: e.target.value })
              }
            />
          </div>
          <div className="beverage-form__row">
            Alcohol percentage:
            <input
              className="beverage-form__input"
              type="text"
              name="alcoholPercentage"
              value={newBeverage.alcoholPercentage}
              onChange={(e) =>
                setNewBeverage({
                  ...newBeverage,
                  alcoholPercentage: e.target.value,
                })
              }
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="beverage-form__row">
            Ingredients:
            <input
              className="beverage-form__input"
              type="text"
              name="ingredients"
              value={newBeverage.ingredients.join(", ")}
              onChange={(e) =>
                setNewBeverage({
                  ...newBeverage,
                  ingredients: e.target.value.split(/\s*,\s*/),
                })
              }
            />
          </div>
          <div className="beverage-form__row">
            Alcohol volume (cl):
            <input
              className="beverage-form__input"
              type="text"
              name="alcoholVolume"
              value={newBeverage.alcoholVolume}
              onChange={(e) =>
                setNewBeverage({
                  ...newBeverage,
                  alcoholVolume: e.target.value,
                })
              }
            />
          </div>
          <div className="beverage-form__row">
            Description:
            <input
              className="beverage-form__input"
              type="text"
              name="description"
              value={newBeverage.description}
              onChange={(e) =>
                setNewBeverage({
                  ...newBeverage,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
      )}
    </form>
  );
};
