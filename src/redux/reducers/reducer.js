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
      case 'REMOVE_FROM_CART':
        const updatedCart = state.carts.filter((product) => product.id !== action.payload);
        return {
          ...state,
          cart: updatedCart,
        };
    default:
      return state;
  }
};
