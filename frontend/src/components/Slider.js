import React, { useState } from 'react';
import file from '../assets/slider/imageFile.js';
import '../styles/slider.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';

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

  return (
    <div className='slider'>
      <div className="heading">
        <h2> Categories that you may Love 💖 !!</h2>
        <div className="button-home">
          <button className="left-btn-home" onClick={leftBtnHandler} disabled={isLeftDisabled}>
            <GoArrowLeft />
          </button>
          <button className="right-btn-home" onClick={rightBtnHandler} disabled={isRightDisabled}>
            <GoArrowRight />
          </button>
        </div>
      </div>
      <div className="slider-images">
        {/* Displaying the 6 images */}
        {Object.values(file).slice(imgIndex, imgIndex + 6).map((item, index) => (
          <Link to={{pathname:`/category/${item.name}`,
          state:{categoryData:item.name}}} key={index}>
            <img
              src={item.img}
              alt={item.name}
              className='sliderImg'
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Slider;
