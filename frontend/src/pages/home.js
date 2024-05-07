import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import Slider from '../components/Slider.js';
import SliderBox from '../components/SliderBox.js';
import AllCards from '../components/AllCards.js';
import { allRestaurants } from '../Data/Data.js';
import Footer from '../components/footer.js';
import Shimmer from '../components/Shimmer.js'; // Import the Shimmer component if not already imported

const Home = () => {
  const [restData, setRestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantsData = await allRestaurants();
        setRestData(restaurantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (restData.length === 0) {
      fetchData();
    }
  }, [restData]);

  return (
    <>
      {restData.length === 0 ? (<div className='shimmer'>
      
        <Shimmer /></div>
      ) : (
        <div className="home">
          <div className="slider"><Slider /></div>
          <div className="bottom-line"></div>
          <div className="slider-box"><SliderBox /></div>
          <div className="bottom-line"></div>
          {restData.length > 0 && (
            <div><AllCards heading={"Restaurants with online food delivery"} data={restData} /></div>
          )}
          
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
