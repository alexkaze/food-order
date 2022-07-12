import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './FoodsAvailable.scss';
import FoodItem from './FoodItem/FoodItem';

const DUMMY_FOODS = [
  {
    id: 'f1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'f2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'f3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'f4',
    name: 'Green Bowl',
    description: 'Healthy and green',
    price: 18.99,
  },
];

const FoodsAvailable = () => {
  // State
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  // Effect
  useEffect(() => {
    const fetchFood = async () => {
      setIsLoading(true);

      const response = await fetch(
        'https://food-20ddb-default-rtdb.firebaseio.com/Food.json'
      );

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      const foodData = Object.keys(data).map(food => ({
        id: food,
        ...data[food],
      }));

      setFoods(foodData);

      setIsLoading(false);
    };

    fetchFood().catch(err => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  ///////////////
  const foodsList = foods.map(food => (
    <FoodItem
      id={food.id}
      key={food.id}
      name={food.name}
      description={food.description}
      price={food.price}
    />
  ));

  return (
    <section>
      <Card>
        {httpError && <p className="food-error">{httpError}</p>}
        {isLoading && <p className="food-loading">Loading...</p>}
        <ul className="foods-list">{foodsList}</ul>
      </Card>
    </section>
  );
};

export default FoodsAvailable;
