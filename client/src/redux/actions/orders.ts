export const drinkMade = (orderID, timeMade) => ({
  type: "DRINK_MADE",
  payload: {
    id: orderID,
    timeMade: timeMade,
  },
});

export const drinkPaid = (orderID, timePaid) => ({
  type: "DRINK_PAID",
  payload: {
    id: orderID,
    timePaid: timePaid,
  },
});

export const orderMade = (orderBeverage) => ({
  type: "ORDER_MADE",
  payload: {
    beverage: orderBeverage,
  },
});
