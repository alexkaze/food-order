import React from 'react';

import Input from '../UI/Input';
import Button from '../UI/Button';
import './CartForm.scss';
import useInput from '../../hooks/useInput';
import usePhone from '../../hooks/usePhone';

const CartForm = ({ onSendUserData, onCancel }) => {
  // Inputs
  const {
    enteredValue: enteredName,
    valueChangeHandler: nameChangeHandler,
    valueIsValid: nameIsValid,
    inputIsValid: nameInputIsValid,
    validateInput: validateName,
    resetValue: resetName,
  } = useInput();

  const {
    enteredValue: enteredPhone,
    valueChangeHandler: phoneChangeHandler,
    valueIsValid: phoneIsValid,
    inputIsValid: phoneInputIsValid,
    validateInput: validatePhone,
    resetValue: resetPhone,
  } = usePhone();

  const {
    enteredValue: enteredAdress,
    valueChangeHandler: adressChangeHandler,
    valueIsValid: adressIsValid,
    inputIsValid: adressInputIsValid,
    validateInput: validateAdress,
    resetValue: resetAdress,
  } = useInput();

  // Form
  const formSubmitHandler = e => {
    e.preventDefault();

    validateName();
    validatePhone();
    validateAdress();

    const formIsValid = nameIsValid && phoneIsValid && adressIsValid;

    if (!formIsValid) return;

    onSendUserData({
      name: enteredName,
      phone: enteredPhone,
      adress: enteredAdress,
    });

    resetName();
    resetPhone();
    resetAdress();
  };

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div className="form__item">
        <Input
          className="form__input"
          value={enteredName}
          id="name"
          label="Name"
          type="text"
          placeholder="Alex"
          onChange={nameChangeHandler}
        />

        {!nameInputIsValid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      <div className="form__item">
        <Input
          className="form__input"
          value={enteredPhone}
          id="phone"
          label="Phone"
          type="tel"
          placeholder="123-4567-8901"
          maxLength="13"
          onChange={phoneChangeHandler}
        />

        {!phoneInputIsValid && (
          <p className="error-text">
            Phone number format must be xxx-xxxx-xxxx
          </p>
        )}
      </div>

      <div className="form__item">
        <Input
          className="form__input"
          value={enteredAdress}
          id="adress"
          label="Street"
          type="text"
          placeholder="18 Red Avenue, Apt 5"
          onChange={adressChangeHandler}
        />

        {!adressInputIsValid && (
          <p className="error-text">Adress must not be empty</p>
        )}
      </div>

      <div className="form__item">
        <Button
          className="form__button form__button--cancel"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button className="form__button form__button--confirm" type="submit">
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default CartForm;
