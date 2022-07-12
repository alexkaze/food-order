import React, { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartForm from './CartForm';
import Button from '../UI/Button';
import './Cart.scss';
import CartItem from './CartItem';

const Cart = ({ onHideCart }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderIsDone, setOrderIsDone] = useState(false);

  const ctx = useContext(CartContext);

  const totalAmount = ctx.totalAmount.toFixed(2);
  const cartIsFilled = ctx.items.length > 0;

  const cartItemAddHandler = item => ctx.addItem({ ...item, amount: 1 });
  const cartItemRemoveHandler = item => ctx.removeItem({ ...item, amount: -1 });

  const orderHandler = () => setIsCheckout(true);

  const sendUserDataHandler = async userData => {
    setIsSubmitting(true);

    await fetch('https://food-20ddb-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({ user: userData, orderedItems: ctx.items }),
    });

    setIsSubmitting(false);
    setOrderIsDone(true);

    ctx.clearCart();
  };

  // Cart Items List
  const cartItems = (
    <ul className="cart-items">
      {ctx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // Cart actions (buttons)
  const cartActions = (
    <div className="cart-actions">
      <Button className="cart-button cart-button--close" onClick={onHideCart}>
        Close
      </Button>

      {cartIsFilled && !orderIsDone && (
        <Button
          className="cart-button cart-button--order"
          onClick={orderHandler}
        >
          Order
        </Button>
      )}
    </div>
  );

  // Cart Content
  const cartContent = (
    <>
      {cartIsFilled && cartItems}
      <div className="cart-total">
        <p>Total amount</p>
        <p>${totalAmount}</p>
      </div>
      {isCheckout && cartIsFilled && (
        <CartForm onSendUserData={sendUserDataHandler} onCancel={onHideCart} />
      )}
      {!isCheckout && cartActions}
    </>
  );

  // Submitting process
  const isSubmittingContent = (
    <p className="submitting-text">Sending order...</p>
  );

  // Success Content
  const successContent = (
    <>
      <p className="successful-text">Successful order!</p>
      {cartActions}
    </>
  );

  return (
    <Modal onHideCart={onHideCart}>
      {!isSubmitting && !orderIsDone && cartContent}
      {isSubmitting && isSubmittingContent}
      {orderIsDone && successContent}
    </Modal>
  );
};

export default Cart;
