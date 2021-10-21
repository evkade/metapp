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
      orderMadeTmp.made = true;
      orderMadeTmp.timeMade = action.payload.timeMade;
      const rest = state.orders.filter((o) => o._id !== action.payload.id);
      return {
        ...state,
        orders: [...rest, orderMadeTmp],
        loading: false,
      };
    case "ORDER_PAID":
      const orderPaidTmp = state.orders.filter(
        (o) => o._id === action.payload.id
      )[0];
      orderPaidTmp.paid = true;
      orderPaidTmp.timePaid = action.payload.timePaid;
      const rest1 = state.orders.filter((o) => o._id !== action.payload.id);
      return {
        ...state,
        orders: [...rest1, orderPaidTmp],
        loading: false,
      };
    case "SET_ORDERS":
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
