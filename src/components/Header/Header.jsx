import React from 'react';

import './Header.scss';

import HeaderButton from './HeaderButton';
import foodImage from '../../assets/header-img.jpg';

const Header = ({ onDisplayCart }) => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Food</h1>
        <HeaderButton onDisplayCart={onDisplayCart} />
      </header>
      <div className="header-image">
        <img className="image-item" src={foodImage} alt="Food Image" />
      </div>
    </>
  );
};

export default Header;
