import React from 'react';
import './Card.scss';

const Card = ({ children, className }) => {
  return (
    <div className={className ? `card ${className}` : 'card'}>{children}</div>
  );
};

export default Card;
