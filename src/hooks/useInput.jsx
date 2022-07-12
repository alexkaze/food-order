import React, { useState } from 'react';

const useInput = () => {
  const [enteredValue, setEnteredValue] = useState('');
  const [inputIsValid, setInputIsValid] = useState(true);

  const valueChangeHandler = e => setEnteredValue(e.target.value);

  const valueIsValid = enteredValue.trim().length > 0;
  const validateInput = () => setInputIsValid(valueIsValid);

  const resetValue = () => setEnteredValue('');

  return {
    enteredValue,
    valueChangeHandler,
    valueIsValid,
    inputIsValid,
    validateInput,
    resetValue,
  };
};

export default useInput;
