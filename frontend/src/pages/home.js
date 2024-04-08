import React from 'react'
import '../styles/home.css';
import Slider from '../components/Slider';
import SliderBox from '../components/SliderBox';
import AllCards from '../components/AllCards.js';

const home = () => {
  return (
    

    <div className="home">

      <div className="slider"><Slider/></div>
      <div className="bottom-line"></div>
      <div className="slider-box"><SliderBox/></div>
      <div className="bottom-line"></div>
      <div ><AllCards/></div>
      <div className="bottom-line"></div>
      
    </div>
  )
}

export default home