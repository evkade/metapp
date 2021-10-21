import React, { useEffect, useState } from "react";
import GeneralFavoriteCard from "./generalFavoriteCard";

const UserProfile = ({ username, orders, favorites, removeFromFavorites }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(favorites);
  }, [favorites]);

  return (
    <div className="profile-view container--general">
      <div className="title-neon--big">{username}</div>
      <div className="info-card-drink">
        <div className="info-card-drink__title">Previous Orders</div>
        <div className="info-card-drink__container--scroll">
          {orders.length > 0 ? (
            orders.map((order, index) => {
              return (
                <div className="info-card-drink__row" key={index}>
                  <div className="info-card-drink__column--flex">
                    <b>OrderID: {order.id}</b>
                  </div>
                  <div className="info-card-drink__column">
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
            })
          ) : (
            <div className="info-card-drink__row">
              <div className="info-card-drink__column--flex">
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
    </div>
  );
};

export default UserProfile;
