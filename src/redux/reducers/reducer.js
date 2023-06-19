const INIT_STATE = {
  carts: [],
};
export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
      case "REMOVE_CART":
      return {
        ...state,
        carts: state.carts.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
