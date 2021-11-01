import React from "react";
import "../components.scss";
import Beverage from "./beverageView";

const OrderView = ({
  order,
  submittedOrder,
  setSubmittedOrder,
  addToOrder,
  removeFromOrder,
  addToFavorites,
  removeFromFavorites,
  favoriteList,
  isfavorite,
  totalInfo,
  finalizeOrder,
  removeOrder,
  history,
}) => {
  return (
    <div className="beverage-list container--general">
      <div className="title-neon--big">Finish order</div>
      <div className="beverage-list__container">
        {order.map((item, index) => {
          return (
            <Beverage
              key={index}
              item={item}
              itemType={null}
              index={index}
              addToOrder={(name, cost) => addToOrder(name, cost)}
              removeFromOrder={(name) => removeFromOrder(name)}
              count={item.count}
              isfavorite={isfavorite}
              addFavorite={(name) => addToFavorites(name)}
              removeFavorite={(name) => removeFromFavorites(name)}
              menuDisplay={false}
            />
          );
        })}
        {order.length == 0 && (
          <div className="beverage-list__row--white">
            You haven't placed any orders.
          </div>
        )}
        {submittedOrder && (
          <div className="beverage-list__row--white">
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
