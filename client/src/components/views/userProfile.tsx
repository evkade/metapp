import React, { useEffect, useState } from "react";
import GeneralFavoriteCard from "./generalFavoriteCard";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

const UserProfile = ({ username, orders, favorites, removeFromFavorites }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(favorites);
  }, [favorites]);

  return (
    <div className="profile-view container--general">
      <div className="title-neon--big">{username}</div>
      <div className="info-card-drink">
        <div className="info-card-drink__title">Current orders</div>
        <div className="info-card-drink__container--scroll">
          {orders
            .filter((o) => !o.paid)
            .map((order) => (
              <div className="info-card-drink__row" key={order.id}>
                <div className="info-card-drink__column--flex">
                  {/** TODO make modular */}
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
                <div className="info-card-drink__column--flex">
                  {order.made ? "PICK UP!" : "NOT READY"}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="info-card-drink">
        <div className="info-card-drink__title">Previous Orders</div>
        <div className="info-card-drink__container--scroll">
          {orders && orders.length > 0 ? (
            orders
              .filter((o) => o.made && o.paid)
              .sort((a, b) => {
                return +new Date(a.date) - +new Date(b.date);
              })
              .map((order, index) => {
                return (
                  <div className="info-card-drink__row" key={order.id}>
                    <div className="info-card-drink__column--flex">
                      {order.bar === "dkm" ? (
                        <img src={dkmlogo} width="20px" />
                      ) : (
                        <img src={mkmlogo} width="20px" />
                      )}
                    </div>
                    <div className="info-card-drink__column--flex">
                      <b>{order.date}</b>
                    </div>
                    <div className="info-card-drink__column--flex">
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
