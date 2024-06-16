import React, { useEffect, useState } from 'react';
import file from '../assets/slider/imageFile.js';
import '../styles/searchBarSlider.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';

const SearchBarSlider = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const fileLength = Object.keys(file).length;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const itemsToShow = isMobile ? 5 : 8;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
      // Adjust imgIndex if necessary when resizing
      if (imgIndex > fileLength - itemsToShow) {
        setImgIndex(fileLength - itemsToShow);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imgIndex, fileLength, itemsToShow]);

  const leftBtnHandler = () => {
    if (imgIndex > 0) {
      setImgIndex(prev => prev - 1);
      setIsRightDisabled(false);
    }
    if (imgIndex === 1) {
      setIsLeftDisabled(true);
    }
  };

  const rightBtnHandler = () => {
    if (imgIndex < fileLength - itemsToShow) {
      setImgIndex(prev => prev + 1);
      setIsLeftDisabled(false);
    }
    if (imgIndex === fileLength - itemsToShow - 1) {
      setIsRightDisabled(true);
    }
  };

  return (
    <div className='searchSlider'>
      <div className="heading">
        <h2>Popular Cuisines</h2>
        <div className="button">
          <button className="left-btn" onClick={leftBtnHandler} disabled={isLeftDisabled}>
            <GoArrowLeft />
          </button>
          <button className="right-btn" onClick={rightBtnHandler} disabled={isRightDisabled}>
            <GoArrowRight />
          </button>
        </div>
      </div>
      <div className="slider-images">
        {/* Displaying the images based on current imgIndex */}
        {Object.values(file).slice(imgIndex, imgIndex + itemsToShow).map((item, index) => (
          <Link key={index} to={{ pathname: `/category/${item.name}`, state: { categoryData: item.name } }}>
            <img src={item.img} alt={item.name} className='sliderImg' />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBarSlider;
