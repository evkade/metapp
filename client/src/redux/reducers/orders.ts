import { OrderState } from "../../constants/beverageObjects";

const initalState: OrderState = {
  loading: false,
  orders: [],
};

const orderReducer = (state = initalState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ORDER_MADE":
      const orderMadeTmp = state.orders.filter(
        (o) => o._id === action.payload.id
      )[0];
      console.log(orderMadeTmp);
      orderMadeTmp.made = true;
      orderMadeTmp.timeMade = action.payload.timeMade;
      const rest = state.orders.filter((o) => o._id !== action.payload.id);
      return {
        orders: [...rest, orderMadeTmp],
        loading: false,
        ...state,
      };
    case "ORDER_PAID":
      const orderPaidTmp = state.orders.filter(
        (o) => o._id === action.payload.id
      )[0];
      orderPaidTmp.paid = true;
      orderPaidTmp.timePaid = action.payload.timePaid;
      const rest1 = state.orders.filter((o) => o._id !== action.payload.id);
      return {
        orders: [orderPaidTmp, rest1],
        loading: false,
        ...state,
      };
    case "SET_ORDERS":
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
    default:
      return state;
  }
};

export default orderReducer;
