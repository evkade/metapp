const initialState = {
    menu: []
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
        menu: [
          ...state.menu.filter(
            beverage => beverage.name !== action.payload.name
          ),
        ],
      };
    default:
      return state;
  }
};

export default menuReducer;