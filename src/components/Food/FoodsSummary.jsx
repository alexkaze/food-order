import React from 'react';
import './FoodsSummary.scss';

const FoodsSummary = () => {
  return (
    <section className="summary">
      <h2 className="summary__title">Food menu</h2>
      <p className="summary__text">
        Choose your favorite food with 1 hour delivery!
      </p>
      <p className="summary__text">
        All food is cooked with high-quality ingredients by experienced chefs.
      </p>
    </section>
  );
};

export default FoodsSummary;
