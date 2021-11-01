import React, { useEffect, useState } from "react";

import GeneralFavoriteCard from "./generalFavoriteCard";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

const UserProfile = ({
  username,
  orders,
  favorites,
  removeFromFavorites,
  spinner,
  loading,
}) => {
  return (
    <div className="profile-view container--general">
      {loading ? (
        spinner
      ) : (
        <>
          <div className="title-neon--big">{username}</div>
          <div className="info-card-beverage">
            <div className="info-card-beverage__title">Current orders</div>
            <div className="info-card-beverage__container--scroll">
              {orders
                .filter((o) => !o.paid && !o.cancelled)
                .map((order) => (
                  <div className="info-card-beverage__row" key={order.id}>
                    <div className="info-card-beverage__column info-card-beverage__column--small">
                      {/** TODO make modular */}
                      {order.order.map((orderDetail, index) => {
                        const length = order.order.length;
                        if (index === length - 1) {
                          return (
                            <div key={index}>
                              {" "}
                              {orderDetail.quantity} {orderDetail.beverage}
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              {" "}
                              {orderDetail.quantity} {orderDetail.beverage},
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="info-card-beverage__column info-card-beverage__column--right">
                      {order.made ? "PICK UP!" : "NOT READY"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="info-card-beverage">
            <div className="info-card-beverage__title">Previous Orders</div>
            <div className="info-card-beverage__container--scroll">
              {orders && orders.length > 0 ? (
                orders
                  .filter((o) => (o.made && o.paid) || o.cancelled)
                  .sort((a, b) => {
                    if (a.cancelled && b.cancelled) return 0;
                    else if (b.cancelled) return 1;
                    else return -1;
                  })
                  .sort((a, b) => {
                    return +new Date(b.date) - +new Date(a.date);
                  })
                  .map((order) => {
                    return (
                      <div className="info-card-beverage__row" key={order.id}>
                        <div className="info-card-beverage__column--flex">
                          {order.cancelled ? (
                            "CANCELLED"
                          ) : order.bar === "dkm" ? (
                            <img src={dkmlogo} width="20px" />
                          ) : (
                            <img src={mkmlogo} width="20px" />
                          )}
                        </div>
                        <div className="info-card-beverage__column--flex">
                          <b>{order.date}</b>
                        </div>
                        <div className="info-card-beverage__column info-card-beverage__column--small">
                          {order.order.map((orderDetail, index) => {
                            const length = order.order.length;
                            if (index === length - 1) {
                              return (
                                <div key={index}>
                                  {" "}
                                  {orderDetail.quantity} {orderDetail.beverage}
                                </div>
                              );
                            } else {
                              return (
                                <div key={index}>
                                  {" "}
                                  {orderDetail.quantity} {orderDetail.beverage},
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="info-card-beverage__row">
                  <div className="info-card-beverage__column--flex">
                    You haven't placed any orders.
                  </div>
                </div>
              )}
            </div>
          </div>
          <GeneralFavoriteCard
            title={"Favorite Beers"}
            favoriteObject={favorites.filter(
              (data) => data.beverage_type === "beer"
            )}
            removeFromFavorites={removeFromFavorites}
            dkmlogo={dkmlogo}
            mkmlogo={mkmlogo}
          />
          <GeneralFavoriteCard
            title={"Favorite Cocktails"}
            favoriteObject={favorites.filter(
              (data) => data.beverage_type === "cocktail"
            )}
            removeFromFavorites={removeFromFavorites}
            dkmlogo={dkmlogo}
            mkmlogo={mkmlogo}
          />
        </>
      )}
    </div>
  );
};

export default UserProfile;
