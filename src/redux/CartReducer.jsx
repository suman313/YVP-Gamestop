const defaul_state = {
  cartItems: [],
};

const CartReducer = (state = defaul_state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      break;
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (obj) => obj.id !== action.payload.id
        ),
      };
    }

    default:
      return state;
  }
};
export default CartReducer;
