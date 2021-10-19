const initialState = {
  menu: [],
  currentBar: "dkm",
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_MENU":
      return {
        ...state,
        menu: [...state.menu, action.payload],
      };

    case "REMOVE_FROM_MENU":
      return {
        ...state,
        menu: [
          ...state.menu.filter(
            (beverage) => beverage.name !== action.payload.name
          ),
        ],
      };

    case "EDIT_IN_MENU":
      return {
        ...state,
        menu: [
          ...state.menu.filter(
            (beverage) => beverage.name !== action.payload.name
          ),
          action.payload,
        ],
      };

    case "SWITCH_CURRENT_BAR":
      return {
        ...state,
        currentBar: state.currentBar === "dkm" ? "mkm" : "dkm",
      };

    default:
      return state;
  }
};

export default menuReducer;
