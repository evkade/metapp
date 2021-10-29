import OrderView from '../views/orderView';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  orderPlaced,
  removedOrder,
  unfinishedOrderPlaced,
} from '../../redux/actions/user';
import { addFavorite } from '../../redux/actions/user';
import { removeFavorite } from '../../redux/actions/user';
import OrderModel from '../../model/orderModel';
import FavoriteModel from '../../model/favoriteModel';

const ordermodel = new OrderModel();
const favoriteModel = new FavoriteModel();

export const OrderPresenter = ({
  socket,
  unfinishedOrder,
  user,
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

  const addToOrder = (name, price) => {
    setOrderItems([...orderItems, { name, price, count: 1 }]);
    addToTotalInfo(price);
  };

  const removeOrder = () => {
    removedOrder();
  };

  const increaseOrderCount = (name, price) => {
    const modifiedOrderList = orderItems.map((item) => {
      if (item.name === name) {
        return {
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

  const addOrIncreaseOrder = (name, price) => {
    const isItemPresent: boolean = orderItems.some((item) => item.name == name);
    if (isItemPresent) {
      increaseOrderCount(name, price);
    } else {
      addToOrder(name, price);
    }
  };

  const removeFromOrder = (name) => {
    const modifiedOrderList = orderItems.map((item, index) => {
      if (item.name === name && item.count !== 0) {
        return {
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

  const addToFavorites = (name, type, bar) => {
    addFavorite(name, type, bar);
  };

  const removeFromFavorites = (name) => {
    removeFavorite(favoriteid(name), favoriteType(name), favoritebar(name));
  };

  const finalizeOrder = () => {
    orderPlaced(unfinishedOrder, user, currentBar, socket);
  };

  const isfavorite = (name) => {
    return favorites.some((elem) => elem.beverage.name === name);
  };

  const favoritebar = (name) => {
    return favorites.find((elem) => elem.beverage.name === name).bar;
  };

  const favoriteid = (name) => {
    return favorites.find((elem) => elem.beverage.name === name).beverage._id;
  };
  const favoriteType = (name) => {
    return favorites.find((elem) => elem.beverage.name === name).beverage_type;
  };

  return (
    <OrderView
      unfinishedOrder={unfinishedOrder}
      orderItems={orderItems}
      setOrderItems={(newOrderItems) => setOrderItems(newOrderItems)}
      addToOrder={(name, price) => addOrIncreaseOrder(name, price)}
      removeFromOrder={(name) => removeFromOrder(name)}
      addToFavorites={(name, type) => addToFavorites(name, type, currentBar)}
      removeFromFavorites={(name) => removeFromFavorites(name)}
      favoriteList={favorites}
      totalInfo={totalInfo}
      isfavorite={isfavorite}
      finalizeOrder={() => finalizeOrder()}
      removeOrder={() => removeOrder()}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    unfinishedOrder: store.user.unfinishedOrder,
    user: store.user,
    currentBar: store.menu.currentBar,
    favorites: store.user.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderPlaced: (order, user, currentbar, socket) =>
      dispatch(ordermodel.placeOrder(order, user, currentbar, socket)),
    addFavorite: (beverage, type, bar) =>
      dispatch(addFavorite({ beverage, type, bar })),
    removeFavorite: (beverage, type, bar) =>
      dispatch(removeFavorite({ beverage, type, bar })),
    unfinishedOrderPlaced: (beverages) =>
      dispatch(unfinishedOrderPlaced(beverages)),
    removedOrder: () => dispatch(removedOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPresenter);
