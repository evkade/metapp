import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../components.scss";
import GeneralFavoriteCard from "./generalFavoriteCard";

const UserProfile = ({ username, orders, favorites, removeFromFavorites }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(favorites);
  }, [favorites]);

  return (
    <div className="profileContainer">
      <div className="pageTitleNeon">{username}</div>
      <div className="profileContainer__block">
        <div className="profileContainer__block__title">Previous Orders</div>
        <div className="profileContainer__block__scrollContainer">
          {orders.map((order, index) => {
            return (
              <div className="profileContainer__block--row" key={index}>
                <div className="profileContainer__block--column--flex">
                  <b>OrderID: {order.id}</b>
                </div>
                <div className="profileContainer__block--column">
                  {order.order.map((orderDetail, index) => {
                    const length = order.order.length;
                    if (index == length - 1) {
                      return (
                        <span key={index}>
                          {" "}
                          {orderDetail.count} {orderDetail.name}
                        </span>
                      );
                    } else {
                      return (
                        <span key={index}>
                          {" "}
                          {orderDetail.count} {orderDetail.name},
                        </span>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
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
