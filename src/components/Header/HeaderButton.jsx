import React, { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import Button from '../UI/Button';
import './HeaderButton.scss';
import Icon from '../Cart/CartIcon';

const HeaderButton = ({ onDisplayCart }) => {
  const [btnClasses, setBtnClasses] = useState('header__button');
  const ctx = useContext(CartContext);

  const cartItemsNumber = ctx.items.reduce(
    (value, item) => value + item.amount,
    0
  );

  useEffect(() => {
    setBtnClasses('header__button bump');

    const id = setTimeout(() => {
      setBtnClasses('header__button');
    }, 300);

    return () => {
      clearInterval(id);
    };
  }, [ctx.items]);

  return (
    <Button className={btnClasses} onClick={onDisplayCart}>
      <span className="icon">
        <Icon />
      </span>
      <span>Your Cart</span>
      <span className="header__button-count">{cartItemsNumber}</span>
    </Button>
  );
};

export default HeaderButton;
