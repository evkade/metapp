export const getOrders = (currentBar) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    fetch(`http://localhost:5000/api/orders?currentbar=${currentBar}`, {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((orders) => dispatch(setOrders(orders)))
      .catch((err) => console.log(err));
  };
};

export const makeOrder = (orderId, timestamp) => {
  console.log(orderId);
  return (dispatch) => {
    dispatch(fetchRequest());
    fetch("http://localhost:5000/api/orders/make", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: orderId, timestamp: timestamp }),
    })
      .then((res) => {
        if (res.ok) dispatch(orderMade(orderId, timestamp));
        else throw new Error("Something went wrong");
      })
      .catch((err) => console.log(err));
  };
};

export const payForOrder = (orderId, timestamp) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    fetch("http://localhost:5000/api/orders/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: orderId, timestamp: timestamp }),
    })
      .then((res) => {
        if (res.ok) dispatch(orderPaid(orderId, timestamp));
        else throw new Error("Something went wrong");
      })
      .catch((err) => console.log(err));
  };
};

const fetchRequest = () => ({
  type: "FETCH_REQUEST",
});

const orderMade = (orderID, timeMade) => ({
  type: "ORDER_MADE",
  payload: {
    id: orderID,
    timeMade: timeMade,
  },
});

const orderPaid = (orderID, timePaid) => ({
  type: "ORDER_PAID",
  payload: {
    id: orderID,
    timePaid: timePaid,
  },
});

const setOrders = (orders) => ({
  type: "SET_ORDERS",
  payload: orders,
});
