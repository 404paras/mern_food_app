import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { categoryData } from '../Data/Data.js';
import AllCards from '../components/AllCards.js';
import Shimmer from '../components/Shimmer.js';
import '../styles/categoryRest.css';

const CategoryRest = () => {
  const { name } = useParams();
  const [category, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryData({ categoryName: name });
        setCategoryData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name]); // Fetch data whenever name changes

  if (loading) return <Shimmer />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="category-rest-container">
      <div className="category-header">
        <div>
          <div className="category-title">{name}</div>
          <div className="category-subtitle">Dive into these delicious & flavoursome noodles for a perfect meal</div>
        </div>
      </div>
      <div>
        <AllCards heading={"Restaurants to explore"} data={category} categoryName={name} />
      </div>
    </div>
  );
};

export default CategoryRest;
