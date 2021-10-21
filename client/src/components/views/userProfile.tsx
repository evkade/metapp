import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../components.scss";
import GeneralFavoriteCard from "./generalFavoriteCard";

const UserProfile = ({ username, orders, favorites, removeFromFavorites }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(favorites);
  }, [favorites]);

  console.log(orders);

  return (
    <div className="profileContainer">
      <div className="pageTitleNeon--big">{username}</div>
      <div className="profileContainer__block">
        <div className="profileContainer__block__title">Previous Orders</div>
        <div className="profileContainer__block__scrollContainer">
          {orders && orders.length > 0 ? (
            orders
              .sort((a, b) => {
                return +new Date(a.date) - +new Date(b.date);
              })
              .map((order, index) => {
                return (
                  <div className="profileContainer__block--row" key={order._id}>
                    <div className="profileContainer__block--column--flex">
                      <b>Bar: {order.bar.toUpperCase()}</b>
                    </div>
                    <div className="profileContainer__block--column--flex">
                      <b>Date: {order.date.split("T")[0]}</b>
                    </div>
                    <div className="profileContainer__block--column">
                      {order.order.map((orderDetail, index) => {
                        const length = order.order.length;
                        if (index === length - 1) {
                          return (
                            <span key={index}>
                              {" "}
                              {orderDetail.quantity} {orderDetail.beverage}
                            </span>
                          );
                        } else {
                          return (
                            <span key={index}>
                              {" "}
                              {orderDetail.quantity} {orderDetail.beverage},
                            </span>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="profileContainer__block--row">
              <div className="profileContainer__block--column--flex">
                You haven't placed any orders.
              </div>
            </div>
          )}
        </div>
      </div>
      <GeneralFavoriteCard
        title={"Favorite beverages"}
        favoriteObject={favorites}
        removeFromFavorites={(name) => removeFromFavorites(name)}
      />
      <GeneralFavoriteCard
        title={"Favorite drinks"}
        favoriteObject={favorites}
        removeFromFavorites={(name) => removeFromFavorites(name)}
      />
      <div style={{ height: "400px" }}></div>
    </div>
  );
};

export default UserProfile;
