import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { orderPlaced } from "../../redux/actions/user";
import UserProfile from "../views/userProfile";
import { removeFavorite } from "../../redux/actions/user";
import OrderModel from "../../model/orderModel";

const ordermodel = new OrderModel();

export const UserProfilePresenter = ({
  orders,
  user,
  userId,
  favorites,
  removeFavorite,
  getOrders,
}) => {
  useEffect(() => {
    getOrders(userId);
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
    orders: store.user.userOrders,
    favorites: store.user.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorite: (name) => dispatch(removeFavorite(name)),
    getOrders: (userId) => dispatch(ordermodel.getUserOrders(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePresenter);
