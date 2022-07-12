import React, { useState } from 'react';

const useInput = () => {
  const [enteredValue, setEnteredValue] = useState('');
  const [inputIsValid, setInputIsValid] = useState(true);

  const valueChangeHandler = e => {
    let phoneNumber = e.target.value.replace(/\D/g, '');

    if (phoneNumber.length === 0) {
      setEnteredValue('');
      return;
    }

    if (phoneNumber.length >= 1) setEnteredValue(phoneNumber.substring(0, 3));

    if (phoneNumber.length >= 4)
      setEnteredValue(
        prevState => prevState + '-' + phoneNumber.substring(3, 7)
      );

    if (phoneNumber.length >= 8)
      setEnteredValue(
        prevState => prevState + '-' + phoneNumber.substring(7, 11)
      );
  };

  const valueIsValid = enteredValue.trim().length === 13;
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
