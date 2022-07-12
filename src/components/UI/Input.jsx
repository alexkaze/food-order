import React from 'react';
import './Input.scss';

const Input = ({ refValue, id, label, className, ...props }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        ref={refValue}
        id={id}
        className={className ? `input ${className}` : 'input'}
        {...props}
      ></input>
    </>
  );
};

export default Input;
