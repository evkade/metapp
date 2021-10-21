import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addNewOrder } from "../../redux/actions/orders";
import OrderModel from "../../model/orderModel";
import { AdminViewDrinkOrder } from "../views/adminViewDrinkOrder";

const ordermodel = new OrderModel();

const AdminViewDrinkOrdersPresenter = ({
  socket,
  orders,
  makeOrder,
  payForOrder,
  getOrders,
  newOrder,
  menu,
}) => {
  useEffect(() => {
    getOrders(menu.currentBar);

    const addNewOrder = (order) => {
      newOrder(order);
    };

    socket.on("orderPlaced", addNewOrder);

    return () => {
      socket.off("orderPlaced", addNewOrder);
    };
  }, [menu.currentBar]);

  const pay = (id) => {
    payForOrder(id, socket);
  };

  const make = (id) => {
    makeOrder(id, socket);
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
    makeOrder: (id, socket) => dispatch(ordermodel.makeOrder(id, socket)),
    payForOrder: (id, socket) => dispatch(ordermodel.payForOrder(id, socket)),
    getOrders: (currentBar) => dispatch(ordermodel.getOrders(currentBar)),
    newOrder: (order) => dispatch(addNewOrder(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminViewDrinkOrdersPresenter);
