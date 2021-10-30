import React from "react";
import "../components.scss";
import DrinkPresenter from "../presenters/drinkPresenter";

const OrderView = ({
  order,
  submittedOrder,
  setSubmittedOrder,
  addToOrder,
  removeFromOrder,
  addToFavorites,
  removeFromFavorites,
  favoriteList,
  finalizeOrder,
  removeOrder,
  history,
}) => {
  return (
    <div className="drink-list container--general">
      <div className="title-neon--big">Finish order</div>
      <div className="drink-list__container">
        {order.map((item, index) => {
          return (
            <DrinkPresenter
              key={index}
              item={item}
              itemType={null}
              index={index}
              addToOrder={(name, cost) => addToOrder(name, cost)}
              removeFromOrder={(name) => removeFromOrder(name)}
              count={item.count}
              addFavorite={(name) => addToFavorites(name)}
              removeFavorite={(name) => removeFromFavorites(name)}
              favoriteList={favoriteList}
              menuDisplay={false}
            />
          );
        })}
        {submittedOrder && (
          <div className="drink-list__row--white">
            Your order has been sent, go to your profile to see when it's ready
            to be picked up!
          </div>
        )}
      </div>
      {order.length > 0 && !submittedOrder && (
        <div>
          <button
            className="general-button--bw"
            onClick={() => {
              removeOrder();
              history.push("/menu");
            }}
          >
            Cancel
          </button>
          <button
            className="general-button--bw"
            onClick={() => history.push("/menu")}
          >
            Edit
            <br />
          </button>
          <button
            className="general-button--bw"
            onClick={() => {
              finalizeOrder();
              setSubmittedOrder(true);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderView;
