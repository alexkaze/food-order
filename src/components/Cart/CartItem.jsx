import React from 'react';
import Button from '../UI/Button';
import './CartItem.scss';

const CartItem = ({ name, price, amount, onRemove, onAdd }) => {
  const formattedPrice = `${price.toFixed(2)}`;

  return (
    <li className="cart-item">
      <div>
        <h3 className="cart-item__title">{name}</h3>
        <div className="cart-item__summary">
          <p className="cart-item__price">${formattedPrice}</p>
          <p className="cart-item__amount">x {amount}</p>
        </div>
      </div>
      <div className="cart-item__actions">
        <Button className="cart-item__button" onClick={onAdd}>
          +
        </Button>
        <Button className="cart-item__button" onClick={onRemove}>
          -
        </Button>
      </div>
    </li>
  );
};

export default CartItem;
