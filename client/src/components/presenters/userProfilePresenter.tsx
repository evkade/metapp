import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { orderPlaced } from "../../redux/actions/user";
import UserProfile from "../views/userProfile";
import { removeFavorite } from "../../redux/actions/user";
import OrderModel from "../../model/orderModel";
import { orderMade, orderPaid } from "../../redux/actions/orders";

const ordermodel = new OrderModel();

export const UserProfilePresenter = ({
  orders,
  user,
  userId,
  favorites,
  removeFavorite,
  getOrders,
  socket,
  orderMade,
  orderPaid,
}) => {
  useEffect(() => {
    getOrders(userId);

    const orderBeenMade = (data) => {
      orderMade(data.id, data.timestamp);
    };

    const orderBeenPaid = (data) => {
      orderPaid(data.id, data.timestamp);
    };

    socket.on("made", orderBeenMade);
    socket.on("paid", orderBeenPaid);

    return () => {
      socket.off("made", orderBeenMade);
      socket.off("paid", orderBeenPaid);
    };
  }, []);

  const removeFromFavorites = (name) => {
    removeFavorite(name);
  };

  return (
    <UserProfile
      username={user}
      orders={orders}
      favorites={favorites}
      removeFromFavorites={(name) => removeFromFavorites(name)}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user.username,
    userId: store.user.userId,
    orders: store.orders.orders,
    favorites: store.user.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorite: (name) => dispatch(removeFavorite(name)),
    getOrders: (userId) => dispatch(ordermodel.getUserOrders(userId)),
    orderMade: (id, time) => dispatch(orderMade(id, time)),
    orderPaid: (id, time) => dispatch(orderPaid(id, time)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePresenter);
