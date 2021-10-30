import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addNewOrder } from "../../redux/actions/orders";
import OrderModel from "../../model/orderModel";
import { AdminViewDrinkOrder } from "../views/adminViewDrinkOrder";
import MenuModel from "../../model/drinkModel";
import { Spinner } from "../views/spinner";

const orderModel = new OrderModel();
const menuModel = new MenuModel();

const AdminViewDrinkOrdersPresenter = ({
  socket,
  orders,
  makeOrder,
  payForOrder,
  cancelOrder,
  getOrders,
  newOrder,
  menu,
  getBeerHistory,
  getCocktailHistory,
}) => {
  useEffect(() => {
    getOrders(menu.currentBar);

    if (menu.beerMenu.length === 0 && menu.cocktailMenu.length === 0) {
      getBeerHistory(menu.currentBar);
      getCocktailHistory(menu.currentBar);
    }

    const addNewOrder = (order) => {
      if (order.bar === menu.currentBar) newOrder(order);
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

  const cancel = (id) => {
    cancelOrder(id, socket);
  };

  return (
    <AdminViewDrinkOrder
      orders={orders.orders}
      menu={[...menu.beerMenu, ...menu.cocktailMenu]}
      drinkMade={make}
      drinkPaid={pay}
      cancel={cancel}
      loading={menu.loading || orders.loading}
      spinner={<Spinner bar={menu.currentBar} />}
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
    makeOrder: (id, socket) => dispatch(orderModel.makeOrder(id, socket)),
    payForOrder: (id, socket) => dispatch(orderModel.payForOrder(id, socket)),
    cancelOrder: (id, socket) => dispatch(orderModel.cancelOrder(id, socket)),
    getOrders: (currentBar) => dispatch(orderModel.getOrders(currentBar)),
    newOrder: (order) => dispatch(addNewOrder(order)),
    getBeerHistory: (currentBar) =>
      dispatch(menuModel.getBeerHistory(currentBar)),
    getCocktailHistory: (currentBar) =>
      dispatch(menuModel.getCocktailHistory(currentBar)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminViewDrinkOrdersPresenter);
