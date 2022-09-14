import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
export const Store = createContext();

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;

      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) => {
            return item.name === existItem.name ? newItem : item;
          })
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ cartItems: cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.cartItems.filter((item) => {
        return item.slug !== action.payload.slug;
      });
      Cookies.set("cart", JSON.stringify({ cartItems: updatedCart }));
      return { ...state, cart: { ...state.cart, cartItems: updatedCart } };
    case "SET_SHIPPING_ADDRESS":
      const address = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: address,
        },
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    case "CLEAR_CART_ITEMS":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    default:
      return state;
  }
};

export function StorePovider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
