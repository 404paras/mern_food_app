import React, { useState, useEffect } from "react";
import "../styles/RestaurantDishes.css";
import { restaurantDish } from "../Data/Data.js";
import { useParams } from "react-router";
import RestDishCard from "../components/RestDish.js";
import { restInfo } from "../Data/Data.js";
import Shimmer from "../components/Shimmer.js";

const RestaurantDishes = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { categoryName, id } = useParams();
  const [restDetail, setRestDetail] = useState({});
const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const data = await restaurantDish({ id });

        setFoodItems(data.foodItem);
        
        const restaurant = await restInfo({ id });
        setRestDetail(restaurant);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (foodItems.length === 0) {
      fetchFoodItems();
    }
  }, [id, foodItems, restDetail]);

if(!isLoading) {
  return <Shimmer/>}


  return (
    <div className="restaurantDish">
      <div className="restSchema">
        <div className="top">
          <div className="restInfo">
            <div className="restName">
              <h1>{restDetail.name}</h1>
              <div>{restDetail.address}</div>
            </div>
            <img src={restDetail.imgUrl} alt="" />
          </div>
        </div>
        <div style={{ margin: "3rem" }}></div>
        <div className="dishCards">
          <div className="line"></div>
          {foodItems.length > 0 &&
            foodItems
              .filter((item) => {
                if (categoryName === "restaurantInfo") {
                  return true; 
                } else {
                  return item.category.includes(categoryName);
                }
              })
              .map((item, index) => (
                <React.Fragment key={item._id}>
                  <RestDishCard data={item} />
                  <div className="line" key={`line-${index}`}></div>
                </React.Fragment>
              ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDishes;
