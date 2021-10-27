export const fetchRequest = () => ({
  type: "FETCH_ORDER_REQUEST",
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

export const addNewOrder = (order) => ({
  type: "ADD_NEW_ORDER",
  payload: order,
});

export const setUserOrders = (orders) => ({
  type: "SET_USER_ORDERS",
  payload: orders,
});

export const orderCancelled = (orderId) => ({
  type: "ORDER_CANCELLED",
  payload: orderId,
});

export const signOut = () => ({
  type: "SIGN_OUT",
});
