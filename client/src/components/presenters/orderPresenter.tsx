import OrderView from "../views/orderView";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  orderPlaced,
  removedOrder,
  unfinishedOrderPlaced,
} from "../../redux/actions/user";
import { addFavorite } from "../../redux/actions/user";
import { removeFavorite } from "../../redux/actions/user";
import OrderModel from "../../model/orderModel";

const ordermodel = new OrderModel();

export const OrderPresenter = ({
  socket,
  unfinishedOrder,
  userId,
  currentBar,
  orders,
  orderPlaced,
  addFavorite,
  removeFavorite,
  favorites,
  unfinishedOrderPlaced,
  removedOrder,
}) => {
  const [orderItems, setOrderItems] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [totalInfo, setTotalInfo] = useState({ totalCost: 0, totalCount: 0 });

  useEffect(() => {
    if (
      !(
        Object.keys(unfinishedOrder).length === 0 &&
        unfinishedOrder.constructor === Object
      )
    ) {
      setOrderItems(unfinishedOrder.order);
      const totalObj = unfinishedOrder.order.reduce(function (a, b) {
        return { price: a.price + b.price, count: a.count + b.count }; // returns object with property x
      });
      const newTotalObj = {
        totalCost: totalObj.price,
        totalCount: totalObj.count,
      };
      setTotalInfo(newTotalObj);
    } else {
      setOrderItems([]);
    }
  }, []);

  const addToTotalInfo = (cost) => {
    const newTotalCost = totalInfo.totalCost + cost;
    const newTotalCount = totalInfo.totalCount + 1;
    const newTotalInfo = { totalCost: newTotalCost, totalCount: newTotalCount };
    setTotalInfo(newTotalInfo);
  };

  const addToOrder = (name, price, id) => {
    setOrderItems([...orderItems, { name, price, id, count: 1 }]);
    addToTotalInfo(price);
  };

  const removeOrder = () => {
    removedOrder();
  };

  const increaseOrderCount = (name, price) => {
    const modifiedOrderList = orderItems.map((item) => {
      if (item.name === name) {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          count: item.count + 1,
        };
      } else {
        return item;
      }
    });
    setOrderItems(modifiedOrderList);
    addToTotalInfo(price);
  };

  const addOrIncreaseOrder = (name, price, id) => {
    const isItemPresent: boolean = orderItems.some((item) => item.name == name);
    if (isItemPresent) {
      increaseOrderCount(name, price);
    } else {
      addToOrder(name, price, id);
    }
  };

  const removeFromOrder = (name) => {
    const modifiedOrderList = orderItems.map((item, index) => {
      if (item.name === name && item.count !== 0) {
        return {
          id: item.id,
          name: item.name,
          count: item.count - 1,
        };
      } else {
        return item;
      }
    });
    const modifiedOrderListWithoutZeros = modifiedOrderList.filter(
      (item) => item.count !== 0
    );
    setOrderItems(modifiedOrderListWithoutZeros);
  };

  const addToFavorites = (name) => {
    addFavorite(name);
  };

  const removeFromFavorites = (name) => {
    removeFavorite(name);
  };

  const finalizeOrder = () => {
    orderPlaced(unfinishedOrder, userId, currentBar, socket);
  };

  return (
    <OrderView
      unfinishedOrder={unfinishedOrder}
      orderItems={orderItems}
      setOrderItems={(newOrderItems) => setOrderItems(newOrderItems)}
      addToOrder={(name, price, id) => addOrIncreaseOrder(name, price, id)}
      removeFromOrder={(name) => removeFromOrder(name)}
      addToFavorites={(name) => addToFavorites(name)}
      removeFromFavorites={(name) => removeFromFavorites(name)}
      favoriteList={favoriteList}
      totalInfo={totalInfo}
      finalizeOrder={() => finalizeOrder()}
      removeOrder={() => removeOrder()}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    unfinishedOrder: store.user.unfinishedOrder,
    userId: store.user.userId,
    currentBar: store.menu.currentBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderPlaced: (order, userId, currentbar, socket) =>
      dispatch(ordermodel.placeOrder(order, userId, currentbar, socket)),
    addFavorite: (name) => dispatch(addFavorite(name)),
    removeFavorite: (name) => dispatch(removeFavorite(name)),
    unfinishedOrderPlaced: (beverages) =>
      dispatch(unfinishedOrderPlaced(beverages)),
    removedOrder: () => dispatch(removedOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPresenter);
