import React, { useEffect, useState } from "react";
import "../styles/slider_box.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { allRestaurants } from '../Data/Data.js';

import { Link } from "react-router-dom";

const SliderBox = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [restList, setRestList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allRestaurants();
        setRestList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (restList.length === 0) {
      fetchData();
    }
  }, [restList]);

  const leftBtnHandler = () => {
    if (imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
      setIsRightDisabled(false);
    }
    if (imgIndex === 0) {
      setIsLeftDisabled(true);
    }
  };

  const rightBtnHandler = () => {
    if (imgIndex < restList.length - 4) {
      setImgIndex((prev) => prev + 1);
      setIsLeftDisabled(false);
    }
    if (imgIndex === restList.length - 5) {
      setIsRightDisabled(true);
    }
  };

  const cardHandler = (item_id) => {
    console.log(item_id);
  };

  return (
    <div className="slider-box-">
      <div className="heading">
        <h2> Top restaurant chains !!</h2>
        <div className="button">
          <button
            className="left-btn"
            onClick={leftBtnHandler}
            disabled={isLeftDisabled}
          >
            <GoArrowLeft />
          </button>
          <button
            className="right-btn"
            onClick={rightBtnHandler}
            disabled={isRightDisabled}
          >
            <GoArrowRight />
          </button>
        </div>
      </div>
      <div className="cards">
        {restList && restList
          .slice(imgIndex, imgIndex + 4)
          .map((item, index) => (
            <div className="card" key={index} onClick={() => cardHandler(item.id)}>
           <Link
              to={`/restaurant/${"restaurantInfo"}/${item._id}`} // Navigate to route with restaurant ID
              key={index}>
              <div className="slider-images">
                
                <img src={item.imgUrl} alt={item?.name} />
              </div>
              <div className="item-info">
              <div className="item-name">{item?.name}</div>
             
              
              <div className="address">{item?.address}</div>
            </div>
            </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SliderBox;
