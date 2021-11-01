import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addNewOrder } from "../../redux/actions/orders";
import OrderModel from "../../model/orderModel";
import { AdminViewOrder } from "../views/adminViewOrder";
import MenuModel from "../../model/menuModel";
import { Spinner } from "../views/spinner";

const orderModel = new OrderModel();
const menuModel = new MenuModel();

const AdminViewOrdersPresenter = ({
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
  const [beverageDetail, setBeverageDetail] = useState(null);
  const [showBeverageDetailModal, setShowBeverageDetailModal] = useState(false);
  const [collapseInfo, setCollapseInfo] = useState({
    row1: "-",
    row2: "+",
  });

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
    <AdminViewOrder
      orders={orders.orders}
      menu={[...menu.beerHistory, ...menu.cocktailHistory]}
      beverageMade={make}
      beveragePaid={pay}
      cancel={cancel}
      loading={menu.loading || orders.loading}
      spinner={<Spinner bar={menu.currentBar} />}
      beverageDetail={beverageDetail}
      setBeverageDetail={setBeverageDetail}
      showBeverageDetailModal={showBeverageDetailModal}
      setShowBeverageDetailModal={setShowBeverageDetailModal}
      collapseInfo={collapseInfo}
      setCollapseInfo={setCollapseInfo}
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
)(AdminViewOrdersPresenter);
