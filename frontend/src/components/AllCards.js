import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/allCards.css";
import { MdStars } from "react-icons/md";
import Shimmer from "./Shimmer";

const AllCards = ({ heading, data , categoryName,fontSize}) => {
  const [restaurant, setRestaurant] = useState([]);
const [isLoading,setIsLoading] = useState(false);
  useEffect(() => {
    if (data) {
      setRestaurant(data);
      setIsLoading(true);
    }
  }, [data,restaurant]);
if(!isLoading){
  return (
    <Shimmer/>
  )
}
  return (
    <div className="box" style={{
      position: "relative",
      width: "100%",
      margin: "0 auto",
      msFlexWrap: "wrap",
    }}>
      <div className="heading">
        <h2>{heading}</h2>
      </div>
      {restaurant && restaurant.length > 0 ? (
        <div className="cards">
          {restaurant.map((item, index) => (
            <Link
              to={`/restaurant/${categoryName || "restaurantInfo"}/${item._id}`} // Navigate to route with restaurant ID
              key={index}
              className="card" // Wrap the card content with Link component
            >
              <div className="images">
                <img src={item.imgUrl || item.image || " "} alt={item.name || ""} />
              </div>
              <div style={{ marginLeft: "12px", fontSize:`${fontSize}`}}>
                <div className="item-name">{item.name || ""}</div>
                <div className="rating">
                  <MdStars /> &nbsp;{item.rating || "5"}
                </div>
                <div className="info" >
                  <div>{item.category?.join(", ") || ""}</div>
                  <div>{item.address || ""}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AllCards;
