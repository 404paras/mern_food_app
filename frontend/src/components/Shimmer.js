import React from 'react';
import '../styles/shimmer.css';

const Shimmer = () => {
  return (
    <div className="shimmer">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="shimmer-container">
          <div className="shimmer-animation"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
