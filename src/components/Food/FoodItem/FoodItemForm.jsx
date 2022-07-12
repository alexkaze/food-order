import React, { useRef } from 'react';

import Button from '../../UI/Button';
import Input from '../../UI/Input';
import './FoodItemForm.scss';

const FoodItemForm = ({ id, onAddToCart }) => {
  const inputAmountRef = useRef();

  const submitHandler = e => {
    e.preventDefault();
    const enteredAmount = +inputAmountRef.current.value;
    onAddToCart(enteredAmount);
  };

  return (
    <form className="item-form" onSubmit={submitHandler}>
      <div className="item-form__item">
        <Input
          refValue={inputAmountRef}
          label="Amount"
          id={`food-amount-${id}`}
          className="item-form__input"
          type="number"
          min="1"
          step="1"
          defaultValue="1"
        />
      </div>

      <Button type="submit" className="item-form__button">
        Add
      </Button>
    </form>
  );
};

export default FoodItemForm;
