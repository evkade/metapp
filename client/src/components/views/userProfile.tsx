import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../components.scss";
import GeneralFavoriteCard from "./generalFavoriteCard";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

const UserProfile = ({ username, orders, favorites, removeFromFavorites }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(favorites);
  }, [favorites]);

  return (
    <div className="profileContainer">
      <div className="pageTitleNeon--big">{username}</div>
      <div className="profileContainer__block">
        <div className="profileContaine__block__title">Current orders</div>
        <div className="profileContainer__block__scrollContainer">
          {orders
            .filter((o) => !o.paid)
            .map((order) => (
              <div className="profileContainer__block--row" key={order.id}>
                <div className="profileContainer__block--column">
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
                <div className="profileContainer__block--column--flex">
                  {order.made ? "PICK UP!" : "NOT READY"}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="profileContainer__block">
        <div className="profileContainer__block__title">Previous Orders</div>
        <div className="profileContainer__block__scrollContainer">
          {orders && orders.length > 0 ? (
            orders
              .filter((o) => o.made && o.paid)
              .sort((a, b) => {
                return +new Date(a.date) - +new Date(b.date);
              })
              .map((order, index) => {
                return (
                  <div className="profileContainer__block--row" key={order.id}>
                    <div className="profileContainer__block--column">
                      {order.bar === "dkm" ? (
                        <img src={dkmlogo} width="20px" />
                      ) : (
                        <img src={mkmlogo} width="20px" />
                      )}
                    </div>
                    <div className="profileContainer__block--column">
                      <b>{order.date}</b>
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
