import React, { useEffect } from "react";
import { connect } from "react-redux";
import OrderModel from "../../model/orderModel";
import { AdminViewDrinkOrder } from "../views/adminViewDrinkOrder";

const ordermodel = new OrderModel();

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
  }, [menu.currentBar]);

  const pay = (id) => {
    payForOrder(id);
  };

  const make = (id) => {
    makeOrder(id);
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
    makeOrder: (id) => dispatch(ordermodel.makeOrder(id)),
    payForOrder: (id) => dispatch(ordermodel.payForOrder(id)),
    getOrders: (currentBar) => dispatch(ordermodel.getOrders(currentBar)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminViewDrinkOrdersPresenter);
