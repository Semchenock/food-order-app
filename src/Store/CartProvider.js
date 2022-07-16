import { useReducer } from "react";
import CartContext from "./cart-context";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReduser = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id;
      });
      let updatedItems;
      if (existingCartItemIndex !== -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return { items: updatedItems, totalAmount: updatedAmount };
    }
    case "REMOVE": {
      const selectedCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item;
      });
      const selectedCartItem = state.items[selectedCartItemIndex];
      const updatedAmount = state.totalAmount - selectedCartItem.price;
      const updatedItems = [...state.items];
      if (selectedCartItem.amount === 1)
        updatedItems.splice(selectedCartItemIndex, 1);
      else {
        const updatedItem = { ...updatedItems[selectedCartItemIndex] };
        updatedItem.amount--;
        updatedItems[selectedCartItemIndex] = updatedItem;
      }
      return { items: updatedItems, totalAmount: updatedAmount };
    }
    default:
      return defaultCartState;
  }
};
const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE", item: id });
  };
  const [cartState, dispatchCart] = useReducer(cartReduser, defaultCartState);
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
