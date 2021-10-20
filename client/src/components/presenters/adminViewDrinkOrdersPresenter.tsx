import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeOrder, payForOrder, getOrders } from "../../redux/actions/orders";
import { AdminViewDrinkOrder } from "../views/adminViewDrinkOrder";

const AdminViewDrinkOrdersPresenter = ({
  socket,
  orders,
  makeOrder,
  payForOrder,
  getOrders,
  menu,
}) => {
  useEffect(() => {
    getOrders(menu.currentBar);
  }, []);

  const getTimeStamp = () => {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    return (
      (hour < 10 ? "0" + hour : "" + hour) +
      ":" +
      (minute < 10 ? "0" + minute : "" + minute)
    );
  };

  const pay = (id) => {
    payForOrder(id, getTimeStamp());
  };

  const make = (id) => {
    makeOrder(id, getTimeStamp());
  };

  return (
    <AdminViewDrinkOrder
      orders={orders.orders}
      drinkMade={make}
      drinkPaid={pay}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    orders: store.orders,
    menu: store.menu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeOrder: (id, timeMade) => dispatch(makeOrder(id, timeMade)),
    payForOrder: (id, timePaid) => dispatch(payForOrder(id, timePaid)),
    getOrders: (currentBar) => dispatch(getOrders(currentBar)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminViewDrinkOrdersPresenter);
