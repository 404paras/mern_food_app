import React, { useState, useEffect } from 'react';
import '../styles/RestDish.css';
import Shimmer from './Shimmer';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartItemsSlice';

const RestDish = ({ data }) => {
  const [foodItem, setFoodItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const addToCart = (id) => {
    if (foodItem) {
      dispatch(addItem({ foodItem }));
    }
  };

  useEffect(() => {
    if (data) {
      setFoodItem(data);
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div className="restDishCard">
      <div className="dishInfo">
        <p className="dishName">{foodItem?.name}</p>
        <p className="dishPrice">Rs. {foodItem?.price}</p>
        <p className="dishDescription">{foodItem?.description}</p>
      </div>
      <div className='dishSpace'></div>
      <div className="dishImageContainer">
        <img src={foodItem?.image} alt="" className="dishImage" />
        <button className="addButton" onClick={() => addToCart(foodItem)}>Add</button>
      </div>
    </div>
  );
};

export default RestDish;
