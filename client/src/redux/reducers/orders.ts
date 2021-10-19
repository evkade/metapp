const initalState = {
  orders: [
    {
      id: 1,
      drink: "Cosmopolitan",
      quantity: 2,
      made: false,
      paid: false,
      user: "Agnes",
      price: 45,
      timeMade: "",
      timePaid: "",
    },
    {
      id: 2,
      drink: "Gin and tonic",
      quantity: 1,
      made: false,
      paid: false,
      user: "Agnes",
      price: 35,
      timeMade: "",
      timePaid: "",
    },
    {
      id: 3,
      drink: "Tequila shot",
      quantity: 5,
      made: false,
      paid: false,
      user: "Agnes",
      price: 35,
      timeMade: "",
      timePaid: "",
    },
    {
      id: 4,
      drink: "Margarita",
      quantity: 4,
      made: true,
      paid: false,
      user: "Agnes",
      price: 60,
      timeMade: "22:45",
      timePaid: "",
    },
    {
      id: 5,
      drink: "Rum and coke",
      quantity: 1,
      made: true,
      paid: true,
      user: "Agnes",
      price: 35,
      timeMade: "23:38",
      timePaid: "23:45",
    },
  ],
};

const orderReducer = (state = initalState, action) => {
  switch (action.type) {
    case "DRINK_MADE":
      const orderMadeTmp = state.orders.filter(
        (o) => o.id === action.payload.id
      )[0];
      orderMadeTmp.made = true;
      orderMadeTmp.timeMade = action.payload.timeMade;
      const rest = state.orders.filter((o) => o.id !== action.payload.id);
      return {
        orders: [...rest, orderMadeTmp],
        ...state,
      };
    case "DRINK_PAID":
      const orderPaidTmp = state.orders.filter(
        (o) => o.id === action.payload.id
      )[0];
      orderPaidTmp.paid = true;
      orderPaidTmp.timePaid = action.payload.timePaid;
      const rest1 = state.orders.filter((o) => o.id !== action.payload.id);
      return {
        orders: [orderPaidTmp, rest1],
        ...state,
      };
    default:
      return state;
  }
};

export default orderReducer;
