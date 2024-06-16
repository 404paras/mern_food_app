import React, { useState, useEffect } from 'react';
import file from '../assets/slider/imageFile.js';
import '../styles/slider.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';

const Slider = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.screen.availWidth <= 500);
  const fileLength = Object.keys(file).length;
  const itemsToShow = isMobile ? 4 : 6;

  useEffect(() => {
    setIsLeftDisabled(imgIndex === 0);
    setIsRightDisabled(imgIndex >= fileLength - itemsToShow);
    const handleResize = () => {
      setIsMobile(window.screen.availWidth <= 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imgIndex, fileLength, itemsToShow]);

  

  const leftBtnHandler = () => {
    if (imgIndex > 0) {
      setImgIndex(prev => prev - 1);
    }
  };

  const rightBtnHandler = () => {
    if (imgIndex < fileLength - itemsToShow) {
      setImgIndex(prev => prev + 1);
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
        {Object.values(file).slice(imgIndex, imgIndex + itemsToShow).map((item, index) => (
          <Link
            to={{
              pathname: `/category/${item.name}`,
              state: { categoryData: item.name }
            }}
            key={index}
          >
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
