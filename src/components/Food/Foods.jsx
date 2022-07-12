import React from 'react';

import './Foods.scss';

import FoodsSummary from './FoodsSummary';
import FoodsAbailable from './FoodsAvailable';

const Foods = () => {
  return (
    <div className="foods">
      <FoodsSummary />
      <FoodsAbailable />
    </div>
  );
};

export default Foods;
