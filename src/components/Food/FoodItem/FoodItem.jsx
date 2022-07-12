import React, { useContext } from 'react';

import CartContext from '../../../store/cart-context';
import './FoodItem.scss';
import FoodItemForm from './FoodItemForm';

const FoodItem = ({ id, name, description, price }) => {
  const ctx = useContext(CartContext);

  const formattedPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = amount =>
    ctx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });

  return (
    <li className="food">
      <div>
        <h3 className="food__title">{name}</h3>
        <div className="food__description">{description}</div>
        <div className="food__price">{formattedPrice}</div>
      </div>
      <FoodItemForm id={id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default FoodItem;
