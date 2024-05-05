import React, { useState } from 'react';
import file from '../assets/slider/imageFile.js';
import '../styles/searchBarSlider.css';
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';


const SearchBarSlider = () => {
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
    if (imgIndex < fileLength - 8) {
      setImgIndex(prev => prev + 1);
      setIsLeftDisabled(false);
    }
    if (imgIndex === fileLength - 9) {
      setIsRightDisabled(true);
    }
  };

 

  return (
    <div className='searchSlider'>
      <div className="heading">
        <h2> Popular Cuisines</h2>
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
        {Object.values(file).slice(imgIndex, imgIndex + 8).map((item, index) => (
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

export default SearchBarSlider;
