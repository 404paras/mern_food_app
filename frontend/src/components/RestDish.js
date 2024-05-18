import React, { useState, useEffect } from 'react';
import '../styles/RestDish.css';
import Shimmer from './Shimmer';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartItemsSlice';

const RestDish = ({ data }) => {
  const [foodItem, setFoodItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const addToCart = ({id,name,price,image}) => {
    
    if (foodItem) {
      dispatch(addItem({id:id,name:name,price:price,image:image}));
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
      <div className="dishSpace"></div>
      <div className="dishImageContainer">
        <img src={foodItem?.image} alt={foodItem?.name} className="dishImage" />
        <button className="addButton" onClick={() => addToCart({id:foodItem._id,name:foodItem.name,price:foodItem.price,image:foodItem.image})}>Add</button>
      </div>
    </div>
  );
};

export default RestDish;
