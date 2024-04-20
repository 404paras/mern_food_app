import React, { useState,useEffect } from 'react';
import '../styles/RestDish.css';

const RestDish = ({ data }) => {
    console.log(data)
    const [foodItem,setFoodItem] = useState();

    useEffect(() => {
        if (data) {
            setFoodItem(data);
        }
      }, [data]);

      console.log(foodItem);
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
                <button className="addButton">Add</button>
            </div>
          
        </div>
    );
};

export default RestDish;
