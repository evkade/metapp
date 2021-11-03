import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import UserProfile from "../views/userProfile";
import { removeFavorite } from "../../redux/actions/user";
import OrderModel from "../../model/orderModel";
import {
  orderCancelled,
  orderMade,
  orderPaid,
} from "../../redux/actions/orders";
import FavoriteModel from "../../model/favoriteModel";
import { Spinner } from "../views/spinner";

const orderModel = new OrderModel();
const favoriteModel = new FavoriteModel();

const UserProfilePresenter = ({
  orders,
  user,
  userId,
  favorites,
  removeFavorite,
  getOrders,
  getFavorites,
  socket,
  orderMade,
  orderPaid,
  orderCancelled,
  loading,
  currentBar,
}) => {
  useEffect(() => {
    getFavorites();
    getOrders(userId);
    const orderBeenMade = (data) => {
      orderMade(data.id, data.timestamp);
    };

    const orderBeenPaid = (data) => {
      orderPaid(data.id, data.timestamp);
    };

    const orderBeenCancelled = (id) => {
      orderCancelled(id);
    };

    socket.on("made", orderBeenMade);
    socket.on("paid", orderBeenPaid);
    socket.on("cancelled", orderBeenCancelled);

    return () => {
      socket.off("made", orderBeenMade);
      socket.off("paid", orderBeenPaid);
      socket.off("cancelled", orderBeenCancelled);
    };
  }, []);

  const removeFromFavorites = (name) => {
    removeFavorite(favoriteid(name), favoriteType(name), favoritebar(name));
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
    <UserProfile
      username={user}
      orders={orders}
      favorites={favorites}
      removeFromFavorites={removeFromFavorites}
      loading={loading}
      spinner={<Spinner bar={currentBar} />}
      moment={moment}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user.username,
    userId: store.user.userId,
    orders: store.orders.orders,
    favorites: store.user.favorites,
    loading: store.user.loading || store.orders.loading,
    currentBar: store.menu.currentBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorite: (beverage_id, type, bar) =>
      dispatch(removeFavorite({ beverage_id, type, bar })),
    getOrders: (userId) => dispatch(orderModel.getUserOrders(userId)),
    getFavorites: () => dispatch(favoriteModel.getFavorites()),
    orderMade: (id, time) => dispatch(orderMade(id, time)),
    orderPaid: (id, time) => dispatch(orderPaid(id, time)),
    orderCancelled: (id) => dispatch(orderCancelled(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePresenter);
