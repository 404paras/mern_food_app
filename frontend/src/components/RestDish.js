import React, { useState, useEffect } from 'react';
import '../styles/RestDish.css';
import Shimmer from './Shimmer';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../store/cartItemsSlice';

const RestDish = ({ data }) => {
  const [foodItem, setFoodItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.foodItems.itemDetail);

  useEffect(() => {
    if (data) {
      setFoodItem(data);
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <Shimmer />;
  }

  const cartItem = cartItems.find((item) => item.id === foodItem._id);

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
        {cartItem ? (
          <div className="qty-control">
            <button onClick={() => dispatch(removeItem({ foodItemId: foodItem._id }))}>-</button>
            <span>{cartItem.count}</span>
            <button onClick={() => dispatch(addItem({ id: foodItem._id, name: foodItem.name, price: foodItem.price, image: foodItem.image }))}>+</button>
          </div>
        ) : (
          <button className="addButton" onClick={() => dispatch(addItem({ id: foodItem._id, name: foodItem.name, price: foodItem.price, image: foodItem.image }))}>Add</button>
        )}
      </div>
    </div>
  );
};

export default RestDish;
