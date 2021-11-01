import React from "react";
import { getTypeOfBeverage, beverageTypes } from "../../constants/searchTypes";

const OrderCard = ({
  fullOrder,
  menu,
  setBeverageDetail,
  setShowModal,
  made,
  paid,
  cancel,
}) => {
  const getTotalPrice = (order) => {
    var totPrice = 0;
    order.order.forEach(
      (order) =>
        (totPrice +=
          menu.find((bev) => bev.name === order.beverage)?.price *
          order.quantity)
    );
    return totPrice;
  };

  const getTypeOfOrder = (order) => {
    const beer = order.some(
      (beverage) =>
        getTypeOfBeverage(
          menu.find((item) => item.name === beverage.beverage)
        ) === beverageTypes.BEER
    );
    const cocktail = order.some(
      (beverage) =>
        getTypeOfBeverage(
          menu.find((item) => item.name === beverage.beverage)
        ) === beverageTypes.COCKTAIL
    );

    return beer && cocktail ? "Beer and cocktail" : beer ? "Beer" : "Cocktail";
  };

  return (
    <div
      key={fullOrder.id}
      className={
        "card-order" +
        (fullOrder.cancelled
          ? " card-order--cancelled"
          : fullOrder.paid
          ? " card-order--finished"
          : fullOrder.made
          ? " card-order--made"
          : "")
      }
      id={"card-order#" + fullOrder.id}
    >
      <div className="card-order__content">
        <p
          className="card-order__text card-order__text--title"
          onClick={() => {
            setBeverageDetail(fullOrder);
            setShowModal(true);
          }}
        >
          {fullOrder.order.length > 1
            ? "Multiple beverages (click for details)"
            : fullOrder.order[0].quantity + " " + fullOrder.order[0].beverage}
        </p>
        <p className="card-order__text">
          Type: {getTypeOfOrder(fullOrder.order)}
        </p>
        <p className="card-order__text">Ordered by: {fullOrder.user}</p>
        <p className="card-order__text">
          Total price: {getTotalPrice(fullOrder)}{" "}
        </p>
        {!fullOrder.paid && !fullOrder.cancelled ? (
          <>
            <button
              className="card-order__button"
              disabled={fullOrder.made}
              onClick={() => made(fullOrder.id)}
            >
              Ready to serve
            </button>
            <button
              className="card-order__button"
              disabled={!fullOrder.made}
              onClick={() => paid(fullOrder.id)}
            >
              Paid
            </button>
            <button
              className="card-order__button"
              onClick={() => cancel(fullOrder.id)}
            >
              Cancel order
            </button>
          </>
        ) : fullOrder.cancelled ? (
          <p className="card-order__text">CANCELLED</p>
        ) : (
          <>
            <p className="card-order__text">Made at: {fullOrder.timeMade}</p>
            <p className="card-order__text">Paid at: {fullOrder.timePaid}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
