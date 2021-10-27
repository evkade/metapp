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
        (o) => o.id === action.payload.id
      )[0];
      orderMadeTmp.made = true;
      orderMadeTmp.timeMade = action.payload.timeMade;
      const rest = state.orders.filter((o) => o.id !== action.payload.id);
      return {
        ...state,
        orders: [orderMadeTmp, ...rest],
        loading: false,
      };
    case "ORDER_PAID":
      const orderPaidTmp = state.orders.filter(
        (o) => o.id === action.payload.id
      )[0];
      orderPaidTmp.paid = true;
      orderPaidTmp.timePaid = action.payload.timePaid;
      const restPaid = state.orders.filter((o) => o.id !== action.payload.id);
      return {
        ...state,
        orders: [orderPaidTmp, ...restPaid],
        loading: false,
      };
    case "SET_ORDERS":
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
    case "ADD_NEW_ORDER":
      var tmp = action.payload;
      tmp.id = action.payload._id;
      tmp._id = null;
      return {
        ...state,
        orders: [...state.orders, tmp],
      };
    case "SET_USER_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    case "ORDER_CANCELLED":
      const orderCancelledTmp = state.orders.filter(
        (o) => o.id === action.payload.id
      )[0];
      orderCancelledTmp.cancelled = true;
      const restCancelled = state.orders.filter(
        (o) => o.id !== action.payload.id
      );
      return {
        ...state,
        orders: [orderCancelledTmp, ...restCancelled],
        loading: false,
      }
    case "SIGN_OUT":
      return {
        ...state,
        loading: false,
        orders: [],

      };
    default:
      return state;
  }
};

export default orderReducer;
