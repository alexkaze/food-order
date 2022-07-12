import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // Clear Cart
  if (action.type === 'CLEAR') return defaultCartState;

  // Cart update
  const currentItems = [...state.items];
  const itemIndex = currentItems.findIndex(
    curItem => curItem.id === action.item.id
  );

  const updatedTotalAmount =
    state.totalAmount + action.item.price * action.item.amount;

  // Add Item
  if (action.type === 'ADD_ITEM') {
    if (itemIndex < 0) currentItems.push(action.item);
    if (itemIndex >= 0) currentItems[itemIndex].amount += action.item.amount;
  }

  // Remove Item
  if (action.type === 'REMOVE_ITEM') {
    currentItems[itemIndex].amount--;
    if (currentItems[itemIndex].amount === 0) currentItems.splice(itemIndex, 1);
  }

  return {
    items: currentItems,
    totalAmount: updatedTotalAmount,
  };
};

const CartProvider = ({ children }) => {
  const [cartState, cartStateDispatch] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCardHandler = item =>
    cartStateDispatch({ type: 'ADD_ITEM', item: item });

  const removeItemFromCardHandler = item =>
    cartStateDispatch({ type: 'REMOVE_ITEM', item: item });

  const clearCartHandler = () => cartStateDispatch({ type: 'CLEAR' });

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
