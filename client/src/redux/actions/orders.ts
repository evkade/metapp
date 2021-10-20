export const fetchRequest = () => ({
  type: "FETCH_REQUEST",
});

export const orderMade = (orderID, timeMade) => ({
  type: "ORDER_MADE",
  payload: {
    id: orderID,
    timeMade: timeMade,
  },
});

export const orderPaid = (orderID, timePaid) => ({
  type: "ORDER_PAID",
  payload: {
    id: orderID,
    timePaid: timePaid,
  },
});

export const setOrders = (orders) => ({
  type: "SET_ORDERS",
  payload: orders,
});
