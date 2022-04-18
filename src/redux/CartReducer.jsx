import { act } from "react-dom/test-utils";

const defaul_state = {
  cartItems: [],
};

const CartReducer = (state = defaul_state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      {
        const presentInCart = state.cartItems.find(
          (item) => item.id == action.payload.id
        );
        return {
          ...state,
          cartItems: presentInCart
            ? state.cartItems.map((product) =>
                product.id === action.payload.id
                  ? { ...product, qty: product.qty + 1 }
                  : product
              )
            : [...state.cartItems, { ...action.payload }],
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
    case "UPDATE_QTY": {
      return {
        ...state,
        cartItems: state.cartItems.map((product) =>
          product.id == action.payload.id
            ? { ...action.payload, qty: action.quantity }
            : product
        ),
      };
    }
    case "EMPTY_THE_CART": {
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};
export default CartReducer;
