import React, { useState } from "react";
import "../styles/slider_box.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import config from "../assets/slider_box/imgFile.js";
import { MdStars } from "react-icons/md";

const SliderBox = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const fileLength = Object.keys(config).length;

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
    if (imgIndex < fileLength - 4) {
      setImgIndex((prev) => prev + 1);
      setIsLeftDisabled(false);
    }
    if (imgIndex === fileLength - 5) {
      setIsRightDisabled(true);
    }
  };

  const cardHandler = (item_id) => {
    console.log(item_id);
  };

  return (
    <div className="slider-box">
      <div className="heading">
        <h2> Top Rated 🔥 !!</h2>
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
        {Object.values(config)
          .slice(imgIndex, imgIndex + 4)
          .map((item, index) => (
            <div className="card" key={index} onClick={()=>cardHandler(item.id)}>
              <div className="slider-images">
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

export default SliderBox;
