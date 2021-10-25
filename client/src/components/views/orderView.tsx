import React, { useEffect, useState } from "react";
import "../components.scss";
import Drink from "./drinkView";
import { useHistory } from "react-router-dom";

const OrderView = ({
  unfinishedOrder,
  orderItems,
  setOrderItems,
  addToOrder,
  removeFromOrder,
  addToFavorites,
  removeFromFavorites,
  favoriteList,
  totalInfo,
  finalizeOrder,
}) => {
  const [order, setOrder] = useState([]);
  const [submittedOrder, setSubmittedOrder] = useState(false);
  const unfinishedOrderObj = unfinishedOrder;
  let history = useHistory();

  useEffect(() => {
    if (
      !(
        Object.keys(unfinishedOrderObj).length === 0 &&
        unfinishedOrderObj.constructor === Object
      )
    ) {
      setOrder(unfinishedOrderObj.order);
    }
  }, []);

  return (
    <div className="drink-list container--general">
      <div className="title-neon--big">Finish order</div>
      <div className="drink-list__container">
        {order.map((item, index) => {
          return (
            <Drink
              key={index}
              item={item}
              index={index}
              addToOrder={(name, cost, id) => addToOrder(name, cost, id)}
              removeFromOrder={(name) => removeFromOrder(name)}
              count={item.count}
              addFavorite={(name) => addToFavorites(name)}
              removeFavorite={(name) => removeFromFavorites(name)}
              favoriteList={favoriteList}
              menuDisplay={false}
            />
          );
        })}
        {submittedOrder && (
          <div className="drink-list__row--white">
            Your order has been sent, go to your profile to see when it's ready
            to be picked up!
          </div>
        )}
      </div>
      {order.length > 0 && !submittedOrder && (
        <div>
          <button className="general-button--bw">Cancel</button>
          <button
            className="general-button--bw"
            onClick={() => history.push("/menu")}
          >
            Edit
            <br />
          </button>
          <button
            className="general-button--bw"
            onClick={() => {
              finalizeOrder();
              setSubmittedOrder(true);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderView;
