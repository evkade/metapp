import React from "react";

const OrderCard = ({
  fullOrder,
  menu,
  setDrinkDetail,
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
          menu.filter((bev) => bev.name === order.beverage)[0]?.price *
          order.quantity)
    );
    return totPrice;
  };

  const getFullOrderString = (order) => {
    var st = "";
    if (order.length > 3) {
      for (var i = 0; i < 3; i++) {
        st += order[i].quantity + " " + order[i].beverage + ", ";
      }
      st += "...";
    } else {
      order.forEach((o) => (st += o.quantity + " " + o.beverage + ", "));
      st.substring(0, st.length - 2);
    }
    return st;
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
      <p
        className="card-order__text card-order__text--title"
        onClick={() => {
          setDrinkDetail(fullOrder);
          setShowModal(fullOrder);
        }}
      >
        {fullOrder.order.length > 1
          ? "Multiple beverages (click for details)"
          : fullOrder.order[0].quantity + " " + fullOrder.order[0].beverage}
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
  );
};

export default OrderCard;