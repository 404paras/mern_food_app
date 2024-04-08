import React, { useState } from "react";

import "../styles/allCards.css";
import config from "../assets/slider_box/imgFile.js";
import { MdStars } from "react-icons/md";

const AllCards = () => {

 
  const cardHandler = (item_id) => {
    console.log(item_id);
  };

  return (
    <div className="box">
      <div className="heading">
        <h2> Restaurants with online food delivery </h2>
       
      </div>
      <div className="cards">
        {Object.values(config)
          .map((item, index) => (
            <div className="card" key={index} onClick={()=>cardHandler(item.id)}>
              <div className="images">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="item-name">{item.name}</div>
              <div className="rating">
                <MdStars /> &nbsp;{item.rating}
              </div>
              <div>{item.category.join(", ")}</div>
              <div>{item.outlet}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCards;
