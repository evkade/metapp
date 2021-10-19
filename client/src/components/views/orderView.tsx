import React, { useEffect, useState } from "react";
import "../components.scss";
import Drink from "./DrinkView";
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
    <div className="menuView">
      <div className="pageTitleNeon--small">Finish order</div>
      <div className="menuView__container">
        {order.map((item, index) => {
          return (
            <Drink
              key={index}
              item={item}
              index={index}
              addToOrder={(name, cost) => addToOrder(name, cost)}
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
          <div style={{ color: "white" }}>Your order has been sent!</div>
        )}
      </div>
      {order.length > 0 && !submittedOrder && (
        <>
          <button>Cancel</button>
          <button onClick={() => history.push("/menu")}>
            Edit
            <br />
          </button>
          <button
            onClick={() => {
              finalizeOrder();
              setSubmittedOrder(true);
            }}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default OrderView;
