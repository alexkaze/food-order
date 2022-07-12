import React from 'react';
import './Button.scss';

const Button = ({ children, className, type, onClick }) => {
  return (
    <button
      className={className ? `button ${className}` : 'button'}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
