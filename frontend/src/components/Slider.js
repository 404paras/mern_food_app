import React, { useState } from 'react';
import file from '../assets/slider/imageFile.js';
import '../styles/slider.css';
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

const Slider = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const fileLength = Object.keys(file).length;

  const leftBtnHandler = () => {
    if (imgIndex > 0) {
      setImgIndex(prev => prev - 1);
      setIsRightDisabled(false);
    }
    if (imgIndex === 0) {
      setIsLeftDisabled(true);
    }
  };

  const rightBtnHandler = () => {
    if (imgIndex < fileLength - 6) {
      setImgIndex(prev => prev + 1);
      setIsLeftDisabled(false);
    }
    if (imgIndex === fileLength - 7) {
      setIsRightDisabled(true);
    }
  };

  const handleImageClick = (itemName) => {
    console.log(itemName);
  };

  return (
    <div className='slider'>
      <div className="heading">
        <h2> Categories that you may Love 💖 !!</h2>
        <div className="button">
          <button className="left-btn" onClick={leftBtnHandler} disabled={isLeftDisabled}>
           <GoArrowLeft/>
          </button>
          <button className="right-btn" onClick={rightBtnHandler} disabled={isRightDisabled}>
           <GoArrowRight/>
          </button>
        </div>
      </div>
      <div className="slider-images">
        {/* Displaying the 6 images */}
        {Object.values(file).slice(imgIndex, imgIndex + 6).map((item, index) => (
          <img
            key={index}
            src={item.img}
            alt={item.name}
            onClick={() => handleImageClick(item.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
